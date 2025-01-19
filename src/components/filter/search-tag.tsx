import { FC } from "react";
import { FiX } from "react-icons/fi";

const tagStyle = (
  isSearched: boolean,
  size: "small" | "normal" = "normal",
  color: string
) => ({
  padding:
    size === "small"
      ? "4px 4px 4px 12px"
      : isSearched
      ? "5px 5px 5px 16px"
      : "8px 8px 8px 16px",
  background: color,
  clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)",
  display: "inline-block",
  marginRight: "5px",
  color: "#505050",
  fontWeight: 500,
  fontSize: isSearched ? "0.8rem" : size === "small" ? "0.7rem" : "0.9rem",
  transition: "all 0.2s ease-in-out",
  width: "fit-content",
});

export type TagProps = {
  id: string;
  text: string;
  isSearched?: boolean;
  onRemove?: (tagId: string) => void;
  size?: "small" | "normal";
  popular?: boolean;
  searches?: string;
  color: string;
};

export const SearchTag: FC<TagProps> = ({
  id,
  text,
  isSearched = false,
  onRemove,
  size = "normal",
  popular = false,
  searches = "",
  color,
}) => {
  return (
    <div style={tagStyle(isSearched, size, color)} key={id}>
      {text}
      {isSearched && (
        <FiX
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.(id);
          }}
          className="ms-2 text-danger"
          style={{
            cursor: "pointer",
            fontSize: size === "small" ? "14px" : "16px",
          }}
          size={20}
        />
      )}
      {popular && (
        <span className="bg-white px-2 ms-2 rounded-pill py-1 bg-opacity-50">
          {searches}
        </span>
      )}
    </div>
  );
};
