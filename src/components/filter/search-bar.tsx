import { useState } from "react";
import { TagProps, SearchTag } from "./search-tag";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);

  const searchTags: TagProps[] = [
    { id: 1, text: "Europe", isSearched: false },
    { id: 2, text: "Summer Exchange", isSearched: false },
  ];

  const filteredTags = searchTags.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTagClick = (tag: TagProps) => {
    setSelectedTags([...selectedTags, tag]);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const removeTag = (tagId: number) => {
    setSelectedTags(selectedTags.filter((tag) => tag.id !== tagId));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-10 mx-auto"
          style={{ minWidth: "600px", maxWidth: "80%" }}
        >
          <div className="position-relative" style={{ height: "50px" }}>
            <div className="form-control d-flex align-items-center gap-2 flex-wrap">
              {selectedTags.map((tag) => (
                <span key={tag.id} style={{ display: "inline-block" }}>
                  <SearchTag
                    id={tag.id}
                    text={tag.text}
                    isSearched={true}
                    onRemove={removeTag}
                  />
                </span>
              ))}
              <input
                type="text"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  flex: "1",
                  minWidth: "50px",
                }}
                placeholder={
                  selectedTags.length === 0 ? "🔍 Search Keywords or Tags" : ""
                }
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
                    <div key={tag.id} onClick={() => handleTagClick(tag)}>
                      <SearchTag
                        id={tag.id}
                        text={tag.text}
                        isSearched={false}
                      />
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
