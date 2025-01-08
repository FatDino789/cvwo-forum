import { FC, useState } from "react";
import { FiPlus } from "react-icons/fi";

import PostForm from "./create-post-form";

const CreatePostButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openForm = (): void => {
    setIsModalOpen(true);
  };

  const closeForm = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <PostForm isOpen={isModalOpen} onClose={closeForm} />
      <button
        className="btn px-3 py-2 fw-semibold rounded shadow d-inline-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#28a745" }}
        onClick={openForm}
      >
        <FiPlus size={20} color="white" className="me-1" />
        <text style={{ color: "white" }}>Create Post</text>
      </button>
    </>
  );
};

export default CreatePostButton;
