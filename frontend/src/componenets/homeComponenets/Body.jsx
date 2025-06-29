import React, { useEffect } from "react";
import useBlogDataStore from "../../store/BlogDataStore";
import { Link } from "react-router-dom";
import Loading from "../Loading";
import Error404 from "../Error404";

export default function Body() {
  const { blogData, loading, error, fetchBlogData } = useBlogDataStore();

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error404 error={error} />;

  return (
    <div className="p-4 mt-6 sm:mt-10 max-w-7xl mx-auto bg-gray-50 mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        Perfume Blog Collection
      </h1>

      {blogData.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No blogs available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {blogData.map((blog) => (
            <Link
              to={`/perfume/${blog.slug}`}
              key={blog.slug}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={blog.image1.url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="font-medium text-gray-800 text-sm line-clamp-3">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
