"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const labels = { es: "ES", en: "EN", gn: "GN" };
const flags = { es: "🇵🇾", en: "🇺🇸", gn: "🇵🇾" };
const langs = ["es", "en", "gn"];
export function LanguageSwitcher() {
    const [lang, setLangState] = useState("es");
    useEffect(() => {
        try {
            const saved = localStorage.getItem("viajero_lang");
            if (saved && langs.includes(saved))
                setLangState(saved);
        }
        catch { }
    }, []);
    const switchLang = (l) => {
        setLangState(l);
        localStorage.setItem("viajero_lang", l);
        // Reload content by re-rendering (simple approach: reload)
        const url = new URL(window.location.href);
        url.searchParams.set("lang", l);
        window.location.href = url.toString();
    };
    return (_jsx("div", { className: "flex items-center gap-1", children: langs.map((l) => (_jsx("button", { onClick: () => switchLang(l), className: `flex h-6 w-7 items-center justify-center rounded text-[10px] font-bold transition-all ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: labels[l] }, l))) }));
}
//# sourceMappingURL=language-switcher.js.map