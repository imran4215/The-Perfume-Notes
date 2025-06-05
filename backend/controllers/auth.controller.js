import Auth from "../models/auth.model.js";

// Admin Registration
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin already exists
    const existingAdmin = await Auth.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin
    const newAdmin = new Auth({ email, password });
    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Auth.find({ email });
    if (!admin || admin.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Check if the password matches
    if (admin[0].password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }
    // Successful login
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
