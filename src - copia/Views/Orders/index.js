import React, { useReducer, useEffect } from 'react';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import axios from 'axios';

import './style.css';

import { Container,Row, Button,Card, Col
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const Orders = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { id } = useParams();

  useEffect(() => {
    const fetchFacilitys = async () => {
      dispatch({ type: actions.fetchFacilitys });
      try {
        let { data } = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities'
        );
        dispatch({ type: actions.fetchFacilitysSuccess, payload: data });
      } catch (error) {
        dispatch({
          type: actions.fetchFacilitysError,
          payload: 'Ha ocurrido un error en el servidor',
        });
      }
    };
    fetchFacilitys();
    if (id !== 'new') {
    }
  }, [id]);

  const pedidos = () => {
    history.push('/orders/new');
  };

  return (
    <Container>
      <Card.Header>
            <Card.Title as='h5'>Pedidos</Card.Title>
      </Card.Header>
          <br></br>
          {state.facilitys.map((item) => {
                      return (
    <Col md={6} xl={4}>  
                        <Card className='card-social'>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col-auto">
                                        <i className="fa fa-building text-primary f-36"/>
                                    </div>
                                    <div className="col text-right">
                                        <h3>Facility</h3>
                      <Card.Text scope='row'></Card.Text>
                      <Card.Text>{item.name}</Card.Text>
                      <Card.Text>{item.description}</Card.Text>
                                    </div>
                                </div>
                                </Card.Body>
                                <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <Button onClick={pedidos}>Pedidos</Button>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    );
                  })}
    </Container>
  );
};

export default Orders;