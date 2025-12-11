import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Create mutation for delete
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workouts/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete workout");
      }
      return response;
    },
    onSuccess: () => {
      // Refresh the workout list
      queryClient.invalidateQueries(["workouts"]);
      console.log("Workout deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting record:", error);
      alert("Failed to delete workout. Please try again.");
    },
  });

  const deleteRecord = () => {
    if (
      window.confirm("Are you sure you want to delete this workout record?")
    ) {
      deleteMutation.mutate(item._id);
    }
  };

  // User profile image with fallback
  const userImage =
    item.user?.profileImage ||
    `https://picsum.photos/50/50?random=${Math.floor(Math.random() * 1000)}`;

  // Random workout image
  const randomImageUrl = `https://picsum.photos/382/225?random=${Math.floor(
    Math.random() * 1000
  )}`;

  // Format date
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "No date";

  // Get summary data (handle both array and object formats)
  const summary = Array.isArray(item.summary) ? item.summary[0] : item.summary;

  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top"
          alt="Workout Thumbnail"
          style={{
            height: 225,
            width: "100%",
            display: "block",
            objectFit: "cover",
          }}
          src={randomImageUrl}
        />
        <div className="card-body">
          {/* User Info */}
          <div className="d-flex align-items-center mb-2">
            <img
              src={userImage}
              alt={`${item.user?.firstName}'s profile`}
              className="rounded-circle mr-2"
              style={{ width: 40, height: 40, objectFit: "cover" }}
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${item.user?.firstName}+${item.user?.lastName}&background=random`;
              }}
            />
            <div>
              <strong>
                {item.user?.firstName} {item.user?.lastName}
              </strong>
              <small className="text-muted d-block">{formattedDate}</small>
            </div>
          </div>

          {/* Exercises */}
          <div className="mb-2">
            <strong>Exercises:</strong>
            <ul className="list-unstyled mb-0 small">
              {item.exercises?.slice(0, 3).map((exercise, index) => (
                <li key={index}>
                  <i className="fa fa-check text-success mr-1"></i>
                  {exercise.name}
                  {exercise.sets && ` - ${exercise.sets} sets`}
                  {exercise.durationMin && ` - ${exercise.durationMin} min`}
                </li>
              ))}
              {item.exercises?.length > 3 && (
                <li className="text-muted">
                  +{item.exercises.length - 3} more
                </li>
              )}
            </ul>
          </div>

          {/* Summary Stats */}
          {summary && (
            <div className="d-flex justify-content-around text-center mb-2 border-top border-bottom py-2">
              {(summary.durationMin || summary.duration) && (
                <div>
                  <small className="text-muted d-block">Duration</small>
                  <strong>{summary.durationMin || summary.duration} min</strong>
                </div>
              )}
              {summary.calories && (
                <div>
                  <small className="text-muted d-block">Calories</small>
                  <strong>{summary.calories}</strong>
                </div>
              )}
              {summary.avgHR && (
                <div>
                  <small className="text-muted d-block">Avg HR</small>
                  <strong>{summary.avgHR} bpm</strong>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          {item.tags?.length > 0 && (
            <div className="mb-2">
              {item.tags.map((tag, index) => (
                <span key={index} className="badge badge-secondary mr-1">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Notes */}
          {item.notes && (
            <p
              className="card-text small text-muted mb-2"
              style={{ fontStyle: "italic" }}
            >
              "
              {item.notes.length > 80
                ? item.notes.substring(0, 80) + "..."
                : item.notes}
              "
            </p>
          )}

          {/* Action Buttons */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>

              <Link
                className="btn btn-sm btn-outline-secondary"
                to={`/edit/${item._id}`}
              >
                Edit
              </Link>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={deleteRecord}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
