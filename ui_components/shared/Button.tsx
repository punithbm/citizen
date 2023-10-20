import { FC, MouseEvent } from "react";

export interface IButtonProps {
  label?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  leftIcon?: string;
  rightIcon?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void;
  variant: "primary" | "secondary" | "ghost";
}

const Button: FC<IButtonProps> = ({
  label,
  disabled,
  children,
  className,
  type,
  onClick,
  leftIcon,
  rightIcon,
  variant,
  ...props
}: IButtonProps) => {
  return (
    <button
      type={type}
      className={`relative flex items-center justify-center p-4 gap-2 rounded-2xl transition-all duration-100 ease-in-out ${
        variant === "primary"
          ? "bg-white text-secondary-100 font-bold text-sm"
          : ""
      } ${
        variant === "ghost"
          ? "bg-transparent text-text-900 font-semibold text-base border border-purple"
          : ""
      } ${className ? className : ""}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {leftIcon ? <img src={leftIcon} alt="icon" /> : null}
      {label ?? children ?? null}
      {rightIcon ? <img src={rightIcon} alt="icon" /> : null}
    </button>
  );
};

export default Button;
