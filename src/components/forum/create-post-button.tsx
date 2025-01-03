import { FiPlus } from "react-icons/fi";

const CreatePostButton = () => {
  return (
    <button
      className="btn px-3 py-2 fw-semibold rounded shadow d-inline-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#28a745" }}
    >
      <FiPlus size={20} color="white" className="me-1" />
      <text style={{ color: "white" }}>Create Post</text>
    </button>
  );
};

export default CreatePostButton;
