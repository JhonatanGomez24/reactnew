import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import Aux from '../../hoc/_Aux';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import { Container, Row, Button, Card, Table } from 'react-bootstrap';

const Delivery = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchcanal = async () => {
      dispatch({ type: actions.fetchData });
      try {
        let responsive = await axios.get(
          'http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales'
        );
        dispatch({ type: actions.fetchDataSuccess, payload: responsive.data });
      } catch (error) {
        dispatch({ type: actions.fetchDataError, payload: error });
      }
    };
    fetchcanal();
  }, [state.reload]);

  const addDelivery = () => {
    props.history.push('/delivery/new');
  };

  const editDelivery = (id) => {
    props.history.push(`/delivery/${id}`);
  }

  const deleteDelivery = async (id) => {
    dispatch({ type: actions.deleteData });

    try {
      await axios.delete(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/canales/${id}`
      );
      dispatch({ type: actions.deleteDataSuccess });
    } catch (error) {
      dispatch({ type: actions.deleteDataError, payload: error });
    }
  };

  return (
    <Aux>
      <Container>
        <Row className='justify-content-center'>
          <h3>Canales de entrega</h3>
        </Row>
        <Row className='justify-content-end'>
          <Button onClick={addDelivery} variant='success'>
            Agregar Elemento
          </Button>
        </Row>
        <hr />
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Lista de Canales de entrega</Card.Title>
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
                {state.data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <th scope='row'>{item.id}</th>
                      <th>{item.name}</th>
                      <th>
                        <img
                          style={{ width: 50, height: 50, borderRadius: 5 }}
                          alt='logo'
                          src={`http://ec2-52-90-69-15.compute-1.amazonaws.com${item.img}`}
                        />
                      </th>
                      <th>
                        <Button
                          onClick={() => editDelivery(item.id)}
                          variant='primary'
                        >
                          <span className='pcoded-micon'>
                            <i className='feather icon-edit-2' />
                          </span>
                        </Button>
                        <Button
                          onClick={() => deleteDelivery(item.id)}
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
      </Container>
    </Aux>
  );
};

export default Delivery;
