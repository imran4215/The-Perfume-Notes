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
  const { designerData, fetchDesignerData, loading, error } =
    useDesignerDataStore();

  useEffect(() => {
    fetchDesignerData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  const designerDetails = designerData.find(
    (designer) => designer.slug === slug
  );

  // If designerDetails is not found, return a message
  if (!designerDetails) {
    return <PageNotFound />;
  }
  const brandSlug = designerDetails.slug;
  const brandName = designerDetails.name;

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

      <DesignerDetailsSection1 designerDetails={designerDetails} />
      <DesignerDetailsSection2 brandSlug={brandSlug} brandName={brandName} />
    </div>
  );
}
