import { FC, useEffect, useState } from "react";
import Post from "../components/forum/post";
import Discussion from "../components/forum/discussion";
import "../App.css";
import { getPosts } from "../infrastructure/api";
import { PostData } from "../database/database-types";

const ForumSection: FC = () => {
  const [postArray, setPostArray] = useState<PostData[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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

      setPostArray(result);
    };

    loadPosts();
  }, []);

  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row justify-content-center">
        <div
          className="col-10 mx-auto"
          style={{ minWidth: "600px", maxWidth: "80%" }}
        >
          <Discussion isOpen={modalOpen} onClose={closeModal} />
          <div
            className="hide-scrollbar"
            style={{
              height: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {postArray.map((post, id) => (
              <div key={id} className="mb-3 w-100">
                <Post onClick={openModal} post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSection;
