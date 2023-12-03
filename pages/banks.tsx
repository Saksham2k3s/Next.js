// pages/banks.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './style.css';

export default function Bank({ data }: any) {
  const [showdata, setShowData] = useState(data);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [data]);

  const handleData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://random-data-api.com/api/v2/banks?size=10&is_xml=true');
      if (!response.ok) {
        throw new Error('Failed to fetch the data');
      }

      const json = await response.json();
      setShowData(json);
      
    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='main-container'>
      <h1>Bank List</h1>
      {loading ? (
        <p className='text'>Loading...</p>
      ) : error ? (
        <p className='text'>Error {error}</p>
      ) : (
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Unique ID</th>
              <th scope='col'>Account Number</th>
              <th scope='col'>IBAN</th>
              <th scope='col'>Bank Name</th>
              <th scope='col'>Routing Number</th>
            </tr>
          </thead>
          <tbody>
            {showdata.map((bank: any, id: any) => (
              <tr key={id}>
                <td>{bank.id}</td>
                <td>{bank.uid}</td>
                <td>{bank.account_number}</td>
                <td>{bank.iban}</td>
                <td>{bank.bank_name}</td>
                <td>{bank.routing_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        <button className='btn' onClick={handleData}>
          Reload Data
        </button>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch('https://random-data-api.com/api/v2/banks?size=10&is_xml=true');
  const data = await response.json();
  
  return {
    props: { data },
  };
};

