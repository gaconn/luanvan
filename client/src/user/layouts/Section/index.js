
import Dropdown from 'react-bootstrap/Dropdown'

const Section = () => {
    return (
        <>
            {/* Hero Section Begin */}
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">

                                <Dropdown >
                                    <Dropdown.Toggle variant='success' id="dropdown-basic"  >
                                         <i className="fa fa-bars" /> 
                                        <span>  Tất cả danh mục</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                       
                                        <input type="text" placeholder="What do yo u need?" />
                                        <button type="submit" className="site-btn">
                                            Tìm Kiếm
                                        </button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone" />
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+85 0334596482</h5>
                                        <span>thời gian hỗ trợ 24/7</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Hero Section End */}
        </>

    );
}

export default Section;