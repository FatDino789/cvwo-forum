import { FC, useContext } from "react";

import { useState } from "react";
import { TagProps, SearchTag } from "./search-tag";
import { TagContext } from "../../infrastructure/tag-context";
import { FilterContext } from "../../infrastructure/filter-context";

const SearchBar: FC = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const { addSelectedTag, selectedTags, removeSelectedTag, tagArray } =
    useContext(TagContext);

  const { searchTerm, setSearchTerm } = useContext(FilterContext);

  const filteredTags = tagArray.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTagClick = (tag: TagProps): void => {
    addSelectedTag(tag);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const removeTag = (tagId: string): void => {
    removeSelectedTag(tagId);
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
                    color={tag.color}
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
                        color={tag.color}
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
