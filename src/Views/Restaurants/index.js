import React, { useReducer, useEffect } from 'react';
import Aux from '../../hoc/_Aux';
import axios from 'axios';

import { reducer } from './reducer';
import { initialState } from './constants';
import { actions } from './actions';

import {
  Container,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Badge,
  Col,
  Alert,
} from 'react-bootstrap';

import './style.css';

const Restaurants = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let { data } = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes'
        );
        dispatch({ type: actions.fetchDataSuccess, payload: data });
      } catch (error) {
        dispatch({
          type: actions.fetchDataError,
          payload: 'Ha ocurrido un error en el servidor',
        });
      }
    };
    fetchData();
  }, [state.reload]);

  const deleteRestaurant = async () => {
    dispatch({ type: actions.deleteRestaurant });
    try {
      await axios.delete(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/restaurantes/${state.idSelected}`
      );
      dispatch({ type: actions.deleteRestaurantSuccess });
      hideModal();
      dispatch({ type: actions.setReload });
    } catch (error) {
      dispatch({
        type: actions.deleteRestaurantError,
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

  const editRestaurant = (id) => {
    history.push(`/restaurants/${id}`);
  };

  const toggleModalView = () => {
    dispatch({ type: actions.toggleModalView });
  };

  const seeModal = (item) => {
    dispatch({ type: actions.toggleModalView });
    dispatch({ type: actions.setResSelected, payload: item });
  };

  return (
    <Aux>
      <Container>
        <Row className='justify-content-center'>
          <h3>Restaurants</h3>
        </Row>
        <Row className='justify-content-end'>
          <Button
            onClick={() => history.push('/restaurants/new')}
            variant='success'
          >
            Agregar un Restaurant
          </Button>
        </Row>
        <hr></hr>
        {state.errorDelete && <Alert>{state.errorDelete}</Alert>}
        {state.errorRestaurants && <Alert>{state.errorRestaurants}</Alert>}
        <Card>
          <Card.Header>
            <Card.Title as='h5'> Lista de Restaurants registrados</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Facility</th>
                  <th>Status</th>
                  <th>Canales</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.restaurants.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{item.id}</th>
                      <th>{item.name}</th>
                      <th>{item.address}</th>
                      <th>{item.facility ? item.facility.name : ''}</th>
                      <th>
                        {item.status ? (
                          <Badge variant='success'>Activo</Badge>
                        ) : (
                          <Badge variant='danger'>Inactivo</Badge>
                        )}
                      </th>
                      <th>
                        {item.canales.map((canal, idx) => {
                          return <span key={idx}>{canal.name + ', '}</span>;
                        })}
                      </th>
                      <th>
                        <Button
                          onClick={() => seeModal(item)}
                          variant='success'
                        >
                          <span className='pcoded-micon'>
                            <i className='feather icon-eye' />
                          </span>
                        </Button>
                        <Button
                          onClick={() => editRestaurant(item.id)}
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
        {/*Modal delete*/}
        <Modal show={state.showModal} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Eliminar Restaurant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Seguro que deseas eliminar este restaurant?, no se podrá recuperar
            la información!
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={hideModal}>
              Cancelar
            </Button>
            <Button variant='danger' onClick={deleteRestaurant}>
              {state.loadingDelete ? 'Cargando...' : 'Eliminar'}
            </Button>
          </Modal.Footer>
        </Modal>
        {/*Modal View*/}
        <Modal show={state.showModalView} onHide={toggleModalView}>
          <Modal.Header closeButton>
            <Modal.Title>Restaurant {state.resSelected.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col>
              <hr />
              <h3 className='titulo'>General</h3>
              <hr />
              <Row>
                <p>
                  <span className='subtitulo'>Dirección: </span>{' '}
                  {state.resSelected.address}
                </p>
              </Row>
              <Row>
                <p>
                  <span className='subtitulo'>Correo: </span>{' '}
                  {state.resSelected.email}
                </p>
              </Row>
              <Row>
                <p>
                  <span className='subtitulo'>Abre:</span>{' '}
                  {state.resSelected.openingTime} hrs
                </p>
              </Row>
              <Row>
                <p>
                  <span className='subtitulo'>Cierra:</span>{' '}
                  {state.resSelected.closingTime} hrs
                </p>
              </Row>
              <hr></hr>
              <h3 className='titulo'>Canales</h3>
              <hr></hr>
              {state.resSelected.canales.map((item, idx) => {
                return (
                  <Row className='renglon'>
                    <h3 className='mr-5'>{item.name}</h3>
                    <img
                      style={{ width: 50, height: 50, borderRadius: 5 }}
                      alt={item.img}
                      src={`http://ec2-52-90-69-15.compute-1.amazonaws.com/${item.img}`}
                    />
                  </Row>
                );
              })}
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={toggleModalView}>
              Salir
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Aux>
  );
};

export default Restaurants;