import './Content.css';
import CardlistComponent from '../Cardlist/Cardlist';

function Content() {
  return (    
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Main Page</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#/">Home</a></li>
                <li className="breadcrumb-item active">Main Page</li>
              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
  
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* /.row */}
          <div className="row">
            <div className="col-12">
              {/*  all of the elements will come here in card */}
              <CardlistComponent />              
            </div>
          </div>
          {/* .row */}
        </div>{/* .container-fluid */}
      </section>
      {/* .content */}
    </div>
  );
}

export default Content;
