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

const Historial = ({ history }) => {
  const [dataResults, setDataResults] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const pedido = ['uber' , 'rappi' , 'didi' , 'otro'];
  
  useEffect(() => {
    if (searchWord === ''){
      setDataResults(pedido);
    }
  }, [searchWord])
  
  const search = () => {
    if(searchWord === '') {
      return;
    }

    let newData = pedido.filter((item) => item.includes(searchWord));
    setDataResults (newData);
  }

  return (
    <Aux>
      <Container>
      <div className="box">
      <div className="container-1">
      <span class="icon"><i className='feather icon-search'></i></span>
      <input type="text"  id="search" placeholder="Buscar pedido" onChange={(e) => {
        setSearchWord(e.target.value); 
        search();
        }} />
      </div>
      </div>
      </Container>
      <br></br>
      <br></br>
      <br></br>
      <Container>
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
                  <th>Calificación</th>
                </tr>
              </thead>
              <tbody>
              {dataResults.map((elem, index) => {
                  return (
                    <tr >
                      <th>{index + 1}</th>
                      <th>{elem}</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th></th>
                    </tr>
                  );
                })}
              </tbody>
              </Table>
              </Card.Body>
              </Card>
  
      </Container>
    </Aux>
      );
  };
export default Historial;