import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // Fixed typo: "emad aderdd" -> "email address"
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      // Fixed: Mongoose uses 'minlength' (all lowercase), NOT 'minLen'
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

// Encrypt password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model
const User = mongoose.model("User", userSchema);

// Export it
export default User;
