import Post from "../components/post";

const ForumSection = () => {
  const sampleArray = [1, 2, 3, 4, 5, 6];
  return (
    <div className="container" style={{ marginTop: "2%" }}>
      <div className="row justify-content-center">
        <div className="col-7">
          <div
            style={{
              height: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            {sampleArray.map((id) => (
              <div key={id} className="mb-3">
                <Post />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumSection;
