import mongoose from 'mongoose';

const schema=mongoose.Schema;
const userSchema = new schema(
    {
        email:      { type: String, required: true, unique: true},
        username:   { type: String, required: true },
        password:   { type: String, requried: true, minlength: 8 },
        profilePic: { type: String, default: ""},
    },
    { timestamps: true },
);

const User = mongoose.model("User", userSchema );

export default User;