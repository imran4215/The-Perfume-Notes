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
  const { blogDetails, blogData, fetchBlogDetails, loading, error } =
    useBlogDataStore();
  const { slug } = useParams();

  useEffect(() => {
    fetchBlogDetails(slug);
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  if (!blogDetails) {
    return <PageNotFound />;
  }

  const brandName = blogDetails.brand?.name || "My Blog";
  const author = blogDetails.author;
  const title = blogDetails.title;

  return (
    <div>
      {/* Helmet meta tags */}
      <Helmet>
        <title>
          {blogDetails.metaTitle || title} | {brandName}
        </title>
        <meta
          name="description"
          content={blogDetails.metaDescription || title}
        />
        <meta property="og:title" content={blogDetails.metaTitle || title} />
        <meta
          property="og:description"
          content={blogDetails.metaTitle || title}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://theperfumenotes.com/perfume/${blogDetails.slug}`}
        />
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
