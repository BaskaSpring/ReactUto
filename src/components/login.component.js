import React, { Component } from "react";
import {input, button, form} from "react-bootstrap";
import BootLogo from "../bootstrap-logo.svg";
import AuthService from "../services/auth.service";
import "./login.css";



export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    //this.form.validateAll();

    //.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    // } else {
    //   this.setState({
    //     loading: false
    //   });
    // }
  }

  render() {
    const message = this.state.message;
    return (
        <div className="text-center">
          <main className="form-signin">
            <form onSubmit={this.handleLogin}
                  ref={c => {
                    this.form = c;
                  }}>
              <img className="mb-4" src={BootLogo} alt="" width="72" height="57"></img>
              <h1 className="h3 mb-3 fw-normal">Авторизация</h1>
              <input type="text"
                     className="form-control"
                     name="username"
                     value={this.state.username}
                     onChange={this.onChangeUsername}
                     placeholder="Введите логин"
                     required autoFocus>
              </input>
              <input type="password"
                     name="password"
                     className="form-control"
                     value={this.state.password}
                     onChange={this.onChangePassword}
                     placeholder="Введите пароль"
                     required>
              </input>
              <button className="w-100 btn btn-lg btn-primary" disabled={this.state.loading}>
                {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Войти</span>
              </button>
              {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
              )}
              <p className="mt-5 mb-3 text-muted">&copy; 2017-2021</p>
            </form>
          </main>
        </div>
    );
  }
}
