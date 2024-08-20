import { useDebouncedValue } from '@/Hook/useDebouncedValue';
import React, { useState, useEffect } from 'react';

export default function Test() {
  const [customerId, setCustomerId] = useState('');
  const [result, setResult] = useState(null); // État pour stocker le résultat de la requête

  // Utilisation du hook useDebouncedValue pour obtenir une version débouncée de customerId
  const debouncedCustomerId = useDebouncedValue(customerId, 500);

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const response = await fetch(
          'https://backideal-api-server-xryf2.ondigitalocean.app/api/check-account',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: debouncedCustomerId }) // Utilisation de la version débouncée
          }
        );
        const data = await response.json();
        setResult(data); // Stocker le résultat de la requête dans l'état
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // Vérifiez si la valeur débordée est définie, puis soumettez la requête
    if (debouncedCustomerId) {
      handleSubmit();
    }
  }, [debouncedCustomerId]);

  const handleChange = (e) => {
    setCustomerId(e.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <label className="block text-gray-700 text-sm font-bold mb-2">Customer ID</label>
        <input
          type="text"
          name="id"
          value={customerId}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {result && (
          <div className="mt-4">
            <h3 className="text-gray-700 font-bold mb-2">Result:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
