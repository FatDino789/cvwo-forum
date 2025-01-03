import { Tag } from "lucide-react";

const PopularTags = () => {
  const tags = [
    {
      id: 1,
      name: "Accommodation",
      count: "234",
      style: {
        backgroundColor: "rgba(220, 252, 231, 0.8)",
        borderRadius: "25px",
        width: "fit-content",
      },
    },
    {
      id: 2,
      name: "Visa",
      count: "189",
      style: {
        backgroundColor: "rgba(219, 234, 254, 0.8)",
        borderRadius: "25px",
        width: "fit-content",
      },
    },
    {
      id: 3,
      name: "Course Selection",
      count: "156",
      style: {
        backgroundColor: "rgba(237, 233, 254, 0.8)",
        borderRadius: "25px",
        width: "fit-content",
      },
    },
    {
      id: 4,
      name: "Budget",
      count: "145",
      style: {
        backgroundColor: "rgba(220, 252, 231, 0.8)",
        borderRadius: "25px",
        width: "fit-content",
      },
    },
    {
      id: 5,
      name: "Cultural Tips",
      count: "132",
      style: {
        backgroundColor: "rgba(255, 237, 213, 0.8)",
        borderRadius: "25px",
        width: "fit-content",
      },
    },
  ];

  return (
    <div className="p-4 bg-light border border-gray-200 border-2 rounded-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Tag className="w-6 h-6" />
        <h2 className="text-[20px] font-bold">Popular Topics</h2>
      </div>
      <div className="gap-3" style={{ minWidth: "250px", maxWidth: "80%" }}>
        {tags.map((tag) => (
          <div
            key={tag.id}
            style={tag.style}
            className="px-2 py-2 mb-2 inline-flex items-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="font-medium px-2">{tag.name}</span>
            <span className="bg-white px-2 rounded-pill py-1">{tag.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
