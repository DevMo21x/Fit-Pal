import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        email: { type: String, required: true },
        password: { type: String },
    },
    { versionKey: false, timestamps: true },
);

export default new mongoose.model('User', userSchema);
