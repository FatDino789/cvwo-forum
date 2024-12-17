const Post = () => {
  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row justify-content-center">
        <div className="col-7">
          <div className="card p-2" style={{ borderRadius: "8px" }}>
            <div className="d-flex align-items-start gap-3">
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#DC3545",
                  borderRadius: "8px",
                }}
              ></div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="m-0">Sample</h6>
                  <div className="text-muted" style={{ fontSize: "12px" }}>
                    18 Dec 2024
                  </div>
                </div>

                <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                  Sample Text
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <div>Tags</div>
                  <div className="text-muted">Views, Comments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
