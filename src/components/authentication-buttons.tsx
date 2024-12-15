import { IconType } from "react-icons";

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
  return (
    <button
      type={type}
      className={`btn btn-primary px-1 py-2 fw-semibold rounded shadow d-inline-flex align-items-center justify-content-center ${className}`}
      style={{ width: "125px" }}
    >
      {Icon && <Icon className="me-2" size={20} />}
      {text}
    </button>
  );
};

export default AuthenticationButton;
