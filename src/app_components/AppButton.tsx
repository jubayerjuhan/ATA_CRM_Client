import React from "react";
import "./CustomButton.scss";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  className?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  primary,
  secondary,
  danger,
  className,
  ...props
}) => {
  let classNameComponent = `${className} app-custom-button`;

  if (primary) {
    classNameComponent += " primary";
  } else if (secondary) {
    classNameComponent += " secondary";
  } else if (danger) {
    classNameComponent += " danger";
  }

  return (
    <button className={classNameComponent} {...props}>
      {children}
    </button>
  );
};
