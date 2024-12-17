import TopBar from "./sections/top-bar";
import FilterSection from "./sections/filter-section";
import Post from "./components/post";

function App() {
  return (
    <div className="container">
      <TopBar />
      <FilterSection />
      <Post />
    </div>
  );
}

export default App;
