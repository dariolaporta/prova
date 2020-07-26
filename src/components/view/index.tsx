import React, { Component } from "react";
import { Screen } from "./styles";

interface Props {
  content: any;
}

export default class View extends Component<Props> {
  render() {
    const { content } = this.props;
    return (
      <div>
        <Screen>{content}</Screen>
      </div>
    );
  }
}
