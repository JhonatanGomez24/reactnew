import React, { useReducer, useEffect } from 'react';
import Aux from '../../hoc/_Aux';
import axios from 'axios';

import { actions } from './actions';
import { initialState } from './constants';
import { reducer } from './reducer';

import { Container, Row, Button, Card, Table } from 'react-bootstrap';

const Example = (props) => {
  console.log(props);
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
  }

  const deleteFacility = async (id) => {
    dispatch({ type: actions.deleteData });
    try {
      await axios.delete(
        `http://ec2-52-90-69-15.compute-1.amazonaws.com/api/delivery/facilities/${id}`
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
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((item, idx) => {
                  return (
                    <tr key = {idx}>
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
                          onClick={() => deleteFacility(item.id)}
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