const ImageDetail = ({ IMAGE = [], handleInfo }) => {
    console.log(IMAGE)
    return (<>
        <div className="product__details__pic__slider ">
            <img onClick={() => handleInfo(IMAGE)}
                src={process.env.REACT_APP_API_IMAGE + IMAGE}
            />
        </div>
        

    </>);
}

export default ImageDetail;