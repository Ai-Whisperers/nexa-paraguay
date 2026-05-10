'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export function IntakeWizardSection({ pageContent, data }) {
    const d = data || pageContent || {};
    const steps = d.steps || [];
    const [currentStep, setCurrentStep] = React.useState(0);
    const [answers, setAnswers] = React.useState({});
    const [showResult, setShowResult] = React.useState(false);
    if (!steps.length)
        return null;
    const handleSelect = (value) => {
        const newAnswers = { ...answers, [steps[currentStep].key]: value };
        setAnswers(newAnswers);
        if (currentStep < steps.length - 1)
            setCurrentStep(currentStep + 1);
        else
            setShowResult(true);
    };
    const handleRestart = () => { setCurrentStep(0); setAnswers({}); setShowResult(false); };
    if (showResult) {
        const recommended = d.recommendedTier || 'business';
        return (_jsx("section", { className: "py-24 bg-surface-alt", children: _jsxs("div", { className: "max-w-[600px] mx-auto text-center px-4", children: [_jsx("h2", { className: "text-[clamp(1.4rem,2.5vw,2rem)] font-bold text-primary mb-4", children: d.resultTitle || 'Tu recomendación' }), _jsx("p", { className: "text-lg font-bold text-primary", children: recommended }), _jsx("p", { className: "text-text-muted text-sm mt-4 mb-6", children: d.resultDescription || 'Basado en tus respuestas' }), (d.ctaText || d.recommendedCta) && _jsx("a", { href: d.ctaHref || `/${d.locale || 'nl'}/contacto`, className: "inline-block px-8 py-3 bg-accent text-primary rounded-full font-bold text-base no-underline", children: d.ctaText || d.recommendedCta }), _jsx("p", { children: _jsx("button", { onClick: handleRestart, className: "mt-6 bg-none border-none text-accent cursor-pointer font-bold underline text-sm", children: d.restartLabel || 'Reiniciar' }) })] }) }));
    }
    return (_jsx("section", { className: "py-24 bg-surface-alt", children: _jsxs("div", { className: "max-w-[600px] mx-auto text-center px-4", children: [_jsx("div", { className: "flex justify-center gap-2 mb-8", children: steps.map((_, i) => (_jsx("div", { className: `w-3 h-3 rounded-full transition-colors ${i <= currentStep ? 'bg-accent' : 'bg-border'}` }, i))) }), _jsx("p", { className: "text-sm text-text-muted mb-6", children: d.subtitle }), _jsx("h3", { className: "text-xl font-bold text-primary mb-6", children: steps[currentStep].question }), _jsx("div", { className: "flex flex-col gap-3", children: (steps[currentStep].options || []).map((opt, i) => (_jsx("button", { onClick: () => handleSelect(opt), className: "w-full p-4 bg-white rounded-lg border border-border cursor-pointer font-semibold text-primary text-sm hover:border-accent transition-colors", children: opt }, i))) }), _jsx("p", { className: "mt-4 text-xs text-text-muted italic", children: d.disclaimer || '' })] }) }));
}
//# sourceMappingURL=specialists.js.map