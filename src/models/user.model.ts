import mongoose, { Types } from "mongoose";

interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  image?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    mobile: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
