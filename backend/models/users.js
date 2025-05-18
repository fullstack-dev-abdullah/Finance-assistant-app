const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // 💰 Financial Preferences
    monthlyBudget: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR", // Or 'USD', based on region
    },
    profilePic: {
      type: String, // URL to image
      default: "",
    },

    // 🔐 For login/token use
    refreshToken: {
      type: String,
    },

    // 🌐 OAuth login (optional)
    authProvider: {
      type: String, // e.g. "google", "local"
      default: "local",
    },
    alerts: {
      overspendingAlert: {
        type: Boolean,
        default: true,
      },
      goalReminder: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
// This code defines a Mongoose schema for a User model in a Node.js application.