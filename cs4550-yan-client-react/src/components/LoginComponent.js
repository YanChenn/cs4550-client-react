import React from "react";
import {Link} from "react-router-dom";

export default class LoginComponent extends React.Component {
  state = {
    username: '',
    password: ''
  }
  login = () => {
    fetch("http://localhost:8080/api/login", {
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: "include"
    }).then(response => response.json())
    .catch(e => {
      this.props.history.push("/login")
    })
    .then(currentUser => {
      if(currentUser)
        this.props.history.push("/profile")
    })

  }
  render() {
    return(
        <div>
          <h1>Sign In</h1>

          <div className="form-group-reg row">
            <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
            <div className="col-sm-10">
              <input id="username"
                     className="form-control wbdv-field wbdv-username"
                     onChange={(e) => this.setState({username: e.target.value})}
                     type="text"
                     placeholder="Alice"
                     title="Use this username to login"/>
            </div>
          </div>

          <div className="form-group-reg row">
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input id="password"
                     className="form-control wbdv-field wbdv-password"
                     onChange={(e) => this.setState({password: e.target.value})}
                     type="text"
                     placeholder="123qwe#$%"
                     title="Use this password to login"/>
            </div>
          </div>

          <div className="form-group-reg row">
            <label className="col-sm-2 col-form-label"></label>
            <div className="col-sm-10">
              <Link role="button"
                    className="btn btn-primary btn-block wbdv-button wbdv-login"
                    to="/profile">Sign in</Link>
              <div className="row">
                <div className="col-6">
                  <Link className="wbdv-link wbdv-cancel"
                        to="/">Cancel</Link>
                </div>
                <div className="col-6">
                  <Link className="float-right wbdv-link wbdv-register"
                        to="/register">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>

    )
  }
}