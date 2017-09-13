import React from "react";
import PropTypes from "prop-types";

const D20 = props => {
  const { value } = props;

  const handleClick = () => {};

  return (
    <div className="content">
      <div className="die" id="d20" onClick={handleClick} value={value}>
        <figure className="face face-1" />
        <figure className="face face-2" />
        <figure className="face face-3" />
        <figure className="face face-4" />
        <figure className="face face-5" />
        <figure className="face face-6" />
        <figure className="face face-7" />
        <figure className="face face-8" />
        <figure className="face face-9" />
        <figure className="face face-10" />
        <figure className="face face-11" />
        <figure className="face face-12" />
        <figure className="face face-13" />
        <figure className="face face-14" />
        <figure className="face face-15" />
        <figure className="face face-16" />
        <figure className="face face-17" />
        <figure className="face face-18" />
        <figure className="face face-19" />
        <figure className="face face-20" />
      </div>
    </div>
  );
};

D20.propTypes = {
  value: PropTypes.string.isRequired
};

export default D20;
