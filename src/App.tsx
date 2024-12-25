import { useState } from "react";
import { Outlet } from "react-router-dom";

import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import ForumSection from "./sections/forum-section";

function App() {
  const [jwtToken, setJwtToken] = useState<string>("");
  return (
    <div className="container">
      <TopBar />
      <FilterSection />
      <ForumSection />
      <Outlet context={{ jwtToken, setJwtToken }} />
    </div>
  );
}

export default App;
