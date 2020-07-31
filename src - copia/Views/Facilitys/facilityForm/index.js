import React, { useReducer, useEffect } from 'react';

import { initialState } from './constants';
import { reducer } from './reducer';
import { actions } from './actions';
import { Container, Row, Button, Card, Form, Alert } from 'react-bootstrap';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const FacilityForm = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let { data } = await axios.get(
          `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities/${id}`
        );
        dispatch({ type: actions.fetchDataSuccess, payload: data[0] });
      } catch (error) {
        dispatch({ type: actions.fetchDataError, payload: error });
      }
    };

    if (id !== 'new') {
      //cargar datos del canal
      fetchData();
    }
  }, [id]);

  const setterFacility = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    dispatch({ type: actions.setterFacility, name, payload: value });
  };

  const createFacility = async () => {
    dispatch({ type: actions.saveFacility });
    try {
      await axios.post(
        'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities',
        state.facility
      );
      dispatch({ type: actions.saveFacilitySuccess });
      Back();
    } catch (error) {
      dispatch({
        type: actions.saveFacilityError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const editFacility = async () => {
    dispatch({ type: actions.saveFacility });
    try {
      await axios.put(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities/${state.facility.id}`,
        state.facility
      );
      dispatch({ type: actions.saveFacilitySuccess });
      Back();
    } catch (error) {
      dispatch({
        type: actions.saveFacilityError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const Back = () => {
    history.goBack();
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <h3>{id !== 'new' ? 'Editar Facility' : 'Agregar Facility'}</h3>
      </Row>
      <Row className='justify-content-start'>
        <Button onClick={() => Back()}>Volver</Button>
      </Row>
      <hr />
      {state.sendingFacilityError && (
        <Alert>{state.sendingFacilityError}</Alert>
      )}
      {state.loadingDataError && <Alert>{state.loadingDataError}</Alert>}
      <Card>
        <Card.Header>
          <Card.Title as='h5'>
            {id !== 'new' ? 'Editar Facility' : 'Agregar Facility'}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId='formBasicName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={setterFacility}
                name='name'
                type='text'
                value={state.facility.name}
                placeholder='Ingrese nombre'
              />
            </Form.Group>
            <Form.Group controlId='formBasicDescription'>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                onChange={setterFacility}
                name='description'
                type='text'
                value={state.facility.description}
                placeholder='Ingrese descripcion'
              />
            </Form.Group>
            {id !== 'new' ? (
              <Button onClick={() => editFacility()} variant='primary'>
                {state.sendingFacility ? 'Cargando...' : 'Editar'}
              </Button>
            ) : (
              <Button onClick={() => createFacility()} variant='primary'>
                {state.sendingFacility ? 'Cargando...' : 'Guardar'}
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FacilityForm;