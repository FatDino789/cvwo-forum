import { FC } from "react";
import { Tag } from "lucide-react";
import { SearchTag } from "../filter/search-tag";

type TagType = {
  id: number;
  name: string;
  count: string;
  style: {
    backgroundColor: string;
    borderRadius: string;
  };
};

const PopularTags: FC = () => {
  const tags: TagType[] = [
    {
      id: 1,
      name: "Accommodation",
      count: "234",
      style: {
        backgroundColor: "#DCF2E7",
        borderRadius: "25px",
      },
    },
    {
      id: 2,
      name: "Visa",
      count: "189",
      style: {
        backgroundColor: "#DBEAFE",
        borderRadius: "25px",
      },
    },
    {
      id: 3,
      name: "Course Selection",
      count: "156",
      style: {
        backgroundColor: "#EDE9FE",
        borderRadius: "25px",
      },
    },
    {
      id: 4,
      name: "Budget",
      count: "145",
      style: {
        backgroundColor: "#DCF2E7",
        borderRadius: "25px",
      },
    },
    {
      id: 5,
      name: "Cultural Tips",
      count: "132",
      style: {
        backgroundColor: "#FFEDD5",
        borderRadius: "25px",
      },
    },
  ];

  return (
    <div className="p-4 bg-light border border-gray-200 border-2 rounded-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Tag className="w-6 h-6" />
        <h2 className="text-[20px] font-bold">Popular Topics</h2>
      </div>
      <div
        className="d-flex flex-column gap-3"
        style={{ minWidth: "250px", maxWidth: "80%" }}
      >
        {tags.map((tag) => (
          <SearchTag
            key={tag.id}
            id={tag.id}
            text={tag.name}
            isSearched={false}
            popular={true}
            searches={tag.count}
            color={tag.style.backgroundColor}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
