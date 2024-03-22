import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getOneBicycle } from '../../services/service';  

const CardContainer = styled.div`
    display: flex;
    align-content: center;
    flex-direction: column;
    justify-content: space-evenly;
    height: 80vh;
    align-items: center;
    flex-wrap: wrap;

    img {
        max-height: 60vh;
        max-width: 60vw;
        border: 0.5rem solid #D9D9D9;
    }

    img:hover {
        transform: scale(1.1);
        transition: 0.5s;
        border: 1rem solid #b3b3b3;
    }

    .properties {
        display: grid;
        width: 30vw;
        height: 20vh;
    }

    .container-properties {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 30vw;
        max-height: 60vh;
    }

    h2 {
        text-align: center;
        font-family: 'Jost', sans-serif;
        font-size: 1vw;
        text-transform: uppercase;
        text-decoration: bold;
        text-shadow:  4px 4px 4px #D9D9D9;
    }

    p {
        font-family: 'Jost', sans-serif;
        text-align: center;
        font-size: 1vw;
    }
`

const Card = () => { 
    const { id } = useParams();  
    const [bicycle, setBicycle] = useState(null);  

    useEffect(() => {  
        const fetchBicycleDetails = async () => {         
            try {
                console.log('Fetching bicycle details for ID:', id);
                const detailedBicycle = await getOneBicycle(id); 
                console.log('Fetched bicycle details:', detailedBicycle);
                setBicycle(detailedBicycle); 
            } catch (error) {
                console.error('Error fetching bicycle details:', error);
                setBicycle({ error: 'No se pudieron cargar los detalles de la bicicleta.' });
            }
        };
        fetchBicycleDetails();    
    }, [id]);  

    console.log('Bicycle state:', bicycle);

    return (
        <CardContainer> 
            {bicycle ? (
                <>
                    <img src={bicycle.data.image} alt={bicycle.data.model} />
                    <section className="container-properties">
                        <div className="properties">
                            <h2>Modelo:</h2>
                            <p>{bicycle.data.model}</p>
                        </div>
                        <div className="properties">
                            <h2>Cuadro:</h2>
                            <p>{bicycle.data.frame}</p>
                        </div>
                        <div className="properties">
                            <h2>Velocidades:</h2>
                            <p>{bicycle.data.speeds}</p>
                        </div>
                        <div className="properties">
                            <h2>Eléctrica:</h2>
                            <p>{bicycle.data.electric ? "Sí" : "No"}</p>
                        </div>
                    </section>
                </>
            ) : (
                <p>Cargando datos de la bicicleta...</p>
            )}
        </CardContainer>
    );
            }
    export default Card