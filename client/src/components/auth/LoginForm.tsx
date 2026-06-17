import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { loginSchema, LoginFormValues } from "../../utils/validation";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";
import { cn } from "../../lib/utils";

export const LoginForm = () => {
  const { isVisible, toggleVisibility, inputType } = usePasswordToggle();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log(data);
    toast.success("Authentication successful", {
      description: "Welcome back to Churnly Analytics.",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      {/* Email Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-white/80">Email address</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            {...register("email")}
            type="email"
            placeholder="name@company.com"
            className={cn(
              "w-full bg-white/[0.03] border rounded-xl pl-11 pr-4 py-3 outline-none transition-all duration-300 shadow-sm",
              "text-white placeholder:text-white/20 focus:bg-white/[0.05]",
              errors.email
                ? "border-red-500/50 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
                : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            )}
          />
        </div>
        {errors.email && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1">
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Password Input */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-white/80">Password</label>
          <a href="#" className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors">
            Forgot password?
          </a>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-white/30 group-focus-within:text-blue-400 transition-colors" />
          </div>
          <input
            {...register("password")}
            type={inputType}
            placeholder="••••••••"
            className={cn(
              "w-full bg-white/[0.03] border rounded-xl pl-11 pr-12 py-3 outline-none transition-all duration-300 shadow-sm",
              "text-white placeholder:text-white/20 focus:bg-white/[0.05]",
              errors.password
                ? "border-red-500/50 focus:border-red-500/80 focus:ring-1 focus:ring-red-500/20"
                : "border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            )}
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/30 hover:text-white/60 transition-colors"
          >
            {isVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-400 mt-1">
            {errors.password.message}
          </motion.p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center gap-2 mt-1">
        <input
          {...register("rememberMe")}
          id="rememberMe"
          type="checkbox"
          className="w-4 h-4 rounded-md border-white/10 bg-white/5 text-blue-500 focus:ring-blue-500/20 focus:ring-offset-0"
        />
        <label htmlFor="rememberMe" className="text-sm text-white/60 cursor-pointer select-none">
          Remember me for 30 days
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3.5 rounded-xl mt-4 hover:bg-white/90 active:scale-[0.98] transition-all overflow-hidden group disabled:opacity-70 disabled:pointer-events-none shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
        ) : (
          <>
            Sign In
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
};
