import React, { useState } from 'react';
import axios from 'axios';

const PresupuestoForm = ({ onNext }) => {
    const [presupuestoSeleccionado, setPresupuestoSeleccionado] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://backendappcomidas.onrender.com/presupuesto', {
                nivelPresupuesto: presupuestoSeleccionado ? presupuestoSeleccionado : null,
            });
            onNext(response.data);
        } catch (error) {
            setError('Error al seleccionar el presupuesto.');
            console.error(error);
        }
    };

    const handleAleatorio = async () => {
        try {
            const response = await axios.post('https://backendappcomidas.onrender.com/presupuesto', {});
            onNext(response.data); // Guardamos el presupuesto aleatorio en el padre
        } catch (error) {
            setError('Error al seleccionar el presupuesto aleatorio.');
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="presupuesto">Selecciona el presupuesto:</label>
                <select
                    id="presupuesto"
                    value={presupuestoSeleccionado}
                    onChange={(e) => setPresupuestoSeleccionado(e.target.value)}
                >
                    <option value="">--Seleccionar--</option>
                    <option value="Alto">Alto</option>
                    <option value="Medio">Medio</option>
                    <option value="Bajo">Bajo</option>
                </select>

                <button className='btn-form' type="submit">Siguiente</button>
            </form>

            <p>O permite que la App lo decida por ti:</p>

            <button className='btn-form' onClick={handleAleatorio}>Aleatorio</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default PresupuestoForm;
