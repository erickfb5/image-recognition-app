import React from "react";

const Navigation = ({ onRouteChange, route }) => {
  return (
    <>
      {route === `signin` ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange(`register`)}
            className="f3 link dim black underline pa3 pointer"
          >
            Register
          </p>
        </nav>
      ) : route === `home` ? (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange(`signin`)}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign Out
          </p>
        </nav>
      ) : (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => onRouteChange(`signin`)}
            className="f3 link dim black underline pa3 pointer"
          >
            Sign In
          </p>
        </nav>
      )}
    </>
  );
};

export default Navigation;
