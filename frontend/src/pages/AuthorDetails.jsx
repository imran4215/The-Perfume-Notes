import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import useBlogDataStore from "../store/BlogDataStore";
import { Helmet } from "react-helmet-async";

function AuthorDetails() {
  const { slug } = useParams();
  const { blogData } = useBlogDataStore();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;

  const filteredBlogs = blogData.filter((blog) => blog.author.slug === slug);
  const author = filteredBlogs.length > 0 ? filteredBlogs[0].author : null;

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredBlogs.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalPages = Math.ceil(filteredBlogs.length / articlesPerPage);

  if (!author) {
    return <div className="text-center py-20">Author not found</div>;
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Meta tags for SEO */}
      <Helmet>
        <title>{author.name} - Author at The Perfume Notes</title>
        <meta
          name="description"
          content={`Explore articles written by ${author.name}, a contributor at The Perfume Notes.`}
        />
        <meta property="og:title" content={`${author.name} - Author`} />
        <meta
          property="og:description"
          content={`Discover the fragrance stories and blogs written by ${author.name}.`}
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content={`https://theperfumenotes.com/author/${slug}`}
        />
      </Helmet>

      {/* Author Info in Row */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 mb-8 md:mb-12">
        {/* Left - Image */}
        <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0 transform transition-transform duration-300 hover:scale-105">
          <img
            src={author.authorPic.url}
            alt={author.name}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "/default-author.jpg")}
          />
        </div>

        {/* Right - Name, Title, Bio */}
        <div className="text-center md:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 md:mb-2">
            {author.name}
          </h1>
          {author.title && (
            <h2 className="text-sm sm:text-base md:text-lg text-amber-600 font-medium mb-2 md:mb-3">
              {author.title}
            </h2>
          )}
          <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-3xl ">
            {author.bio}
          </p>
        </div>
      </div>

      {/* Articles by Author */}
      <div className="border-t border-gray-200 pt-6 md:pt-10">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
          Articles by {author.name.split(" ")[0]}
        </h3>

        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {currentArticles.map((article) => (
            <div
              key={article._id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-amber-200 group"
            >
              <Link to={`/blogs/${article.slug}`} className="block">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={article.image1.url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-3 md:p-4">
                  <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-1 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h4>
                  <div className="text-xs text-amber-600 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                    Read Article →
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredBlogs.length > articlesPerPage && (
          <div className="flex justify-center items-center mt-8 space-x-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-amber-50 text-amber-600 hover:bg-amber-100"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-md text-sm md:text-base ${
                  currentPage === i + 1
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700 hover:bg-amber-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-amber-50 text-amber-600 hover:bg-amber-100"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthorDetails;
