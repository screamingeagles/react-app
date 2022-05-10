import './Cardsave.css';
import React from 'react';

class CardsaveComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      staff: null
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

    fetch('http://localhost:5050/api/staff',params)
    .then((response) => { return response.json();})
    .then((obj) => { this.setState({ staff: obj }); })
    .catch(err => {console.log(err);});
  }

  componentDidMount() {    
    this.fetchData();
  }

  render(){
    const tableBodyRows = this.state.staff && this.state.staff.map((link) =>
        <tr key={link.STAFF_ID}>
          <td>{link.STAFF_ID}</td>
          <td>{link.FIRST_NAME}</td>
          <td>{link.LAST_NAME}</td>
          <td>
            <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
              <input type="checkbox" className="custom-control-input" id="customSwitch3" />
              <label className="custom-control-label" >Disabled</label>
            </div>
          </td>
          <td>{link.EMIRATES_ID}</td>
        </tr> 
    );

    return (
      <div className="card">
      <div className="card-header">
        <h3 className="card-title">{this.state.staff?.length === 0 ? `no record found` : `${this.state.staff?.length} records found`}</h3>
        <div className="card-tools">
          <div className="input-group input-group-sm" style={{width: 150 + 'px'}}>
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
      <div className="card-body table-responsive p-0" style={{height: 300 + 'px'}}>
        <table className="table table-head-fixed text-nowrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            {tableBodyRows}
            <tr>
              <td>183</td>
              <td>John Doe</td>
              <td>11-7-2014</td>
              <td>
                <div className="form-group">
                  <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
                    <input type="checkbox" className="custom-control-input" id="customSwitch3" />
                    <label className="custom-control-label" >Disabled</label>
                  </div>
                  </div>
                </td>
              <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
      </div>
    )
  }
}
export default CardlistComponent;