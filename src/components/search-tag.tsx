const tagStyle = {
  padding: "8px 8px 8px 16px",
  background: "linear-gradient(180deg, #f5f5f5, #e2e2e2)",
  clipPath: "polygon(10px 0%, 100% 0%, 100% 100%, 10px 100%, 0% 50%)",
  display: "inline-block",
  marginRight: "5px",
  color: "#505050",
  fontWeight: 500,
  fontSize: "0.9rem",
  transition: "all 0.2s ease-in-out",
};

export type TagProps = {
  id: number;
  text: string;
};

export const SearchTag = ({ id, text }: TagProps) => {
  return <div style={tagStyle}>{text}</div>;
};
