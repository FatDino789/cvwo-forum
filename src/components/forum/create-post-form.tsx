import { FC, FormEvent, useState, ChangeEvent } from "react";

type PostFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

const PostForm: FC<PostFormProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ): void => {
    setter(event.target.value);
  };

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
        onClick={(e): void => e.stopPropagation()}
      >
        <div
          className="modal-content text-start"
          style={{ borderRadius: "16px 16px 16px 16px", height: "90%" }}
        >
          <div className="modal-header border-0 justify-content-center">
            <h5 className="modal-title fs-2 fw-bold">Create Post</h5>
            <button
              type="button"
              className="btn-close position-absolute end-0 me-3"
              onClick={onClose}
            />
          </div>

          <div className="modal-body d-flex flex-column h-100">
            <form
              className="px-4 h-100 d-flex flex-column"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <label htmlFor="title" className="form-label text-muted">
                  Title
                </label>
                <input
                  type="title"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e): void => handleInputChange(e, setTitle)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label text-muted">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  placeholder="Write your content here"
                  style={{
                    minHeight: "100px",
                    maxHeight: "100px",
                    height: "auto",
                    resize: "none",
                    overflowY: "auto",
                  }}
                  value={content}
                  onChange={(e): void => {
                    setContent(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label text-muted">
                  Tags
                </label>
              </div>
              <div className="mt-auto mb-3">
                <button type="submit" className="btn btn-primary w-100 py-2">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
