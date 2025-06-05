import Feedback from "../models/feedback.model.js";

// Add new feedback
export const addFeedback = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newFeedback = new Feedback({
      name,
      email,
      subject,
      message,
    });
    await newFeedback.save();
    res
      .status(201)
      .json({ message: "Feedback submitted successfully", newFeedback });
  } catch (error) {
    console.log("Error in submitting feedback:", error);
    res.status(500).json({ error: "Failed to submit feedback" });
  }
};

// Get all feedback
export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Feedback fetched successfully",
      feedbacks,
    });
  } catch (error) {
    console.log("Error in fetching feedback:", error);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
};

// Delete feedback by ID
export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFeedback = await Feedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res
      .status(200)
      .json({ message: "Feedback deleted successfully", deletedFeedback });
  } catch (error) {
    console.log("Error in deleting feedback:", error);
    res.status(500).json({ error: "Failed to delete feedback" });
  }
};
