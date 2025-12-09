import "../css/signin.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const EditForm = () => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // State for toggling sections
  const [showProfileImage, setShowProfileImage] = useState(false);
  const [showExerciseDetails, setShowExerciseDetails] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);

  // Getting the old data to pre-populate the update form
  const { data, isLoading, error } = useQuery({
    queryKey: ["workouts"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/workouts/", {
        credentials: "include",
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Unable to get data from the API");
      }
      // return response.json();
      const oldData = response.json()
      return oldData;
    },
  });

  const onSubmit = (data) => {
    // Build the record matching the model structure
    const newRecord = {
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

    mutation.mutate(newRecord);
  };

  const mutation = useMutation({
    mutationFn: async (newRecordData) => {
      const res = await fetch("http://localhost:3000/api/workouts/", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newRecordData),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Unable to create a new record!");
      return await res.json();
    },
    onSuccess: (responseBody) => {
      console.log("Created!", responseBody);
      queryClient.invalidateQueries(["workouts"]);
      navigate("/");
    },
    onError: (err) => {
      console.error("Unable to create!", err.message);
    },
  });

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
