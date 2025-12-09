import "../css/signin.css";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const EditForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  // State for toggling sections
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showExerciseDetails, setShowExerciseDetails] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch and pre-populate form
  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
          credentials: "include",
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // Prepare data for reset
        reset({
          firstName: data.user?.firstName || "",
          lastName: data.user?.lastName || "",
          profileImage: data.user?.profileImage || "",
          date: data.date ? data.date.slice(0, 16) : "",
          exerciseName: data.exercises?.[0]?.name || "",
          exerciseType: data.exercises?.[0]?.type || "",
          sets: data.exercises?.[0]?.sets || "",
          reps: data.exercises?.[0]?.reps
            ? data.exercises[0].reps.join(", ")
            : "",
          weightKG: data.exercises?.[0]?.weightKG
            ? data.exercises[0].weightKG.join(", ")
            : "",
          duration: data.summary?.[0]?.duration || "",
          calories: data.summary?.[0]?.calories || "",
          avgHR: data.summary?.[0]?.avgHR || "",
          notes: data.notes || "",
          tags: data.tags ? data.tags.join(", ") : "",
        });

        // Show sections if data exists
        setShowProfileImage(!!data.user?.profileImage);
        setShowExerciseDetails(
          !!(
            data.exercises?.[0]?.sets ||
            data.exercises?.[0]?.reps ||
            data.exercises?.[0]?.weightKG
          )
        );
        setShowSummary(
          !!(
            data.summary?.[0]?.duration ||
            data.summary?.[0]?.calories ||
            data.summary?.[0]?.avgHR
          )
        );
        setShowAdditionalInfo(
          !!(data.notes || (data.tags && data.tags.length))
        );
      } catch (error) {
        console.error("Error fetching workout:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchWorkout();
    } else {
      setIsLoading(false);
      setError("No workout ID provided");
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    // Build the record matching the model structure
    const updatedRecord = {
      user: {
        firstName: data.firstName,
        lastName: data.lastName,
        profileImage: data.profileImage || null,
      },
      date: data.date || null,
      exercises: [
        {
          name: data.exerciseName || null,
          type: data.exerciseType || null,
          sets: data.sets ? Number(data.sets) : null,
          reps: data.reps ? data.reps.split(",").map(Number) : null,
          weightKG: data.weightKG ? data.weightKG.split(",").map(Number) : null,
        },
      ],
      summary: [
        {
          duration: data.duration ? Number(data.duration) : null,
          calories: data.calories ? Number(data.calories) : null,
          avgHR: data.avgHR ? Number(data.avgHR) : null,
        },
      ],
      notes: data.notes || null,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
    };

    mutation.mutate(updatedRecord);
  };

  const mutation = useMutation({
    mutationFn: async (updatedRecordData) => {
      const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
        credentials: "include",
        method: "PUT",
        body: JSON.stringify(updatedRecordData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Unable to update record!");
      return await res.json();
    },
    onSuccess: (responseBody) => {
      console.log("Updated!", responseBody);
      queryClient.invalidateQueries(["workouts"]);
      navigate("/");
    },
    onError: (err) => {
      console.error("Unable to update!", err.message);
    },
  });

  if (isLoading) {
    return (
      <div className="container" style={{ maxWidth: 600, paddingTop: 40 }}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading workout data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ maxWidth: 600, paddingTop: 40 }}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 600, paddingTop: 40 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-4 font-weight-normal text-center">
          Edit Workout Session
        </h1>

        {/* User Information */}
        <h5>User Information</h5>
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            placeholder="John"
            {...register("firstName", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            placeholder="Doe"
            {...register("lastName", { required: true })}
          />
        </div>

        {/* Profile Image */}
        <div className="form-check mb-2">
          <input
            type="checkbox"
            className="form-check-input"
            id="toggleProfileImage"
            checked={showProfileImage}
            onChange={() => setShowProfileImage(!showProfileImage)}
          />
          <label className="form-check-label" htmlFor="toggleProfileImage">
            Add Profile Image
          </label>
        </div>
        {showProfileImage && (
          <div className="form-group">
            <label htmlFor="profileImage">Profile Image URL</label>
            <input
              type="text"
              id="profileImage"
              className="form-control"
              placeholder="https://example.com/image.jpg"
              {...register("profileImage")}
            />
          </div>
        )}

        {/* Date */}
        <div className="form-group mt-3">
          <label htmlFor="date">Date</label>
          <input
            type="datetime-local"
            id="date"
            className="form-control"
            {...register("date")}
          />
        </div>

        {/* Exercise Information */}
        <h5 className="mt-4">Exercise</h5>
        <div className="form-group">
          <label htmlFor="exerciseName">Exercise Name</label>
          <input
            type="text"
            id="exerciseName"
            className="form-control"
            placeholder="Bench Press"
            {...register("exerciseName")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exerciseType">Exercise Type</label>
          <select
            id="exerciseType"
            className="form-control"
            {...register("exerciseType")}
          >
            <option value="">Select type</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="core">Core</option>
          </select>
        </div>

        {/* Exercise Details */}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary mb-2"
          onClick={() => setShowExerciseDetails(!showExerciseDetails)}
        >
          {showExerciseDetails ? "Hide" : "Show"} Exercise Details (Sets, Reps,
          Weight)
        </button>
        {showExerciseDetails && (
          <div className="border rounded p-3 mb-3">
            <div className="form-group">
              <label htmlFor="sets">Number of Sets</label>
              <input
                type="number"
                id="sets"
                className="form-control"
                placeholder="3"
                {...register("sets")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reps">Reps (comma separated)</label>
              <input
                type="text"
                id="reps"
                className="form-control"
                placeholder="10, 10, 8"
                {...register("reps")}
              />
            </div>
            <div className="form-group mb-0">
              <label htmlFor="weightKG">Weight in KG (comma separated)</label>
              <input
                type="text"
                id="weightKG"
                className="form-control"
                placeholder="50, 55, 60"
                {...register("weightKG")}
              />
            </div>
          </div>
        )}

        {/* Summary */}
        <div className="mt-4">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary mb-2"
            onClick={() => setShowSummary(!showSummary)}
          >
            {showSummary ? "Hide" : "Show"} Summary (Duration, Calories, Heart
            Rate)
          </button>
        </div>
        {showSummary && (
          <div className="border rounded p-3 mb-3">
            <h5>Summary</h5>
            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <input
                type="number"
                id="duration"
                className="form-control"
                placeholder="60"
                {...register("duration")}
              />
            </div>
            <div className="form-group">
              <label htmlFor="calories">Calories Burned</label>
              <input
                type="number"
                id="calories"
                className="form-control"
                placeholder="500"
                {...register("calories")}
              />
            </div>
            <div className="form-group mb-0">
              <label htmlFor="avgHR">Average Heart Rate (bpm)</label>
              <input
                type="number"
                id="avgHR"
                className="form-control"
                placeholder="130"
                {...register("avgHR")}
              />
            </div>
          </div>
        )}

        {/* Notes and Tags */}
        <div className="mt-3">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary mb-2"
            onClick={() => setShowAdditionalInfo(!showAdditionalInfo)}
          >
            {showAdditionalInfo ? "Hide" : "Show"} Additional Info (Notes, Tags)
          </button>
        </div>
        {showAdditionalInfo && (
          <div className="border rounded p-3 mb-3">
            <h5>Additional Info</h5>
            <div className="form-group">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                className="form-control"
                rows="3"
                placeholder="How did the workout feel?"
                {...register("notes")}
              />
            </div>
            <div className="form-group mb-0">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                type="text"
                id="tags"
                className="form-control"
                placeholder="strength, upper-body, hypertrophy"
                {...register("tags")}
              />
            </div>
          </div>
        )}

        <button
          className="btn btn-lg btn-primary btn-block mt-4 mb-5"
          type="submit"
        >
          Update Workout
        </button>
        {mutation.error && (
          <p className="text-danger mt-2">
            Unable to update record. Try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default EditForm;
