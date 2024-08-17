import React from "react";
import "./CustomButton.scss";

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  children,
  primary,
  secondary,
  danger,
  ...props
}) => {
  let className = "app-custom-button";

  if (primary) {
    className += " primary";
  } else if (secondary) {
    className += " secondary";
  } else if (danger) {
    className += " danger";
  }

  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};
