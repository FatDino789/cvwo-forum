import { FC, useContext, useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { SearchTag } from "../filter/search-tag";

import { TagProps } from "../filter/search-tag";
import { TagContext } from "../../infrastructure/tag-context";

const PopularTags: FC = () => {
  const { addSelectedTag, tagArray } = useContext(TagContext);
  const [popularTagArray, setPopularTagArray] = useState<TagProps[]>([]);

  useEffect(() => {
    const sortedTags = [...tagArray]
      .filter((tag) => tag.searches !== undefined)
      .sort((a, b) => (b.searches ?? 0) - (a.searches ?? 0));
    setPopularTagArray(sortedTags);
  }, [tagArray]);

  return (
    <div className="p-4 bg-light border border-gray-200 border-2 rounded-5">
      <div className="d-flex align-items-center gap-2 mb-4">
        <Tag className="w-6 h-6" />
        <h2 className="text-[20px] font-bold">Popular Topics</h2>
      </div>
      <div
        className="d-flex flex-column gap-3 text-start"
        style={{ minWidth: "250px", maxWidth: "80%" }}
      >
        {popularTagArray.slice(0, 5).map((tag) => (
          <div
            key={tag.id}
            onClick={() => {
              addSelectedTag(tag);
            }}
          >
            <SearchTag
              key={tag.id}
              id={tag.id}
              text={tag.text}
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
