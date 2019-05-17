import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createDepart } from '../actions/postActions';
import store from '../store';

class AddDepart extends Component {

  constructor() {
    super();
    this.state = {
	    id: '',
      dpName: '',
    };
  }
  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    var loc = window.location.pathname;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");
    
	  var depart={};
    const {dpName} = this.state;
	  depart.dpName = dpName;
    depart.post_id = ind;
    this.props.createDepart(ind,depart);
    store.subscribe(()=>{
      console.log('subscribenew',store.getState());
    })
    this.props.history.push("/")
  }

  render() {
    const { dpName } = this.state;
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Add department for employee
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Employee List</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="dpName">dpName:</label>
                <input type="text" class="form-control" name="dpName" value={dpName} onChange={this.onChange} placeholder="dpName" />
              </div>
              <button type="submit" class="btn btn-default">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AddDepart.propTypes = {
  createDepart: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
});

export default connect(mapStateToProps, { createDepart })(AddDepart);

