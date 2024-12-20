type DiscussionProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Discussion = ({ isOpen, onClose }: DiscussionProps) => {
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
        className="modal-dialog modal-dialog-centered modal-lg"
        style={{
          margin: "0 auto",
          position: "fixed",
          top: 30,
          left: 0,
          right: 0,
          width: "100%",
          height: "400px",
          transform: isOpen ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content"
          style={{ borderRadius: "16px 16px 16px 16px", height: "90%" }}
        >
          <div className="modal-header border-0">
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body"></div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
