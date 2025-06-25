import { useParams } from "react-router-dom";
import useDesignerDataStore from "../store/DesignerDataStore";
import DesignerDetailsSection2 from "../componenets/designerDetailsComponents/DesignerDetailsSection2";
import DesignerDetailsSection1 from "../componenets/designerDetailsComponents/DesignerDetailsSection1";
import { useEffect } from "react";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import PageNotFound from "./PageNotFound";
import { Helmet } from "react-helmet-async";

export default function DesignersDetails() {
  const { slug } = useParams();
  const { designerDetailsData, fetchDesignerDetailsData, loading, error } =
    useDesignerDataStore();

  useEffect(() => {
    fetchDesignerDetailsData(slug);
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  // If designerDetailsData is not found, return a message
  if (!designerDetailsData) {
    return <PageNotFound />;
  }
  const brandSlug = designerDetailsData.slug;
  const brandName = designerDetailsData.name;

  return (
    <div>
      {/* Meta tags for SEO */}
      <Helmet>
        <title>{brandName} | Designer Details</title>
        <meta
          name="description"
          content={`Explore details about designer ${brandName}, including their background and creations.`}
        />
        <meta property="og:title" content={`${brandName} | Designer Details`} />
        <meta
          property="og:description"
          content={`Discover the story and works of ${brandName}.`}
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content={`https://theperfumenotes.com/designers/${brandSlug}`}
        />
      </Helmet>

      <DesignerDetailsSection1 designerDetails={designerDetailsData} />
      <DesignerDetailsSection2 brandSlug={brandSlug} brandName={brandName} />
    </div>
  );
}
