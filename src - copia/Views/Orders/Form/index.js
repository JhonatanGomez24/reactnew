import React, { useReducer, useEffect } from 'react';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import axios from 'axios';

import './style.css';

import { Container,  Row, Button, Card,Form, Col, Alert,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar} from "react-step-progress-bar";

const Orders = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { id } = useParams();

  useEffect(() => {
    const fetchChannels = async () => {
      dispatch({ type: actions.fetchChannels });
      try {
        let { data } = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales'
        );
        dispatch({ type: actions.fetchChannelsSuccess, payload: data });
      } catch (error) {
        dispatch({
          type: actions.fetchChannelsError,
          payload: 'Ha ocurrido un error en el servidor',
        });
      }
    };

    const fetchRestaurant = async () => {
      dispatch({ type: actions.fetchRestaurant });
      try {
        let { data } = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes'
        );
        dispatch({ type: actions.fetchRestaurantSuccess, payload: data });
      } catch (error) {
        dispatch({
          type: actions.fetchRestaurantError,
          payload: 'Ha ocurrido un error en el servidor',
        });
      }
    };
    
    fetchRestaurant();
    fetchChannels();
    if (id !== 'new') {
    }
  }, [id]);

  return (
    
    <Container>
      <Card.Header>
            <Card.Title as='h5'>Pedidos</Card.Title>
      </Card.Header>
          <br></br>
      <div class = "container mt-5">
      {state.channels.map((item) => {
                      return (
                  <Col md={6} xl={4}>  
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-building text-primary f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h5>Facility</h5>
                      <Card.Text scope='row'></Card.Text>
                      <Card.Text>{item.name}</Card.Text>
                      <Card.Text>{item.description}</Card.Text>
                  <h5>Seguimiento</h5>
                  <ProgressBar
          percent={75}
          filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        />
         <h5>Detalles</h5>
         <Card.Text>Hamburguesa</Card.Text>
                                    </div>
                                </div>
                                </Card.Body>
                        </Card>
                    </Col>  
                    );
                  })}
      </div>
      
      <div class="container mt-5">
        <div class="row justify-content-center">
        {state.channels.map((item) => {
                      return (
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 mt-2">
            <div class="card">
              <div
                title="Instrucciones"
                class="cover cover-small"
              >
              </div>
              <div class="card-body">
                <h5 class="card-title">Canales</h5>
                <h5 scope='row'>{item.name}</h5>
              </div>
            </div>
          </div>
          );
        })}
        </div>
      </div>
    </Container>
  );
};

export default Orders;