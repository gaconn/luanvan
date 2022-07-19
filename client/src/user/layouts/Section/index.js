import { useSearchParams } from "react-router-dom";

const Section = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const searchHandler = (e) => {
        console.log(e.target.value);
        const params = new URLSearchParams({keyword: e.target.value})
        setSearchParams(params)
    }
    return (
        <>
            {/* Hero Section Begin */}
            <section className="hero hero-normal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="hero__categories">
                                         
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="hero__search">
                                <div className="hero__search__form">
                                    <form action="#">
                                        <input type="text" placeholder="What do yo u need?" name="keyword" onChange={searchHandler} />
                                        <button type="submit" className="site-btn" >
                                            Tìm Kiếm
                                        </button>
                                    </form>
                                </div>
                                <div className="hero__search__phone">
                                    <div className="hero__search__phone__icon">
                                        <i className="fa fa-phone" />
                                    </div>
                                    <div className="hero__search__phone__text">
                                        <h5>+84 0334596482</h5>
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