export const getAnswer = async (operation, numbers) => {
  console.log(operation, numbers);

  const response = await fetch(`http://localhost:3001/${operation}`, {
    method: 'POST',
    body: JSON.stringify({ numbers: numbers }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return data;
};
