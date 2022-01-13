import React, { Component, createContext } from "react";
import decode from "jwt-decode";
import axios from "axios";

import config from "../utils/config.js";
import { Navigate, Route } from "react-router-dom";

const authContext = createContext<AuthLayerState>({
  user: null,
  authenticated: false,
  logout: () => {},
  login: () => {},
  jwtToken: null,
});

const ACCESS_TOKEN = "access_token";

interface AuthLayerProps {}

interface AuthLayerState {
  user: any;
  authenticated: boolean;
  logout: any;
  login: any;
  jwtToken: string | null;
}

class AuthLayer extends Component<AuthLayerProps, AuthLayerState> {
  constructor(props: AuthLayerProps) {
    super(props);
    this.updateAuth = this.updateAuth.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = {
      user: null,
      authenticated: false,
      logout: this.logout,
      login: this.login,
      jwtToken: null,
    };
  }

  componentDidMount() {
    if (localStorage.hasOwnProperty(ACCESS_TOKEN)) {
      let decodedToken: any = decode(localStorage.getItem(ACCESS_TOKEN)!);
      let expired = Date.now() > decodedToken.exp;
      this.setState({ authenticated: !expired });
    }
  }

  login(email: string, password: string) {
    return axios
      .post(`${config.main_service_url}/v1/account/login`, {
        email,
        password,
      })
      .then(({ data }) => {
        return this.updateAuth(data.accessToken);
      });
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      jwtToken: "",
      user: null,
    });
  }

  updateAuth(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
    // let decodedToken = decode(accessToken);
    this.setState({
      user: {},
      jwtToken: accessToken,
      authenticated: true,
    });
  }

  render() {
    return (
      <authContext.Provider value={this.state}>
        {this.props.children}
      </authContext.Provider>
    );
  }
}

export function ProtectedRoute(props: any) {
  return props.authenticated ? (
    <Route path={props.path} element={props.component} />
  ) : (
    <Navigate to="/" />
  );
}

export const AuthConsumer = authContext.Consumer;

export default AuthLayer;
