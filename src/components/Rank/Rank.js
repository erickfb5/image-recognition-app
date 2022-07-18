import React from "react";

const Rank = ({ user }) => {
  const message = `${user.name}, your current rank is: _ ${user.entries}`;
  return (
    <div className="center">
      <div className="white f3">{message}</div>
    </div>
  );
};

export default Rank;
