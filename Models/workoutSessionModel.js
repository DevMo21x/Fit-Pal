import mongoose from 'mongoose';

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
            },
        },
        date: { type: String },
        exercises: [
            {
                name: { type: String, required: true },
                type: { type: String, required: true },
                sets: { type: Number, required: true },
                reps: { type: [Number], required: true },
                weightKG: { type: [Number], required: true },
            },
        ],
        summary: [
            {
                duration: { type: Number, required: true },
                calories: { type: Number },
                avgHR: { type: Number },
            },
        ],
        notes: { type: String },
        tags: { type: [String] },
    },
    { collection: 'workoutSessions', versionKey: false, timestamps: true },
);

export default mongoose.model('workoutSession', eventSchema);
