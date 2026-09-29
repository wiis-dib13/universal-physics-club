"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SuccessScreen from "./SuccessScreen";

type FormState = {
  fullName: string;
  birthDate: string;
  phone: string;
  email: string;
  motivation: string;
  goals: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const REQUIRED_MSG = "Ce champ est requis.";
const TARGET_EMAIL = "chaimaadali74@gmail.com";

function FocusGlow({ active }: { active: number }) {
  return (
    <AnimatePresence>
      {active > 0 && (
        <motion.span
          key={active}
          initial={{ scaleX: 0, opacity: 0.9 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "center" }}
          className="absolute -bottom-px left-0 h-px w-full bg-[var(--color-electric)] shadow-[0_0_12px_rgba(56,189,248,0.8)]"
        />
      )}
    </AnimatePresence>
  );
}

function FieldShell({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium leading-snug text-white sm:text-base">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-[var(--color-violet)]"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputClass =
  "w-full border-0 border-b border-line bg-transparent py-3 text-base text-white placeholder:text-fog-dim focus:outline-none";

export default function RegisterForm() {
  const [values, setValues] = useState<FormState>({
    fullName: "",
    birthDate: "",
    phone: "",
    email: "",
    motivation: "",
    goals: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusCounter, setFocusCounter] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitFailed, setSubmitFailed] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
  };

  const bumpFocus = (key: string) =>
    setFocusCounter((f) => ({ ...f, [key]: (f[key] ?? 0) + 1 }));

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!values.fullName.trim()) e.fullName = REQUIRED_MSG;
    if (!values.birthDate) e.birthDate = REQUIRED_MSG;
    if (!values.phone.trim()) e.phone = REQUIRED_MSG;
    else if (!/^[+\d][\d\s.-]{7,}$/.test(values.phone.trim()))
      e.phone = "Merci de vérifier cette information.";
    if (!values.email.trim()) e.email = REQUIRED_MSG;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      e.email = "E-mail invalide.";
    if (!values.motivation.trim()) e.motivation = REQUIRED_MSG;
    if (!values.goals.trim()) e.goals = REQUIRED_MSG;
    return e;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setSubmitting(true);
    setSubmitFailed(false);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Nouvelle candidature — Universal Physics Club",
          _template: "table",
          _replyto: values.email,
          "Nom et prénom": values.fullName,
          "Date de naissance": values.birthDate,
          "Numéro de téléphone": values.phone,
          "E-mail": values.email,
          "Pourquoi rejoindre le club": values.motivation,
          "Objectifs et nouveautés souhaitées": values.goals,
        }),
      });
      if (!res.ok) throw new Error("submission failed");
      setSubmitted(true);
    } catch {
      setSubmitFailed(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="rejoindre-form" className="relative w-full bg-void">
        <SuccessScreen />
      </section>
    );
  }

  return (
    <section
      id="rejoindre-form"
      className="relative w-full overflow-hidden bg-void py-28 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
        <Image
          src="/assets/physics-diagram.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto max-w-xl px-6 md:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
            REJOINDRE LE CLUB
          </h2>
          <p className="mt-4 text-sm text-white/70 sm:text-base">
            Quelques informations pour mieux te connaître.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-9"
        >
          <FieldShell label="Nom et prénom *" error={errors.fullName}>
            <div className="relative">
              <input
                className={inputClass}
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                onFocus={() => bumpFocus("fullName")}
                type="text"
                autoComplete="name"
              />
              <FocusGlow active={focusCounter.fullName ?? 0} />
            </div>
          </FieldShell>

          <FieldShell label="Date de naissance *" error={errors.birthDate}>
            <div className="relative">
              <input
                className={`${inputClass} [color-scheme:dark]`}
                value={values.birthDate}
                onChange={(e) => set("birthDate", e.target.value)}
                onFocus={() => bumpFocus("birthDate")}
                type="date"
              />
              <FocusGlow active={focusCounter.birthDate ?? 0} />
            </div>
          </FieldShell>

          <FieldShell label="Numéro de téléphone *" error={errors.phone}>
            <div className="relative">
              <input
                className={inputClass}
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                onFocus={() => bumpFocus("phone")}
                type="tel"
                autoComplete="tel"
              />
              <FocusGlow active={focusCounter.phone ?? 0} />
            </div>
          </FieldShell>

          <FieldShell label="E-mail *" error={errors.email}>
            <div className="relative">
              <input
                className={inputClass}
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                onFocus={() => bumpFocus("email")}
                type="email"
                autoComplete="email"
              />
              <FocusGlow active={focusCounter.email ?? 0} />
            </div>
          </FieldShell>

          <FieldShell
            label="Pourquoi souhaitez-vous rejoindre le club ? *"
            error={errors.motivation}
          >
            <div className="relative">
              <textarea
                className={`${inputClass} min-h-24 resize-none`}
                value={values.motivation}
                onChange={(e) => set("motivation", e.target.value)}
                onFocus={() => bumpFocus("motivation")}
              />
              <FocusGlow active={focusCounter.motivation ?? 0} />
            </div>
          </FieldShell>

          <FieldShell
            label="Quels sont vos objectifs et quelle nouveauté souhaiteriez-vous voir au sein du club cette année ? *"
            error={errors.goals}
          >
            <div className="relative">
              <textarea
                className={`${inputClass} min-h-24 resize-none`}
                value={values.goals}
                onChange={(e) => set("goals", e.target.value)}
                onFocus={() => bumpFocus("goals")}
              />
              <FocusGlow active={focusCounter.goals ?? 0} />
            </div>
          </FieldShell>

          <AnimatePresence>
            {submitFailed && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-xs text-[var(--color-violet)]"
              >
                Une erreur est survenue. Merci de réessayer.
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={submitting}
            data-cursor="link"
            className="group relative mt-6 overflow-hidden rounded-full border border-line-strong px-9 py-4 disabled:opacity-60"
          >
            <span className="absolute inset-0 -translate-x-full bg-[var(--color-electric)] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="mono-label relative z-10 text-[11px] text-white transition-colors duration-500 group-hover:text-void">
              {submitting ? "ENVOI EN COURS..." : "ENTRER DANS L'UNIVERS"}
            </span>
          </button>
        </motion.form>
      </div>
    </section>
  );
}
