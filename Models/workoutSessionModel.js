import mongoose from 'mongoose';

// Define the event schema
const eventSchema = new mongoose.Schema({
  user: {
    firstName: { type: String },
    lastName: { type: String },
    profileImage: { type: String },
  },
  date: { type: String },
  exercises: [
    {
      name: { type: String },
      type: { type: String },
      sets: { type: Number },
      reps: { type: [Number] },
      weightKG: { type: [Number] },
    },
  ],
  summary: { type: String },
  notes: { type: String },
  tags: { type: [String] },
});


export default mongoose.model("workoutSession", eventSchema);