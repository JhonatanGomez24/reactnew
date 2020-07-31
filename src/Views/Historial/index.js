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
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </Aux>
      );
  };
export default Historial;