import React from "react";

const ErrorBanner = ({ message }) => {
  let errorMessage = message || "에러입니다.";
  return <div style={{ background: "red" }}>{errorMessage}</div>;
};

export default ErrorBanner;
