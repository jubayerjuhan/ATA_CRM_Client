import React from "react";
import { Box, Text, Loader } from "@mantine/core";
import "./LoadingSpinner.scss";

interface LoadingSpinnerProps {
  message?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  size = "lg",
  fullScreen = false,
}) => {
  const containerStyle = fullScreen
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }
    : {
        width: "100%",
        minHeight: "200px",
      };

  return (
    <Box
      sx={containerStyle}
      className="loading-spinner-container"
    >
      <div className="spinner-content">
        <div className="spinner-wrapper">
          <div className="custom-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-ring"></div>
            <div className="spinner-logo">
              <div className="logo-icon">✈️</div>
            </div>
          </div>
        </div>
        <Text
          size={size === "xs" ? "sm" : size === "sm" ? "md" : "lg"}
          color="#F16861"
          weight={500}
          className="loading-text"
        >
          {message}
        </Text>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </Box>
  );
};

export default LoadingSpinner;