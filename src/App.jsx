import './App.css'
import React, { useState } from 'react';
import ComidaForm from './Components/ComidaForm';
import PresupuestoForm from './Components/PresupuestoForm';
import TipoComidaForm from './Components/TipoComidaForm';
import RestauranteForm from './Components/RestauranteForm';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function App() {

  const [data, setData] = useState({});
  const [step, setStep] = useState(1);

  const handleNext = (newData) => {
    setData((prevData) => ({ ...prevData, ...newData }));
    setStep(step + 1);
  };

  const handleReset = () => {
    setData({});
    setStep(1);
  };

  const handlePrevious = () => {
    if (step === 2) {
      setData((prevData) => {
        const { id_comida, nombre_comida, ...rest } = prevData;
        return rest;
      });
    } else if (step === 3) {
      setData((prevData) => {
        const { nivel_presupuesto, id_presupuesto, ...rest } = prevData;
        return rest;
      });
    } else if (step === 4) {
      setData((prevData) => {
        const { id_tipo_comida, nombre_tipo_comida, ...rest } = prevData;
        return rest;
      });
    }
    setStep(step - 1);
  };

  return (
    <div className="app-body">
      <h2>Bienvenido a la App para Sorteo de Comidas</h2>
      <div>
        {step === 1 && <ComidaForm onNext={handleNext} />}
        {step === 2 && <PresupuestoForm onNext={handleNext} />}
        {step === 3 && <TipoComidaForm data={data} onNext={handleNext} />}
        {step === 4 && <RestauranteForm data={data} onNext={handleNext} />}
      </div>
      <div className='group-icons'>
        <IconButton onClick={handlePrevious} color='error' disabled={step === 1}>
          <ArrowBackIcon />
        </IconButton>
        <IconButton onClick={handleReset} color='error'>
          <RestartAltIcon />
        </IconButton>
      </div>
      <div>
        {data.nombre_comida && <p>Comida Seleccionada: {data.nombre_comida}</p>}
        {data.nivel_presupuesto && <p>Presupuesto Seleccionado: {data.nivel_presupuesto}</p>}
        {data.nombre_tipo_comida && <p>Tipo de Comida Seleccionado: {data.nombre_tipo_comida}</p>}
      </div>
    </div>
  )
}

export default App
