import React, { useReducer } from 'react';

import { initialState } from './constants';
import { reducer } from './reducer';
import {actions} from './actions';
import { Container, Row, Button, Card, Form } from 'react-bootstrap';

import axios from 'axios'

const DeliveryForm = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setterChannel = e => {
    e.preventDefault();
    let {name, value} = e.target;
    dispatch({type: actions.setterChannel, name, payload: value})
  }


  const setPhoto = e => {
    let reader = new FileReader();

    reader.onload = function(e) {
      let filePreview = e.target.result;
      dispatch({ type: actions.setPreviewImage, payload: filePreview });
    };

    reader.readAsDataURL(e.target.files[0]);

    dispatch({
      type: actions.setterChannel,
      name: 'logo',
      payload: e.target.files[0],
    });
  };

  const createChannel = async () => {
    let data = new FormData();
    data.append('name', state.channel.name);
    if (state.previewImage !== null) {
      data.append('logo', state.channel.logo);
    }
    try{
      let response = await axios.post('http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales',data)
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
        <h3>Agregar canales de entrega</h3>
      </Row>
      <hr />
      <Card>
        <Card.Header>
          <Card.Title as='h5'>Canal de entrega</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
          <Form.Group>
            <img alt={'logo'} src={state.previewImage} style={{width: '200', height: '200'}} />
              <Form.File
              onChange={setPhoto}
                id='exampleFormControlFile1'
                label='Seleccionar logo'
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control onChange={setterChannel} name='name' type='text' value={state.channel.name} placeholder='Ingrese nombre'/>
            </Form.Group>   
            <Button onClick = {() => createChannel()} variant='primary'>
              Guardar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeliveryForm;
