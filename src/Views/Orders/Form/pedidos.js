import React, { useReducer, useEffect } from 'react';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import axios from 'axios';
import { Container, Card, Col, Breadcrumb,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import "react-step-progress-bar/styles.css";

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
      <Breadcrumb>
  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
    Library
  </Breadcrumb.Item>
  <Breadcrumb.Item active>Data</Breadcrumb.Item>
</Breadcrumb>
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
                                        <h6>Canal de Entrega</h6>
                      <Card.Text scope='row'></Card.Text>
                      <Card.Text>{item.name}</Card.Text>
                      <h6>Restaurantes</h6>
                      <Card.Text scope='row'></Card.Text>
                      <Card.Text>{item.name}</Card.Text>
                       <h6>Seguimiento</h6> 
                       <Card.Text>Aun en proceso
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
   </div>
    </Container>
  );
};

export default Orders;