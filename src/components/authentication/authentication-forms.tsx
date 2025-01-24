import { FC, useState, FormEvent, ChangeEvent } from "react";
import { loginUser } from "../../infrastructure/api";
import { useAuth } from "../../infrastructure/authentication-context";
import { registerUser } from "../../infrastructure/api";
import { v4 } from "uuid";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const AuthenticationForm: FC<AuthModalProps> = ({ isOpen, onClose, title }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");

  const { setJwtToken, setUser } = useAuth();

  const validateForm = (): boolean => {
    if (!email || !password) {
      setError("Please fill in all fields");
      return false;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (title === "Register" && password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const clearForm = (): void => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const newId = v4();
      const result =
        title === "Register"
          ? await registerUser({ id: newId, email, password, username })
          : await loginUser({ email, password });

      if ("status" in result) {
        throw new Error(result.message);
      }

      // Store both token and user data
      setJwtToken(result.token);
      setUser(result.user);

      onClose();
      clearForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ): void => {
    setter(event.target.value);
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
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-out",
        }}
        onClick={(e): void => e.stopPropagation()}
      >
        <div
          className="modal-content text-start"
          style={{ borderRadius: "16px 16px 16px 16px" }}
        >
          <div className="modal-header border-0 justify-content-center">
            <h5 className="modal-title fs-2 fw-bold">{title}</h5>
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              onClick={(): void => {
                onClose();
                clearForm();
              }}
            />
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
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
                  onChange={(e): void => handleInputChange(e, setEmail)}
                  disabled={isLoading}
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
                  onChange={(e): void => handleInputChange(e, setPassword)}
                  disabled={isLoading}
                />
              </div>
              {title === "Register" && (
                <>
                  <div className="mb-3">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label text-muted"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Enter your password"
                      value={confirmPassword}
                      onChange={(e): void =>
                        handleInputChange(e, setConfirmPassword)
                      }
                      disabled={isLoading}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-muted">
                      Username
                    </label>
                    <input
                      type="username"
                      className="form-control"
                      id="username"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e): void => handleInputChange(e, setUsername)}
                      disabled={isLoading}
                    />
                  </div>
                </>
              )}
              <div style={{ height: "75px" }}></div>
              <div className="mt-auto mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : title}
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
