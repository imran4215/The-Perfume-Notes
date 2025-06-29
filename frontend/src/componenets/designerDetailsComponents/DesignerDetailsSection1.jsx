import React from "react";

export default function DesignerDetailsSection1({ designerDetails }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <p
          className="border border-gray-300 p-4 text-lg md:text-xl text-black leading-relaxed text-justify"
          dangerouslySetInnerHTML={{ __html: designerDetails.description }}
        ></p>
      </div>
    </div>
  );
}
