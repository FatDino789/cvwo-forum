import { FC } from "react";
import AuthenticationButton from "../components/authentication/authentication-buttons";
import CreatePostButton from "../components/forum/create-post-button";
import { PiLockKeyOpen, PiPencilSimpleDuotone } from "react-icons/pi";
import { SlLogout } from "react-icons/sl";
import { useAuth } from "../infrastructure/authentication-context";
import { profileIcons, profileColors } from "../assets/profile-pics";

import Animal from "react-animals";

const LoginButton: FC = () => {
  return (
    <div>
      <AuthenticationButton text="Log in" icon={PiLockKeyOpen} />
    </div>
  );
};

const RegisterButton: FC = () => {
  return (
    <div>
      <AuthenticationButton text="Register" icon={PiPencilSimpleDuotone} />
    </div>
  );
};

const LogoutButton: FC = () => {
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

const Title: FC = () => {
  return (
    <div>
      <h1>Exchange Forum</h1>
    </div>
  );
};

const TopBar: FC = () => {
  const { jwtToken, user } = useAuth();

  return (
    <div className="mt-5">
      <div className="d-flex">
        <div className="align-items-center justify-content-center text-center w-100">
          <Title />
        </div>
        <div className="position-absolute end-0 me-5 top-0 mt-4">
          <div className="d-flex gap-2 align-items-center">
            {!jwtToken ? (
              <>
                <LoginButton />
                <RegisterButton />
              </>
            ) : (
              <>
                <CreatePostButton />
                <LogoutButton />
                <div
                  style={{ width: "60px", height: "60px" }}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Animal
                    name={profileIcons[user?.icon_index || 0]}
                    color={profileColors[user?.color_index || 0]}
                    size="60px"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
