import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("");

    try {
      const response = await fetch(`${BASE_URL}/api/feedback/addFeedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.message || "Failed to send message.");
      }
    } catch (error) {
      setStatus("An error occurred while sending the message.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Meta tags for SEO */}
      <Helmet>
        <title>Contact Us | The Perfume Notes</title>
        <meta
          name="description"
          content="Reach out to The Perfume Notes for inquiries, feedback, or collaborations. We'd love to hear from you!"
        />
        <meta property="og:title" content="Contact Us | The Perfume Notes" />
        <meta
          property="og:description"
          content="Reach out to The Perfume Notes for inquiries, feedback, or collaborations."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://theperfumenotes.com/contact-us"
        />
      </Helmet>

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif tracking-tight"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Get in <span className="text-amber-600">Touch</span>
        </motion.h1>
        <p className="text-lg md:text-xl text-gray-600">
          We'd love to hear from you! Whether you have questions about our
          blogs, need assistance, or just want to say hello, our team is here to
          help.
        </p>
      </motion.div>

      {/* Contact Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Email Section */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-amber-200"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                className="p-3 bg-amber-100 rounded-full text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300"
                whileHover={{ rotate: 15 }}
              >
                <FiMail className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                  Email Us
                </h3>
                <div className="space-y-1">
                  <a
                    href="mailto:theperfumenotes@gmail.com"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    theperfumenotes@gmail.com
                  </a>
                  <a
                    href="mailto:editor@theperfumenotes.com"
                    className="text-gray-600 hover:text-amber-600 transition-colors duration-200 flex items-center"
                  >
                    <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    editor@theperfumenotes.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Address Section */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-amber-200"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                className="p-3 bg-amber-100 rounded-full text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300"
                whileHover={{ rotate: 15 }}
              >
                <FiMapPin className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                  Our Location
                </h3>
                <p className="text-gray-600 flex items-center">
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Tampa, Florida, United States
                </p>
              </div>
            </div>
          </motion.div>

          {/* Phone Section */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-amber-200"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                className="p-3 bg-amber-100 rounded-full text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300"
                whileHover={{ rotate: 15 }}
              >
                <FiPhone className="h-6 w-6" />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-200">
                  Call Us
                </h3>
                <a
                  href="tel:+1234567890"
                  className="text-gray-600 hover:text-amber-600 transition-colors duration-200 flex items-center"
                >
                  <span className="w-2 h-2 bg-amber-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Map */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-amber-200"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d225718.1303216554!2d-82.5798736!3d27.9944027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b782b3b9d1e1%3A0xa75f1389af96b463!2sTampa%2C%20FL%2C%20USA!5e0!3m2!1sen!2s!4v1717100000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="hover:scale-[1.01] transition-transform duration-500"
          ></iframe>
        </motion.div>
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-transparent hover:border-amber-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Send Us a Message
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-gray-400"
                  placeholder="John Doe"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Your Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-gray-400"
                  placeholder="john@example.com"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-gray-400"
              placeholder="How can we help?"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 hover:border-gray-400"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-amber-600 text-white py-3 px-6 rounded-md hover:bg-amber-700 transition-colors duration-200 font-medium flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <FiSend className="h-4 w-4" />
                Send Message
              </>
            )}
          </motion.button>
          {status && (
            <motion.p
              className="text-center text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {status.includes("success") ? (
                <span className="text-green-600 flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {status}
                </span>
              ) : (
                <span className="text-red-600 flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {status}
                </span>
              )}
            </motion.p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
