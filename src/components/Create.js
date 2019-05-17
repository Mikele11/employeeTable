import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import store from './../store';

class Create extends Component {

  constructor() {
    super();
    this.state = {
      empName: '',
      empActive: false,
      dep: 'none',
	    emp_dpID: []
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = (e) => {
    this.setState({ empActive: e.target.checked });
  }

  onCancel = e => {
    e.preventDefault();
    this.setState({ 
      empName: '',
      empActive: false,
      dep: 'none',
	    emp_dpID: []
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { empName, empActive, emp_dpID, dep } = this.state;
    var post={};
    post.empName = empName;
    post.empActive = empActive;
    post.emp_dpID = emp_dpID;
    post.dep = dep
    this.props.createPost(post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    this.props.history.push("/")
  }

  render() {
    const { empName, empActive } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              ADD Employee
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Employee List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="empName">empName:</label>
                <input type="text" class="form-control" name="empName" value={empName} onChange={this.onChange} placeholder="Employee name" />
              </div>
              <div class="form-group">
                <label for="empActive">empActive:</label>
                <input
                  type="checkbox"
                  name="empActive"
                  onChange={this.handleChange}
                  checked={empActive}
                />
              </div>
              <div className="btnCreate">
                <button type="submit" class="btn btn-default">Save</button>
                <button onClick={this.onCancel} class="btn btn-default">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  createPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { createPost })(Create);
