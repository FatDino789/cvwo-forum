import { useState } from "react";

import { IconType } from "react-icons";

import AuthenticationForm from "./authentication-forms";

type ButtonProps = {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: IconType;
};

const AuthenticationButton = ({
  text,
  type = "button",
  className = "",
  icon: Icon,
}: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openAuthenticationForm = () => {
    setIsModalOpen(true);
  };

  const closeAuthenticationForm = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AuthenticationForm
        isOpen={isModalOpen}
        onClose={closeAuthenticationForm}
        title={text}
      />
      <button
        type={type}
        className={`btn btn-primary px-1 py-2 fw-semibold rounded shadow d-inline-flex align-items-center justify-content-center ${className}`}
        style={{ width: "125px" }}
        onClick={openAuthenticationForm}
      >
        {Icon && <Icon className="me-2" size={20} />}
        {text}
      </button>
    </>
  );
};

export default AuthenticationButton;
