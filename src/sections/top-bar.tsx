import AuthenticationButton from "../components/authentication/authentication-buttons";
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

// const Description = () => {
//   return (
//     <div className="w-50 mx-auto">
//       <h2 className="fs-5">
//         Welcome to the Exchange Forum! A place where you can find out more about
//         different exchange destinations and also connect with people heading to
//         the same regions.
//       </h2>
//     </div>
//   );
// };

const TopBar = () => {
  return (
    <div className="mt-3">
      <div className="d-flex">
        <div className="align-items-center justify-content-center text-center w-100">
          <Title />
          {/* <Description /> */}
        </div>
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
