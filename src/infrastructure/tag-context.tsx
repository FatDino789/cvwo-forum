import { createContext, useState, useEffect, ReactNode, FC } from "react";
import { TagProps } from "../components/filter/search-tag";
import { getTags } from "./api";

type TagContextType = {
  selectedTags: TagProps[];
  setSelectedTags: (tags: TagProps[]) => void;
  addSelectedTag: (tag: TagProps) => void;
  removeSelectedTag: (tagId: string) => void;
  tagArray: TagProps[];
  setTagArray: (tags: TagProps[]) => void;
  isLoading: boolean;
};

const initialContext: TagContextType = {
  selectedTags: [],
  setSelectedTags: () => {},
  addSelectedTag: () => {},
  removeSelectedTag: () => {},
  tagArray: [],
  setTagArray: () => {},
  isLoading: false,
};

export const TagContext = createContext<TagContextType>(initialContext);

export const TagProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);
  const [tagArray, setTagArray] = useState<TagProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getTags();
        if ("message" in tags) {
          console.error("Error fetching tags:", tags.message);
          return;
        }
        setTagArray(tags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const addSelectedTag = (tag: TagProps) => {
    setSelectedTags((prev) => {
      const isDuplicate = prev.some(
        (existingTag) => existingTag.text === tag.text
      );

      if (!isDuplicate) {
        return [...prev, { ...tag, isSearched: true }];
      }

      return prev;
    });
  };

  const removeSelectedTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const value = {
    selectedTags,
    setSelectedTags,
    addSelectedTag,
    removeSelectedTag,
    tagArray,
    setTagArray,
    isLoading,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
