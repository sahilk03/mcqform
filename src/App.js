import "./App.css";
import React from "react";

import { Radio, RadioGroup, FormControlLabel, Button } from "@material-ui/core";

const data = [
  {
    query: "What color is the sky?",
    correct: "Blue",
    options: ["Pink", "Orange", "Blue", "Green"],
  },
  {
    query: "Which of the following elements aren’t introduced in HTML5?",
    correct: "<input>",
    options: ["<article>", "<footer>", "<hgroup>", "<input>"],
  },
  {
    query: "How many wheels are there on a tricycle?",
    correct: "Three",
    options: ["One", "Two", "Three", "Four"],
  },
  {
    query: "Who is the main character of Harry Potter?",
    correct: "Harry Potter",
    options: ["Hermione Granger", "Ron Weasley", "Voldemort", "Harry Potter"],
  },
];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: data[0],
      currentForm: 0,
      selected: {},
      radiovalue: "",
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }
  render() {
    const { formData, radiovalue, selected, review } = this.state;
    if (review) return <Review review={review}></Review>;
    return (
      <div className="App">
        <div id="container" className="container">
          {this.state.currentForm > 0 && (
            <i className="arrow left" onClick={this.prev}></i>
          )}
          <div className="questions">
            <div id="question">
              <h2>{formData.query}</h2>
              <div>
                <RadioGroup
                  className="options"
                  aria-label="gender"
                  name="gender1"
                  value={radiovalue}
                  onChange={(e) => this.onChange(e)}
                >
                  {formData.options.map((opt) => (
                    <FormControlLabel
                      value={opt}
                      control={<Radio />}
                      label={opt}
                      key={opt}
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
          {this.state.currentForm < data.length - 1 && (
            <i className="arrow right" onClick={this.next}></i>
          )}
          <div style={{ width: "80%" }}>
            <Button
              className="submit"
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
  onChange = (e, opt) => {
    this.setState({
      radiovalue: e.target.value,
      selected: {
        ...this.state.selected,
        [this.state.currentForm]: e.target.value,
      },
    });
  };

  prev = () => {
    if (this.state.currentForm > 0) {
      this.setState({
        currentForm: this.state.currentForm - 1,
        formData: data[this.state.currentForm - 1],
        radiovalue: this.state.selected[this.state.currentForm - 1] || "",
      });
    }
  };

  next = () => {
    if (this.state.currentForm < data.length - 1) {
      this.setState({
        currentForm: this.state.currentForm + 1,
        formData: data[this.state.currentForm + 1],
        radiovalue: this.state.selected[this.state.currentForm + 1] || "",
      });
    }
  };

  submit = () => {
    let review = [];
    data.forEach((obj, index) => {
      review.push({
        query: obj.query,
        answer: this.state.selected[index] || "",
        correct: obj.correct,
        eval: obj.correct === this.state.selected[index] ? true : false,
      });
    });
    this.setState({ review });
  };
}

function Review(props) {
  function answer(rev) {
    if (rev.eval) return <h3 className="answer correct">{rev.answer}</h3>;
    if (rev.answer) {
      return [
        <h3 className="answer incorrect">{rev.answer}</h3>,
        <h3 className="answer correct">{rev.correct}</h3>,
      ];
    }
    return [
      <h3 className="answer missing">No Answer</h3>,
      <h3 className="answer correct">{rev.correct}</h3>,
    ];
  }
  return (
    <div>
      <div id="review" className="review">
        {props.review.map((rev) => (
          <div>
            <h2>
              {rev.query} {rev.eval && <i class="fa fa-check check"></i>}
              {!rev.eval && <i class="fa fa-close wrong"></i>}
            </h2>

            {answer(rev)}
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
