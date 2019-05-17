import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchPosts, deletePost } from './actions/postActions.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      empPerPage: 5,
      items: []
    };
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  handleClick = (event) => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  logout = () => {
    localStorage.removeItem('jwtToken');
    window.location.reload();
  }

  filterList = (e) => {
    let updatedList = [];
    const { items } = this.state;
    if (items.length < 1) {
      updatedList = this.props.posts;
    } else {
      updatedList = items;
    }
    updatedList = updatedList.filter((item) => {
      return item.empName.toLowerCase().search(
        e.target.value.toLowerCase()
      ) !== -1;
    });
    this.setState({ items: updatedList });
  }

  onDelete = ind => (e) =>  {
    this.props.deletePost(ind);
  }

  render() {
    const { currentPage, empPerPage, items } = this.state;
    const emp = this.props.posts;
    let empArr = [];
    const indexOfLast = currentPage * empPerPage;
    const indexOfFirst = indexOfLast - empPerPage;
    const currentEmpList = emp.slice(indexOfFirst, indexOfLast);
    if (items.length < 1) {
      empArr = currentEmpList;
    } else {
      empArr = items;
    }

    const renderTable = empArr.map((post, index) => (
      <div className='rept' key={index}>
        <div><Link to={`/view/${this.props.posts[index]._id}`}>View</Link></div>
        <div><Link to={`/update/${this.props.posts[index]._id}`}>Edit</Link></div>
        <div><Link to={`/adddepart/${this.props.posts[index]._id}`}>Add depart</Link></div>
        <div>{post._id}</div>
        <div>{post.empName}</div>
        <div>{post.empActive? 'Yes': 'No'}</div>
        <div>{post.dep}</div>
        <div><Link to={'/'} onClick={this.onDelete(this.props.posts[index]._id)}>Delete</Link></div>
      </div>					
    ));

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(emp.length / empPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => (
      <li 
        key={number} 
        id={number}
        className="li" 
        onClick={this.handleClick}>
        {number}
      </li>
    ));

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              User List &nbsp;
              {localStorage.getItem('jwtToken') &&
                <button className="btn btn-primary" onClick={this.logout}>Logout</button>
              }
            </h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create">Add Task</Link>
            </h4>
            <div className="searchInputs">
              <input type="text" name="filtername" placeholder="filter name" onChange={this.filterList} />
            </div>
            <div>
              <div className="myTable">
                <div className="title2">
                  <div></div>
                  <div>
                  </div>
                  <div>
                  </div>
                  <div>
                    empID
                  </div>
                  <div>
                    empName
                  </div>
                  <div>
                    empActive
                  </div>
                  <div>
                    empDepartment
                  </div>
                  <div>
                  </div>
                </div>
                {renderTable}
              </div>              
            </div>
            <ul className="ul">
              {renderPageNumbers}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { fetchPosts, deletePost })(App);