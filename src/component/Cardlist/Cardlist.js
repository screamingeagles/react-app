import './Cardlist.css';
import Designation from '../designationCombo/designationCombo';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import parseISO from 'date-fns/parseISO';

class CardlistComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      staff: null,
      file: null,
      newStaff: {
        staffID: 0,
        FName: '',
        LName: '',
        DesignationID: 0,
        EmiratesID: '',
        EIDExpiry: '',
        FileName: 'Choose file'
      }
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

    fetch('http://localhost:5050/api/staff', params)
      .then((response) => { return response.json(); })
      .then((obj) => { this.setState({ staff: obj }); })
      .catch(err => { console.log(err); });
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(tag, event) {
    if (tag === "FName") {
      this.setState(prevState => ({
        newStaff: {
          ...prevState.newStaff,
          FName: event.target.value
        }
      }));
    }

    if (tag === "LName") {
      this.setState(prevState => ({
        newStaff: {
          ...prevState.newStaff,
          LName: event.target.value
        }
      }));
    }

    if (tag === "EID") {
      this.setState(prevState => ({
        newStaff: {
          ...prevState.newStaff,
          EmiratesID: event.target.value
        }
      }));
    }

    if (tag === "EIDExpiry") {
      this.setState(prevState => ({
        newStaff: {
          ...prevState.newStaff,
          EIDExpiry: event.target.value
        }
      }));
      //console.log("EID Expiry Saved")
    }

    if (tag === "File") {
      //console.log("Saving File")
      this.setState({ file: event.target.files[0] });
      this.setState(prevState => ({
        newStaff: {
          ...prevState.newStaff,
          FileName: event.target.files[0].name
        }
      }));
    }
  }


  async setPopupModal(param) {

    if (param === 0) {

      // open empty
      this.setState(prevState => ({
        newStaff: {
          ...prevState.newStaff,
          FName: '',
          LName: '',
          DesignationID: 0,
          EmiratesID: '',
          EIDExpiry: '',
          FileName: 'Choose file'
        }
      }));
    }
    else {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Credentials', 'false');
      headers.append('GET', 'POST', 'OPTIONS');

      let params = {
        headers: headers,
        method: "GET"
      }

      fetch(`http://localhost:5050/api/Staff/${param}`, params)
        .then((response) => { return response.json(); })
        .then((obj) => {
          //console.log(obj[0]);          
          this.setState(prevState => ({
            newStaff: {
              ...prevState.newStaff,
              staffID: obj[0].STAFF_ID,
              FName: obj[0].FIRST_NAME,
              LName: obj[0].LAST_NAME,
              EmiratesID: obj[0].EMIRATES_ID == null ? '': obj[0].EMIRATES_ID,
              EIDExpiry: obj[0].EID_EXPIRY==null ? '': parseISO(obj[0].EID_EXPIRY),
              DesignationID: obj[0].DESIGNATION_ID,
              FileName: obj[0].MODIFIED_BY
            }
          }));
        })
        .catch(err => { console.log(err); });
    }
  }

  setDateChange = (value) => {
    this.setState(prevState => ({
      newStaff: {
        ...prevState.newStaff,
        EIDExpiry: value
      }
    }), function () { console.log(value); });
  }

  // here get the selected value 
  // from Department component
  getDepartmentValue = (data) => {
    this.setState(prevState => ({
      newStaff: {
        ...prevState.newStaff,
        DesignationID: data
      }
    }));
    // , function(){console.log(this.state.newStaff);} 
  }


  async submitHandler(event) {
    event.preventDefault();

    let formData = new FormData()
    formData.append('file', this.state.file);
    formData.append('StaffID', this.state.newStaff.staffID);
    formData.append('FirstName', this.state.newStaff.FName);
    formData.append('LastName', this.state.newStaff.LName);
    formData.append('Designation', this.state.newStaff.DesignationID);
    formData.append('EmiratesID', this.state.newStaff.EmiratesID);
    formData.append('EIDExpiry', this.state.newStaff.EIDExpiry);
    formData.append('FileName', this.state.newStaff.FileName);

    const response = await fetch('http://localhost:5050/api/Staff/Update', {
      method: 'POST',
      body: formData,
    });

    if (response) {
      this.fetchData();
    }

    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.newStaff)
    };
    fetch('http://localhost:5050/api/Staff/Add', requestOptions)
      .then(response => response.json())
      .then(data => console.log(data.id));*/

    this.setState({
      newStaff: {
        FName: '',
        LName: '',
        EmiratesID: '',
        EIDExpiry: '',
        FileName: ''
      }
    }, function () {
      console.log('data submitted');
    });
  };


  render() {

    const setBackgroundStlye = {
      position: 'relative',
      zIndex: '9999',
    };

    const tableBodyRows = this.state.staff && this.state.staff.map((link) =>
      <tr key={link.STAFF_ID}>
        <td>{link.STAFF_ID}</td>
        <td>{link.FIRST_NAME} {link.LAST_NAME}</td>
        <td>{link.DESIGNATION}</td>
        <td>{link.EMIRATES_ID}</td>
        <td>{link.EID_EXPIRY}</td>
        <td>{link.CREATED_BY}</td>
        <td>{link.CREATION_DATE}</td>
        <td>
          <button type='button' className='btn btn-default' data-toggle='modal' data-target='#modal-lg' onClick={() => this.setPopupModal(link.STAFF_ID)}>
            Update
          </button>
        </td>
      </tr>
    );

    let downloadButton;
    if (this.state.newStaff.FileName !== 'Choose file') {
      let url = `http://localhost:5050/api/file/download/${this.state.newStaff.FileName}`;
      downloadButton = <a href={url}>download</a>;
    } else {
      downloadButton = "";
    }

    return (
      <>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{this.state.staff?.length === 0 ? `no record found` : `${this.state.staff?.length} records found`}</h3>
            <div className="card-tools">
              <div className="input-group input-group-sm" style={{ width: 150 + 'px' }}>
                <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-default">
                    <i className="fas fa-search"></i>
                  </button>
                </div>

              </div>
            </div>
          </div>
          {/* /.card-header */}
          <div className="card-body table-responsive p-0" style={{ height: 300 + 'px' }}>
            <table className="table table-head-fixed text-nowrap">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Designation</th>
                  <th>Emirates ID</th>
                  <th>EID Expiry</th>
                  <th>Created By</th>
                  <th>Creation Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableBodyRows}
              </tbody>
            </table>
          </div>
          {/* /.card-body */}
        </div>

        <button type='button' className='btn btn-default'
          onClick={() => this.setPopupModal(0)}
          data-toggle='modal'
          data-target='#modal-lg'>Save New Staff</button>
        <div className="modal fade show" id="modal-lg" style={{ paddingRight: 17 + 'px' }} aria-modal="true" role="dialog">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">

              <form>
                <div className="modal-header">
                  <h4 className="modal-title">Add New Staff</h4>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">

                  {/* save card body start  */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-primary">
                        <div className="card-header"><h3 className="card-title">Provide Staff Details</h3></div>

                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="InputFirstName">First Name</label>
                                <input type="text" className="form-control" id="InputFirstName"
                                  value={this.state.newStaff.FName} onChange={(e) => this.handleChange("FName", e)}
                                  placeholder="Enter First Name" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="InputLastName">Last Name</label>
                                <input type="text" className="form-control" id="InputLastName"
                                  value={this.state.newStaff.LName} onChange={(e) => this.handleChange("LName", e)}
                                  placeholder="Enter Last Name" />
                              </div>
                            </div>
                          </div>

                          {/* Designation */}
                          <div className="form-group">
                            <label htmlFor="InputDesignation">Designation</label>
                            <Designation childToParent={this.getDepartmentValue} designationValue={this.state.newStaff.DesignationID} />
                          </div>

                          {/* EmiratesID --- EID Expiry */}
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label htmlFor="InputEmiratesID">Emirates ID</label>
                                <input type="text" className="form-control" id="InputEmiratesID"
                                  value={this.state.newStaff.EmiratesID} onChange={(e) => this.handleChange("EID", e)}
                                  placeholder="Enter Emirates ID" />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group" style={setBackgroundStlye}>
                                <label htmlFor="InputEIDExpiry">EID Expiry</label>
                                <DatePicker selected={this.state.newStaff.EIDExpiry}
                                  onChange={(e) => this.setDateChange(e)}
                                  dateFormat="dd/MMM/yyyy"
                                  className="form-control" />
                              </div>
                            </div>
                          </div>

                          {/* File */}
                          <div className="form-group">
                            <label htmlFor="InputFileID">File : </label>
                            <div className="input-group">
                              <div className="custom-file">
                                <input type="file" className="custom-file-input"
                                  onChange={(e) => this.handleChange("File", e)} id="InputFileID" />
                                <label className="custom-file-label" htmlFor="InputFileID">{this.state.newStaff.FileName}</label>
                              </div>
                            </div>
                            {downloadButton}
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  {/* save card body end */}

                </div>
                <div className="modal-footer justify-content-between">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={e => this.submitHandler(e)}>Save changes</button>
                </div>
              </form>

            </div>
            { /*-- /.modal-content --*/}
          </div>
          { /*-- /.modal-dialog --*/}
        </div>
      </>
    )
  }
}
export default CardlistComponent;