import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

interface Props {
  steps: any[];
  activeIndex: number;
}

export default function HorizontalNonLinearStepper(props: Props) {
  const { activeIndex, steps } = props;

  return (
    <div
      style={{ position: "fixed", top: 0, left: 0, right: 0 }}
      className="shadow"
    >
      <Stepper nonLinear activeStep={Number(activeIndex)}>
        {steps.map((el, index) => (
          <Step key={index}>
            <StepButton completed={el.completed}></StepButton>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
