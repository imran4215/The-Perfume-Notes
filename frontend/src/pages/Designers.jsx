import { Helmet } from "react-helmet-async";
import DesignersSection1 from "../componenets/designersComponents/DesignersSection1";

export default function Designers() {
  return (
    <div>
      <Helmet>
        <title>Designers | The Perfume Notes</title>
        <meta
          name="description"
          content="Meet our talented and creative designers who bring ideas to life."
        />
        <meta property="og:title" content="Designers | The Perfume Notes" />
        <meta
          property="og:description"
          content="Meet our talented and creative designers who bring ideas to life."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://theperfumenotes.com/designers"
        />
      </Helmet>

      <DesignersSection1 />
    </div>
  );
}
