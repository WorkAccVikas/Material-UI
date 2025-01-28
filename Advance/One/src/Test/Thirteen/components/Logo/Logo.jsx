import React from "react";

const large =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjsScWYmyfPv3XdkNdEFVJ1wlDKMOgcSWUcg&s";

const small = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjBFTLzuTy7zXsnhyWF-lfLN-znU0kNfeodg&s`;

const Logo = ({ collapsed }) => {
  return (
    <div style={{ textAlign: "center", padding: "16px" }}>
      {collapsed ? (
        <img
          //   src="/logo-small.png" // Replace with your small logo path
          src={small}
          alt="Logo"
          style={{ maxWidth: "40px", maxHeight: "40px" }}
        />
      ) : (
        <img
          //   src="/logo.png" // Replace with your full logo path
          src={large}
          alt="Logo"
          style={{ maxWidth: "100%", maxHeight: "50px" }}
        />
      )}
    </div>
  );
};

export default Logo;
