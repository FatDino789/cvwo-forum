import { FiX } from "react-icons/fi";

const tagStyle = (isSearched: boolean) => ({
  padding: isSearched ? "4px 4px 4px 16px" : "8px 8px 8px 16px",
  background: "linear-gradient(180deg, #f5f5f5, #e2e2e2)",
  clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)",
  display: "inline-block",
  marginRight: "5px",
  color: "#505050",
  fontWeight: 500,
  fontSize: "0.9rem",
  transition: "all 0.2s ease-in-out",
});

export type TagProps = {
  id: number;
  text: string;
  isSearched: boolean;
  onRemove?: (tagId: number) => void;
};

export const SearchTag = ({ id, text, isSearched, onRemove }: TagProps) => {
  return (
    <div style={tagStyle(isSearched)} key={id}>
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
            fontSize: "16px",
          }}
          size={20}
        />
      )}
    </div>
  );
};
