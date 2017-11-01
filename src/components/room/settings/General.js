import React from "react";
import Drawer from "material-ui/Drawer";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

export default class GeneralSettings extends React.Component {
  static propTypes = {
    showGeneralSettings: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired
  };

  loadFile = data => {
    this.props.load(data);
  };

  onDrop(files) {
    const file = files[0];
    const fr = new FileReader();
    fr.onload = (e) => {
      const lines = e.target.result;
      const newArr = JSON.parse(lines);
      this.loadFile(newArr);
    };
    fr.readAsText(file);
  }

  render() {
    return (
      <div>
        <Drawer open={this.props.showGeneralSettings} openSecondary={true}>
          <div style={{padding:20}}>
            <button onClick={this.props.close}>Close</button>
            <br/>
            <button onClick={this.props.save}>Save room to preset file</button>
            <br/>
            <Dropzone onDrop={this.onDrop.bind(this)}>
              <p>Load data for this room from preset file.</p>
            </Dropzone>
          </div>
        </Drawer>
      </div>
    );
  }
}
