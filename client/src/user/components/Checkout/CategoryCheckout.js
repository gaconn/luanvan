import Spinner from "react-bootstrap/Spinner"
import { truncateWords } from "../../services/utils/GenerateUtil"
const Category = ({ data, loading, SoLuong }) => {
    return (
        <>
            {data && Object.keys(data).length > 0 && (
                <div className="checkout__order">
                    <h4>Đơn hàng của bạn</h4>
                    <div className="checkout__order__products">
                        Sản phẩm <span>Tổng cộng</span>
                    </div>
                    <ul>
                        {data &&
                            data.list &&
                            data.list.map((item, index) => {
                                return (
                                    <li key={index}>
                                        {item && truncateWords(item.Ten,4,"...")} x
                                        {item.ChiTietGioHang_SoLuong
                                            ? item.ChiTietGioHang_SoLuong
                                            : SoLuong}{" "}
                                        <span>
                                            {(item.GiaGoc *
                                                (item.ChiTietGioHang_SoLuong
                                                    ? item.ChiTietGioHang_SoLuong
                                                    : SoLuong)).toLocaleString('en-US')} VND
                                        </span>
                                    </li>
                                )
                            })}
                    </ul>

                    <div className="checkout__order__subtotal">
                        Phí vận chuyển{" "}
                        <span>{data && data.PhiVanChuyen.toLocaleString("en-US")} VND</span>
                    </div>
                    {/* 
                    <div className="checkout__order__subtotal">
                        Phụ phí <span>{data && data.PhuPhi.toLocaleString("en-US")} VND</span>
                    </div> */}
                    <div className="checkout__order__total">
                        Tổng thành tiền{" "}
                        <span>{data && data.TongGiaTriDonHang.toLocaleString("en-US")} VND</span>
                    </div>
                    <button type="submit" className="site-btn" disabled={loading ? true : ""}>
                        {loading ? <Spinner animation="border" /> : "Xác nhận đặt hàng"}
                    </button>
                </div>
            )}
        </>
    )
}

export default Category
