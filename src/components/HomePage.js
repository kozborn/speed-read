import React, { Component } from "react";
import {func, string} from "prop-types";

class HomePage extends Component {

  static propTypes = {
    getDoc: func.isRequired,
    memorizing: string.isRequired,
    reading: string.isRequired,
    understanding: string.isRequired,
    anticipating: string.isRequired,
    thinking: string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sampleTexts: {},
    };
  }

  componentDidMount() {
    this.props.getDoc();
  }

  render() {
    const { reading, memorizing, thinking, understanding, anticipating } = this.props;
    return (
      <div>
        <article>
          <h2>Czytanie</h2>
          <div>{reading}</div>
        </article>
        <article>
          <h2>Rozumienie</h2>
          <div>{understanding}</div>
        </article>
        <article>
          <h2>Antycypacja</h2>
          <div>{anticipating}</div>
        </article>
        <article>
          <h2>Aktywizacja myślenia</h2>
          <div>{thinking}</div>
        </article>
        <article>
          <h2>Zapamiętywanie</h2>
          <div>{memorizing}</div>
        </article>
      </div>
    );
  }
}

export default HomePage;
