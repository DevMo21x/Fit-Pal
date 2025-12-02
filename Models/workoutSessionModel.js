import mongoose from "mongoose";

// Define the event schema
const eventSchema = new mongoose.Schema(
  {
    user: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        default: null,
      },
    },
    date: {
      type: String,
      default: null,
    },
    exercises: [
      {
        name: { type: String, default: null },
        type: { type: String, default: null },
        sets: { type: Number, default: null },
        reps: { type: [Number], default: null },
        weightKG: { type: [Number], default: null },
      },
    ],
    summary: [
      {
        duration: { type: Number, default: null },
        calories: { type: Number, default: null },
        avgHR: { type: Number, default: null },
      },
    ],
    notes: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { collection: "workoutSessions", versionKey: false, timestamps: true }
);

export default mongoose.model("workoutSession", eventSchema);
