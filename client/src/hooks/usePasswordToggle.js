import { useState } from "react";

export const usePasswordToggle = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);
  const inputType = isVisible ? "text" : "password";
  return { isVisible, toggleVisibility, inputType };
};

export const usePasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;
  const strength = score === 0 ? "none" : score <= 1 ? "weak" : score <= 2 ? "fair" : score <= 3 ? "good" : "strong";

  const colors = {
    none: "bg-white/10",
    weak: "bg-red-500",
    fair: "bg-yellow-500",
    good: "bg-blue-500",
    strong: "bg-green-500",
  };

  const labels = {
    none: "",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
  };

  return { score, strength, checks, color: colors[strength], label: labels[strength] };
};
