import { useState } from "react";

import { IconType } from "react-icons";

import { useAuth } from "../../infrastructure/authentication-context";

import AuthenticationForm from "./authentication-forms";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: IconType;
  backgroundColor?: string;
  textColor?: string;
  hoverColor?: string;
};

const AuthenticationButton = ({
  text,
  type = "button",
  className = "",
  icon: Icon,
  backgroundColor = "#0d6efd",
  textColor = "white",
  hoverColor,
}: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { setJwtToken } = useAuth();

  const buttonStyle = {
    width: "125px",
    backgroundColor: `${backgroundColor}`,
    color: textColor,
    "&:hover": {
      backgroundColor: hoverColor,
    },
  };

  const openForm = () => {
    setIsModalOpen(true);
  };

  const Logout = () => {
    setJwtToken("");
  };

  return (
    <>
      <AuthenticationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={text}
      />
      <button
        type={type}
        className={`btn px-1 py-2 fw-semibold rounded shadow d-inline-flex align-items-center justify-content-center ${className}`}
        style={buttonStyle}
        onClick={type === "button" ? openForm : Logout}
      >
        {Icon && <Icon className="me-2" size={20} />}
        {text}
      </button>
    </>
  );
};

export default AuthenticationButton;
