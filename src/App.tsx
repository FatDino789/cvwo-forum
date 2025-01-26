import { FC } from "react";
import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import ForumSection from "./sections/forum-section";

import { TagProvider } from "./infrastructure/tag-context";
import { AuthProvider } from "./infrastructure/authentication-context";
import { FilterProvider } from "./infrastructure/filter-context";
import LeftSideBar from "./sections/left-side-bar";

const App: FC = () => {
  return (
    <AuthProvider>
      <FilterProvider>
        <TagProvider>
          <AppContent />
        </TagProvider>
      </FilterProvider>
    </AuthProvider>
  );
};

const AppContent: FC = () => {
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
        ></div>
      </div>
    </div>
  );
};

export default App;
