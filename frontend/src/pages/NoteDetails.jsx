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
  const { noteData, loading, error, fetchNoteData } = useNoteDataStore();
  useEffect(() => {
    fetchNoteData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error404 error={error} />;
  }

  const noteDetails = noteData.find((note) => note.slug === slug);
  if (!noteDetails) {
    return <PageNotFound />;
  }

  const noteSlug = noteDetails.slug;
  const noteName = noteDetails.name;

  return (
    <div>
      {/* Meta ags for SEO */}
      <Helmet>
        <title>{noteName} | Perfume Note Details</title>
        <meta
          name="description"
          content={`Explore in-depth details about the perfume note "${noteName}", including its characteristics and uses.`}
        />
        <meta
          property="og:title"
          content={`${noteName} | Perfume Note Details`}
        />
        <meta
          property="og:description"
          content={`Discover everything about the note "${noteName}" used in fragrances.`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://theperfumenotes.com/notes/${noteSlug}`}
        />
      </Helmet>

      <NoteDetailsSection1 noteDetails={noteDetails} />
      <NoteDetailsSection2 noteSlug={noteSlug} noteName={noteName} />
    </div>
  );
}

export default NoteDetails;
