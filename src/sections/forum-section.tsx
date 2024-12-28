import Post from "../components/forum/post";
import { useEffect, useState } from "react";
import Discussion from "../components/forum/discussion";

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
      console.log("Fetching posts...");
      const result = await getPosts();
      console.log(result);

      if ("message" in result) {
        console.error("Error:", result.message);
        return;
      }

      console.log("Posts received:", result);
    };

    loadPosts();
  }, []);

  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row justify-content-center">
        <div className="col-7">
          <Discussion isOpen={modalOpen} onClose={closeModal} />
          <div
            style={{
              height: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {sampleArray.map((id) => (
              <div key={id} className="mb-3">
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
