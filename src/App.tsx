import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import ForumSection from "./sections/forum-section";

import { AuthProvider } from "./infrastructure/authentication-context";

function App() {
  return (
    <AuthProvider>
      <div className="container">
        <TopBar />
        <FilterSection />
        <ForumSection />
      </div>
    </AuthProvider>
  );
}

export default App;
