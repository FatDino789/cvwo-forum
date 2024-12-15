import AuthenticationButton from "../components/authentication-buttons";
import { PiLockKeyOpen } from "react-icons/pi";
import { PiPencilSimpleDuotone } from "react-icons/pi";

const LoginButton = () => {
  return (
    <div>
      <AuthenticationButton text="Log in" icon={PiLockKeyOpen} />
    </div>
  );
};

const RegisterButton = () => {
  return (
    <div>
      <AuthenticationButton text="Register" icon={PiPencilSimpleDuotone} />
    </div>
  );
};

const Title = () => {
  return (
    <div>
      <h1>Exchange Forum</h1>
    </div>
  );
};

const TopBar = () => {
  return (
    <div className="mt-3">
      <div className="d-flex align-items-center justify-content-center">
        <Title />
        <div className="position-absolute end-0 me-5">
          <div className="d-flex gap-2">
            <LoginButton />
            <RegisterButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
