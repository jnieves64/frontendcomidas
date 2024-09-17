import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TipoComidaForm = ({ data, onNext }) => {
    const [loading, setLoading] = useState(false);
    const [tipoComida, setTipoComida] = useState(null);
    const [error, setError] = useState(null);

    const fetchTipoComida = async () => {
        setLoading(true);
        setError(null);
        try {

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await axios.post('https://backendappcomidas.onrender.com/tipo-comida', {
                id_comida: data.id_comida,
            });

            setTipoComida({
                id_tipo_comida: response.data.idTipoComida,
                nombre_tipo_comida: response.data.tipoComida,
            });
        } catch (error) {
            setError('Error al seleccionar el tipo de comida.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleNextClick = () => {
        if (tipoComida) {
            onNext(tipoComida);
        }
    };

    return (
        // <div>
        //     {loading ? (
        //         <p>Seleccionando aleatoriamente el tipo de comida...</p>
        //     ) : (
        //         <>
        //             {error ? (
        //                 <p style={{ color: 'red' }}>{error}</p>
        //             ) : (
        //                 <>
        //                     <p>El tipo de comida seleccionado es: {tipoComida?.nombre_tipo_comida}</p>
        //                     <button onClick={handleNextClick}>Siguiente</button>
        //                 </>
        //             )}
        //         </>
        //     )}
        // </div>
        <div>
            {
                tipoComida ? (
                    <>
                        <p>El tipo de comida seleccionado es: {tipoComida?.nombre_tipo_comida}</p>
                        <button className='btn-form' onClick={handleNextClick}>Siguiente</button>
                    </>
                ) : (
                    <>
                        {
                            error ? (
                                <p style={{ color: 'red' }}>{error}</p>
                            ) : (
                                <>
                                    <button onClick={fetchTipoComida} className='btn-form'>
                                        {loading ? 'Seleccionando el tipo de comida...' : 'Generar el tipo de Comida'}
                                    </button>

                                </>
                            )
                        }
                    </>
                )
            }
        </div>
    );
};

export default TipoComidaForm;
