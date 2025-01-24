import { FC } from "react";
import { CommentData } from "../../database/database-types";
import formatDate from "../../infrastructure/date-format";
import { MdOutlineReply } from "react-icons/md";

type DiscussionCommentProps = {
  comment: CommentData;
};

const DiscussionComment: FC<DiscussionCommentProps> = ({ comment }) => {
  return (
    <div className="container d-flex justify-content-center">
      <div
        className="d-flex justify-content-between p-3 w-100"
        style={{
          maxWidth: "95%",
          borderRadius: "8px",
          transition: "background-color 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#e9ecef")
        }
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
      >
        <div className="d-flex">
          <div
            style={{
              flexShrink: 0,
              width: "40px",
              height: "40px",
              backgroundColor: "#DC3545",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          />
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2">
              <div className="text-muted fs-10">Username</div>
              <div className="text-muted">{formatDate(comment.created_at)}</div>
            </div>
            <div className="text-start">{comment.content}</div>
          </div>
        </div>
        <div className="align-content-center">
          <MdOutlineReply
            size={30}
            color="grey"
            style={{ transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#007bff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "grey")}
          />
        </div>
      </div>
    </div>
  );
};

export default DiscussionComment;
