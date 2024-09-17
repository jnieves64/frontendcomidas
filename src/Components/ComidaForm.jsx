import React, { useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';

const ComidaForm = ({ onNext }) => {
  const [comidaSeleccionada, setComidaSeleccionada] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!comidaSeleccionada) {
      setError('Por favor selecciona una comida.');
      return;
    }

    try {
      const response = await axios.post('https://backendappcomidas.onrender.com/comida', {
        nombre_comida: comidaSeleccionada,
      });
      onNext(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error al seleccionar la comida.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comida">Selecciona la comida:</label>
      <select
        id="comida"
        value={comidaSeleccionada}
        onChange={(e) => setComidaSeleccionada(e.target.value)}
      >
        <option value="">--Seleccionar--</option>
        <option value="Desayuno">Desayuno</option>
        <option value="Almuerzo">Almuerzo</option>
        <option value="Cena">Cena</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <div className='loading'><CircularProgress color='secondary' /></div>}

      <button className='btn-form' type="submit">Siguiente</button>
    </form>
  );
};

export default ComidaForm;
