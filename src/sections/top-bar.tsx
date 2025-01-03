import AuthenticationButton from "../components/authentication/authentication-buttons";
import CreatePostButton from "../components/forum/create-post-button";
import { PiLockKeyOpen } from "react-icons/pi";
import { PiPencilSimpleDuotone } from "react-icons/pi";
import { SlLogout } from "react-icons/sl";

import { useAuth } from "../infrastructure/authentication-context";

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

const LogoutButton = () => {
  return (
    <div>
      <AuthenticationButton
        text="Logout"
        icon={SlLogout}
        backgroundColor="#DC143C"
        type="reset"
      />
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
  const { jwtToken } = useAuth();
  return (
    <div className="mt-5">
      <div className="d-flex">
        <div className="align-items-center justify-content-center text-center w-100">
          <Title />
          {/* <Description /> */}
        </div>
        <div className="position-absolute end-0 me-5 top-0 mt-4">
          <div className="d-flex gap-2">
            {!jwtToken ? (
              <>
                <LoginButton />
                <RegisterButton />
              </>
            ) : (
              <>
                <CreatePostButton />
                <LogoutButton />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
