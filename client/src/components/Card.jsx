const Card = ({ item }) => {
  // Generate a random image URL using Lorem Picsum
  const randomImageUrl = `https://picsum.photos/382/225?random=${Math.floor(
    Math.random() * 1000
  )}`;

  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top"
          alt="Random Thumbnail"
          style={{ height: 225, width: "100%", display: "block" }}
          src={randomImageUrl}
        />
        <div className="card-body">
          <p className="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                Delete
              </button>
            </div>
            <small className="text-muted">{item.user.firstName}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
