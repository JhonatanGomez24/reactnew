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
import { Container, Card, Col, Breadcrumb,Row,Button
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

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
    
  const Back = () => {
    history.goBack();
  };
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
      <Breadcrumb>
  <Breadcrumb.Item>Facility</Breadcrumb.Item>
  <Breadcrumb.Item href="./index">Completos
  </Breadcrumb.Item>
  <Breadcrumb.Item href="./pedidos">Cocinando</Breadcrumb.Item>
</Breadcrumb>

      
<Row className='justify-content-end'>
        <Button onClick={() => Back()}>Volver</Button>
      </Row>
          <br></br>
      <div class = "container mt-5">
      <div class="row justify-content-center">
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
                                        <h6>Canal de Entrega</h6>
                      <Card.Text>{item.name}</Card.Text>
                      <h6>Restaurantes</h6>
                      <Card.Text>{item.name}</Card.Text>
                       <h6>Seguimiento</h6> <Card.Text>
                         <br></br>
                       <ProgressBar
        percent={55}
        fillBackground="linear-gradient(to right, #fefb72, #f0bb31)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://image.freepik.com/vector-gratis/repartidor-moto-mascara_23-2148498576.jpg"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="40"
              src="https://image.freepik.com/vector-gratis/repartidor-moto-mascara_23-2148498576.jpg"
            />
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="https://image.freepik.com/vector-gratis/repartidor-moto-mascara_23-2148498576.jpg"
            />
          )}
        </Step>
      </ProgressBar>
         </Card.Text>
         <h6>Detalles</h6>
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
                    </Col>
                    );
                  })} 
      </div>
   </div>
    </Container>
  );
};

export default Orders;