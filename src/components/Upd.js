import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePost, fetchDepart} from '../actions/postActions';
import store from './../store';
import Select from 'react-select';

class Update extends Component {

  constructor(props) {
    super(props);
    this.state = {
	    id: '',
      empName: '',
      empActive: '',
      dep: null,
      emp_dpID: [],
      department: []
    };
  }
  
  componentDidMount() {
    var loc = window.location.pathname ;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");

    this.props.fetchDepart(ind);
    
    axios.get(`/api/post/${ind}`)
    .then(res => {
      this.setState({ 
        id: res.data._id, 
        empName: res.data.empName,
        empActive: res.data.empActive,
        dep: res.data.dep,
        emp_dpID: res.data.emp_dpID
      });
    })
    .catch((error) => {
      console.log('error',error);
    });
  }


  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleChange = (dep) => {
    this.setState({dep: dep.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id, empName, empActive, dep, emp_dpID } = this.state;

    var post={};
    post.empName = empName;
    post.empActive = empActive;
    post.dep = dep;
    post.emp_dpID = emp_dpID;
    this.props.updatePost(id,post);
    store.subscribe(()=>{
      console.log('subscribenewPOST',store.getState());
    })
    this.props.history.push("/") 
  }

  render() {
    const { empName, empActive, dep, department } = this.state;
    console.log({ empName, empActive, dep, department })
    if (this.props.departs.length>0) {
      for (let i=0;i<this.props.departs.length;i++) {
        department[i] = {label: this.props.departs[i].dpName, value: this.props.departs[i].dpName}
      }
    }
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Update Employee
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
              <div class="form-group">
                <label for="">empDepartment:</label>
                {( department.length > 0 ) ?
                  <Select 
                    options={department}
                    onChange={this.handleChange} /> : null
                 }
              </div>
              <button type="submit" class="btn btn-default">Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Update.propTypes = {
  updatePost: PropTypes.func.isRequired,
  fetchDepart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts.postss,
  departs: state.posts.departs
});

export default connect(mapStateToProps, { updatePost, fetchDepart })(Update);