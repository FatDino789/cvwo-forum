import { FC, useEffect, useState, useContext } from "react";
import Post from "../components/forum/post";
import Discussion from "../components/forum/discussion";
import "../App.css";
import { getPosts } from "../infrastructure/api";
import { PostData } from "../database/database-types";
import { TagProps } from "../components/filter/search-tag";
import { TagContext } from "../infrastructure/tag-context";

const ForumSection: FC = () => {
  const [postArray, setPostArray] = useState<PostData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostData>({
    id: "",
    user_id: "",
    title: "",
    content: "",
    created_at: "",
    likes_count: 0,
    views_count: 0,
    comments: [],
    tags: [],
    updated_at: "",
    icon_index: 0,
    color_index: 0,
    username: "",
  });

  const { tagArray } = useContext(TagContext);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const loadPosts = async (): Promise<void> => {
      const result = await getPosts();

      if ("message" in result) {
        console.error("Error:", result.message);
        return;
      }

      console.log(result);

      setPostArray(result);
    };

    loadPosts();
  }, []);

  const renderTags = (post: PostData): TagProps[] => {
    const tempTags: TagProps[] = [];
    post.tags.map((tagId) => {
      const tag = tagArray.filter((tag) => tag.id === tagId)[0];
      if (tag) {
        tempTags.push(tag);
      }
    });
    return tempTags;
  };

  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row justify-content-center">
        <div
          className="col-10 mx-auto"
          style={{ minWidth: "600px", maxWidth: "80%" }}
        >
          <Discussion
            isOpen={modalOpen}
            onClose={closeModal}
            post={selectedPost}
          />
          <div
            className="hide-scrollbar"
            style={{
              height: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {tagArray.length === 0 ? (
              <div>Loading...</div>
            ) : (
              postArray.map((post, id) => {
                const tagResult = renderTags(post);
                return (
                  <div key={id} className="w-100">
                    <Post
                      onClick={() => {
                        setSelectedPost(post);
                        openModal();
                      }}
                      post={post}
                      tagArray={tagResult}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSection;
