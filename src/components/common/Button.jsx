import React from "react";
import { Loader2 } from "lucide-react";

/**
 * Reusable Button component with Joy Snacky schema integration.
 *
 * @param {string} variant - One of 'primary', 'secondary', 'accent', 'outline', 'ghost', 'danger', 'white'
 * @param {string} size - One of 'sm', 'md', 'lg', 'xl'
 * @param {boolean} isLoading - Shows a spinner while true
 * @param {React.ReactNode} iconLeft - Icon to display on the left
 * @param {React.ReactNode} iconRight - Icon to display on the right
 */
const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  isLoading = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = "",
  fullWidth = false,
  ...props
}) => {
  const variants = {
    primary:
      "bg-joysnacky-primary text-white hover:bg-joysnacky-dark shadow-[0_8px_30px_rgb(128,21,21,0.2)]",
    secondary:
      "bg-joysnacky-brown text-white hover:bg-slate-900 shadow-[0_8px_30px_rgb(74,43,18,0.2)]",
    accent:
      "bg-joysnacky-accent text-white hover:bg-joysnacky-accent-strong shadow-[0_8px_30px_rgb(209,126,40,0.2)]",
    outline:
      "border-2 border-joysnacky-primary bg-transparent text-joysnacky-primary hover:bg-joysnacky-primary hover:text-white",
    ghost:
      "bg-transparent text-joysnacky-primary hover:bg-joysnacky-primary/10",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-[0_8px_30px_rgb(244,63,94,0.2)]",
    white:
      "bg-white text-joysnacky-primary hover:bg-slate-50 shadow-[0_8px_30px_rgba(0,0,0,0.05)]",
    soft: "bg-joysnacky-primary/10 text-joysnacky-primary hover:bg-joysnacky-primary/20",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
    xl: "px-10 py-4 text-lg",
  };

  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-[22px] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 outline-none focus:ring-4 focus:ring-joysnacky-primary/20 cursor-pointer";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 animate-spin h-4 w-4" />
      ) : (
        IconLeft && <IconLeft className={`mr-2 ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
      )}
      <span className="truncate">{children}</span>
      {!isLoading && IconRight && (
        <IconRight className={`ml-2 ${size === "sm" ? "w-3 h-3" : "w-4 h-4"}`} />
      )}
    </button>
  );
};

export default Button;
