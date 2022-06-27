
import CategoryAPI from '../../services/API/CategoryAPI';
import Accordion from 'react-bootstrap/Accordion';
import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const Category = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {

    }, [])
    return (

        <div className="col-lg-3 col-md-5">
            <div className="sidebar">
                <div className="sidebar__item ">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Phụ tùng gầm xe ô tô</Accordion.Header>
                            <Accordion.Body>
                                <Accordion>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Phụ tùng gầm xe ô tô</Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup>
                                                <ListGroup.Item action href="#link1">Cras justo odio</ListGroup.Item>
                                                <ListGroup.Item action href="#link2">Dapibus ac facilisis in</ListGroup.Item>
                                                <ListGroup.Item action href="#link3">Morbi leo risus</ListGroup.Item>
                                                <ListGroup.Item action href="#link4">Porta ac consectetur ac</ListGroup.Item>
                                                <ListGroup.Item action href="#link5">Vestibulum at eros</ListGroup.Item>
                                            </ListGroup>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Phụ tùng thân vỏ xe ô tô</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Phụ tùng điện</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>Phụ tùng điều hòa</Accordion.Header>
                                        <Accordion.Body>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Accordion.Body>
                        </Accordion.Item>
                        {/* <Accordion.Item eventKey="1">
                            <Accordion.Header>Phụ tùng thân vỏ xe ô tô</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Phụ tùng điện</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Phụ tùng điều hòa</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item> */}
                    </Accordion>

                </div>

            </div>
        </div>

    );
}

export default Category;