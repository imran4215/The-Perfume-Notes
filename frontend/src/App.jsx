import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ComingSoon from "./pages/ComingSoon";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import useBlogDataStore from "./store/BlogDataStore";
import { useEffect } from "react";
import Designers from "./pages/Designers";
import DesignerDetails from "./pages/DesignerDetails";
import ScrollToTop from "./utils/ScrollToTop";
import Layout from "./componenets/Layout";
import Perfumers from "./pages/Perfumers";
import PerfumerDetails from "./pages/PerfumerDetails";
import Notes from "./pages/Notes";
import NoteDetails from "./pages/NoteDetails";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import AuthorDetails from "./pages/AuthorDetails";
import AdLayout from "./adminComponents/AdLayout";
import Dashboard from "./adminPages/Dashboard";
import AddAuthor from "./adminPages/Author/AddAuthor";
import AllAuthors from "./adminPages/Author/AllAuthors";
import EditAuthor from "./adminPages/Author/EditAuthor";
import AddDesigner from "./adminPages/Designer/AddDesigner";
import AllDesigners from "./adminPages/Designer/AllDesigners";
import EditDesigner from "./adminPages/Designer/EditDesigner";
import AddNote from "./adminPages/Note/AddNote";
import AddCategory from "./adminPages/Category/AddCatefory";
import AllCategories from "./adminPages/Category/AllCategories";
import EditCategory from "./adminPages/Category/EditCategory";
import AddPerfumer from "./adminPages/Perfumer/AddPerfumer";
import AllPerfumers from "./adminPages/Perfumer/AllPerfumers";
import EditPerfumer from "./adminPages/Perfumer/EditPerfumer";
import AllNotes from "./adminPages/Note/AllNotes";
import EditNote from "./adminPages/Note/EditNote";
import AddBlog from "./adminPages/Blog/AddBlog";
import AllBlogs from "./adminPages/Blog/AllBlogs";
import EditBlog from "./adminPages/Blog/EditBlog";
import AdminPrivateRoute from "./adminComponents/AdminPrivateRoute";
import Login from "./adminPages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";

export default function App() {
  const { fetchBlogData } = useBlogDataStore();
  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/designers/:slug" element={<DesignerDetails />} />
          <Route path="/perfumers" element={<Perfumers />} />
          <Route path="/perfumers/:slug" element={<PerfumerDetails />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:slug" element={<NoteDetails />} />
          <Route path="/authors/:slug" element={<AuthorDetails />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-&-conditions" element={<TermsCondition />} />
        </Route>
        <Route path="/*" element={<ComingSoon />} />

        {/* Admin pages */}
        <Route
          element={
            <AdminPrivateRoute>
              <AdLayout />
            </AdminPrivateRoute>
          }
        >
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/add-author" element={<AddAuthor />} />
          <Route path="/admin/all-authors" element={<AllAuthors />} />
          <Route path="/admin/edit-author/:id" element={<EditAuthor />} />
          <Route path="/admin/add-designer" element={<AddDesigner />} />
          <Route path="/admin/all-designers" element={<AllDesigners />} />
          <Route path="/admin/edit-designer/:id" element={<EditDesigner />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path="/admin/all-categories" element={<AllCategories />} />
          <Route path="/admin/edit-category/:id" element={<EditCategory />} />
          <Route path="/admin/add-perfumer" element={<AddPerfumer />} />
          <Route path="/admin/all-perfumers" element={<AllPerfumers />} />
          <Route path="/admin/edit-perfumer/:id" element={<EditPerfumer />} />
          <Route path="/admin/add-note" element={<AddNote />} />
          <Route path="/admin/all-notes" element={<AllNotes />} />
          <Route path="/admin/edit-note/:id" element={<EditNote />} />
          <Route path="/admin/add-blog" element={<AddBlog />} />
          <Route path="/admin/all-blogs" element={<AllBlogs />} />
          <Route path="/admin/edit-blog/:id" element={<EditBlog />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
