import React, { useEffect, useState } from "react";
import {
  FiBook,
  FiFileText,
  FiFeather,
  FiPenTool,
  FiUser,
  FiClock,
} from "react-icons/fi";
import useBlogDataStore from "../store/BlogDataStore";
import useAdminDataStore from "../store/AdminDataStore";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import { Link } from "react-router-dom";

// Reusable StatCard Component
const StatCard = ({ title, count, icon: Icon, color }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow p-6 border-l-4 hover:shadow-md transition-shadow border-${color}-500`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{count}</h3>
        </div>
        <div className={`bg-${color}-100 p-3 rounded-full`}>
          <Icon className={`text-${color}-600 text-xl`} />
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const { blogData } = useBlogDataStore();

  const { stats, fetchDashboardData, loading, error } = useAdminDataStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  const statCards = [
    { title: "Total Blogs", count: stats.blogs, icon: FiBook, color: "purple" },
    {
      title: "Total Notes",
      count: stats.notes,
      icon: FiFileText,
      color: "blue",
    },
    {
      title: "Total Perfumers",
      count: stats.perfumers,
      icon: FiFeather,
      color: "green",
    },
    {
      title: "Total Designers",
      count: stats.designers,
      icon: FiPenTool,
      color: "yellow",
    },
    {
      title: "Total Authors",
      count: stats.authors,
      icon: FiUser,
      color: "red",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <StatCard key={idx} {...card} />
        ))}
      </div>

      {/* Recent Blogs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <FiClock className="mr-2 text-purple-600" />
            Recently Added Blogs
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Title", "Author", "Date Added", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogData?.map((blog, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {blog.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {blog.author?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <Link
                      to={`/admin/edit-blog/${blog._id}`}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <Link
            to="/admin/all-blogs"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
