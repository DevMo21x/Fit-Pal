import mongoose from 'mongoose';

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regex for email validation
            },
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    password: { type: String, required: true },
});

export default mongoose.model('login', loginSchema);
