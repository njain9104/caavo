import React from "react";

const Fallback = (props) => {
  const { error } = props;
  return (
    <>
      <p>Some error occured, please try again later</p>
      <p>Error Details: {error.message}</p>
    </>
  );
};

export default Fallback;
