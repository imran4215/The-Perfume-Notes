import React, { Suspense, lazy, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useBlogDataStore from "./store/BlogDataStore";
import ScrollToTop from "./utils/ScrollToTop";

// Lazy load all your pages and components
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Home = lazy(() => import("./pages/Home"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const Designers = lazy(() => import("./pages/Designers"));
const DesignerDetails = lazy(() => import("./pages/DesignerDetails"));
const Perfumers = lazy(() => import("./pages/Perfumers"));
const PerfumerDetails = lazy(() => import("./pages/PerfumerDetails"));
const Notes = lazy(() => import("./pages/Notes"));
const NoteDetails = lazy(() => import("./pages/NoteDetails"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsCondition = lazy(() => import("./pages/TermsCondition"));
const AuthorDetails = lazy(() => import("./pages/AuthorDetails"));
const Loading = lazy(() => import("./componenets/Loading"));

const AdLayout = lazy(() => import("./adminComponents/AdLayout"));
const Dashboard = lazy(() => import("./adminPages/Dashboard"));
const AddAuthor = lazy(() => import("./adminPages/Author/AddAuthor"));
const AllAuthors = lazy(() => import("./adminPages/Author/AllAuthors"));
const EditAuthor = lazy(() => import("./adminPages/Author/EditAuthor"));
const AddDesigner = lazy(() => import("./adminPages/Designer/AddDesigner"));
const AllDesigners = lazy(() => import("./adminPages/Designer/AllDesigners"));
const EditDesigner = lazy(() => import("./adminPages/Designer/EditDesigner"));
const AddNote = lazy(() => import("./adminPages/Note/AddNote"));
const AddCategory = lazy(() => import("./adminPages/Category/AddCatefory"));
const AllCategories = lazy(() => import("./adminPages/Category/AllCategories"));
const EditCategory = lazy(() => import("./adminPages/Category/EditCategory"));
const AddPerfumer = lazy(() => import("./adminPages/Perfumer/AddPerfumer"));
const AllPerfumers = lazy(() => import("./adminPages/Perfumer/AllPerfumers"));
const EditPerfumer = lazy(() => import("./adminPages/Perfumer/EditPerfumer"));
const AllNotes = lazy(() => import("./adminPages/Note/AllNotes"));
const EditNote = lazy(() => import("./adminPages/Note/EditNote"));
const AddBlog = lazy(() => import("./adminPages/Blog/AddBlog"));
const AllBlogs = lazy(() => import("./adminPages/Blog/AllBlogs"));
const EditBlog = lazy(() => import("./adminPages/Blog/EditBlog"));
const AdminPrivateRoute = lazy(() =>
  import("./adminComponents/AdminPrivateRoute")
);
const Login = lazy(() => import("./adminPages/Login"));
const Layout = lazy(() => import("./componenets/Layout"));

export default function App() {
  const { fetchBlogData } = useBlogDataStore();

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  return (
    <Router>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={2000} />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/perfume/:slug" element={<BlogDetails />} />
            <Route path="/designers" element={<Designers />} />
            <Route path="/designers/:slug" element={<DesignerDetails />} />
            <Route path="/perfumers" element={<Perfumers />} />
            <Route path="/perfumers/:slug" element={<PerfumerDetails />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/notes/:slug" element={<NoteDetails />} />
            <Route path="/author/:slug" element={<AuthorDetails />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-&-conditions" element={<TermsCondition />} />
          </Route>

          <Route path="/*" element={<ComingSoon />} />

          {/* Admin routes */}
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
            <Route
              path="/admin/edit-designer/:slug"
              element={<EditDesigner />}
            />
            <Route path="/admin/add-category" element={<AddCategory />} />
            <Route path="/admin/all-categories" element={<AllCategories />} />
            <Route path="/admin/edit-category/:id" element={<EditCategory />} />
            <Route path="/admin/add-perfumer" element={<AddPerfumer />} />
            <Route path="/admin/all-perfumers" element={<AllPerfumers />} />
            <Route
              path="/admin/edit-perfumer/:id/:slug"
              element={<EditPerfumer />}
            />
            <Route path="/admin/add-note" element={<AddNote />} />
            <Route path="/admin/all-notes" element={<AllNotes />} />
            <Route path="/admin/edit-note/:id/:slug" element={<EditNote />} />
            <Route path="/admin/add-blog" element={<AddBlog />} />
            <Route path="/admin/all-blogs" element={<AllBlogs />} />
            <Route path="/admin/edit-blog/:slug" element={<EditBlog />} />
          </Route>

          <Route path="/admin/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
