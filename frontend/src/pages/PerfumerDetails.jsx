import React, { useEffect } from "react";
import PerfumerDetailsSection1 from "../componenets/perfumerDetailsComponenets/PerfumerDetailsSection1";
import PerfumerDetailsSection2 from "../componenets/perfumerDetailsComponenets/PerfumerDetailsSection2";
import usePerfumerDataStore from "../store/PerfumerDataStore";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import PageNotFound from "./PageNotFound";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function PerfumerDetails() {
  const { slug } = useParams();
  const { perfumerDetailsData, fetchPerfumerDetailsData, loading, error } =
    usePerfumerDataStore();

  useEffect(() => {
    fetchPerfumerDetailsData(slug);
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error404 error={error} />;
  }

  if (!perfumerDetailsData) {
    return <PageNotFound />;
  }

  return (
    <div>
      {/* Meta tags for SEO */}
      <Helmet>
        <title>
          {perfumerDetailsData.name} | Master Perfumer Profile & Creations
        </title>
        <meta
          name="description"
          content={`Learn about ${perfumerDetailsData.name}, the creative mind behind exceptional fragrances. Discover their creations and contributions.`}
        />
        <meta
          property="og:title"
          content={`${perfumerDetailsData.name} | Perfumer Profile`}
        />
        <meta
          property="og:description"
          content={`Explore the biography, style, and fragrance creations of perfumer ${perfumerDetailsData.name}.`}
        />
        <meta property="og:type" content="profile" />
        <meta
          property="og:url"
          content={`https://theperfumenotes.com/perfumers/${perfumerDetailsData.slug}`}
        />
      </Helmet>

      <PerfumerDetailsSection1 perfumerDetails={perfumerDetailsData} />
      <PerfumerDetailsSection2 perfumerDetails={perfumerDetailsData} />
    </div>
  );
}

export default PerfumerDetails;
