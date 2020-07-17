import React, { useReducer, useEffect } from 'react';

import { initialState } from './constants';
import { reducer } from './reducer';
import { actions } from './actions';
import { Container, Row, Button, Card, Form } from 'react-bootstrap';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const FacilityForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let { data } = await axios.get(
          `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities/${id}`
        );
        dispatch({ type: actions.fetchDataSuccess, payload: data });
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
    let data = new FormData();
    data.append('name', state.facility.name);
      data.append('description', state.facility.description);
    try {
      let response = await axios.post(
        'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities',
        data
      );
      console.log('se realizo correctamente');
    } catch (error) {
      console.log(error);
    }
  };

  const editFacility = async () => {
    let data = new FormData();
    data.append('name', state.facility.name);
    data.append('description', state.facility.description);
    try {
      let response = await axios.put(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities/${state.facility.id}`,
        data
      );
      console.log('se realizo correctamente');
    } catch (error) {
      console.log(error);
    }
  };

  const Back = () => {
    props.history.goBack();
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <h3>
          {id !== 'new'
            ? 'Editar Facility'
            : 'Agregar Facility'}
        </h3>
      </Row>
      <Row className='justify-content-start'>
        <Button onClick={() => Back()}>Volver</Button>
      </Row>
      <hr />
      <Card>
        <Card.Header>
          <Card.Title as='h5'>
            {id !== 'new'
              ? 'Editar Facility'
              : 'Agregar Facility'}
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
                Editar
              </Button>
            ) : (
              <Button onClick={() => createFacility()} variant='primary'>
                Guardar
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FacilityForm;