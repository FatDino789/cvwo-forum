import { FC } from "react";

import { FaEye } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { SearchTag } from "../filter/search-tag";
import { PostData } from "../../database/database-types";
import { TagProps } from "../filter/search-tag";
import formatDate from "../../infrastructure/date-format";

import Animal from "react-animals";
import { profileIcons, profileColors } from "../../assets/profile-pics";

type PostPros = {
  post: PostData;
  tagArray: TagProps[];
  onClick: () => void;
};

const Post: FC<PostPros> = ({ post, tagArray, onClick }) => {
  return (
    <div className="row justify-content-center">
      <div
        className="col-10 mx-auto"
        style={{ minWidth: "590px", maxWidth: "80%" }}
      >
        <div
          className="card p-2"
          style={{
            borderRadius: "8px",
            border: "none",
            transition: "background-color 0.2s ease",
            cursor: "pointer",
            height: "90px",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#e9ecef")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "white")
          }
          onClick={onClick}
        >
          <div className="d-flex align-items-start gap-2">
            {/* <div
              style={{
                flexShrink: 0,
                width: "40px",
                height: "40px",
                backgroundColor: "#DC3545",
                borderRadius: "8px",
              }}
            ></div> */}
            <Animal
              name={profileIcons[post.icon_index]}
              color={profileColors[post.color_index]}
              size="40px"
              rounded
            />
            <div className="flex-grow-1 position-relative">
              <div className="d-flex justify-content-between mb-1">
                <h6 className="m-0">{post.title}</h6>
                <div className="text-muted" style={{ fontSize: "12px" }}>
                  {formatDate(post.created_at)}
                </div>
              </div>

              <p
                className="text-muted text-start"
                style={{
                  fontSize: "0.9rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {post.content}
              </p>

              <div
                className="d-flex justify-content-between align-items-center position-absolute w-100"
                style={{ bottom: "-15px" }}
              >
                <div className="d-flex">
                  {tagArray.length > 0 &&
                    tagArray.map((tag) => (
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
                <div className="d-flex gap-2 py-1">
                  <div className="d-flex gap-1">
                    <text className="text-muted" style={{ fontSize: "12px" }}>
                      {post.views_count}
                    </text>
                    <FaEye color="#6c757d" />
                  </div>
                  <div className="d-flex gap-1">
                    <text className="text-muted" style={{ fontSize: "12px" }}>
                      {post.likes_count}
                    </text>
                    <FaThumbsUp color="#6c757d" />
                  </div>
                  <div className="d-flex gap-1">
                    <text className="text-muted" style={{ fontSize: "12px" }}>
                      {post.comments.length}
                    </text>
                    <FaCommentDots color="#6c757d" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
