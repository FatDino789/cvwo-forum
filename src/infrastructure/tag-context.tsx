import { createContext, useState, ReactNode, FC } from "react";

import { TagProps } from "../components/filter/search-tag";

type TagContextType = {
  selectedTags: TagProps[];
  setSelectedTags: (tags: TagProps[]) => void;
  addSelectedTag: (tag: TagProps) => void;
  removeSelectedTag: (tagId: number) => void;
};

const initialContext: TagContextType = {
  selectedTags: [],
  setSelectedTags: () => {},
  addSelectedTag: () => {},
  removeSelectedTag: () => {},
};

export const TagContext = createContext<TagContextType>(initialContext);

export const TagProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState<TagProps[]>([]);

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

  const removeSelectedTag = (tagId: number) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const value = {
    selectedTags,
    setSelectedTags,
    addSelectedTag,
    removeSelectedTag,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};
