import "../css/main.css";
import "font-awesome/css/font-awesome.min.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card.jsx";

const Main = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workouts`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  // Filter workouts based on user name
  const filteredData = data
    ? data.filter((item) => {
        const query = searchQuery.toLowerCase().trim();

        if (!query) return true; 

        // Search only in user name
        const userName = `${item.user?.firstName || ""} ${
          item.user?.lastName || ""
        }`.toLowerCase();

        return userName.includes(query);
      })
    : [];

  if (isLoading)
    return (
      <div className="container mt-5">
        <span>Loading...</span>
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <span>Error loading workouts: {error.message}</span>
      </div>
    );

  return (
    <div className="album py-5 bg-light">
      <div className="container">
        {/* Search Bar */}
        <div className="row mb-4">
          <div className="col-md-8 offset-md-2">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text bg-white border-right-0">
                  <i className="fa fa-search text-muted"></i>
                </span>
              </div>
              <input
                type="text"
                className="form-control border-left-0"
                placeholder="Search by user name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Workout Cards */}
        <div className="row">
          {filteredData.length > 0 ? (
            filteredData.map((item) => <Card key={item._id} item={item} />)
          ) : (
            <div className="col-12 text-center py-5">
              <i className="fa fa-search fa-3x text-muted mb-3"></i>
              <h4 className="text-muted">No workouts found</h4>
              <p className="text-muted">
                {searchQuery
                  ? `No results for "${searchQuery}".`
                  : "No workout sessions available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
