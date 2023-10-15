// app.js - AWS Lambda function code
const calculate = (operation, num1, num2) => {
  switch (operation) {
    case 'add':
      return num1 + num2;
    case 'subtract':
      return num1 - num2;
    case 'multiply':
      return num1 * num2;
    case 'divide':
      if (num2 === 0) {
        return 'Cannot divide by zero';
      }
      return num1 / num2;
    default:
      return 'Invalid operation';
  }
};

exports.calculate = async (event) => {
  const { operation, num1, num2 } = JSON.parse(event.body);

  if (!operation || !num1 || !num2) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing parameters' }),
    };
  }

  const result = calculate(operation, parseFloat(num1), parseFloat(num2));

  return {
    statusCode: 200,
    body: JSON.stringify({ result }),
  };
};
