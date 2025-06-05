import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FiChevronDown,
  FiChevronRight,
  FiPlus,
  FiEdit2,
  FiList,
  FiHome,
  FiMenu,
  FiX,
  FiGrid,
  FiBook,
  FiUser,
  FiPenTool,
  FiFileText,
  FiFeather,
  FiTag,
} from "react-icons/fi";
import { toast } from "react-toastify";

const SidebarItem = ({ title, icon, items, routes, closeSidebar }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isDashboard = title === "Dashboard";

  const handleClick = (route) => {
    navigate(route);
    closeSidebar();
  };

  return (
    <div>
      <button
        onClick={() => (isDashboard ? handleClick(routes[0]) : setOpen(!open))}
        className={`flex items-center justify-between w-full px-4 py-3 rounded-lg text-left font-medium text-purple-900 hover:bg-purple-100 ${
          open ? "bg-purple-50" : ""
        }`}
      >
        <div className="flex items-center">
          <span className="text-purple-600">{icon}</span>
          <span className="ml-2">{title}</span>
        </div>
        {!isDashboard &&
          (open ? (
            <FiChevronDown className="text-purple-600" />
          ) : (
            <FiChevronRight className="text-purple-600" />
          ))}
      </button>

      {!isDashboard && open && (
        <div className="ml-4 pl-2 mt-1 border-l-2 border-purple-100 space-y-1">
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => handleClick(routes[i])}
              className="flex items-center py-2 px-3 rounded-lg cursor-pointer hover:bg-purple-50 transition group"
            >
              <span className="text-purple-700 opacity-70 group-hover:opacity-100">
                {item.icon}
              </span>
              <span className="ml-2 text-sm text-gray-700 group-hover:text-purple-800">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuthFlag");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const sidebarItems = [
    {
      title: "Dashboard",
      icon: <FiGrid />,
      items: [],
      routes: ["/admin"],
    },
    {
      title: "Blog",
      icon: <FiBook />,
      items: [
        { label: "Add Blog", icon: <FiPlus size={14} /> },
        { label: "All Blogs", icon: <FiList size={14} /> },
      ],
      routes: ["/admin/add-blog", "/admin/all-blogs"],
    },
    {
      title: "Author",
      icon: <FiUser />,
      items: [
        { label: "Add Author", icon: <FiPlus size={14} /> },
        { label: "All Authors", icon: <FiList size={14} /> },
      ],
      routes: ["/admin/add-author", "/admin/all-authors"],
    },
    {
      title: "Designers",
      icon: <FiPenTool />,
      items: [
        { label: "Add Designer", icon: <FiPlus size={14} /> },
        { label: "All Designers", icon: <FiList size={14} /> },
      ],
      routes: ["/admin/add-designer", "/admin/all-designers"],
    },
    {
      title: "Notes",
      icon: <FiFileText />,
      items: [
        { label: "Add Note", icon: <FiPlus size={14} /> },
        { label: "All Notes", icon: <FiList size={14} /> },
      ],
      routes: ["/admin/add-note", "/admin/all-notes"],
    },
    {
      title: "Perfumers",
      icon: <FiFeather />,
      items: [
        { label: "Add Perfumer", icon: <FiPlus size={14} /> },
        { label: "All Perfumers", icon: <FiList size={14} /> },
      ],
      routes: ["/admin/add-perfumer", "/admin/all-perfumers"],
    },
    {
      title: "Category",
      icon: <FiTag />,
      items: [
        { label: "Add Category", icon: <FiPlus size={14} /> },
        { label: "All Categories", icon: <FiList size={14} /> },
      ],
      routes: ["/admin/add-category", "/admin/all-categories"],
    },
  ];

  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      {/* Main Content */}
      <main className="h-full w-full overflow-auto">
        <Outlet />
      </main>

      {/* Topbar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow z-20 flex items-center justify-between px-4 py-3">
        <button onClick={toggleSidebar} className="text-xl text-purple-600">
          {isSidebarOpen ? <FiX /> : <FiMenu />}
        </button>
        <h1 className="text-lg font-bold text-purple-800 flex items-center">
          <span className="bg-purple-100 p-2 rounded-lg mr-2">
            <FiGrid />
          </span>
          Admin Panel
        </h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/")}
            className="text-xl text-purple-600"
            title="Go to main website"
          >
            <FiHome />
          </button>
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-full w-64 bg-white shadow-lg border-r z-30 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-1 p-4 flex flex-col h-full">
          {sidebarItems.map((item, i) => (
            <SidebarItem
              key={i}
              {...item}
              closeSidebar={() => setIsSidebarOpen(false)}
            />
          ))}
        </div>
      </aside>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default AdLayout;
