import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, CheckSquare } from "lucide-react";
import { toast } from "sonner";
import { loginSchema } from "../../utils/validation.js";
import { usePasswordToggle } from "../../hooks/usePasswordToggle.js";
import { SocialButtons, SubmitButton } from "./SocialButtons.jsx";
import { cn } from "../../lib/utils.js";

const fieldVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, x: 12, transition: { duration: 0.25 } },
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
      ? "border-red-500/50 focus:border-red-500/70 focus:ring-2 focus:ring-red-500/10 shadow-[0_0_0_1px_rgba(239,68,68,0.2)]"
      : "border-white/[0.08] focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10"
  );

export const LoginForm = ({ onSwitch }) => {
  const { isVisible, toggleVisibility, inputType } = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (_data) => {
    await new Promise((r) => setTimeout(r, 1600));
    toast.success("Signed in successfully!", {
      description: "Welcome back to Churnly Analytics.",
    });
  };

  return (
    <div className="flex flex-col gap-0">
      <SocialButtons mode="login" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Email */}
        <Field label="Email address" error={errors.email?.message} index={0}>
          <div className="relative group">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-blue-400 transition-colors duration-300" />
            <input
              {...register("email")}
              type="email"
              placeholder="name@company.com"
              className={inputClass(!!errors.email)}
            />
          </div>
        </Field>

        {/* Password */}
        <Field label="Password" error={errors.password?.message} index={1}>
          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 group-focus-within:text-blue-400 transition-colors duration-300" />
            <input
              {...register("password")}
              type={inputType}
              placeholder="••••••••"
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
        </Field>

        {/* Remember + Forgot */}
        <motion.div
          custom={2}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex items-center justify-between -mt-1"
        >
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
              <input
                {...register("rememberMe")}
                id="rememberMe"
                type="checkbox"
                className="sr-only peer"
              />
              <div className="w-4 h-4 rounded-[4px] border border-white/15 bg-white/5 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all duration-200 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white hidden peer-checked:block" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <span className="text-xs text-white/45 font-medium group-hover:text-white/60 transition-colors">
              Remember me
            </span>
          </label>
          <a href="#" className="text-[11px] font-semibold text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </motion.div>

        <SubmitButton isSubmitting={isSubmitting} label="Sign In" />
      </form>

      {/* Switch to Register */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-6 text-xs text-white/35"
      >
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-white font-semibold hover:text-blue-400 transition-colors relative group ml-0.5"
        >
          Create Account
          <span className="absolute -bottom-px left-0 w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-full" />
        </button>
      </motion.p>
    </div>
  );
};
