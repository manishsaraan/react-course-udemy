import React from "react";

const withClass = (WrappendComponent, className) => {
  return props => (
    <div className={className}>
      <WrappendComponent {...props} />
    </div>
  );
};

export default withClass;
