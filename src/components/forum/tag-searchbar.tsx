import { FC, useContext, useState } from "react";
import { TagProps, SearchTag } from "../filter/search-tag";
import { TagContext } from "../../infrastructure/tag-context";
import { FaPlus } from "react-icons/fa";
import tagColors from "../../utility/tag-colors";

import { v4 } from "uuid";

const TagSearchBar: FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [addedTags, setAddedTags] = useState<TagProps[]>([]);
  const [isCreatingTag, setIsCreatingTag] = useState<boolean>(false);

  const { tagArray } = useContext(TagContext);

  const filteredTags = tagArray.filter((option) =>
    option.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTagClick = (tag: TagProps): void => {
    setAddedTags((prevTags) => [...prevTags, tag]);
    setSearchTerm("");
    setShowDropdown(false);
    setIsCreatingTag(false);
  };

  const removeTag = (tagId: string): void => {
    setAddedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const handleCreateTag = () => {
    if (searchTerm && isCreatingTag) {
      const newTag: TagProps = {
        id: v4(),
        text: searchTerm,
        color: tagColors[Math.floor(Math.random() * 30)],
        searches: 0,
      };
      handleTagClick(newTag);
    }
  };

  return (
    <div className="w-100">
      <div className="position-relative" style={{ height: "50px" }}>
        <div className="form-control d-flex align-items-center gap-1 flex-wrap">
          {addedTags.map((tag) => (
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
              isCreatingTag
                ? "💡 Enter to create a new tag"
                : addedTags.length === 0
                ? "🔍 Search Tags"
                : ""
            }
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value.toUpperCase());
              if (!isCreatingTag) {
                setShowDropdown(true);
              }
            }}
            onFocus={() => !isCreatingTag && setShowDropdown(true)}
            disabled={addedTags.length > 2}
          />
          <button
            type="button"
            className="btn btn-link p-0 border-0"
            onClick={() => {
              if (isCreatingTag) {
                handleCreateTag();
              }
            }}
            style={{
              color: isCreatingTag ? "#0d6efd" : "#6c757d",
              transition: "color 0.2s ease",
            }}
            title={isCreatingTag ? "Click to create tag" : "Create new tag"}
          >
            <FaPlus
              size={20}
              onClick={() => {
                setIsCreatingTag(!isCreatingTag);
              }}
            />
          </button>
        </div>

        {showDropdown && searchTerm && !isCreatingTag && (
          <div className="dropdown-menu show w-100 position-absolute p-2">
            {filteredTags.length > 0 ? (
              <div className="d-flex flex-wrap gap-1">
                {filteredTags.map((tag) => (
                  <div
                    key={tag.id}
                    onClick={() => handleTagClick(tag)}
                    style={{ cursor: "pointer" }}
                  >
                    <SearchTag id={tag.id} text={tag.text} color={tag.color} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="dropdown-item">No Tags Found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagSearchBar;
