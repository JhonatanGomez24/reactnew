import React, { useReducer, useEffect } from 'react';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import axios from 'axios';

import { Container,Row, Button,Card, Col,Form
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
          <div class = "container mt-5">
      <div class="row justify-content-center">
          {state.facilitys.map((item) => {
                      return (
    <Col md={6} xl={4}>  
                        <Card className='card-social'>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col">
                                  <h4>{item.name}</h4>
                                    </div>
                                    <Col md={6} xl={5}>
                            <Card.Body className='card-event'>
                                    <div className="col-auto">
                                        <label className="label theme-bg2 text-white f-14 f-w-400 float-right">Activo </label>
                                    </div>
                            </Card.Body>
                                    </Col>
                                </div>
                            <Card.Body className='border-bottom'>
                                <div className="row align-items-center justify-content-center">
                                    <div className="col text-left">
                                        <h5 className="text-c-green mb-0">40<span className="text-muted">Pedidos</span></h5>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-home text-primary f-36"/>
                                    </div>
                                </div>
                            </Card.Body>
                            <Card.Body>
                                <div className="row align-items-center justify-content-center card-active">
                                    <div className="col-6">
                                        <h6 className="text-center m-b-10"><span className="text-muted m-r-5">Cocinando:</span></h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme" role="progressbar" style={{width: '60%', height: '6px'}} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <h6 className="text-center  m-b-10"><span className="text-muted m-r-5">Completos:</span></h6>
                                        <div className="progress">
                                            <div className="progress-bar progress-c-theme2" role="progressbar" style={{width: '45%', height: '6px'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"/>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                            
                            <div class="row">
    <div class="col-sm">
    </div>
    <div class="col-sm">
    <label className="label theme-bg2 text-white f-14 f-w-400 float-right" onClick={() => pedidos()}>Pedidos </label>
    </div>
    <div class="col-sm">
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