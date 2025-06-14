import React from "react";
import { Link } from "react-router-dom";

function AuthorSection({ author }) {
  // Fallbacks for all fields
  const slug = author?.slug || "unknown";
  const name = author?.name || "Unknown Author";
  const title = author?.title || ""; // empty string if no title
  const bio = author?.bio || "";
  const imageUrl = author?.authorPic?.url || "/default-author.jpg";

  // Extract first name for "Read more" safely
  const firstName = name.split(" ")[0] || "Author";

  return (
    <div className="max-w-4xl mx-auto md:px-4 mt-4 group">
      {/* Section Title */}
      <div className="max-w-md mx-auto sm:mx-0 mb-4">
        <h2 className="text-3xl font-medium text-gray-700">Author</h2>
        <div className="w-12 h-0.5 bg-amber-400 mt-1 mb-3"></div>
      </div>

      {/* Entire card is wrapped in Link */}
      <Link to={`/authors/${slug}`} className="block hover:no-underline">
        <div className="max-w-2xl mx-auto sm:mx-0 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
          <div className="p-5">
            <div className="flex items-start">
              {/* Author Image */}
              <div className="flex-shrink-0 mr-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={imageUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-author.jpg";
                    }}
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {name}
                  {title && (
                    <>
                      ,{" "}
                      <span className="text-sm font-normal text-gray-600">
                        {title}
                      </span>
                    </>
                  )}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{bio}</p>

                {/* Read More text on hover */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="inline-flex items-center text-sm font-medium text-amber-600 group-hover:text-amber-700 transition-colors">
                    Read more about {firstName}
                    <svg
                      className="ml-1 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default AuthorSection;
