import { FaEye } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa6";
import { TagProps, SearchTag } from "./search-tag";

type PostPros = {
  onClick: () => void;
};

const Post = ({ onClick }: PostPros) => {
  const SampleSearchTags: TagProps[] = [
    { id: 1, text: "Europe", isSearched: false },
    { id: 2, text: "Summer Exchange", isSearched: false },
  ];

  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row justify-content-center">
        <div>
          <div
            className="card p-2"
            style={{
              borderRadius: "8px",
              border: "none",
              transition: "background-color 0.2s ease",
              cursor: "pointer",
              height: "110px",
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
              <div
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DC3545",
                  borderRadius: "8px",
                }}
              ></div>
              <div className="flex-grow-1 position-relative">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <h6 className="m-0">Sample</h6>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    18 Dec 2024
                  </div>
                </div>

                <p
                  className="text-muted"
                  style={{
                    fontSize: "0.9rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  Sample Text hi guys this is a sample text pls ignore whatever
                  i am saying i am just trying to type something long Sample
                  Text hi guys this is a sample text pls ignore whatever i am
                  saying i am just trying to type something long
                </p>

                <div
                  className="d-flex justify-content-between align-items-center position-absolute w-100"
                  style={{ bottom: "-10px" }}
                >
                  <div className="d-flex gap-1">
                    {SampleSearchTags.length > 0 &&
                      SampleSearchTags.map((tag) => (
                        <div key={tag.id}>
                          <SearchTag
                            id={tag.id}
                            text={tag.text}
                            isSearched={false}
                            size="small"
                          />
                        </div>
                      ))}
                  </div>
                  <div className="d-flex gap-2">
                    <div className="d-flex gap-1">
                      <text className="text-muted" style={{ fontSize: "12px" }}>
                        10
                      </text>
                      <FaEye color="#6c757d" />
                    </div>
                    <div className="d-flex gap-1">
                      <text className="text-muted" style={{ fontSize: "12px" }}>
                        5
                      </text>
                      <FaThumbsUp color="#6c757d" />
                    </div>
                    <div className="d-flex gap-1">
                      <text className="text-muted" style={{ fontSize: "12px" }}>
                        2
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
    </div>
  );
};

export default Post;
