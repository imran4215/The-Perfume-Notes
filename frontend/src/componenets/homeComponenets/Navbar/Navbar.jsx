import React from "react";
import UpperNavbar from "./UpperNavbar";
import LowerNavbar from "./LowerNavbar";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50">
      <UpperNavbar />
      <LowerNavbar />
    </header>
  );
};

export default Navbar;
