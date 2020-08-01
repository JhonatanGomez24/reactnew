import React, { useReducer, useEffect } from 'react';

import { initialState } from './constants';
import { reducer } from './reducer';
import { actions } from './actions';
import { Container, Row, Button, Card, Form, Alert } from 'react-bootstrap';

import axios from 'axios';
import { useParams } from 'react-router-dom';

const ChannelsForm = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let { data } = await axios.get(
          `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales/${id}`
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

  const setterChannel = (e) => {
    e.preventDefault();
    let { name, value } = e.target;
    dispatch({ type: actions.setterChannel, name, payload: value });
  };

  const setPhoto = (e) => {
    let reader = new FileReader();

    reader.onload = function (e) {
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
    dispatch({ type: actions.saveChannel });
    let data = new FormData();
    data.append('name', state.channel.name);
    if (state.previewImage !== null) {
      data.append('logo', state.channel.logo);
    }
    try {
      await axios.post(
        'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales',
        data
      );
      dispatch({ type: actions.saveChannelSuccess });
      history.goBack();
    } catch (error) {
      dispatch({
        type: actions.saveChannelError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const editChannel = async () => {
    dispatch({ type: actions.saveChannel });
    let data = new FormData();
    data.append('name', state.channel.name);
    if (state.previewImage !== null) {
      data.append('logo', state.channel.logo);
    }
    try {
      await axios.put(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales/${state.channel.id}`,
        data
      );
      dispatch({ type: actions.saveChannelSuccess });
      history.goBack();
    } catch (error) {
      dispatch({
        type: actions.saveChannelError,
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
        <h3>
          {id !== 'new'
            ? 'Editar Canal de entrega'
            : 'Agregar Canal de entrega'}
        </h3>
      </Row>
      <Row className='justify-content-start'>
        <Button onClick={() => Back()}>Volver</Button>
      </Row>
      <hr />
      {state.sendingChannelError && <Alert>{state.sendingChannelError}</Alert>}
      {state.loadingDataError && <Alert>{state.loadingDataError}</Alert>}
      <Card>
        <Card.Header>
          <Card.Title as='h5'>
            {id !== 'new'
              ? 'Editar Canal de entrega'
              : 'Agregar Canal de entrega'}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              {id !== 'new' && state.previewImage === null ? (
                <img
                  alt={'logo'}
                  src={`http://ec2-52-90-69-15.compute-1.amazonaws.com${state.channel.logo}`}
                  style={{ width: '200px', height: '200px' }}
                />
              ) : (
                <img
                  alt={'logo'}
                  src={state.previewImage}
                  style={{ width: '200px', height: '200px' }}
                />
              )}

              <Form.File
                onChange={setPhoto}
                id='exampleFormControlFile1'
                label='Seleccionar logo'
              />
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={setterChannel}
                name='name'
                type='text'
                value={state.channel.name}
                placeholder='Ingrese nombre'
              />
            </Form.Group>
            {id !== 'new' ? (
              <Button
                disabled={state.sendingChannelLoading}
                onClick={() => editChannel()}
                variant='primary'
              >
                {state.sendingChannelLoading ? 'Cargando...' : 'Editar'}
              </Button>
            ) : (
              <Button
                disabled={state.sendingChannelLoading}
                onClick={() => createChannel()}
                variant='primary'
              >
                {state.sendingChannelLoading ? 'Cargando...' : 'Guardar'}
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ChannelsForm;