import FilterStrip from "../components/filter-options";
import SearchBar from "../components/search-bar";

const FilterSection = () => {
  return (
    <div className="mt-3">
      <div className="align-items items-center justify-content-center text-center w-100">
        <SearchBar />
        <FilterStrip />
      </div>
    </div>
  );
};

export default FilterSection;
