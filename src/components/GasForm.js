import React, { useState } from 'react';

function GasForm() {
  const [maxGallons, setMaxGallons] = useState(null);
  const [numGallons, setNumGallons] = useState(null);
  const [response, setResponse] = useState(null);

  const clearInputs = () => {
    setMaxGallons(null);
    setNumGallons(null);
    setResponse(null);
  };

  const submitForm = async () => {
    if (maxGallons !== null && !isNaN(numGallons)) {
      const requestBody = {
        noOfGallonsInVehicle: numGallons,
        vehicleMaxGallonCapacity: maxGallons,
      };

      try {
        const response = await fetch('http://localhost:8080/gas/getInvoice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const responseData = await response.json();
          setResponse(JSON.stringify(responseData, null, 2));
        } else {
          setResponse('Error: Failed to fetch data');
        }
      } catch (error) {
        setResponse('Error: ' + error.message);
      }
    }
  };

  return (
    <div>
      <h2>Gas Invoice</h2>
      <label htmlFor="maxGallons">Max Gallon Capacity:</label>
      <input
        type="text"
        id="maxGallons"
        value={maxGallons || ''}
        onChange={(e) => setMaxGallons(e.target.value)}
      />
      <br />
      <label htmlFor="numGallons">Number Of Gallons In Vehicle:</label>
      <input
        type="text"
        id="numGallons"
        value={numGallons || ''}
        onChange={(e) => setNumGallons(Number(e.target.value))}
      />
      <br />
      <button onClick={clearInputs}>Cancel</button>
      <button onClick={submitForm}>Submit</button>
      <br /><br />
      {response && (
        <table>
          <thead>
            <tr>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{response}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GasForm;
