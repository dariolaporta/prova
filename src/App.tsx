import React, { Component } from "react";
import "./App.css";
import Input from "./components/input/Input";
import { Button } from "@material-ui/core";
import {
  fakeEmailPromise,
  fakeYearPromise,
  fakePasswordPromise,
} from "./api/fakeAPI";
import Alert from "@material-ui/lab/Alert";
import HorizontalNonLinearStepper from "./components/stepper/Stepper";
import { View } from "./components/View";
import { KeyValue } from "./types";
import Slide from "@material-ui/core/Slide";

interface State {
  email: string;
  password: string;
  year: number;
  activeIndex: number;
  emailError: boolean;
  emailErrorMessage: string;
  passwordError: boolean;
  passwordErrorMessage: string;
  yearError: boolean;
  yearErrorMessage: string;
  stepIndicator: KeyValue[];
}

export default class App extends Component<{}, State> {
  state: State = {
    activeIndex: 0,
    email: "",
    password: "",
    year: 0,
    emailError: false,
    emailErrorMessage: "",
    passwordError: false,
    passwordErrorMessage: "",
    yearError: false,
    yearErrorMessage: "",
    stepIndicator: [
      { label: "email", completed: false },
      { label: "password", completed: false },
      { label: "year", completed: false },
    ],
  };

  callEmailAPI = async (email: string) => {
    try {
      const res = await fakeEmailPromise(email);
      if (res)
        this.setState({
          activeIndex: this.state.activeIndex + 1,
          stepIndicator: [
            { label: "email", completed: true },
            { label: "password", completed: false },
            { label: "year", completed: false },
          ],
        });
    } catch (error) {
      this.setState({
        emailError: true,
        emailErrorMessage: error.message,
      });
    }
  };
  callPassworAPI = async (name: string) => {
    try {
      const res = await fakePasswordPromise(name);
      if (res)
        this.setState({
          activeIndex: this.state.activeIndex + 1,
          stepIndicator: [
            { label: "email", completed: true },
            { label: "password", completed: true },
            { label: "year", completed: false },
          ],
        });
    } catch (error) {
      this.setState({
        passwordError: true,
        passwordErrorMessage: error.message,
      });
    }
  };

  callYearAPI = async (year: number) => {
    try {
      const res = await fakeYearPromise(year);
      if (res) {
        this.setState({
          stepIndicator: [
            { label: "email", completed: true },
            { label: "password", completed: true },
            { label: "year", completed: true },
          ],
        });
        alert("registrazione completata");
      }
    } catch (error) {
      this.setState({ yearError: true, yearErrorMessage: error.message });
    }
  };

  render() {
    const {
      email,
      password,
      year,
      activeIndex,
      emailError,
      passwordError,
      yearError,
      yearErrorMessage,
      emailErrorMessage,
      passwordErrorMessage,
      stepIndicator,
    } = this.state;

    const ViewStyle = {
      width: "100%",
      height: "100vh",
      backgroundColor: "#f3f3f3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <div className="App">
        <HorizontalNonLinearStepper
          steps={stepIndicator}
          activeIndex={activeIndex}
        />
        {activeIndex === 0 && (
          <div style={ViewStyle}>
            <Slide
              direction={window.innerWidth > 800 ? "up" : "left"}
              in={activeIndex === 0}
            >
              <div className="App-wrapper">
                <Input
                  getOutputValue={(text) => this.setState({ email: text })}
                  label="email"
                  placeholder="inserisci email"
                  error={emailError}
                  onFocusEvent={() => this.setState({ emailError: false })}
                />
                <Button
                  style={{ marginTop: 40 }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.callEmailAPI(email)}
                >
                  Invia
                </Button>
                {emailError && (
                  <View>
                    <Alert severity="error">{emailErrorMessage}</Alert>
                  </View>
                )}
              </div>
            </Slide>
          </div>
        )}
        {activeIndex === 1 && (
          <div style={ViewStyle}>
            <Slide
              direction={window.innerWidth > 800 ? "up" : "left"}
              in={activeIndex === 1}
            >
              <div className="App-wrapper">
                <Input
                  getOutputValue={(text) => this.setState({ password: text })}
                  label="password"
                  placeholder="Scegli la tua password"
                  error={passwordError}
                  onFocusEvent={() => this.setState({ passwordError: false })}
                />
                <Button
                  style={{ marginTop: 40 }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.callPassworAPI(password)}
                >
                  Invia
                </Button>
                {passwordError && (
                  <View>
                    <Alert severity="error">{passwordErrorMessage}</Alert>
                  </View>
                )}
              </div>
            </Slide>
          </div>
        )}
        {activeIndex === 2 && (
          <div style={ViewStyle}>
            <Slide
              direction={window.innerWidth > 800 ? "up" : "left"}
              in={activeIndex === 2}
            >
              <div className="App-wrapper">
                <Input
                  getOutputValue={(text) => this.setState({ year: text })}
                  error={yearError}
                  label="anno di nascita"
                  placeholder="inserisci anno di nascita"
                  onFocusEvent={() => this.setState({ yearError: false })}
                />
                <Button
                  style={{ marginTop: 40 }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.callYearAPI(year)}
                >
                  Invia
                </Button>
                {yearError && (
                  <View>
                    <Alert severity="error">{yearErrorMessage}</Alert>
                  </View>
                )}
              </div>
            </Slide>
          </div>
        )}
      </div>
    );
  }
}