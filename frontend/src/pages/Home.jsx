import { Helmet } from "react-helmet-async";
import HeroSlider from "../componenets/homeComponenets/HeroSlider";
import Body from "../componenets/homeComponenets/Body";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | The Perfume Notes</title>
        <meta
          name="description"
          content="Welcome to YourBrandName – discover amazing content, blogs, and more!"
        />

        <meta property="og:title" content="Home | The Perfume Notes" />
        <meta
          property="og:description"
          content="Explore trending blogs and featured content on The Perfume Notes."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theperfumenotes.com/" />
      </Helmet>

      <HeroSlider />
      <Body />
    </div>
  );
}
