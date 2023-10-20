import { FC } from "react";

export type TIconButtonProps = {
  children?: React.ReactNode;
  className: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  title?: string;
  type: "button" | "submit" | "reset" | undefined;
};

const IconButton: FC<TIconButtonProps> = (props) => {
  const {
    title,
    className,
    onClick,
    leftIcon,
    rightIcon,
    type,
    disabled,
    children,
  } = props;
  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {leftIcon ? leftIcon : null}
      {title || children}
      {rightIcon ? rightIcon : null}
    </button>
  );
};

export default IconButton;
