import { FC, useContext } from "react";
import { Tag } from "lucide-react";
import { SearchTag } from "../filter/search-tag";

import { TagProps } from "../filter/search-tag";
import { TagContext } from "../../infrastructure/tag-context";

const PopularTags: FC = () => {
  const { addSelectedTag } = useContext(TagContext);

  const tags: TagProps[] = [
    {
      id: 1,
      text: "Accommodation",
      isSearched: false,
      popular: true,
      color: "#DCF2E7",
      searches: "234",
    },
    {
      id: 2,
      text: "Visa",
      isSearched: false,
      popular: true,
      color: "#DBEAFE",
      searches: "189",
    },
    {
      id: 3,
      text: "Course Selection",
      isSearched: false,
      popular: true,
      color: "#EDE9FE",
      searches: "156",
    },
    {
      id: 4,
      text: "Budget",
      isSearched: false,
      popular: true,
      color: "#DCF2E7",
      searches: "145",
    },
    {
      id: 5,
      text: "Cultural Tips",
      isSearched: false,
      popular: true,
      color: "#FFEDD5",
      searches: "132",
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
          <div
            onClick={() => {
              addSelectedTag(tag);
            }}
          >
            <SearchTag
              key={tag.id}
              id={tag.id}
              text={tag.text}
              isSearched={false}
              popular={true}
              searches={tag.searches}
              color={tag.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
