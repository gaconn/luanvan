
import List from "./ListProduct";
import { useState, useEffect } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Tree from './Tree'
import categoryAPI from "../../services/API/CategoryAPI";
const ShopComponent = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategory = async () => {
                 const response = await categoryAPI.getTree();
                setCategories(response.data)               
        };
        fetchCategory();
    }, [])
   
console.log(categories)
    return (
        <>
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-5">
                            <div className="sidebar">
                                <div className="sidebar__item ">
                                    <Accordion>
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Thể loại</Accordion.Header>
                                            <Accordion.Body>
                                                <Tree categoryParent={categories}/>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                   
                                </div>

                            </div>
                        </div>
                        <div className="col-lg-9 col-md-7">
                            {/* safe off */}
                            <div className="filter__item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-5">
                                        <div className="filter__sort">
                                            <span>Sort By</span>
                                            <select>
                                                <option value={0}>Default</option>
                                                <option value={0}>Default</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="filter__found">
                                            <h6>
                                                <span>16</span> Products found
                                            </h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                            <span className="icon_grid-2x2" />
                                            <span className="icon_ul" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                {/* List product */}
                                <List />

                            </div>
                            <div className="product__pagination">
                                <a href="#">1</a>
                                <a href="#">2</a>
                                <a href="#">3</a>
                                <a href="#">
                                    <i className="fa fa-long-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>


    );
}

export default ShopComponent;