import React, { Component } from "react";
import Api from "../api/Api";

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sampleTexts: {},
    };
  }

  componentDidMount() {
    Api.getText()
    .then((jsonResponse) => {
      this.setState({sampleTexts: jsonResponse});
    });
  }

  render() {
    const { sampleTexts } = this.state;
    return (
      <div>
        <article>
          <h2>Czytanie</h2>
          <div>{sampleTexts.reading}</div>
        </article>
        <article>
          <h2>Rozumienie</h2>
          <div>{sampleTexts.understanding}</div>
        </article>
        <article>
          <h2>Antycypacja</h2>
          <div>{sampleTexts.anticipating}</div>
        </article>
        <article>
          <h2>Aktywizacja myślenia</h2>
          <div>{sampleTexts.thinking}</div>
        </article>
        <article>
          <h2>Zapamiętywanie</h2>
          <div>{sampleTexts.memorizing}</div>
        </article>
      </div>
    );
  }
}

export default HomePage;
