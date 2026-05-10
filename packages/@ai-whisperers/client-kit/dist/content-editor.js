// Content Editor — embed this component in /admin/content page
// Full JSON editor with schema-aware form for non-devs
// Place at app/admin/content/page.tsx
"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
const EDITOR_STYLES = `
.editor-container { max-width: 1200px; margin: 0 auto; padding: 2rem; font-family: system-ui, sans-serif; }
.editor-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
.editor-header h1 { margin: 0; font-size: 1.5rem; font-weight: 600; }
.editor-sidebar { display: flex; gap: 2rem; }
.editor-nav { width: 250px; flex-shrink: 0; }
.editor-nav button { display: block; width: 100%; text-align: left; padding: 0.5rem 1rem; border: none; background: none; cursor: pointer; border-radius: 4px; font-size: 0.875rem; }
.editor-nav button:hover { background: #f0f0f0; }
.editor-nav button.active { background: #e0e7ff; color: #4338ca; font-weight: 500; }
.editor-main { flex: 1; }
.editor-panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5rem; }
.editor-panel h2 { margin: 0 0 1rem; font-size: 1.25rem; }
.editor-field { margin-bottom: 1rem; }
.editor-field label { display: block; font-size: 0.75rem; font-weight: 500; color: #6b7280; margin-bottom: 0.25rem; text-transform: uppercase; }
.editor-field input, .editor-field textarea { width: 100%; padding: 0.5rem; border: 1px solid #d1d5db; border-radius: 4px; font-size: 0.875rem; box-sizing: border-box; }
.editor-field textarea { min-height: 80px; resize: vertical; }
.editor-field textarea.code { min-height: 300px; font-family: monospace; font-size: 0.8125rem; }
.editor-actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
.editor-actions button { padding: 0.5rem 1rem; border-radius: 4px; font-size: 0.875rem; cursor: pointer; border: 1px solid #d1d5db; background: #fff; }
.editor-actions button.primary { background: #4338ca; color: white; border-color: #4338ca; }
.editor-actions button.primary:hover { background: #3730a3; }
.editor-actions button:disabled { opacity: 0.5; cursor: not-allowed; }
.editor-toast { position: fixed; bottom: 1rem; right: 1rem; padding: 0.75rem 1.5rem; border-radius: 8px; color: white; font-size: 0.875rem; animation: fadeIn 0.2s; z-index: 1000; }
.editor-toast.success { background: #059669; }
.editor-toast.error { background: #dc2626; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;
export default function ContentEditor() {
    const [content, setContent] = useState({});
    const [siteId, setSiteId] = useState("default");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [rawJson, setRawJson] = useState(false);
    const showToast = useCallback((message, type) => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);
    useEffect(() => {
        async function load() {
            try {
                const params = new URLSearchParams(window.location.search);
                const sid = params.get("site") || "default";
                setSiteId(sid);
                const res = await fetch(`/api/admin/content?site=${sid}`);
                const data = await res.json();
                if (data.content)
                    setContent(data.content);
                if (data.content) {
                    const keys = Object.keys(data.content);
                    if (keys.length > 0 && !activeSection)
                        setActiveSection(keys[0]);
                }
            }
            catch (e) {
                showToast("Failed to load content", "error");
            }
            finally {
                setLoading(false);
            }
        }
        load();
    }, []);
    async function handleSave() {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/content", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ siteId, content }),
            });
            const data = await res.json();
            if (data.ok)
                showToast("Content saved!", "success");
            else
                showToast(data.error || "Save failed", "error");
        }
        catch {
            showToast("Network error", "error");
        }
        finally {
            setSaving(false);
        }
    }
    function updateField(section, field, value) {
        setContent((prev) => {
            const updated = { ...prev };
            const sec = updated[section] || {};
            if (Array.isArray(sec)) {
                // Array section — don't edit inline
                return prev;
            }
            updated[section] = { ...sec, [field]: value };
            return updated;
        });
    }
    function renderField(key, value, path) {
        if (typeof value === "string") {
            const isLong = value.length > 100;
            return (_jsxs("div", { className: "editor-field", children: [_jsx("label", { children: key }), isLong ? (_jsx("textarea", { value: value, onChange: (e) => updateField(activeSection, key, e.target.value) })) : (_jsx("input", { value: value, onChange: (e) => updateField(activeSection, key, e.target.value) }))] }, path));
        }
        if (typeof value === "number") {
            return (_jsxs("div", { className: "editor-field", children: [_jsx("label", { children: key }), _jsx("input", { type: "number", value: value, onChange: (e) => updateField(activeSection, key, e.target.value) })] }, path));
        }
        // Objects and arrays — skip for inline editing, shown in raw JSON view
        return null;
    }
    const sections = Object.keys(content);
    const currentSection = activeSection && content[activeSection];
    if (loading)
        return _jsx("div", { className: "editor-container", children: _jsx("p", { children: "Loading editor..." }) });
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: EDITOR_STYLES }), _jsxs("div", { className: "editor-container", children: [_jsxs("div", { className: "editor-header", children: [_jsxs("h1", { children: ["Content Editor \u2014 ", siteId] }), _jsxs("div", { children: [_jsx("button", { onClick: () => setRawJson(!rawJson), className: rawJson ? "primary" : "", children: rawJson ? "Form View" : "Raw JSON" }), _jsx("button", { className: "primary", onClick: handleSave, disabled: saving, style: { marginLeft: 8 }, children: saving ? "Saving..." : "Save" })] })] }), _jsxs("div", { className: "editor-sidebar", children: [_jsxs("div", { className: "editor-nav", children: [_jsx("h3", { children: "Sections" }), sections.map((sec) => (_jsx("button", { className: activeSection === sec ? "active" : "", onClick: () => setActiveSection(sec), children: sec }, sec)))] }), _jsx("div", { className: "editor-main", children: rawJson ? (_jsx("div", { className: "editor-panel", children: _jsx("textarea", { className: "code", value: JSON.stringify(content, null, 2), onChange: (e) => {
                                            try {
                                                setContent(JSON.parse(e.target.value));
                                            }
                                            catch { /* allow typing */ }
                                        } }) })) : activeSection && currentSection ? (_jsxs("div", { className: "editor-panel", children: [_jsx("h2", { children: activeSection }), typeof currentSection === "object" && !Array.isArray(currentSection)
                                            ? Object.entries(currentSection).map(([k, v]) => renderField(k, v, `${activeSection}.${k}`))
                                            : _jsx("p", { children: "Array data \u2014 use Raw JSON view to edit" })] })) : (_jsx("div", { className: "editor-panel", children: _jsx("p", { children: "Select a section from the sidebar to edit" }) })) })] })] }), toast && _jsx("div", { className: `editor-toast ${toast.type}`, children: toast.message })] }));
}
//# sourceMappingURL=content-editor.js.map