import { FC, FormEvent, useState, ChangeEvent, useContext } from "react";
import TagSearchBar from "./tag-searchbar";

import {
  createNewTag,
  updateTagSearchCount,
  createPost,
} from "../../infrastructure/api";
import { TagContext } from "../../infrastructure/tag-context";
import { TagProps } from "../filter/search-tag";
import { ApiError } from "../../database/database-types";
import { useAuth } from "../../infrastructure/authentication-context";

type PostFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type CreatePostInput = {
  user_id: string;
  title: string;
  content: string;
  tags: string[];
};

const PostForm: FC<PostFormProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const { tagArray } = useContext(TagContext);

  const { user } = useAuth();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    if (!user) {
      console.error("No user found");
      return;
    }

    try {
      const postResponse = await createPost({
        user_id: user.id,
        title,
        content,
        tags: tagArray.map((tag) => tag.id),
      });

      if ("status" in postResponse) {
        console.error("Failed to create post:", postResponse.message);
        return;
      }

      const tagResults = await handleSubmitTags(tagArray);

      const tagErrors = tagResults.filter((result) => "status" in result);
      if (tagErrors.length > 0) {
        console.error("Some tags failed to process:", tagErrors);
      }

      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ): void => {
    setter(event.target.value);
  };

  const handleSubmitTags = async (
    tags: TagProps[]
  ): Promise<(TagProps | ApiError)[]> => {
    const results = await Promise.all(
      tags.map(async (tag) => {
        if (tag.searches === 0) {
          return await createNewTag(tag);
        } else {
          return await updateTagSearchCount(tag.id);
        }
      })
    );

    return results;
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{
          margin: "0 auto",
          position: "fixed",
          top: 30,
          left: 0,
          right: 0,
          width: "100%",
          height: "400px",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-out",
        }}
        onClick={(e): void => e.stopPropagation()}
      >
        <div
          className="modal-content text-start"
          style={{ borderRadius: "16px 16px 16px 16px", height: "90%" }}
        >
          <div className="modal-header border-0 justify-content-center">
            <h5 className="modal-title fs-2 fw-bold">Create Post</h5>
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              onClick={onClose}
            />
          </div>

          <div className="modal-body d-flex flex-column h-100">
            <form
              className="px-4 h-100 d-flex flex-column"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-muted">
                  Title
                </label>
                <input
                  type="title"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e): void => handleInputChange(e, setTitle)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label text-muted">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  placeholder="Write your content here"
                  style={{
                    minHeight: "100px",
                    maxHeight: "100px",
                    height: "auto",
                    resize: "none",
                    overflowY: "auto",
                  }}
                  value={content}
                  onChange={(e): void => {
                    setContent(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="tags" className="form-label text-muted">
                  Add Tags (Max 3)
                </label>
                <TagSearchBar />
              </div>
              <div className="mt-auto mb-3">
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
