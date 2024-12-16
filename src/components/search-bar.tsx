import { useState } from "react";
import { TagProps, SearchTag } from "./search-tag";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const searchTags: TagProps[] = [
    { id: 1, text: "Europe" },
    { id: 2, text: "Summer Exchange" },
  ];

  const filteredTags = searchTags.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="position-relative">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="🔍 Search Keywords or Tags"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
              />
            </div>

            {showDropdown && searchTerm && (
              <div className="d-flex flex-wrap gap-2 dropdown-menu show w-100 position-absolute px-2">
                {filteredTags.length > 0 ? (
                  filteredTags.map((tag) => (
                    <div>
                      <SearchTag id={tag.id} text={tag.text} />
                    </div>
                  ))
                ) : (
                  <div className="dropdown-item">No Tags Found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
