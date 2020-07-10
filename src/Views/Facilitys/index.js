import React, { useReducer } from 'react';
import Aux from '../../hoc/_Aux';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import { Container, Row, Button, Card, Table } from 'react-bootstrap';

const Example = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFacility = () => {
    dispatch({ type: actions.addNewData });
  };

  const deleteFacility = idx => {
    dispatch({ type: actions.deleteData, payload: idx });
  };

  return (
    <Aux>
      <Container>
        <Row className='justify-content-center'>
          <h3>Facilitys</h3>
        </Row>
        <Row className='justify-content-end'>
          <Button onClick={addFacility} variant='success'>
            Agregar una Facility
          </Button>
        </Row>
        <hr />
        <Card>
          <Card.Header>
            <Card.Title as='h5'>Lista de Facilitys registradas</Card.Title>
          </Card.Header>
          <Card.Body>
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>número al azar</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item, idx) => {
                  return (
                    <tr>
                      <th scope='row'>{idx}</th>
                      <th>{item.type}</th>
                      <th>{item.random}</th>
                      <th>
                        <Button
                          onClick={() => deleteFacility(idx)}
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

export default Example;
