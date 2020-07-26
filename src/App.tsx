import React, { Component } from "react";
import "./App.css";
import Input from "./components/input/Input";
import { Button } from "@material-ui/core";
import {
  fakeEmailPromise,
  fakeNamePromise,
  fakeYearPromise,
} from "./api/fakeAPI";
import Alert from "@material-ui/lab/Alert";
import HorizontalNonLinearStepper from "./components/stepper/Stepper";

type KeyValue = {
  label: string;
  completed: boolean;
};
interface State {
  email: string;
  name: string;
  year: number;
  activeIndex: number;
  emailError: boolean;
  emailErrorMessage: string;
  nameError: boolean;
  nameErrorMessage: string;
  yearError: boolean;
  yearErrorMessage: string;
  stepIndicator: KeyValue[];
}

export default class App extends Component<{}, State> {
  state: State = {
    activeIndex: 0,
    email: "",
    name: "",
    year: 0,
    emailError: false,
    emailErrorMessage: "",
    nameError: false,
    nameErrorMessage: "",
    yearError: false,
    yearErrorMessage: "",
    stepIndicator: [
      { label: "email", completed: false },
      { label: "name", completed: false },
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
            { label: "name", completed: false },
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
  callNameAPI = async (name: string) => {
    try {
      const res = await fakeNamePromise(name);
      if (res)
        this.setState({
          activeIndex: this.state.activeIndex + 1,
          stepIndicator: [
            { label: "email", completed: true },
            { label: "name", completed: true },
            { label: "year", completed: false },
          ],
        });
    } catch (error) {
      this.setState({ nameError: true, nameErrorMessage: error.message });
    }
  };

  callYearAPI = async (year: number) => {
    try {
      const res = await fakeYearPromise(year);
      if (res) {
        this.setState({
          stepIndicator: [
            { label: "email", completed: true },
            { label: "name", completed: true },
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
      name,
      year,
      activeIndex,
      emailError,
      nameError,
      yearError,
      yearErrorMessage,
      emailErrorMessage,
      nameErrorMessage,
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
                <div
                  style={{
                    flex: 1,
                    left: 0,
                    right: 0,
                    position: "absolute",
                    bottom: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Alert severity="error">{emailErrorMessage}</Alert>
                </div>
              )}
            </div>
          </div>
        )}
        {activeIndex === 1 && (
          <div style={ViewStyle}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "30%" }}
            >
              <Input
                getOutputValue={(text) => this.setState({ name: text })}
                label="nome"
                placeholder="inserisci il tuo nome"
                error={nameError}
                onFocusEvent={() => this.setState({ nameError: false })}
              />
              <Button
                style={{ marginTop: 40 }}
                variant="contained"
                color="primary"
                onClick={() => this.callNameAPI(name)}
              >
                Invia
              </Button>
              {nameError && (
                <div
                  style={{
                    flex: 1,
                    left: 0,
                    right: 0,
                    position: "absolute",
                    bottom: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Alert severity="error">{nameErrorMessage}</Alert>
                </div>
              )}
            </div>
          </div>
        )}
        {activeIndex === 2 && (
          <div style={ViewStyle}>
            <div
              style={{ display: "flex", flexDirection: "column", width: "30%" }}
            >
              <Input
                getOutputValue={(text) => this.setState({ year: text })}
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
                <div
                  style={{
                    flex: 1,
                    left: 0,
                    right: 0,
                    position: "absolute",
                    bottom: "20%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Alert severity="error">{yearErrorMessage}</Alert>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}