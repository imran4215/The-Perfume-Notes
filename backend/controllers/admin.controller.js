import PerfumeBlog from "../models/perfumeBlog.model.js";
import Note from "../models/notes.model.js";
import Perfumer from "../models/perfumers.model.js";
import Designer from "../models/designers.model.js";
import Author from "../models/author.model.js";

export const getDashboardData = async (req, res) => {
  try {
    const blogsCount = await PerfumeBlog.countDocuments();
    const notesCount = await Note.countDocuments();
    const perfumersCount = await Perfumer.countDocuments();
    const designersCount = await Designer.countDocuments();
    const authorsCount = await Author.countDocuments();
    res.json({
      blogs: blogsCount,
      notes: notesCount,
      perfumers: perfumersCount,
      designers: designersCount,
      authors: authorsCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
