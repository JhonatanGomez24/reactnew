import React, { useReducer, useEffect } from 'react';
import Aux from '../../hoc/_Aux';
import axios from 'axios';

import {
  Container,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Alert,
} from 'react-bootstrap';
import { reducer } from './reducer';
import { initialState } from './constants';
import { actions } from './actions';

const Channels = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchChannel = async () => {
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
    fetchChannel();
  }, [state.reload]);

  const deleteChannel = async () => {
    dispatch({ type: actions.deleteChannel });
    try {
      await axios.delete(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales/${state.idSelected}`
      );
      dispatch({ type: actions.deleteChannelSuccess });
      hideModal();
      dispatch({ type: actions.setReload });
    } catch (error) {
      dispatch({
        type: actions.deleteChannelError,
        payload: 'Ha ocurrido un error en el servidor',
      });
    }
  };

  const hideModal = () => {
    dispatch({ type: actions.toggleModal });
  };

  const showModal = (id) => {
    dispatch({ type: actions.showModal, payload: id });
  };

  const editChannel = (id) => {
    history.push(`/channels/${id}`);
  };

  const addChannel = () => {
    history.push(`/channels/new`);
  };

  return (
    <Aux>
      <Container>
        <Row className='justify-content-center'>
          <h3>Canales</h3>
        </Row>
        <Row className='justify-content-end'>
          <Button onClick={addChannel} variant='success'>
            Agregar un Canal
          </Button>
        </Row>
        <hr></hr>
        {state.errorChannels && <Alert>{state.errorChannels}</Alert>}
        {state.errorDelete && <Alert>{state.errorDelete}</Alert>}
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Lista de Canales registrados</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Logo</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.channels.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{item.id}</th>
                      <th>{item.name}</th>
                      <th>
                        <img
                          style={{ width: 50, height: 50, borderRadius: 100 }}
                          alt={item.img}
                          src={`http://ec2-52-90-69-15.compute-1.amazonaws.com/${item.img}`}
                        />
                      </th>
                      <th>
                        <Button
                          onClick={() => editChannel(item.id)}
                          variant='primary'
                        >
                          <span className='pcoded-micon'>
                            <i className='feather icon-edit-2' />
                          </span>
                        </Button>
                        <Button
                          onClick={() => showModal(item.id)}
                          variant='danger'
                        >
                          <span className='pcoded-micon'>
                            <i className='feather icon-trash' />
                          </span>
                        </Button>
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Modal show={state.showModal} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Canal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Seguro que deseas eliminar este canal?, no se podrá recuperar la
            información!
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={hideModal}>
              Cancelar
            </Button>
            <Button variant='danger' onClick={deleteChannel}>
              {state.loadingDelete ? 'Cargando...' : 'Eliminar'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Aux>
  );
};

export default Channels;