import { Link } from "react-router-dom";
import useBlogDataStore from "../../store/BlogDataStore";
import Loading from "../../componenets/Loading";
import Error404 from "../../componenets/Error404";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AllBlogs() {
  const { blogData, loading, error, fetchBlogData, removeBlog } =
    useBlogDataStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchBlogData();
  }, []);

  const handleEdit = (blogId) => {
    navigate(`/admin/edit-blog/${blogId}`);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await axios.delete(
          `${BASE_URL}/api/perfumeBlog/deleteBlog/${blogId}`
        );
        if (res.status === 200) {
          toast.success("Blog deleted successfully!");
          removeBlog(blogId);
        }
      } catch (error) {
        console.error("Failed to delete blog:", error);
        toast.error("Failed to delete blog. Please try again.");
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error404 error={error} />;

  // Filtered blogs based on search input
  const filteredBlogs = blogData.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 mt-16 max-w-7xl mx-auto bg-gray-50 mb-10 ">
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Perfume Blog Collection
        </h1>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by title..."
            className="px-3 py-2 border border-gray-300 rounded-md w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link
            to="/admin/add-blog"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Add New Blog
          </Link>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 sm:gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Link to={`/blogs/${blog.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={blog.image1.url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-gray-800 text-sm line-clamp-2">
                    {blog.title}
                  </h3>
                </div>
              </Link>

              <div className="px-2 pb-2 flex justify-between gap-2 mt-auto">
                <button
                  onClick={() => handleEdit(blog._id)}
                  className="flex-1 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex-1 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
