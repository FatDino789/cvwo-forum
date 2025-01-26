import { FC } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

type PopUpModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PopUpModal: FC<PopUpModalProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: "300px",
          margin: "0 auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content text-center"
          style={{
            borderRadius: "10px",
            padding: "20px",
            position: "relative",
          }}
        >
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-2"
            onClick={onClose}
          ></button>

          <div className="mt-3">
            <FaExclamationTriangle size={40} color="orange" className="mb-3" />
          </div>

          <div className="modal-body">
            <h5 className="fw-bold">Login Required</h5>
            <p className="text-muted">
              You need to log in to leave a comment or drop a like.
            </p>
          </div>

          <button
            className="btn btn-primary w-100"
            style={{ borderRadius: "5px" }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
