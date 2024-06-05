import { useState, useEffect } from 'react';
import axios from 'axios';
import Go from './Gemini.module.css'

function Gemini() {
  const [output, setOutput] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    const fetchIds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/ids');
        setIds(response.data.ids);
      } catch (error) {
        console.error('Error fetching IDs:', error);
        setError('.');
      }
    };

    fetchIds();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setOutput([]);
    setError('');

    for (let id of ids) {
      try {
        const url = `http://localhost:3001/generate-output/${id}`;
        console.log('Requesting URL:', url); // Log the URL being requested
        const response = await axios.get(url);
        const generatedOutput = response.data.output;

        // Split the generated output by whitespace and extract the last element as the victim count
        const parts = generatedOutput.trim().split(/\s+/);
        const victimCount = parts.pop();
        const diseaseDetail = parts.join(' ');

        setOutput(prevOutput => [...prevOutput, { id, diseaseDetail, victimCount }]);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        setError('Error generating output');
        setLoading(false);
        return;
      }
    }

    setLoading(false);
  };

  return (
    <div>
      <button className={Go.btn1} onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p>{error}</p>}
      {output.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Disease Detail</th>
              <th>Victim Count</th>
            </tr>
          </thead>
          <tbody>
            {output.map((item,index) => (
              <tr key={item.id}>
                <td>{index+1}</td>
                <td>{item.diseaseDetail}</td>
                <td>{item.victimCount}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
         )} 
    </div>
  );
}

export default Gemini;
