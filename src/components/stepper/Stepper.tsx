import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import { StepIndicator } from "../../types";

interface Props {
  steps: StepIndicator[];
  activeIndex: number;
}

export default function HorizontalNonLinearStepper(props: Props) {
  const { activeIndex, steps } = props;

  return (
    <div
      style={{
        paddingTop: 20,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="App-wrapper">
        <Stepper nonLinear activeStep={Number(activeIndex)}>
          {steps.map((el, index) => (
            <Step key={index}>
              <StepButton completed={el.completed}></StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
