import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line
import style from "./D20.css";

class D20 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rolling: false };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.setState({ rolling: false });
      setTimeout(() => {
        this.setState({ rolling: true });
      }, 0);
    }
  }

  render() {
    const { value, rollHandle } = this.props;
    const roollingClass = this.state.rolling ? "die rolling" : "die";
    return (
      <div className="roll-20-content">
        <div
          className={roollingClass}
          data-face={value}
          id="d20"
          onClick={rollHandle}
          onDragEnd={rollHandle}
          value={value}
        >
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
  }
}

D20.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rollHandle: PropTypes.func.isRequired
};

export default D20;
