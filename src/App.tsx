import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import ForumSection from "./sections/forum-section";

function App() {
  return (
    <div className="container">
      <TopBar />
      <FilterSection />
      <ForumSection />
    </div>
  );
}

export default App;
