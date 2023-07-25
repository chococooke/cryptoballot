import React from "react";

const Loader = ({ size = 40, type }) => {
  return (
    <>
      <div className={`loader ${type}-loader`} style={{ width: `${size}px`, height: `${size}px` }}>
        <div className="loader-line" style={{ borderColor: "currentColor" }}></div>
      </div>
    </>
  );
};

export default Loader;