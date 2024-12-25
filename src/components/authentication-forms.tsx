import { useState, FormEvent } from "react";
import { useOutletContext } from "react-router-dom";

import { ContextType } from "../database/authentication-types";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const AuthenticationForm = ({ isOpen, onClose, title }: AuthModalProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { setJwtToken } = useOutletContext<ContextType>();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("email/pass", email, password);

    if (email === "admin@example.com") {
      setJwtToken("abc");
    }
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{
          margin: "0 auto",
          position: "fixed",
          top: 30,
          left: 0,
          right: 0,
          width: "100%",
          height: "400px",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content"
          style={{ borderRadius: "16px 16px 16px 16px", height: "65%" }}
        >
          <div className="modal-header border-0 justify-content-center">
            <h5 className="modal-title fs-2 fw-bold">{title}</h5>
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body d-flex flex-column h-100">
            <form
              className="px-4 h-100 d-flex flex-column"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-muted">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-muted">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </div>
              {title === "Register" && (
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-muted">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value);
                    }}
                  />
                </div>
              )}
              <div className="mt-auto mb-3">
                <button type="submit" className="btn btn-primary w-100 py-2">
                  {title}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
