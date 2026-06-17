import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { toast } from "sonner";
import { registerSchema } from "../../utils/validation.js";
import { usePasswordToggle } from "../../hooks/usePasswordToggle.js";
import { SocialButtons, SubmitButton } from "./SocialButtons.jsx";
import { PasswordStrength } from "./PasswordStrength.jsx";
import { cn } from "../../lib/utils.js";

const fieldVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: 12, transition: { duration: 0.2 } },
};

const Field = ({ label, error, index, children }) => (
  <motion.div
    custom={index}
    variants={fieldVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="flex flex-col gap-1.5"
  >
    <label className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{label}</label>
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          className="text-[11px] text-red-400 font-medium mt-0.5"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const inputClass = (hasError) =>
  cn(
    "w-full bg-white/[0.04] border rounded-xl pl-11 pr-4 py-3 outline-none text-sm text-white placeholder:text-white/20",
    "transition-all duration-300 focus:bg-white/[0.06]",
    hasError
      ? "border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/10"
      : "border-white/[0.08] focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
  );

export const RegisterForm = ({ onSwitch }) => {
  const { isVisible, toggleVisibility, inputType } = usePasswordToggle();
  const [passwordValue, setPasswordValue] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const pwd = watch("password", "");

  const onSubmit = async (_data) => {
    await new Promise((r) => setTimeout(r, 1800));
    toast.success("Account created!", {
      description: "Welcome to Churnly Analytics. Let's reduce churn.",
    });
  };

  return (
    <div className="flex flex-col gap-0">
      <SocialButtons mode="register" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3.5">
        {/* Full Name */}
        <Field label="Full Name" error={errors.fullName?.message} index={0}>
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-violet-400 transition-colors duration-300" />
            <input
              {...register("fullName")}
              type="text"
              placeholder="Alex Johnson"
              className={inputClass(!!errors.fullName)}
            />
          </div>
        </Field>

        {/* Email */}
        <Field label="Work Email" error={errors.email?.message} index={1}>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-violet-400 transition-colors duration-300" />
            <input
              {...register("email")}
              type="email"
              placeholder="alex@company.com"
              className={inputClass(!!errors.email)}
            />
          </div>
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password?.message} index={2}>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-violet-400 transition-colors duration-300" />
            <input
              {...register("password", {
                onChange: (e) => setPasswordValue(e.target.value),
              })}
              type={inputType}
              placeholder="Create a strong password"
              className={cn(inputClass(!!errors.password), "pr-12")}
            />
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
            >
              {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <AnimatePresence>
            {pwd && <PasswordStrength password={pwd} />}
          </AnimatePresence>
        </Field>

        {/* Confirm Password */}
        <Field label="Confirm Password" error={errors.confirmPassword?.message} index={3}>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-violet-400 transition-colors duration-300" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm your password"
              className={inputClass(!!errors.confirmPassword)}
            />
          </div>
        </Field>

        {/* Accept Terms */}
        <motion.div
          custom={4}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col gap-1"
        >
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <div className="relative mt-0.5">
              <input
                {...register("acceptTerms")}
                id="acceptTerms"
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-4 h-4 rounded-[4px] border border-white/15 bg-white/5 peer-checked:bg-violet-500 peer-checked:border-violet-500 transition-all duration-200 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="text-[11px] text-white/40 font-medium leading-relaxed group-hover:text-white/55 transition-colors">
              I agree to the{" "}
              <a href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 decoration-violet-400/40">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-violet-400 hover:text-violet-300 underline underline-offset-2 decoration-violet-400/40">
                Privacy Policy
              </a>
            </span>
          </label>
          <AnimatePresence>
            {errors.acceptTerms && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-[11px] text-red-400 font-medium"
              >
                {errors.acceptTerms.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <SubmitButton isSubmitting={isSubmitting} label="Create Account" />
      </form>

      {/* Switch to Login */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-5 text-xs text-white/35"
      >
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-white font-semibold hover:text-violet-400 transition-colors relative group ml-0.5"
        >
          Sign In
          <span className="absolute -bottom-px left-0 w-0 h-px bg-violet-400 transition-all duration-300 group-hover:w-full" />
        </button>
      </motion.p>
    </div>
  );
};
