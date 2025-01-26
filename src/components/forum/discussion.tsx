import { FC, useState, useContext, useEffect } from "react";
import { PostData } from "../../database/database-types";
import formatDate from "../../infrastructure/date-format";

import { IoSend } from "react-icons/io5";
import { TagProps } from "../filter/search-tag";
import { TagContext } from "../../infrastructure/tag-context";
import { SearchTag } from "../filter/search-tag";
import { FaThumbsUp } from "react-icons/fa";
import { profileColors, profileIcons } from "../../assets/profile-pics";
import { addComment } from "../../infrastructure/api";
import { v4 } from "uuid";

import { useAuth } from "../../infrastructure/authentication-context";
import Animal from "react-animals";
import DiscussionComment from "./discussion-comment";

type DiscussionProps = {
  isOpen: boolean;
  onClose: () => void;
  post: PostData;
};

const Discussion: FC<DiscussionProps> = ({ isOpen, onClose, post }) => {
  const [comment, setComment] = useState<string>("");
  const [postTagArray, setPostTagArray] = useState<TagProps[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);

  const { user } = useAuth();

  const { tagArray } = useContext(TagContext);

  const fetchTags = () => {
    const tempTags = tagArray.filter((tag) => post.tags.includes(tag.id));
    setPostTagArray(tempTags);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmitComment = async () => {
    if (!comment.trim() || !user) return;

    const newComment = {
      id: v4(),
      content: comment.trim(),
      created_at: new Date().toISOString(),

      user_id: user.id,
      username: user.username,
      icon_index: user.icon_index,
      color_index: user.color_index,
    };

    try {
      const result = await addComment(post.id, newComment);
      console.log(result);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [post]);

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
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
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content d-flex flex-column"
          style={{ borderRadius: "16px 16px 16px 16px", height: "100%" }}
        >
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div
            className="modal-body p-3 flex-grow-1"
            style={{ overflow: "auto" }}
          >
            <div className="d-flex gap-2">
              <Animal
                name={profileIcons[post.icon_index]}
                color={profileColors[post.color_index]}
                size="55px"
                rounded
              />
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2">
                  <div className="text-muted">{post.username}</div>
                  <div className="text-muted">
                    {formatDate(post.created_at)}
                  </div>
                  <div className="d-flex gap-1">
                    {postTagArray.length > 0 &&
                      postTagArray.map((tag) => (
                        <div key={tag.id}>
                          <SearchTag
                            id={tag.id}
                            text={tag.text}
                            size="small"
                            color={tag.color}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="fs-3 fw-bold text-start">{post.title}</div>
                <div className="text-start mb-3">{post.content}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-muted mb-1">
                {post.comments.length} Comments
              </div>
              <div className="d-flex text-muted align-items-center">
                <FaThumbsUp className="mx-2" size={15} />
                {post.likes_count}
              </div>
            </div>
            <div
              className="w-100 mb-3"
              style={{ height: "1px", backgroundColor: "#dee2e6" }}
            ></div>
            <div
              style={{
                overflowY: "auto",
                display: "-webkit-box",
              }}
            ></div>
            {post?.comments.map((comment) => (
              <div className="gap-2">
                <DiscussionComment comment={comment} />
              </div>
            ))}
          </div>
          <div className="modal-footer border-0 bg-white p-3 mt-auto">
            <div className="position-relative w-100">
              {!inputFocused && (
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 2,
                  }}
                >
                  <Animal
                    name={profileIcons[user?.icon_index || 0]}
                    color={profileColors[user?.color_index || 0]}
                    size="30px"
                  />
                </div>
              )}
              <input
                type="text"
                className="form-control pe-5 rounded-pill"
                placeholder={inputFocused ? "" : "        Add a comment..."}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && comment.trim()) {
                    handleSubmitComment();
                  }
                }}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
              />
              <button
                className="btn position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{
                  border: "none",
                  background: "none",
                  zIndex: 1000,
                  pointerEvents: "auto",
                }}
                onClick={() => {
                  if (comment.trim()) {
                    setComment("");
                  }
                }}
              >
                <IoSend
                  size={20}
                  className="text-secondary"
                  style={{
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    e.currentTarget.classList.replace(
                      "text-secondary",
                      "text-primary"
                    )
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.classList.replace(
                      "text-primary",
                      "text-secondary"
                    )
                  }
                  onClick={handleSubmitComment}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
