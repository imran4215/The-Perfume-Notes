import React from "react";
import { Link } from "react-router-dom";

export default function BlogDetailsSection2({ blogDetails = {} }) {
  const topNotes = blogDetails?.notes?.top || [];
  const middleNotes = blogDetails?.notes?.middle || [];
  const baseNotes = blogDetails?.notes?.base || [];

  return (
    <div className="max-w-4xl mx-auto md:px-4 px-6 py-12">
      {/* Top Details Paragraph */}
      {blogDetails?.title && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {blogDetails.title}
          </h2>
        </div>
      )}

      {/* Notes Section */}
      {(topNotes.length > 0 ||
        middleNotes.length > 0 ||
        baseNotes.length > 0) && (
        <div className="mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center relative pb-1">
            Fragrance Notes
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-rose-500 rounded-full"></span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {/* Top Notes */}
            {topNotes.length > 0 && (
              <NoteCard
                title="Top Notes"
                notes={topNotes}
                borderColor="border-amber-400"
                textColor="text-amber-600"
                hoverColor="group-hover:bg-amber-300"
              />
            )}

            {/* Middle Notes */}
            {middleNotes.length > 0 && (
              <NoteCard
                title="Middle Notes"
                notes={middleNotes}
                borderColor="border-rose-400"
                textColor="text-rose-600"
                hoverColor="group-hover:bg-rose-300"
              />
            )}

            {/* Base Notes */}
            {baseNotes.length > 0 && (
              <NoteCard
                title="Base Notes"
                notes={baseNotes}
                borderColor="border-amber-700"
                textColor="text-amber-800"
                hoverColor="group-hover:bg-amber-400"
              />
            )}
          </div>
        </div>
      )}

      {/* Description 1 */}
      {blogDetails?.description1 && (
        <div className="mb-10">
          <p
            className="text-gray-700 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogDetails.description1 }}
          />
        </div>
      )}

      {/* Full-width Image */}
      {blogDetails?.image2?.url && (
        <div className="mb-10 rounded-lg overflow-hidden shadow-lg transition-transform duration-500 hover:shadow-xl hover:-translate-y-1">
          <img
            src={blogDetails.image2.url}
            alt="Perfume Visual"
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Description 2 */}
      {blogDetails?.description2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Fragrance Journey
          </h3>
          <p
            className="text-gray-600 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogDetails.description2 }}
          />
        </div>
      )}
    </div>
  );
}

// Reusable Note Card component
function NoteCard({ title, notes, borderColor, textColor, hoverColor }) {
  return (
    <div
      className={`group bg-white p-4 rounded-lg shadow hover:shadow-md transition-transform duration-300 hover:-translate-y-0.5 border-t-4 ${borderColor}`}
    >
      <h4
        className={`font-semibold text-base text-center ${textColor} mb-4 relative`}
      >
        <span className="bg-white px-3 relative z-10">{title}</span>
        <span
          className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-opacity-50 ${hoverColor} transition-colors duration-300`}
        ></span>
      </h4>
      <div className="flex flex-wrap justify-center gap-3">
        {notes.map((note, i) => (
          <Link to={`/notes/${note?.slug || ""}`} className="group" key={i}>
            <div className="flex flex-col items-center w-16 transition-transform duration-300 hover:scale-105">
              <div
                className={`w-12 h-12 rounded-full overflow-hidden mb-1 border-2 ${borderColor} group-hover:${hoverColor} shadow-sm`}
              >
                <img
                  src={note?.profilePic?.url || "/placeholder.jpg"}
                  alt={note?.name || "Note"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-[10px] text-center font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                {note?.name || ""}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
