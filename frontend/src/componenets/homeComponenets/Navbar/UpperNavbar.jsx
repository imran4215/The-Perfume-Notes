import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaPinterest } from "react-icons/fa";

const UpperNavbar = () => {
  const socialIcons = [
    {
      icon: <FaFacebook className="h-5 w-5 md:h-6 md:w-6" />,
      url: "https://www.facebook.com/theperfumenotes",
      label: "Facebook",
    },
    {
      icon: <FaTwitter className="h-5 w-5 md:h-6 md:w-6" />,
      url: "https://x.com/NotesPerfu46349",
      label: "Twitter",
    },
    {
      icon: <FaPinterest className="h-5 w-5 md:h-6 md:w-6" />,
      url: "https://www.pinterest.com/theperfumenotes/",
      label: "Pinterest",
    },
    {
      icon: <FaLinkedin className="h-5 w-5 md:h-6 md:w-6" />,
      url: "https://www.linkedin.com/company/the-perfume-notes/",
      label: "LinkedIn",
    },
  ];

  return (
    <nav className="bg-white text-gray-800 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Increased height container with centered items */}
        <div className="flex justify-between items-center h-16 md:h-12 py-8">
          {/* Larger Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center"
          >
            <img
              src="/logo.png"
              alt="The Perfume Notes"
              className="h-[44px] md:h-12 w-auto cursor-pointer"
            />
          </motion.div>

          {/* Desktop View - Contact and Social Icons */}
          <div className="hidden sm:flex items-center space-x-8">
            <div className="flex items-center space-x-6"></div>

            <div className="flex space-x-4 md:space-x-5">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-600 hover:text-[#c8102e] transition-colors flex items-center justify-center"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Mobile View - All Social Icons with Horizontal Scroll */}
          <div className="sm:hidden flex items-center h-full">
            <div className="flex overflow-x-auto py-2 px-2 no-scrollbar items-center gap-x-2">
              {socialIcons
                .filter((social) =>
                  ["Facebook", "LinkedIn"].includes(social.label)
                )
                .map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-600 hover:text-[#c8102e] transition-colors p-1.5 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    {React.cloneElement(social.icon, { size: 18 })}
                  </motion.a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UpperNavbar;
