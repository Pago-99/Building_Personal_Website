import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        textAlign: "center",
        marginTop: "2rem",
        borderTop: "1px solid #ccc",
        paddingTop: "1rem",
      }}
    >
      © {new Date().getFullYear()} Yechan Jeong
    </footer>
  );
};

export default Footer;
