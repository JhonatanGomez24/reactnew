import React, { useReducer, useEffect } from 'react';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import axios from 'axios';

import './style.css';

import {
  Container,
  Row,
  Button,
  Card,
  Form,
  Col,
  Alert,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const HistorialForm = ({ history }) => {
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

    const fetchRestaurant = async () => {
      let { data } = await axios.get(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes/${id}`
      );
      dispatch({ type: actions.fetchRestaurantSuccess, payload: data[0] });
    };

    fetchChannels();
    fetchFacilitys();
    if (id !== 'new') {
      fetchRestaurant();
    }
  }, [id]);

  const setter = (e) => {
    let { name, value } = e.target;
    dispatch({ type: actions.setterRestaurant, name, payload: value });
  };

  const saveRestaurant = async () => {
    dispatch({ type: actions.saveRestaurant });
    try {
      await axios.post(
        'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes',
        state.restaurant
      );
      dispatch({ type: actions.saveRestaurantSuccess });
      history.goBack();
    } catch (error) {
      dispatch({
        type: actions.saveRestaurantError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const updateRestaurant = async () => {
    dispatch({ type: actions.saveRestaurant });
    try {
      await axios.put(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes/${id}`,
        state.restaurant
      );
      dispatch({ type: actions.saveRestaurantSuccess });
      history.goBack();
    } catch (error) {
      dispatch({
        type: actions.saveRestaurantError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const addCanales = (e) => {
    let { value } = e.target;
    if (value !== '-1') {
      let intValue = parseInt(value);
      if (!state.restaurant.canales.some((item) => item === intValue)) {
        dispatch({ type: actions.addCanales, payload: parseInt(value) });
      }
    }
  };

  const deleteCanales = (idx) => {
    dispatch({ type: actions.deleteCanales, payload: idx });
  };

  let loading = state.loadingFacilitys || state.loadingChannels;
  return (
    <Container>
      <Col>
        <Row className='justify-content-center'>
          <h3>
            {id !== 'new'
              ? 'Editar Canal de entrega'
              : ' Agregar Canal de entrega'}
          </h3>
        </Row>
        <Row className='justify-content-start'>
          <Button onClick={() => history.goBack()}>Volver</Button>
        </Row>
        <hr />
        {state.errorFacilitys && <Alert>{state.errorFacilitys}</Alert>}
        {state.errorChannels && <Alert>{state.errorChannels}</Alert>}
        {state.errorSave && <Alert>{state.errorSave}</Alert>}
        <Card>
          <Card.Header>
            <Card.Title>
              {id !== 'new'
                ? 'Editar Canal de entrega'
                : ' Agregar Canal de entrega'}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            {loading ? (
              <h1 style={{ textAlign: 'center' }}>Cargando...</h1>
            ) : (
              <Form>
                <Form.Group controlId='nameInput'>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    value={state.restaurant.name}
                    onChange={setter}
                    name='name'
                    type='text'
                    placeholder='Ingrese nombre'
                  />
                </Form.Group>
                <Form.Group controlId='addressInput'>
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    value={state.restaurant.address}
                    onChange={setter}
                    name='address'
                    type='text'
                    placeholder='Ingrese la dirección'
                  />
                </Form.Group>
                <Form.Group controlId='emailInput'>
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    value={state.restaurant.email}
                    onChange={setter}
                    name='email'
                    type='text'
                    placeholder='ejemplo@delivery.com'
                  />
                </Form.Group>
                <Form.Group controlId='receiptsInput'>
                  <Form.Label>Tipo de recibos</Form.Label>
                  <Form.Control
                    value={state.restaurant.receiptsType}
                    onChange={setter}
                    name='receiptsType'
                    type='text'
                    placeholder='Efectivo'
                  />
                </Form.Group>
                <Form.Group controlId='preparationTimeInput'>
                  <Form.Label>Tiempo de preparación / minutos</Form.Label>
                  <Form.Control
                    value={state.restaurant.preparationTime}
                    onChange={setter}
                    name='preparationTime'
                    type='number'
                    placeholder='0'
                  />
                </Form.Group>
                <Form.Group controlId='openingTimeInput'>
                  <Form.Label>Hora de apertura</Form.Label>
                  <Form.Control
                    value={state.restaurant.openingTime}
                    onChange={setter}
                    name='openingTime'
                    type='time'
                  />
                </Form.Group>
                <Form.Group controlId='closingTimeInput'>
                  <Form.Label>Hora de cierre</Form.Label>
                  <Form.Control
                    value={state.restaurant.closingTime}
                    onChange={setter}
                    name='closingTime'
                    type='time'
                  />
                </Form.Group>
                <Form.Group controlId='facilityInput'>
                  <Form.Label>Facility</Form.Label>
                  <Form.Control
                    value={state.restaurant.facilityId}
                    onChange={setter}
                    name='facilityId'
                    as='select'
                  >
                    <option value={-1}>Seleccione una facility</option>
                    {state.facilitys.map((item, idx) => {
                      return (
                        <option key={idx} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId='channelsInput'>
                  <Form.Label>Canales de entrega</Form.Label>
                  <Form.Control
                    onChange={addCanales}
                    name='canales'
                    as='select'
                  >
                    <option value={-1}>Seleccione un canal</option>
                    {state.channels.map((item, idx) => {
                      return (
                        <option key={idx} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Form.Control>
                  <Row className='mt-2'>
                    {state.restaurant.canales.map((item, idx) => {
                      let renderItem = state.channels.find(
                        (channel) => channel.id === item
                      );
                      return (
                        <Col className='mt-1' md='6' sm='12' key={idx}>
                          <div
                            style={{
                              width: '100%',
                              height: '50px',
                              display: 'flex',
                              flexDirection: 'row',
                              backgroundColor: '#f4f4f4',
                              padding: '5px 5px',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}
                          >
                            <h3>{renderItem.name}</h3>
                            <Button
                              onClick={() => deleteCanales(idx)}
                              variant='danger'
                            >
                              <span className='pcoded-micon'>
                                <i className='feather icon-trash' />
                              </span>
                            </Button>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Form.Group>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                    padding: '0px 0px',
                  }}
                >
                  {id !== 'new' ? (
                    <Button onClick={updateRestaurant} variant='success'>
                      {state.loadingSave ? 'Cargando...' : 'Editar'}
                    </Button>
                  ) : (
                    <Button onClick={saveRestaurant} variant='success'>
                      {state.loadingSave ? 'Cargando...' : 'Guardar'}
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default HistorialForm;