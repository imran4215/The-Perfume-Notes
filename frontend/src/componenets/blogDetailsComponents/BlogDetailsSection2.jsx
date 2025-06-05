import React from "react";
import { Link } from "react-router-dom";

export default function BlogDetailsSection2({ blogDetails }) {
  // Dummy notes data
  const perfumeNotes = {
    topNotes: [
      { name: "Bergamot", image: "/notes/n1.jpg" },
      { name: "Lemon", image: "/notes/n2.jpg" },
      { name: "Green Notes", image: "/notes/n1.jpg" },
      { name: "Green Notes", image: "/notes/n1.jpg" },
      { name: "Green Notes", image: "/notes/n1.jpg" },
    ],
    middleNotes: [
      { name: "Jasmine", image: "/notes/n1.jpg" },
      { name: "Rose", image: "/notes/n1.jpg" },
    ],
    baseNotes: [{ name: "Sandalwood", image: "/notes/n1.jpg" }],
  };

  return (
    <div className="max-w-4xl mx-auto md:px-4 px-6 py-12">
      {/* Top Details Paragraph */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {blogDetails.title}
        </h2>
      </div>

      {/* Notes Section */}
      <div className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm border border-gray-200 max-w-4xl mx-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center relative pb-1">
          Fragrance Notes
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"></span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {/* Top Notes */}
          <div className="group bg-white p-4 rounded-lg shadow hover:shadow-md transition-transform duration-300 hover:-translate-y-0.5 border-t-4 border-amber-400">
            <h4 className="font-semibold text-base text-center text-amber-600 mb-4 relative">
              <span className="bg-white px-3 relative z-10">Top Notes</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-amber-200 group-hover:bg-amber-300 transition-colors duration-300"></span>
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {blogDetails.notes.top.map((note, i) => (
                <Link to={`/notes/${note.slug}`} className="group" key={i}>
                  <div className="flex flex-col items-center w-16 transition-transform duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border-2 border-amber-200 group-hover:border-amber-300 shadow-sm">
                      <img
                        src={note.profilePic.url}
                        alt={note.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-[10px] text-center font-medium text-gray-700 group-hover:text-amber-700 transition-colors duration-300">
                      {note.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Notes */}
          <div className="group bg-white p-4 rounded-lg shadow hover:shadow-md transition-transform duration-300 hover:-translate-y-0.5 border-t-4 border-rose-400">
            <h4 className="font-semibold text-base text-center text-rose-600 mb-4 relative">
              <span className="bg-white px-3 relative z-10">Middle Notes</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-rose-200 group-hover:bg-rose-300 transition-colors duration-300"></span>
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {blogDetails.notes.middle.map((note, i) => (
                <Link to={`/notes/${note.slug}`} className="group" key={i}>
                  <div className="flex flex-col items-center w-16 transition-transform duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border-2 border-rose-200 group-hover:border-rose-300 shadow-sm">
                      <img
                        src={note.profilePic.url}
                        alt={note.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-[10px] text-center font-medium text-gray-700 group-hover:text-rose-700 transition-colors duration-300">
                      {note.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Base Notes */}
          <div className="group bg-white p-4 rounded-lg shadow hover:shadow-md transition-transform duration-300 hover:-translate-y-0.5 border-t-4 border-amber-700">
            <h4 className="font-semibold text-base text-center text-amber-800 mb-4 relative">
              <span className="bg-white px-3 relative z-10">Base Notes</span>
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-amber-300 group-hover:bg-amber-400 transition-colors duration-300"></span>
            </h4>
            <div className="flex flex-wrap justify-center gap-3">
              {blogDetails.notes.base.map((note, i) => (
                <Link to={`/notes/${note.slug}`} className="group" key={i}>
                  <div className="flex flex-col items-center w-16 transition-transform duration-300 hover:scale-105">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-1 border-2 border-amber-300 group-hover:border-amber-400 shadow-sm">
                      <img
                        src={note.profilePic.url}
                        alt={note.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <span className="text-[10px] text-center font-medium text-gray-700 group-hover:text-amber-800 transition-colors duration-300">
                      {note.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description moved below notes */}
      <div className="mb-10">
        <p
          className="text-gray-700 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blogDetails.description1 }}
        />
      </div>

      {/* Full-width Image */}
      <div className="mb-10 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 hover:shadow-xl hover:-translate-y-1">
        <img
          src={blogDetails.image2.url}
          alt="Amouage Purpose 50 Perfume"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Detailed Description */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">
          Fragrance Journey
        </h3>
        <p
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blogDetails.description2 }}
        />
      </div>
    </div>
  );
}
