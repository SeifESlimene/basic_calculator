import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: "0",
      visibility: "hidden",
      operand: [],
      operator: [],
      expression: ""
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.c = this.c.bind(this);
    this.ce = this.ce.bind(this);
    this.evaluation = this.evaluation.bind(this);
  }
  open() {
    this.setState({
      visibility: "visible",
      result: 0,
      operand: [],
      operator: [],
      expression: ""
    });
  }
  close() {
    if (this.state.visibility === "visible") {
      this.setState({
        visibility: "hidden",
        result: 0,
        operand: [],
        operator: [],
        expression: ""
      });
    }
  }
  c() {
    if (this.state.visibility === "visible") {
      this.setState({
        visibility: "visible",
        operand: [],
        operator: [],
        expression: "",
        result: 0
      });
    } else {
      return null;
    }
  }
  ce() {
    if (this.state.visibility === "visible") {
      this.setState({
        visibility: "visible",
        operand: [],
        operator: [],
        expression: "",
        result: 0
      });
    } else {
      return null;
    }
  }
  evaluation() {
    if (
      this.state.operand[this.state.operand.length - 1] === "0" &&
      this.state.operator[this.state.operator.length - 2] === "/" || (this.state.result.search(/[+*/-]{1}$/g) > -1)
    ) {
      this.setState({
        result: "ERR"
      });
    } else {
      this.setState({
        result: eval(this.state.result)
      });
    }
  }
  componentDidMount() {
    let btn = document.getElementsByTagName("button");
    console.log({ btn })
    for (let i = 4; i < btn.length; i++) {
      btn[i].addEventListener("click", 
        num => {
          console.log({ num });
          if (this.state.visibility === "visible") {
            if (btn[i].innerText.match(/\d+/g) !== null) {
              if (this.state.result === 0) {
                this.state.operand.push(num.target.innerText);
                this.setState({
                  result: parseInt(this.state.result + num.target.innerText),
                  operand: this.state.operand
                });
                this.setState({
                  result: this.state.result.toString()
                });
              } else {
                if (this.state.operator[this.state.operator.length - 1] === "=") {
                  this.setState({
                    result: num.target.innerText,
                    operand: [],
                    operator: [],
                    expression: ""
                  });
                } else {
                  if (this.state.operand[this.state.operand.length - 1] === "0") {
                    this.state.operand.pop();
                    this.state.operand.push(num.target.innerText);
                    this.setState({
                      result: this.state.result + num.target.innerText,
                      operand: this.state.operand
                    });
                    this.setState({
                      result: this.state.result.replace(
                        /[+*/-]{1}0+\d{1}$/g,
                        this.state.operator[this.state.operator.length - 1] +
                          num.target.innerText
                      )
                    });
                  } else {
                    this.state.operand.push(num.target.innerText);
                    this.setState({
                      result: this.state.result + num.target.innerText,
                      operand: this.state.operand
                    });
                  }
                }
              }
            } else {
              if (btn[i].innerText === "=") {
                this.state.operator.push(num.target.innerText);
                this.setState({
                  expression: "Here The Final Result",
                  operator: this.state.operator
                });
              } else {
                if (this.state.result.search(/[+*./-]{1}$/g) > -1) {
                  this.state.operator.pop();
                  this.state.operator.push(num.target.innerText);
                  this.setState({
                    result: this.state.result + num.target.innerText
                  });
                  this.setState({
                    result: this.state.result.replace(
                      /[+*./-]{2}$/g,
                      this.state.operator[this.state.operator.length - 1]
                    )
                  });
                } else {
                  this.state.operator.push(num.target.innerText);
                  this.setState({
                    result: this.state.result + num.target.innerText,
                    operator: this.state.operator
                  });
                }
              }
            }
          } else {
            return null;
          }
        }
      );
    }
  }
  render() {
    return (
      <>
        <p>* Push <span style={{color: "red"}}>On</span> To Start</p>
        <div className="box">
          <header>
            <p style={{ visibility: this.state.visibility }}>
              {this.state.result}
            </p>
          </header>
          <main>
            <button onClick={this.open}>On</button>
            <button onClick={this.close}>Off</button>
            <button onClick={this.ce}>Ce</button>
            <button onClick={this.c}>C</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>+</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>-</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button>*</button>
            <button>.</button>
            <button>0</button>
            <button onClick={this.evaluation}>=</button>
            <button>/</button>
          </main>
          <footer>
            <p>Basic Calculator &copy; 2020</p>
          </footer>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
