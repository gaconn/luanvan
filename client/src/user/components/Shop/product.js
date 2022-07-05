import Carousel from 'react-bootstrap/Carousel'
const product = ({ ProductIMG = [] }) => {
    return (<>
        <Carousel variant="dark">

            {
                ProductIMG && ProductIMG.map((item, k) => (
                    <Carousel.Item key={k}>
                        <img
                            className="d-block w-100"
                            src={process.env.REACT_APP_API_IMAGE+item}
                            style={{height:300}}
                        />
                    </Carousel.Item>
                ))
            }
        </Carousel>
    </>);
}

export default product;