import React, { useReducer } from 'react';

import { initialState } from './constants';
import { reducer } from './reducer';
import {actions} from './actions';
import { Container, Row, Button, Card, Form } from 'react-bootstrap';

import axios from 'axios';

const FacilityForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setterFacility = e => {
    e.preventDefault();
    let {name, value} = e.target;
    dispatch({type: actions.setterFacility, name, payload: value})
  }

  const createFacility = async () => {
    let data = new FormData();
    data.append('name', state.facility.name);
    data.append('description', state.facility.description);
    try{
      let response = await axios.post('http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities',data)
      console.log('se realizo correctamente')
    }catch(error){
console.log(error)
    }
  }

  const Back = () => {
    props.history.goBack();
  };
  return (
    <Container>
      <Row className='justify-content-start'>
        <Button onClick={() => Back()}>Volver</Button>
      </Row>
      <Row className='justify-content-center'>
        <h3>Agregar facilities</h3>
      </Row>
      <hr />
      <Card>
        <Card.Header>
          <Card.Title as='h5'>Lista de Facilities</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId='formBasicName'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={setterFacility} name='name' type='text' value={state.facility.name} placeholder='Ingrese nombre'/>
            </Form.Group>
            <Form.Group controlId='formBasicDescripcion'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={setterFacility} name='description' type='text' value={state.facility.description} placeholder='Ingrese descripcion'/>
            </Form.Group>
            <Button onClick = {() => createFacility()} variant='primary'>
              Guardar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FacilityForm;