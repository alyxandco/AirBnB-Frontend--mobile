import { useState } from "react";

export const PasswordVisible = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [eyeIcon, setEyeIcon] = useState("eye");

  const handlePasswordVisibility = () => {
    if (eyeIcon === "eye") {
      setEyeIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (eyeIcon === "eye-off") {
      setEyeIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    eyeIcon,
    handlePasswordVisibility,
  };
};
