import { FC, useState, useContext, useEffect } from "react";
import { PostData } from "../../database/database-types";
import formatDate from "../../infrastructure/date-format";

import { IoSend } from "react-icons/io5";
import { TagProps } from "../filter/search-tag";
import { TagContext } from "../../infrastructure/tag-context";
import { SearchTag } from "../filter/search-tag";
import { FaThumbsUp, FaEye } from "react-icons/fa";
import { profileColors, profileIcons } from "../../assets/profile-pics";
import {
  addComment,
  updatePost,
  updateUserLikes,
  fetchUserLikes,
} from "../../infrastructure/api";
import { v4 } from "uuid";

import { useAuth } from "../../infrastructure/authentication-context";
import Animal from "react-animals";
import DiscussionComment from "./discussion-comment";

import PopUpModal from "./popup-modal";

type DiscussionProps = {
  isOpen: boolean;
  onClose: () => void;
  post: PostData;
};

const Discussion: FC<DiscussionProps> = ({ isOpen, onClose, post }) => {
  const [comment, setComment] = useState<string>("");
  const [postTagArray, setPostTagArray] = useState<TagProps[]>([]);
  const [inputFocused, setInputFocused] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const [localPostState, setLocalPostState] = useState<PostData>(post);

  const { user } = useAuth();

  const { tagArray } = useContext(TagContext);

  const fetchTags = () => {
    const tempTags = tagArray.filter((tag) => post.tags.includes(tag.id));
    setPostTagArray(tempTags);
  };

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
      setLocalPostState((prev) => ({
        ...prev,
        comments: [...prev.comments, newComment],
      }));
      const result = await addComment(post.id, newComment);
      console.log(result);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdateLikes = async () => {
    if (!user || liked) return;

    const newLikeCount = post.likes_count + 1;
    const newLikes = {
      field: "likes_count",
      value: newLikeCount,
      postId: post.id,
    };

    try {
      setLocalPostState((prev) => ({
        ...prev,
        likes_count: newLikeCount,
      }));
      await updatePost(newLikes);

      const result = await updateUserLikes({
        userId: user.id,
        postId: post.id,
      });

      console.log(result);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleUpdateViews = async () => {
    const newViewCount = post.views_count + 1;
    const newViews = {
      field: "views_count",
      value: newViewCount,
      postId: post.id,
    };

    try {
      setLocalPostState((prev) => ({
        ...prev,
        views_count: newViewCount,
      }));
      const result = await updatePost(newViews);
      console.log(result);
    } catch (error) {
      console.log("Error adding views:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    handleUpdateViews();
    setLocalPostState(post);
  }, [post]);

  useEffect(() => {
    const getLikes = async () => {
      if (user?.id) {
        const result = await fetchUserLikes(user.id);
        console.log(result);
        if (!("message" in result)) {
          setUserLikes(result);
        }
      }
    };

    getLikes();
  }, [user]);

  useEffect(() => {
    if (userLikes?.includes(post.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [userLikes, post.id]);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      {openModal && <PopUpModal isOpen={openModal} onClose={closeModal} />}
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
          style={{ borderRadius: "16px", height: "100%" }}
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
              <div>
                <Animal
                  name={profileIcons[localPostState.icon_index]}
                  color={profileColors[localPostState.color_index]}
                  size="55px"
                  rounded
                />
              </div>
              <div className="flex-grow-1 flex-wrap ">
                <div className="d-flex align-items-center gap-2">
                  <div className="text-muted">{localPostState.username}</div>
                  <div className="text-muted">
                    {formatDate(localPostState.created_at)}
                  </div>
                  <div className="d-flex gap-1">
                    {postTagArray.map((tag) => (
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
                <div className="fs-3 fw-bold text-start">
                  {localPostState.title}
                </div>
                <div className="text-start mb-3">{localPostState.content}</div>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="text-muted mb-1">
                {localPostState.comments.length} Comments
              </div>
              <div className="d-flex text-muted align-items-center">
                <FaEye color="gray" size={15} className="mx-2" />
                {localPostState.views_count}
                <FaThumbsUp
                  className="mx-2"
                  size={15}
                  onClick={() => {
                    if (user) {
                      handleUpdateLikes();
                      setUserLikes([...userLikes, post.id]);
                    } else {
                      setOpenModal(true);
                    }
                  }}
                  color={liked ? "blue" : "gray"}
                />
                {localPostState.likes_count}
              </div>
            </div>
            <div
              className="w-100 mb-3"
              style={{ height: "1px", backgroundColor: "#dee2e6" }}
            ></div>
            {localPostState?.comments.map((comment) => (
              <div className="gap-2" key={comment.id}>
                <DiscussionComment
                  comment={comment}
                  setComment={setComment}
                  setOpenModal={setOpenModal}
                />
              </div>
            ))}
          </div>
          <div className="modal-footer border-0 bg-white p-3 mt-auto">
            <div className="position-relative w-100">
              {!inputFocused && user && !comment && (
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
                placeholder={
                  inputFocused ? "" : user ? "        Add a comment..." : ""
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && comment.trim()) {
                    handleSubmitComment();
                  }
                }}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                onClick={() => {
                  if (!user) {
                    setOpenModal(true);
                  }
                }}
                disabled={!user}
              />
              <button
                className="btn position-absolute top-50 end-0 translate-middle-y pe-3"
                style={{ border: "none", background: "none" }}
                onClick={handleSubmitComment}
              >
                <IoSend
                  size={20}
                  className="text-secondary"
                  style={{ transition: "color 0.2s ease" }}
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
