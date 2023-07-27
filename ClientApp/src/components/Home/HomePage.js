import React, { useReducer, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Card from '../Card/Card';
import 'bootstrap/dist/css/bootstrap.css';
//import axios from 'axios';
import Pagination from '../Pagination/Pagination';
import { FETCHBLOGSAPIURL } from '../../ConfigFile'

const initialUsers = {
    loading: true,
    users: [],
    error: '',
    pageNo: 1,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                loading: action.loading,
                users: action.payload,
                error: '',
                pageNo: action.pageNo,
            };
        case 'FETCH_ERROR':
            return {
                loading: false,
                users: [],
                error: 'Something Went Wrong!!!',
                pageNo: 1,
            };
        default:
            return state;
    }
};

function HomePage({ match }) {
    const [state, dispatchState] = useReducer(reducer, initialUsers);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //const response = await axios.get(FETCHBLOGSAPIURL);
                const response = await fetch(FETCHBLOGSAPIURL);
                const data = await response.json();
                console.log(data);
                
                dispatchState({
                    type: 'FETCH_SUCCESS',
                    payload: data,
                    error: '',
                    loading: false,
                    pageNo: parseInt(1),
                });
            } catch (error) {
                console.log(error);
                dispatchState({
                    type: 'FETCH_ERROR',
                });
            }
        };

        fetchData();
    }, [match]);


    return (
        <div>
            <Container>
                {state.error !== '' ? (
                    <h1 className="text-center">{state.error}</h1>
                ) : (
                    ''
                )}
                {state.loading ? (
                    <h1 className="text-center">Loading... Please Wait...</h1>
                ) : (
                    ''
                )}
                <Row>
                    {state.users.map((user) => {
                        return (
                            <Col key={user.id} md={4} sm={6} xs={12}>
                                <Card
                                    name={`${user.name}`}
                                    id={user.id}
                                />
                            </Col>
                        );
                    })}
                </Row>
                <Pagination page="/HomePage" pageNo={state.pageNo} />
            </Container>
        </div>
    );
}

export default HomePage;