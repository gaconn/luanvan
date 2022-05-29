import Carousel from 'react-bootstrap/Carousel'
const Banner = () => {
    return ( 
        
        <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://phukienxehoi.com.vn/image/cache/catalog/banner1-3-1140x380.jpg"
            style={{width:1000,height:500}}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://phutungotoacb.com/wp-content/uploads/2019/11/phu-tung-oto-chinh-hang-o-dau-tai-ha-noi.jpg"
            style={{width:1000,height:500}}
            alt="Second slide"
          />
      
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://duchungauto.com.vn/user-upload/imgs/phu-tung-xe-hoi-quang-ngai-2.png"
            style={{width:1000,height:500}}
            alt="Third slide"
          />
      
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

     );
}
 
export default Banner;