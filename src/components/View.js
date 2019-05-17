import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmployee } from '../actions/postActions';
import store from './../store';

class View extends Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    var loc = window.location.pathname ;
    var revloc = loc.split("").reverse().join("");
    var ind = revloc.substring(0,revloc.indexOf('/'));
    ind = ind.split("").reverse().join("");

   this.props.getEmployee(ind);
   store.subscribe(()=>{
     console.log('subscribenew',store.getState());
   })
  }

  render() {
    return (
      <div className="view">
        <h1> Info about employee</h1>
        <div className="myTable2">
          <div className="title2">
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
          </div>
          <div className='rept' >
            <div>{ this.props.post._id }</div>
            <div>{ this.props.post.empName }</div>
            <div>{ this.props.post.empActive? 'Yes': 'No' }</div>
            <div>{ this.props.post.dep }</div>
          </div>					
		    </div>
      </div>
    );
  }
}

View.propTypes = {
  getEmployee: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  post: state.posts.onepost,
});

export default connect(mapStateToProps, { getEmployee })(View);

