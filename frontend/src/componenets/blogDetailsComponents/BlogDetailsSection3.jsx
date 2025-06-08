import React from "react";
import { Link } from "react-router-dom";

export default function RelatedPerfumesSection({ blogData, brandName }) {
  // Filter perfumes based on the brand name from blogData
  const relatedPerfumes = blogData
    .filter(
      (perfume) =>
        perfume.brand.name.trim().toLowerCase() ===
        brandName.trim().toLowerCase()
    )
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  return (
    <div className="p-4 mt-6 sm:mt-10 max-w-7xl mx-auto bg-gray-50">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
        Related Perfumes
      </h1>

      {relatedPerfumes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No Related Perfumes available at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
          {relatedPerfumes.map((blog) => (
            <Link to={`/blogs/${blog.slug}`} key={blog._id}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={blog.image1.url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4"></div>
                </div>
                <div className="p-2 sm:p-4">
                  <h3 className="font-medium text-gray-800 text-xs sm:text-base truncate">
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
