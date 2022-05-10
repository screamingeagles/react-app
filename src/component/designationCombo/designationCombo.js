import './designationCombo.css';
import React from 'react';

class designationComboComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      desig: '',
      value: this.props.designationValue
    };
  }

  fetchData() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'false');
    headers.append('GET', 'POST', 'OPTIONS');

    let params = {
      headers: headers,
      method: "GET"
    }

    fetch('http://localhost:5050/api/DESIGNATION', params)
      .then((response) => { return response.json(); })
      .then((obj) => {
        this.setState(prevState => ({
          ...prevState.value,
          desig: obj
        }));
      })
      .catch(err => { console.log(err); });
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.designationValue !== this.props.designationValue) {
      this.setState(prevState => ({
        ...prevState.desig,
        value: this.props.designationValue
      }));
    }
  }

  setDepartmentValue(event) {
    this.setState({ value: event.target.value }, function () {
      this.props.childToParent(event.target.value);
    });
  }

  render() {
    const designationRows = this.state.desig && this.state.desig.map((link) =>
      <option key={link.ID} value={link.ID}>{link.NAME}</option>
    );

    return (
      <select className="custom-select rounded-0" onChange={(e) => this.setDepartmentValue(e)}
        value={this.state.value}
        id="SelectDesignation">
        {designationRows}
      </select>
    )
  }
}
export default designationComboComponent;