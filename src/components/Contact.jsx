"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Mail, MapPin, Phone, CheckCircle2, AlertTriangle, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "use-intl";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function ContactSection() {
    const t = useTranslations("ContactSection");
    const items = t.raw("itemsContact");
    const services = t.raw("services");

    const ICONS = { phone: Phone, mail: Mail, "map-pin": MapPin };

    const containerRef = useRef(null);
    const FlashingCircleRef = useRef(null);
    const titleSectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const formRef = useRef(null);
    const inputCol_1Ref = useRef(null);
    const inputCol_2Ref = useRef(null);
    const inputCol_3Ref = useRef(null);
    const inputCol_4Ref = useRef(null);
    const inputCol_5Ref = useRef(null);
    const inputCol_6Ref = useRef(null);
    const contactRef = useRef([]);

    // ✅ Modern form state
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null); // { type: "success" | "error", message: string }
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submittedOnce, setSubmittedOnce] = useState(false); // to enable realtime validation after first submit

    // ✅ Optional: auto hide success alert
    useEffect(() => {
        if (alert?.type !== "success") return;
        const id = setTimeout(() => setAlert(null), 3500);
        return () => clearTimeout(id);
    }, [alert]);

    const getValuesFromForm = (form) => {
        const fd = new FormData(form);
        return {
            name: String(fd.get("name") || ""),
            phone: String(fd.get("phone") || ""),
            email: String(fd.get("email") || ""),
            service: String(fd.get("service") || ""),
            details: String(fd.get("details") || ""),
        };
    };

    const msg = useMemo(() => {
        return {
            // validation
            required: t("validation.required"),
            invalidEmail: t("validation.invalidEmail"),
            invalidPhone: t("validation.invalidPhone"),

            // alerts
            fixErrors: t("alerts.fixErrors"),
            sentOk: t("alerts.sentOk"),
            sendFail: t("alerts.sendFail"),
            attention: t("alerts.attention"),
            success: t("alerts.success"),
            sending: t("alerts.sending"),
        };
    }, [t]);

    const validate = (values) => {
        const e = {};

        if (!values.name.trim()) e.name = `${t("name")} ${msg.required}`;
        if (!values.phone.trim()) e.phone = `${t("phone")} ${msg.required}`;
        if (!values.email.trim()) e.email = `${t("email")} ${msg.required}`;
        if (!values.service.trim()) e.service = `${t("RequiredService")} ${msg.required}`;
        if (!values.details.trim()) e.details = `${t("CaseDetails")} ${msg.required}`;

        if (values.email.trim()) {
            const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim());
            if (!ok) e.email = msg.invalidEmail;
        }

        if (values.phone.trim()) {
            const ok = /^[0-9+\-\s()]{7,20}$/.test(values.phone.trim());
            if (!ok) e.phone = msg.invalidPhone;
        }

        return e;
    };

    const setFieldTouched = (name) => setTouched((prev) => ({ ...prev, [name]: true }));

    const focusFirstError = (eObj) => {
        const order = ["name", "phone", "email", "service", "details"];
        const first = order.find((k) => eObj[k]);
        if (!first) return;

        const el = formRef.current?.querySelector(`[name="${first}"]`);
        el?.focus();
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const recomputeErrors = () => {
        const form = formRef.current;
        if (!form) return;
        const values = getValuesFromForm(form);
        setErrors(validate(values));
    };

    const onBlurField = (name) => {
        setFieldTouched(name);
        recomputeErrors();
    };

    // ✅ After first submit, validate on change (modern UX)
    const onChangeIfSubmitted = () => {
        if (!submittedOnce) return;
        recomputeErrors();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        if (loading) return;

        setAlert(null);
        setSubmittedOnce(true);

        const form = e.currentTarget;
        const values = getValuesFromForm(form);
        const eObj = validate(values);

        setErrors(eObj);
        setTouched({ name: true, phone: true, email: true, service: true, details: true });

        if (Object.keys(eObj).length > 0) {
            setAlert({ type: "error", message: msg.fixErrors });
            focusFirstError(eObj);
            return;
        }

        const payload = {
            ...values,
            locale: document?.documentElement?.lang || "ar",
            page: window?.location?.href || "",
        };

        try {
            setLoading(true);

            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const json = await res.json().catch(() => ({}));
            if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");

            setAlert({ type: "success", message: msg.sentOk });
            setErrors({});
            setTouched({});
            setSubmittedOnce(false);
            form.reset();
        } catch (err) {
            console.error(err);
            setAlert({ type: "error", message: msg.sendFail });
        } finally {
            setLoading(false);
        }
    }

    const fieldHasError = (name) => !!errors[name] && !!touched[name];

    const inputClass = (name) =>
        [
            "mt-2 bg-neutral-100 px-3 py-2 w-full rounded-md input outline-none focus:ring-2 transition",
            fieldHasError(name) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-[#F9BB00]",
        ].join(" ");

    const selectClass = (name) =>
        [
            "mt-2 bg-neutral-100 px-3 py-0.5 w-full rounded-md input outline-none focus:ring-2 transition",
            fieldHasError(name) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-[#F9BB00]",
        ].join(" ");

    const textareaClass = (name) =>
        [
            "mt-2 w-full min-h-37.5 sm:min-h-45 rounded-md px-4 py-3 bg-neutral-100 input outline-none focus:ring-2 transition",
            fieldHasError(name) ? "ring-2 ring-red-500 focus:ring-red-500" : "focus:ring-[#F9BB00]",
        ].join(" ");

    // GSAP (كما هو)
    useGSAP(() => {
        gsap.fromTo(
            FlashingCircleRef.current,
            { scale: 1, opacity: 0.5 },
            { scale: 1.5, opacity: 1, repeat: -1, duration: 0.6, ease: "sine.inOut", yoyo: true }
        );

        const mm = gsap.matchMedia();
        mm.add({ isMobile: "(max-width: 640px)", isDesktop: "(min-width: 641px)" }, (context) => {
            const { isMobile, isDesktop } = context.conditions;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: isDesktop ? "top 70%" : "top 10%",
                    toggleActions: "play none none none",
                },
            });

            const titleSplit = new SplitText(titleRef.current, { type: "words", mask: "words" });
            const textSplit = new SplitText(textRef.current, { type: "words", mask: "words" });

            tl.from(titleSectionRef.current, { width: 0, opacity: 0, duration: 0.8, ease: "power3.out" })
                .from(titleSplit.words, { y: 50, opacity: 0, ease: "power2.out", duration: 0.9, stagger: 0.06 }, "<30%")
                .from(formRef.current, { opacity: 0, duration: 0.5, ease: "power2.out" }, "<30%");

            const targets = [
                inputCol_1Ref.current,
                inputCol_2Ref.current,
                inputCol_3Ref.current,
                inputCol_4Ref.current,
                inputCol_5Ref.current,
                inputCol_6Ref.current,
            ];

            if (isDesktop) {
                tl.from(targets, { y: 50, opacity: 0, ease: "power2.out", duration: 0.9, stagger: 0.06 }, "<");
            } else if (isMobile) {
                gsap.from(targets, {
                    y: 50,
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.9,
                    stagger: 0.06,
                    scrollTrigger: { trigger: formRef.current, start: "top 10%" },
                });
            }

            tl.from(textSplit.words, { y: 50, opacity: 0, ease: "power2.out", duration: 0.5, stagger: 0.06 }, "<").from(
                contactRef.current,
                { xPercent: 50, opacity: 0, ease: "power2.out", duration: 0.5, stagger: 0.06 }
            );
        });
    });

    return (
        <section id="contact" ref={containerRef} className="w-full relative py-35 px-10 md:px-20 overflow-hidden">
            <div>
                <div className="flex flex-col md:flex-row justify-center lg:justify-between gap-10">
                    <div className="w-full max-w-xl flex flex-col gap-5">
                        <div
                            ref={titleSectionRef}
                            className="inline-flex items-center gap-2 text-white bg-[#404250] rounded-xl select-none px-4 py-2 self-start whitespace-nowrap overflow-hidden"
                        >
                            <div ref={FlashingCircleRef} className="w-2 h-2 bg-[#f9bb00] rounded-full" />
                            <h1 className="font-bold">{t("titleSection")}</h1>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h1 ref={titleRef} className="text-2xl sm:text-2xl md:text-4xl lg:text-6xl font-bold leading-relaxed capitalize">
                                {t("title")}
                            </h1>
                            <p ref={textRef} className="text-2xs md:text-2xl text-neutral-600 leading-relaxed capitalize">
                                {t("text")}
                            </p>
                        </div>

                        {items.map((item, i) => {
                            const Icon = ICONS[item.icon];
                            return (
                                <Link
                                    href={item.href}
                                    target="_blank"
                                    ref={(el) => (contactRef.current[i] = el)}
                                    key={i}
                                    className="flex gap-2 items-center"
                                >
                                    {Icon && <Icon className="px-2 py-2 w-10 md:w-12 h-10 md:h-12 text-[#f9bb00]" />}
                                    <div>
                                        <p className="text-xs md:text-base font-bold">{item.title}</p>
                                        <p className="text-xs md:text-base">{item.info}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-6 border px-10 py-15 rounded-xl w-full max-w-xl">
                        {/* Alert */}
                        {alert && (
                            <div
                                className={[
                                    "mb-6 rounded-xl px-4 py-3 flex items-start gap-3 border relative",
                                    alert.type === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200",
                                ].join(" ")}
                                role="status"
                                aria-live="polite"
                            >
                                {alert.type === "success" ? <CheckCircle2 className="mt-0.5 w-5 h-5" /> : <AlertTriangle className="mt-0.5 w-5 h-5" />}
                                <div className="text-sm">
                                    <p className="font-bold">{alert.type === "success" ? msg.success : msg.attention}</p>
                                    <p className="text-neutral-700">{alert.message}</p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setAlert(null)}
                                    className="absolute top-2 end-2 p-1 rounded-md hover:bg-black/5"
                                    aria-label="Close"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div ref={inputCol_1Ref}>
                                <label htmlFor="name" className="label">
                                    {t("name")}
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onBlur={() => onBlurField("name")}
                                    onChange={onChangeIfSubmitted}
                                    className={inputClass("name")}
                                    aria-invalid={fieldHasError("name")}
                                />
                                {fieldHasError("name") && <p className="mt-2 text-xs text-red-600">{errors.name}</p>}
                            </div>

                            <div ref={inputCol_2Ref}>
                                <label htmlFor="phoneNumber" className="label">
                                    {t("phone")}
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phone"
                                    inputMode="tel"
                                    onBlur={() => onBlurField("phone")}
                                    onChange={onChangeIfSubmitted}
                                    className={inputClass("phone")}
                                    aria-invalid={fieldHasError("phone")}
                                />
                                {fieldHasError("phone") && <p className="mt-2 text-xs text-red-600">{errors.phone}</p>}
                            </div>

                            <div ref={inputCol_3Ref}>
                                <label htmlFor="email" className="label">
                                    {t("email")}
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    onBlur={() => onBlurField("email")}
                                    onChange={onChangeIfSubmitted}
                                    className={inputClass("email")}
                                    aria-invalid={fieldHasError("email")}
                                />
                                {fieldHasError("email") && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                            </div>

                            <div ref={inputCol_4Ref}>
                                <label htmlFor="service" className="label">
                                    {t("RequiredService")}
                                </label>
                                <select
                                    id="service"
                                    name="service"
                                    onBlur={() => onBlurField("service")}
                                    onChange={onChangeIfSubmitted}
                                    className={selectClass("service")}
                                    aria-invalid={fieldHasError("service")}
                                >
                                    <option value="">{t("typeOfService")}</option>
                                    {services.map((s) => (
                                        <option key={s.id} value={s.title} className="capitalize">
                                            {s.title}
                                        </option>
                                    ))}
                                </select>
                                {fieldHasError("service") && <p className="mt-2 text-xs text-red-600">{errors.service}</p>}
                            </div>
                        </div>

                        <div ref={inputCol_5Ref} className="mt-4">
                            <label htmlFor="details" className="label">
                                {t("CaseDetails")}
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                placeholder={t("placeholder")}
                                onBlur={() => onBlurField("details")}
                                onChange={onChangeIfSubmitted}
                                className={textareaClass("details")}
                                aria-invalid={fieldHasError("details")}
                            />
                            {fieldHasError("details") && <p className="mt-2 text-xs text-red-600">{errors.details}</p>}
                        </div>

                        <div ref={inputCol_6Ref} className="mt-5">
                            <button
                                type="submit"
                                disabled={loading}
                                className="font-bold w-full px-4 py-3 rounded-md cursor-pointer bg-[#F9BB00] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="w-5 h-5 animate-spin" />}
                                {loading ? msg.sending : t("submit")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
