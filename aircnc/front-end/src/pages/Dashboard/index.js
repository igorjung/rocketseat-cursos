import React, { useEffect , useState, useMemo } from 'react';
//link permite navegação entre paginas.
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

export default function Dashboard(){
    const [spots, setSpots] = useState([]);
    const [requests, setRequests] = useState([]);
    //função a ser executada, condições para executar a função.
    //observa conexão do usuário.

    const user_id = localStorage.getItem('user');

    const socket = useMemo(() => socketio('http://localhost:3333',{
         query: { user_id },
    }), [user_id]);

    useEffect(()=>{
       //ouvindo a requisição do booking.
       socket.on('booking_request', data => 
       {
            setRequests([...requests,data]);
       });

    }, [requests, socket])
   
    useEffect(()=>{
        async function loadSpots(){
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });

            setSpots(response.data);
        }

        loadSpots();

    },[]);

    async function handleAccept(id) {
        await api.post(`/booking/${id}/approvals`);

        //filtra requisições já respondidas.
        setRequests(requests.filter(request => request._id !== id));
    }

    async function handleReject(id) {
        await api.post(`/booking/${id}/rejections`);


        setRequests(requests.filter(request => request._id !== id));
    }

    return (
        <>
        <ul className="notifications">
            {requests.map(request => (                      <li key={request._id}>
                    <p>
                        <strong> {request.user.email} </strong>
                        está solicitando uma reserva em 
                        <strong> {request.spot.company} </strong>
                        para a data 
                        <strong> {request.date} </strong>
                    </p>
                    <button className='accept' onClick={() => handleAccept(request._id)}>ACEITAR</button>
                    <button className='reject' onClick={() => handleReject(request._id)} >REJEITAR</button>
                </li>
            ))}
        </ul>
            <ul className='spot-list'>
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style ={{backgroundImage: `url(${spot.thumbnail_url})`}}></header>
                        <strong>{spot.company}</strong> 
                        <span>{spot.price ? `R$${spot.price}/dia` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to='/new'>
               <button className='btn'>Cadastrar novo spot.</button>
            </Link>
        </>
    )
}