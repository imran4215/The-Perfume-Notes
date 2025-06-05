import React from "react";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInfoCircle,
  FaEnvelope,
  FaPinterest,
} from "react-icons/fa";
import {
  MdEmail,
  MdOutlineLibraryBooks,
  MdPeople,
  MdScience,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaFacebook size={18} />,
      url: "https://www.facebook.com/theperfumenotes",
    },
    { icon: <FaTwitter size={18} />, url: "https://x.com/NotesPerfu46349" },
    {
      icon: <FaPinterest size={18} />,
      url: "https://www.pinterest.com/theperfumenotes/",
    },
    {
      icon: <FaLinkedin size={18} />,
      url: "https://www.linkedin.com/company/the-perfume-notes/",
    },
  ];

  const resourceLinks = [
    {
      title: "Legacy",
      icon: <MdOutlineLibraryBooks className="mr-2" />,
      links: [
        {
          name: "About Us",
          path: "/about-us",
        },
        { name: "Contact Us", path: "/contact-us" },
      ],
    },
    {
      title: "Perfume Basics",
      icon: <MdPeople className="mr-2" />,
      links: [
        { name: "EDT vs EDP", path: "*" },
        { name: "EDP VS EDC", path: "*" },
        { name: "EDP VS PARFUM", path: "*" },
      ],
    },
    {
      title: "Perfume Types",
      icon: <MdScience className="mr-2" />,
      links: [
        { name: "Mens Perfume", path: "/*" },
        { name: "Womens Perfume", path: "/*" },
        { name: "Unisex Perfume", path: "/*" },
        { name: "Niche Perfumes", path: "/*" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 pl-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mx-3 mr-5">
          {/* Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="flex items-center mb-4">
              <FaFlask className="text-[#c8102e] text-2xl" />
              <h2 className="text-2xl font-bold">THE PERFUME NOTE</h2>
            </div>
            <p className="text-gray-400 mb-4">
              Perfume Guides to Notes, Accords & Community for Fragrance Lovers
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Resource Links */}
          {resourceLinks.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="col-span-1 ml-10"
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                {section.icon}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors flex items-center"
                    >
                      <span className="w-2 h-2 bg-[#c8102e] rounded-full mr-2"></span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="col-span-1 md:mt-5"
          >
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <MdEmail className="mr-2" />
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-4">
              Get the latest tutorials, recipes, and industry insights
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#c8102e]"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#c8102e] hover:bg-[#a00d26] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 border-t border-gray-800"
        ></motion.div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-gray-500 text-sm mb-4 md:mb-0"
          >
            &copy; {new Date().getFullYear()} Perfume Craft. All educational
            content.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex space-x-6"
          >
            <Link
              to="/privacy-policy"
              className="text-gray-400 hover:text-white text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-&-conditions"
              className="text-gray-400 hover:text-white text-sm"
            >
              Terms & Conditions
            </Link>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
