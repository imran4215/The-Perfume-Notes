import Comment from "../models/comments.model.js";

// Add a new comment
export const addComment = async (req, res) => {
  try {
    const { name, comment, blog } = req.body;
    if (!name || !comment || !blog) {
      return res.status(400).json({ message: "Name and comment are required" });
    }

    const newComment = new Comment({ name, comment, blog });

    await newComment.save();
    res.status(201).json({
      message: "Comment added successfully",
      newComment,
    });
  } catch (error) {
    console.error("Error in adding comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error("Error in fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get comments by blog ID
export const getCommentsByBlogId = async (req, res) => {
  try {
    const { blog } = req.query;
    if (!blog) {
      return res.status(400).json({ message: "Blog ID is required" });
    }

    const comments = await Comment.find({ blog }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.error("Error in fetching comments by blog ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({
      message: "Comment deleted successfully",
      deletedComment,
    });
  } catch (error) {
    console.error("Error in deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
