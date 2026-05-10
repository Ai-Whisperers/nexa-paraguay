'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export function FeedbackSection({ data, locale }) {
    const d = data || {};
    const lang = locale || 'es';
    const tr = (key) => {
        const texts = {
            es: { eyebrow: 'TU OPINIÓN', title: 'Compartí tu experiencia', namePlaceholder: 'Tu nombre (opcional)', messagePlaceholder: 'Escribí tu comentario o pregunta...', button: 'Enviar', thanks: '¡Gracias por tu mensaje!', recent: 'Comentarios recientes' },
            en: { eyebrow: 'YOUR FEEDBACK', title: 'Share your experience', namePlaceholder: 'Your name (optional)', messagePlaceholder: 'Write your comment or question...', button: 'Submit', thanks: 'Thanks for your message!', recent: 'Recent comments' },
            nl: { eyebrow: 'UW FEEDBACK', title: 'Deel uw ervaring', namePlaceholder: 'Uw naam (optioneel)', messagePlaceholder: 'Schrijf uw opmerking of vraag...', button: 'Verzenden', thanks: 'Bedankt voor uw bericht!', recent: 'Recente reacties' },
            de: { eyebrow: 'IHR FEEDBACK', title: 'Teilen Sie Ihre Erfahrung', namePlaceholder: 'Ihr Name (optional)', messagePlaceholder: 'Schreiben Sie Ihren Kommentar oder Ihre Frage...', button: 'Senden', thanks: 'Danke für Ihre Nachricht!', recent: 'Aktuelle Kommentare' },
        };
        return (d[key] || texts[lang]?.[key] || texts.es[key] || '');
    };
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim())
            return;
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, message, locale: lang, source: 'feedback-section' }),
            });
            setSent(true);
        }
        catch {
            setSent(true);
        }
    };
    if (sent)
        return (_jsx("section", { className: "py-20 text-center", children: _jsxs("div", { className: "max-w-[500px] mx-auto px-4", children: [_jsx("div", { className: "text-4xl mb-4", children: "\u2713" }), _jsx("p", { className: "text-lg font-bold text-primary mb-2", children: tr('thanks') })] }) }));
    return (_jsx("section", { className: "py-20 bg-surface-alt", children: _jsxs("div", { className: "max-w-[600px] mx-auto px-4", children: [_jsx("p", { className: "text-xs text-text-muted uppercase tracking-[2px] mb-2 text-center", children: tr('eyebrow') }), _jsx("h2", { className: "text-2xl font-bold text-primary mb-8 text-center", children: tr('title') }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "text", placeholder: tr('namePlaceholder'), value: name, onChange: e => setName(e.target.value), className: "w-full p-4 border border-border rounded-lg text-sm outline-none bg-white" }), _jsx("textarea", { placeholder: tr('messagePlaceholder'), value: message, onChange: e => setMessage(e.target.value), rows: 4, required: true, className: "w-full p-4 border border-border rounded-lg text-sm outline-none bg-white resize-none" }), _jsx("button", { type: "submit", className: "w-full py-3 bg-accent text-primary rounded-full font-bold text-sm cursor-pointer hover:opacity-90 disabled:opacity-50", disabled: !message.trim(), children: tr('button') })] })] }) }));
}
//# sourceMappingURL=feedback.js.map