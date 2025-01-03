import { FC } from "react";
import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import ForumSection from "./sections/forum-section";

import { AuthProvider } from "./infrastructure/authentication-context";
import LeftSideBar from "./sections/left-side-bar";
import RightSideBar from "./sections/right-side-bar";

import { useAuth } from "./infrastructure/authentication-context";

const App: FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

const AppContent: FC = () => {
  const { jwtToken } = useAuth();

  return (
    <div className="container-fluid">
      <div className="row w-100">
        <div
          className="col d-flex justify-content-center align-items-center"
          style={{ width: "25%" }}
        >
          <LeftSideBar />
        </div>
        <div className="col" style={{ width: "50%" }}>
          <TopBar />
          <FilterSection />
          <ForumSection />
        </div>
        <div
          className="col d-flex justify-content-center align-items-center"
          style={{ width: "25%" }}
        >
          {jwtToken && <RightSideBar />}
        </div>
      </div>
    </div>
  );
};

export default App;
