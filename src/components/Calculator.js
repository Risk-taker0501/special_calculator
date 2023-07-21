import React, { useState } from 'react';
import styled from 'styled-components';

const CalculatorWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
`;

const Input = styled.input`
  grid-column: span 4;
  padding: 10px;
  font-size: 18px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 18px;
`;

const Calculator = () => {
  const [equation, setEquation] = useState('');

  const addSymbol = (symbol) => {
    setEquation((prevEquation) => prevEquation + symbol + ' ');
  };

  const addNumber = (number) => {
    setEquation((prevEquation) => prevEquation + number + ' ');
  };

  const clearInput = () => {
    setEquation('');
  };

  const calc_result = () => {
    const result = calculate(equation);
    setEquation(result.toString());
    if(isNaN(result))
    {
        alert("The equation is not valid.");
    } else {
        localStorage.setItem('history', `${equation}= ${result}`);
    }
  };

  const calculate = (equation) => {
    let expression = equation.trim().split(' ');
    while (expression.length > 1) {
      const stack = [];
      let i = 0;
      while (i < expression.length) {
        if (
          isNaN(Number(expression[i])) &&
          !isNaN(Number(expression[i + 1])) &&
          !isNaN(Number(expression[i + 2]))
        ) {
          const operator = expression[i];
          const operand1 = Number(expression[i + 1]);
          const operand2 = Number(expression[i + 2]);
          let result;

          switch (operator) {
            case '+':
              result = operand1 + operand2;
              break;
            case '-':
              result = operand1 - operand2;
              break;
            case '*':
              result = operand1 * operand2;
              break;
            case '/':
              result = operand1 / operand2;
              break;
            default:
              break;
          }
          stack.push(result);
          i += 3;
        } else if (stack.length + 1 === expression.length) {
          return NaN;
        } else {
          stack.push(expression[i]);
          i++;
        }
      }
      expression = stack;
    }

    return Number(expression[0]);
  };

  return (
    <React.Fragment>
        <CalculatorWrapper>
        <Input type="text" id="equationInput" readOnly value={equation} />
        <Button onClick={() => addNumber(7)}>7</Button>
        <Button onClick={() => addNumber(8)}>8</Button>
        <Button onClick={() => addNumber(9)}>9</Button>
        <Button onClick={() => addSymbol('+')}>+</Button>
        <Button onClick={() => addNumber(4)}>4</Button>
        <Button onClick={() => addNumber(5)}>5</Button>
        <Button onClick={() => addNumber(6)}>6</Button>
        <Button onClick={() => addSymbol('-')}>-</Button>
        <Button onClick={() => addNumber(1)}>1</Button>
        <Button onClick={() => addNumber(2)}>2</Button>
        <Button onClick={() => addNumber(3)}>3</Button>
        <Button onClick={() => addSymbol('*')}>*</Button>
        <Button onClick={() => addNumber(0)}>0</Button>
        <Button onClick={() => calc_result()}>=</Button>
        <Button onClick={() => clearInput()}>C</Button>
        <Button onClick={() => addSymbol('/')}>/</Button>
        </CalculatorWrapper>
        <div>
            <span>last history: { localStorage.getItem('history') }</span>
        </div>
  </React.Fragment>
  );
};

export default Calculator;