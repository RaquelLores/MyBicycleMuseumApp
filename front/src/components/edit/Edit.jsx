import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { updateItem, getOneBicycle, uploadImage } from '../../services/service';
import { useParams } from 'react-router';


const StyledEdit = styled.div`
  height: 80vh;
  display: flex;
  align-items: center;

  body {
    max-height: 100%;
  }

  form {
    font-family: 'Jost', sans-serif;
    max-width: 600px;
    min-width: 350px;
    margin: 0 auto;
    margin-top: 3%;
    margin-bottom: 3%;
    padding: 2%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-size: 1.5vw;
  }
  
  label {
    display: block;
    margin-bottom: 2%;
    color: #000000;
  }
  
  input[type="text"],
  input[type="file"],
  select {
    width: 100%;
    padding: 3%;
    margin-bottom: 5%;
    border: none;
    background-color: #D9D9D9;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  input[type="submit"] {
    width: 100%;
    padding: 3%;
    border: none;
    background-color: #000000;
    color: #FFFFFF;
    font-size: 1.5vw;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
  }
  
  input[type="submit"]:hover {
    background-color: #333333;
  }
  
  .error-message {
    color: red;
  }
  
  .cuadred {
    display: flex;
  }
  
  .frame,
  .electric {
    display: flex;
    align-items: center; 
    margin-right: 5%; 
    font-size: 1.5vw;
  }
  
  .frame label,
  .electric label {
    margin-right: 5%; 
  }
  
  .frame select {
    flex: 1; 
    width: 125px;
    margin-top: 5%;
  }
  
  .electric input[type="checkbox"] {
    justify-content: flex-end;
    width: 50%;
    height: 50%;
  }
  
  input[type="submit"] {
    background-color: #3de161d2;
    margin-top: 1%;
  }
`;

const Edit = () => {
  const { id } = useParams();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [bicycleData, setBicycleData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const detailedBicycle = await getOneBicycle(id);
        setBicycleData(detailedBicycle.data);
        reset(detailedBicycle.data);
      } catch (error) {
        console.error('Error fetching bicycle details:', error);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updateItem(id, data); // Asegúrate de que la función updateItem pueda manejar la carga de imágenes correctamente
      alert('¡Los datos del elemento han sido actualizados correctamente!');
      reset();
    } catch (error) {
      console.error('Error al actualizar el elemento:', error);
      alert('Error al actualizar el elemento. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <StyledEdit>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Modelo</label>
          <input type="text" {...register('model', { required: true })} defaultValue={bicycleData?.model || ''} />
          {errors.model?.type === 'required' && <p className="error-message">El campo modelo es requerido</p>} 
        </div>
        <div>
          <label>Velocidades</label>
          <input type="text" {...register('speeds', { pattern: /^[0-9]{1,3}$/, required: true })} defaultValue={bicycleData?.speeds || ''} />
          {errors.speeds?.type === 'pattern' && <p className="error-message">La velocidad debe ser un valor numérico</p>}
          {errors.speeds?.type === 'required' && <p className="error-message">El campo velocidades es requerido</p>}
        </div>
        <div>
          <label>Cuadro</label>
          <select {...register('frame')} defaultValue={bicycleData?.frame || ''}>
            <option value="Aluminio">Aluminio</option>
            <option value="Acero">Acero</option>
            <option value="Plástico">Plástico</option>
            <option value="Carbono">Carbono</option>
            <option value="Otros">Otros</option>
          </select>
        </div>
        <div>
          <label>Eléctrica</label>
          <input type="checkbox" {...register('electric')} defaultChecked={bicycleData?.electric || false} />
        </div>
        <div>
          <label>Adjuntar imagen</label>
          <input type="file" {...register('image')} accept="image/*" />
        </div>
        <input type="submit" value="Editar" />
      </form>
    </StyledEdit>
  );
}

export default Edit;