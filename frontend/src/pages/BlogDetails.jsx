import BlogDetailsSection1 from "../componenets/blogDetailsComponents/BlogDetailsSection1";
import BlogDetailsSection2 from "../componenets/blogDetailsComponents/BlogDetailsSection2";
import useBlogDataStore from "../store/BlogDataStore";
import { useParams } from "react-router-dom";
import BlogDetailsSection3 from "../componenets/blogDetailsComponents/BlogDetailsSection3";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import PageNotFound from "./PageNotFound";
import { useEffect } from "react";
import CommentSection from "../componenets/blogDetailsComponents/CommentSection";
import AuthorSection from "../componenets/blogDetailsComponents/AuthorSection";

import { Helmet } from "react-helmet-async";

export default function BlogDetails() {
  const { blogData, fetchBlogData, loading, error } = useBlogDataStore();
  const { slug } = useParams();

  useEffect(() => {
    fetchBlogData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  const blogDetails = blogData.find((blog) => blog.slug === slug);
  if (!blogDetails) {
    return <PageNotFound />;
  }

  const brandName = blogDetails.brand?.name || "My Blog";
  const author = blogDetails.author;
  const title = blogDetails.title;
  const description =
    blogDetails.description1 || blogDetails.content?.slice(0, 150) + "...";
  const image =
    blogDetails.image1.url || "https://yourblog.com/default-image.jpg";
  const url = `http://localhost:5173/blogs/${blogDetails.slug}`;

  return (
    <div>
      {/* ✅ Helmet meta tags */}
      <Helmet>
        <title>
          {title} | {brandName}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
      </Helmet>

      {/* Actual Blog Content */}
      <BlogDetailsSection1 blogDetails={blogDetails} />
      <BlogDetailsSection2 blogDetails={blogDetails} />
      <AuthorSection author={author} />
      <CommentSection blogDetails={blogDetails} />
      <BlogDetailsSection3 blogData={blogData} brandName={brandName} />
    </div>
  );
}
