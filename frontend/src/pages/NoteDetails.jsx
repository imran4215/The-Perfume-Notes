import React, { useEffect } from "react";
import NoteDetailsSection1 from "../componenets/noteDetailsComponents/NoteDetailsSection1";
import NoteDetailsSection2 from "../componenets/noteDetailsComponents/NoteDetailsSection2";
import useNoteDataStore from "../store/NoteDataStore";
import { useParams } from "react-router-dom";
import Loading from "../componenets/Loading";
import Error404 from "../componenets/Error404";
import PageNotFound from "./PageNotFound";
import { Helmet } from "react-helmet-async";

function NoteDetails() {
  const { slug } = useParams();
  const { noteDetailsData, fetchNoteDetailsData, loading, error } =
    useNoteDataStore();
  useEffect(() => {
    fetchNoteDetailsData(slug);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 error={error} />;
  }

  if (!noteDetailsData) {
    return <PageNotFound />;
  }

  const noteSlug = noteDetailsData.slug;
  const noteName = noteDetailsData.name;

  return (
    <div>
      {/* Meta ags for SEO */}
      <Helmet>
        <title>{noteDetailsData.metaTitle || noteName} </title>
        <meta
          name="description"
          content={`${noteDetailsData.metaDescription || noteName}`}
        />
        <meta
          property="og:title"
          content={`${noteDetailsData.metaTitle || noteName}`}
        />
        <meta
          property="og:description"
          content={` ${noteDetailsData.metaDescription || noteName}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://theperfumenotes.com/notes/${noteSlug}`}
        />
      </Helmet>

      <NoteDetailsSection1 noteDetails={noteDetailsData} />
      <NoteDetailsSection2 noteSlug={noteSlug} noteName={noteName} />
    </div>
  );
}

export default NoteDetails;
