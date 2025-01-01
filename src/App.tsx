import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import ForumSection from "./sections/forum-section";

import { AuthProvider } from "./infrastructure/authentication-context";
import SideBar from "./sections/side-bar";

// function App() {
//   return (
//     <AuthProvider>
//       <div className="flex flex-row h-screen">
//         <div className="flex-none">
//           <SideBar />
//         </div>
//         <div className="flex-1 overflow-auto">
//           <TopBar />
//           <FilterSection />
//           <ForumSection />
//         </div>
//       </div>
//     </AuthProvider>
//   );
// }

function App() {
  return (
    <AuthProvider>
      <div className="container-fluid">
        <div className="row vh-100">
          {/* Left sidebar - 25% */}
          <div className="col" style={{ width: "25%" }}>
            <SideBar />
          </div>

          {/* Main content - 50% */}
          <div className="col" style={{ width: "50%" }}>
            <TopBar />
            <FilterSection />
            <ForumSection />
          </div>

          {/* Right sidebar - 25% */}
          <div className="col" style={{ width: "25%" }}>
            <SideBar />{" "}
            {/* You might want to create a different component for right sidebar */}
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
