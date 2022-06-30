import React from "react";

const Rank = () => {
  const message = "Erick, your current rank is:";
  const rankNumber = "#5";
  return (
    <div className="center">
      <div className="white f3">{message}</div>
      <div className="white f3">{rankNumber}</div>
    </div>
  );
};

export default Rank;
