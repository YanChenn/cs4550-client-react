import React from "react";

export default class ProfileComponent extends React.Component {
  state = {
    user: {
      username: '',
      password: '',
      sections: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/profile", {
      method: 'POST',
      credentials: "include"
    })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch(e => {
      this.props.history.push("/")
    })
    .then(user => {
      if(user)
        this.setState({
          user: user
        })
    })
  }

  update = () => {
    fetch("http://localhost:8080/api/profile", {
      body: JSON.stringify(this.state.user),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      credentials: "include"
    })
    .then(response => response.json())
    .then(user => this.setState({
      username: user.username, password: user.password
    }))
  }

  logout = () => {
    fetch("http://localhost:8080/api/logout", {
      method: 'POST',
      credentials: "include"
    })
    .then(response => this.props.history.push("/"))

  }
  render() {
    return(
        <div>
          <h1>Profile</h1>
          <div className="form-group-reg row">
            <label htmlFor="usernameFld" className="col-sm-2 col-form-label">Username</label>
          <input id="usernameFld"
                 className="form-control"
                 type="text"
                 value={this.state.username}
                 title="Username"
                 readOnly/>


          <div className="form-group-reg row">
            <label htmlFor="phoneFld" className="col-sm-2 col-form-label">Phone</label>
            <div className="col-sm-10">
              <input id="phoneFld"
                     className="form-control"
                     type="tel"
                     placeholder="(555) 123-4324"
                     title="Phone Number"/>
            </div>
          </div>

            <div className="form-group-reg row">
              <label htmlFor="emailFld" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-10">
                <input id="emailFld"
                       className="form-control"
                       type="email"
                       placeholder="example@mail.com"
                       title="Email Address"/>
              </div>
            </div>

          <input
              value={this.state.user.password}
              onChange={(e) => this.setState({
                user: {password: e.target.value}})}
              className="form-control"/>
          <button
              onClick={this.update}
              className="btn btn-primary">
            Update
          </button>
          <button
              className="btn btn-danger"
              onClick={this.logout}>
            Sign out
          </button>
          {
            this.state.user && this.state.user.sections.length > 0 &&
            <div>
              <h3>Sections</h3>
              <ul className="list-group">
                {this.state.user.sections.map(section =>
                    <li key={section.id}
                        className="list-group-item">
                      {section.title}
                    </li>
                )}
              </ul>
            </div>
          }
        </div>
        </div>
    )
  }
}
