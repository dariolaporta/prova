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
import { StepIndicator } from "./types";
import Slide from "@material-ui/core/Slide";

interface State {
  email: string;
  password: string;
  year: number;
  activeIndex: number;
  isError: boolean;
  stepIndicator: StepIndicator[];
  errorMessage: string;
}

export default class App extends Component<{}, State> {
  state: State = {
    activeIndex: 0,
    email: "",
    password: "",
    year: 0,
    isError: false,
    errorMessage: "",
    stepIndicator: [
      { completed: false },
      { completed: false },
      { completed: false },
    ],
  };

  callEmailAPI = async (email: string) => {
    const steps = [...this.state.stepIndicator];
    const item = steps[0];
    item.completed = true;
    try {
      const res = await fakeEmailPromise(email);
      if (res)
        this.setState({
          activeIndex: this.state.activeIndex + 1,
          stepIndicator: steps,
        });
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: error,
      });
    }
  };

  callPassworAPI = async (name: string) => {
    const steps = [...this.state.stepIndicator];
    const item = steps[1];
    item.completed = true;
    try {
      const res = await fakePasswordPromise(name);
      if (res)
        this.setState({
          activeIndex: this.state.activeIndex + 1,
          stepIndicator: steps,
        });
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: error,
      });
    }
  };

  callYearAPI = async (year: number) => {
    const steps = [...this.state.stepIndicator];
    const item = steps[2];
    item.completed = true;
    try {
      const res = await fakeYearPromise(year);
      if (res) {
        this.setState({
          activeIndex: 0,
          stepIndicator: steps,
        });
        alert("registrazione completata");
      }
    } catch (error) {
      this.setState({ isError: true, errorMessage: error });
    }
  };

  render() {
    const {
      email,
      password,
      year,
      activeIndex,
      isError,
      errorMessage,
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
        {isError && (
          <View>
            <Alert severity="error">{errorMessage}</Alert>
          </View>
        )}
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
                  error={isError}
                  onFocusEvent={() => this.setState({ isError: false })}
                />
                <Button
                  style={{ marginTop: 40 }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.callEmailAPI(email)}
                >
                  Invia
                </Button>
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
                  error={isError}
                  onFocusEvent={() => this.setState({ isError: false })}
                />
                <Button
                  style={{ marginTop: 40 }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.callPassworAPI(password)}
                >
                  Invia
                </Button>
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
                  error={isError}
                  label="anno di nascita"
                  placeholder="inserisci anno di nascita"
                  onFocusEvent={() => this.setState({ isError: false })}
                />
                <Button
                  style={{ marginTop: 40 }}
                  variant="contained"
                  color="primary"
                  onClick={() => this.callYearAPI(year)}
                >
                  Invia
                </Button>
              </div>
            </Slide>
          </div>
        )}
      </div>
    );
  }
}
