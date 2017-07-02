import React from "react"
import sampleText from "../assets/sample_texts.json"
import {stringDivider} from "../utils/helpers"
import {number} from "prop-types"

const PREFIX = '<div class="wrapper">';
const POSTFIX = '</div>||' // '||' are used for splitting text

class Fixations extends React.Component {

  static propTypes = {
    speed: number // ms
  }

  static defaultProps = {
    speed: 1000 //ms
  }

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      textSplitted: [],
    }

    this.getText = this.getText.bind(this);
  }

  componentDidMount() {
    const text = stringDivider(sampleText.text1, 40, PREFIX, POSTFIX)
    this.setState({text: text, textSplitted: text.split("||")})
  }

  createMarkup(markup) {
    return {__html: markup};
  }

  getText(){
    const lines = []
    const {textSplitted} = this.state;

    for(let i = 0; i < textSplitted.length; i += 2 ){
      const line = (<div className="line">
        <div dangerouslySetInnerHTML={this.createMarkup(textSplitted[i])} className="left" />
        <div dangerouslySetInnerHTML={this.createMarkup(textSplitted[i + 1])} className="right" />
        <div className="clearfix" />
      </div>);
      lines.push(line);
    }
    return lines;
  }

  render() {
    // dangerouslySetInnerHTML={this.createMarkup(this.state.text)}
    return(
      <div className="text-with-fixations">
        {this.getText()}
      </div>
    )
  }
}

export default Fixations;
