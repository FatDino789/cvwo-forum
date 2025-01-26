import { FC, useEffect, useState, useContext } from "react";
import Post from "../components/forum/post";
import Discussion from "../components/forum/discussion";
import "../App.css";
import { getPosts, setupPostEventListener } from "../infrastructure/api";
import { PostData } from "../database/database-types";
import { TagProps } from "../components/filter/search-tag";
import { TagContext } from "../infrastructure/tag-context";
import { FilterContext } from "../infrastructure/filter-context";

import { PiSmileySad } from "react-icons/pi";

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
  const [filteredPosts, setFilteredPosts] = useState<PostData[]>([]);

  const { tagArray, selectedTags } = useContext(TagContext);

  const { selected, selectedOrder, searchTerm } = useContext(FilterContext);

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  useEffect(() => {
    const eventSource = setupPostEventListener(
      setPostArray,
      selectedPost,
      setSelectedPost
    );
    const loadPosts = async () => {
      const result = await getPosts();
      if (!("message" in result)) setPostArray(result);
    };
    loadPosts();
    return () => eventSource.close();
  }, []);

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

  useEffect(() => {
    let updatedPosts = [...postArray];

    if (selectedTags.length > 0) {
      updatedPosts = updatedPosts.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag.id))
      );
    }

    if (searchTerm.trim() !== "") {
      updatedPosts = updatedPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    updatedPosts.sort((a, b) => {
      if (selectedOrder === 0) {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      } else {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
    });

    if (selected === 0) {
      updatedPosts.sort((a, b) => b.views_count - a.views_count);
    } else if (selected === 1) {
      updatedPosts.sort((a, b) => b.likes_count - a.likes_count);
    } else if (selected === 2) {
      updatedPosts.sort((a, b) => b.comments.length - a.comments.length);
    }

    setFilteredPosts(updatedPosts);
  }, [selected, selectedOrder, searchTerm, selectedTags, postArray]);

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
            {filteredPosts.length === 0 ? (
              <div
                className="d-flex flex-column justify-content-center align-items-center"
                style={{
                  height: "60%",
                  textAlign: "center",
                }}
              >
                <PiSmileySad size={50} />
                <div>
                  There are no search results with these filters. Please try
                  again
                </div>
              </div>
            ) : (
              filteredPosts.map((post, id) => {
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
