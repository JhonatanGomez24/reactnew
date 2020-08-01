import React, { useReducer, useEffect, useState } from 'react';
import Aux from '../../hoc/_Aux';
import axios from 'axios';

import { reducer } from './reducer';
import { initialState } from './constants';
import { actions } from './actions';

import {
  Container,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Badge,
  Col,
  Alert,
} from 'react-bootstrap';

import './style.css';

const Historial = ({ history }) => 
  const [dataResults, setDataResults] = useState([]);
  const pedido = ['uber' , 'rappi' , 'didi' , 'otro'];
  const search = (e) => {
    let newData = pedido.filter((item) => item.includes(e.target.value));
    setDataResults (newData);
  }
  return (
    <Aux>
      <div className="App">
      <h1>Buscador</h1>
      <input type="text"  class="form-control" placeholder="Buscar pedido" onChange={(e) => search(e)}></input>
    
      </div>
      <Container>
      <Row className='justify-content-end'>
      
      </Row>
        <Row className='justify-content-center'>
          <h3>Historial de pedidos</h3>
        </Row>
        <Card>
          <Card.Header>
            <Card.Title as='h5'> Lista de pedidos</Card.Title>
          </Card.Header>
          <Card.Body>
          <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Canal de entrega</th>
                  <th>Restaurant</th>
                  <th>Total</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
              {dataResults.map((elem) => {
                  return (
                    <tr >
                      <th >{elem}</th>
                      <th>
                        
                      </th>
                    </tr>
                  );
                })}
              </tbody>
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let { data } = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes'
        );
        dispatch({ type: actions.fetchDataSuccess, payload: data });
      } catch (error) {
        dispatch({
          type: actions.fetchDataError,
          payload: 'Ha ocurrido un error en el servidor',
        });
      }
    };
    fetchData();
  }, [state.reload]);

  const deleteRestaurant = async () => {
    dispatch({ type: actions.deleteRestaurant });
    try {
      await axios.delete(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes/${state.idSelected}`
      );
      dispatch({ type: actions.deleteRestaurantSuccess });
    } catch (error) {
      dispatch({
        type: actions.deleteRestaurantError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const editRestaurant = (id) => {
    history.push(`/historial/${id}`);
  };
  return (
    <Aux>
      <Container>
        <Row className='justify-content-center'>
          <h3>Restaurants</h3>
        </Row>
        <Row className='justify-content-end'>
          <Button
            onClick={() => history.push('/historial/new')}
            variant='success'
          >
            Agregar un Restaurant
          </Button>
        </Row>
        <Card>
          <Card.Header>
            <Card.Title as='h5'> Lista de Restaurants registrados</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Canal de Entrega</th>
                  <th>Repartidor</th>
                  <th>Restaurant</th>
                  <th>Total</th>
                  <th>Fecha/Hora</th>
                  <th>Acciones</th>
                </tr>
              </thead>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Aux>
      );
  };
export default Historial;