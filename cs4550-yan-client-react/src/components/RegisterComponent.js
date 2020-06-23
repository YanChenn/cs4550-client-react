import React from "react";
import {Link} from "react-router-dom";

export default class RegisterComponent extends React.Component {
  state = {
    username: '',
    password: '',
    verifypassword:'',
    error: null
  }
  register = () => {
    if (this.state.password != this.state.verifypassword) {
      this.setState({error : 'Passwords do not match'})
    }
    fetch("http://localhost:8080/api/register", {
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: "include"
    }).then(response => response.json())
    /*.catch(e => {
      this.setState({
        error: 'Unable to register'
      })
    })*/
    .then(currentUser => {
      if(currentUser) {
        this.props.history.push("/profile")
      }
    })
  }
  render() {
    return(
        <div>
          <h1>Register</h1>
          {
            this.state.error &&
            <div className="alert alert-danger">
              {this.state.error}
            </div>
          }

          <div className="form-group-reg row">
            <label htmlFor="usernameFld" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input id="usernameFld"
                     className="form-control"
                     onChange={(e) => this.setState({username: e.target.value})}
                     type="text"
                     placeholder="Alice"/>
            </div>
          </div>

          <div className="form-group-reg row">
            <label htmlFor="passwordFld" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input id="passwordFld"
                     className="form-control"
                     onChange={(e) => this.setState({password: e.target.value})}
                     type="text"
                     placeholder="123qwe#$%"/>
            </div>
          </div>

          <div className="form-group-reg row">
            <label htmlFor="verifyPasswordFld" className="col-sm-2 col-form-label">Verify
              Password</label>
            <div className="col-sm-10">
              <input id="verifyPasswordFld"
                     className="form-control"
                     onChange={(e) => this.setState({verifypassword: e.target.value})}
                     type="text"
                     placeholder="123qwe#$%"/>
            </div>
          </div>


          <button
              onClick={this.register}
              className="btn btn-primary">
            Register
          </button>
          <Link to="/login"
          >Sign in</Link>
          <Link className="wbdv-link wbdv-cancel float-right"
                to="/">Cancel</Link>
        </div>
    )
  }
}