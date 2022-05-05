import React from "react";

const Spinner = () => {
  return (
    <div className="lds-ripple-container">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
