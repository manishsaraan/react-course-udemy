import React from "react";

const withClass = (WrappendComponent, className) => {
  return props => (
    <div className={className}>
      <WrappendComponent />
    </div>
  );
};

export default withClass;
