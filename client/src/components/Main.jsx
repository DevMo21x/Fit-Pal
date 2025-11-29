import "../css/main.css";
import "font-awesome/css/font-awesome.min.css";
import { useQuery } from "@tanstack/react-query";
import Card from "./Card.jsx";

const Main = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["workouts"],
    queryFn: () =>
      fetch("http://localhost:3000/api/workoutSessions").then((r) => r.json()),
  });

  if (isPending)
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
        <div className="row">
          {data.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
