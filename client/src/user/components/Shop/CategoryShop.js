import Dropdown from 'react-bootstrap/Dropdown';
const Category = () => {
    return (
        <div className="col-lg-3 col-md-5">
            <div className="sidebar">
                <div className="sidebar__item ">
                   
                    <Dropdown >
                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Department
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="dark">
                            <Dropdown.Item href="#/action-1" active>
                                Action
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#/action-4">Separated link</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* <div className="sidebar__item sidebar__item__color--option">
                    <h4>Colors</h4>
                    <div className="sidebar__item__color sidebar__item__color--white">
                        <label htmlFor="white">
                            White
                            <input type="radio" id="white" />
                        </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--gray">
                        <label htmlFor="gray">
                            Gray
                            <input type="radio" id="gray" />
                        </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--red">
                        <label htmlFor="red">
                            Red
                            <input type="radio" id="red" />
                        </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--black">
                        <label htmlFor="black">
                            Black
                            <input type="radio" id="black" />
                        </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--blue">
                        <label htmlFor="blue">
                            Blue
                            <input type="radio" id="blue" />
                        </label>
                    </div>
                    <div className="sidebar__item__color sidebar__item__color--green">
                        <label htmlFor="green">
                            Green
                            <input type="radio" id="green" />
                        </label>
                    </div>
                </div>
                <div className="sidebar__item">
                    <h4>Popular Size</h4>
                    <div className="sidebar__item__size">
                        <label htmlFor="large">
                            Large
                            <input type="radio" id="large" />
                        </label>
                    </div>
                    <div className="sidebar__item__size">
                        <label htmlFor="medium">
                            Medium
                            <input type="radio" id="medium" />
                        </label>
                    </div>
                    <div className="sidebar__item__size">
                        <label htmlFor="small">
                            Small
                            <input type="radio" id="small" />
                        </label>
                    </div>
                    <div className="sidebar__item__size">
                        <label htmlFor="tiny">
                            Tiny
                            <input type="radio" id="tiny" />
                        </label>
                    </div>
                </div> */}

            </div>
        </div>

    );
}

export default Category;