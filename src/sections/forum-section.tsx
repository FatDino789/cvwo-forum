import Post from "../components/forum/post";
import { useEffect, useState } from "react";
import Discussion from "../components/forum/discussion";
import "../App.css";

import { getPosts } from "../infrastructure/api";

const ForumSection = () => {
  const sampleArray = [1, 2, 3, 4, 5, 6];
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const loadPosts = async () => {
      const result = await getPosts();

      if ("message" in result) {
        console.error("Error:", result.message);
        return;
      }
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
            {sampleArray.map((id) => (
              <div key={id} className="mb-3 w-100 ">
                <Post onClick={openModal} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSection;
