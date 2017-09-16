import React from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line
import "./custom.css";


class Custom extends React.Component {
  constructor(props) {
    super(props);
//    this.state = {rolling: false};
  }
  componentWillReceiveProps(nextProps) {
  //  if (this.props.date !== nextProps.date) {
//      this.setState({rolling: false});
//      setTimeout(() => {this.setState({rolling: true})}, 0);
//    }
  }

  render() {
    const { value, rollHandle, output } = this.props;

    return (
    <form id="dice-demo-form">
      <input value={value}/>
      <output class="custom-roll-result">
        <span class="placeholder">{output}</span>
      </output>
    </form>
    );
  }
};

Custom.propTypes = {
  value: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rollHandle: PropTypes.func.isRequired,
};

export default Custom;
