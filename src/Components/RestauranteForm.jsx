import React, { useState } from 'react';
import axios from 'axios';
import ConfettiExplosion from 'react-confetti-explosion';

const RestauranteForm = ({ data, onNext }) => {
    const [loading, setLoading] = useState(false);
    const [restaurante, setRestaurante] = useState(null);
    const [error, setError] = useState(null);

    const fetchRestaurante = async () => {
        setLoading(true);
        setError(null);
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await axios.post('https://backendappcomidas.onrender.com/restaurante', {
                id_tipo_comida: data.id_tipo_comida,
                id_presupuesto: data.id_presupuesto,
            });

            setRestaurante(response.data.restaurante);
        } catch (error) {
            setError('Error al seleccionar el restaurante.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateClick = () => {
        fetchRestaurante();
    };

    return (
        <div>
            {!restaurante ? (
                <>
                    <button className='btn-form' onClick={handleGenerateClick} disabled={loading}>
                        {loading ? 'Generando Restaurante...' : 'Generar el Restaurante'}
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            ) : (
                <>
                    <h3>El restaurante seleccionado es: {restaurante}</h3>
                    <ConfettiExplosion />
                </>
            )}
        </div>
    );
};

export default RestauranteForm;
