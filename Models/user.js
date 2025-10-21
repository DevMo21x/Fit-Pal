import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            max: 100,
        },
        lastName: {
            type: String,
            required: true,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Regex for email validation
                },
                message: (props) => `${props.value} is not a valid email address!`,
            },
        },
        password: {
            type: String,
            required: true,
            max: 255,
        },
    },
    {
        collection: 'Users',
        versionKey: false,
        timestamps: true,
    },
);

export default mongoose.model('User', userSchema);
