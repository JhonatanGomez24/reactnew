
import React, { useReducer, useEffect, useState } from 'react';


import Aux from '../../hoc/_Aux';
import axios from 'axios';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import {
  Container,
  Row,
  Button,
  Card,
  Table,
  Modal,
  Alert,
} from 'react-bootstrap';

const Example = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchFacility = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let responsive = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities'
        );
        dispatch({ type: actions.fetchDataSuccess, payload: responsive.data });
      } catch (error) {
        dispatch({ type: actions.fetchDataError, payload: error });
      }
    };
    fetchFacility();
  }, [state.reload]);

  const addFacility = () => {
    props.history.push('/facility/new');
  };

  const editFacility = (id) => {
    props.history.push(`/facility/${id}`);
  };

  const hideModal = () => {
    dispatch({ type: actions.toggleModal });
  };

  const showModal = (id) => {
    dispatch({ type: actions.showModal, payload: id });
  };

  const deleteFacility = async () => {
    dispatch({ type: actions.deleteData });

    try {
      await axios.delete(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities/${state.idSelected}`
      );
      dispatch({ type: actions.deleteDataSuccess });
      hideModal();
    } catch (error) {
      dispatch({ type: actions.deleteDataError, payload: error });
    }
  };
  
  console.log(state.data)
  const [dataResults, setDataResults] = useState(state.data);
  console.log("DATA", dataResults);
  const search = (e) => {
    let newData = state.data.filter((item) => item.name.includes(e.target.value));
    setDataResults(newData);
    
  }
  return (
    <Aux>
      <Container>
      <input type="text"  class="form-control" placeholder="Buscar pedido" onChange={(e) => search(e)}></input>
        <Row className='justify-content-center'>
          <h3>Facilitys</h3>
        </Row>
        <Row className='justify-content-end'>
          <Button onClick={addFacility} variant='success'>
            Agregar una Facility
          </Button>
        </Row>
        <hr />
        {state.errordata && <Alert>{state.errordata}</Alert>}
        {state.errorDelete && <Alert>{state.errorDelete}</Alert>}
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Lista de Facilitys registradas</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.data, dataResults.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{item.id}</th>
                      <th>{item.name}</th>
                      <th>{item.description}</th>
                      <th>
                        <Button
                          onClick={() => editFacility(item.id)}
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
            <Modal.Title>Eliminar Facility</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            ¿Seguro que deseas eliminar esta facility?, no se podrá recuperar la
            información!
          </Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={hideModal}>
              Cancelar
            </Button>
            <Button variant='danger' onClick={deleteFacility}>
              {state.loadingDelete ? 'Cargando...' : 'Eliminar'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Aux>
  );
};

export default Example;