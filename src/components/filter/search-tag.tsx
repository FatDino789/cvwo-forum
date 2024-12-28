import { FiX } from "react-icons/fi";

const tagStyle = (
  isSearched: boolean,
  size: "small" | "normal" = "normal"
) => ({
  padding:
    size === "small"
      ? "4px 4px 4px 12px"
      : isSearched
      ? "5px 5px 5px 16px"
      : "8px 8px 8px 16px",
  background: "linear-gradient(180deg, #f5f5f5, #e2e2e2)",
  clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)",
  display: "inline-block",
  marginRight: "5px",
  color: "#505050",
  fontWeight: 500,
  fontSize: isSearched ? "0.8rem" : size === "small" ? "0.7rem" : "0.9rem",
  transition: "all 0.2s ease-in-out",
});

export type TagProps = {
  id: number;
  text: string;
  isSearched: boolean;
  onRemove?: (tagId: number) => void;
  size?: "small" | "normal";
};

export const SearchTag = ({
  id,
  text,
  isSearched,
  onRemove,
  size = "normal",
}: TagProps) => {
  return (
    <div style={tagStyle(isSearched, size)} key={id}>
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
    </div>
  );
};
