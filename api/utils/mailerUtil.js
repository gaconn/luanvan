const nodeMailer = require("nodemailer")
const mailConfig = require("../utils/mailConfig/mailConfig")
const { Status } = require("../define/order")

const transport = nodeMailer.createTransport({
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
        user: mailConfig.USERNAME,
        pass: mailConfig.PASSWORD,
    },
})
exports.sendMail = (to, subject, htmlContent) => {
    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent,
    }
    return transport.sendMail(options)
}

exports.orderFormat = (objOrderDetail = {}) => {
    if (!objOrderDetail) {
        return ""
    }
    var strListItem
    if (objOrderDetail.List) {
        for (let index = 0; index < objOrderDetail.List.length; index++) {
            strListItem += `<tr className="order-item-value" style="border-bottom: 1px solid #bbb; margin: 20px 10px; text-align: center;">
                            <td>${index}</td>
                            <td>${objOrderDetail.List[index].id}</td>
                            <td><img src=${
                                objOrderDetail.List[index].SanPham_HinhAnh &&
                                JSON.parse(objOrderDetail.List[index].SanPham_HinhAnh) &&
                                `${process.env.REACT_APP_API_HOST_URL}/public/images/${
                                    JSON.parse(objOrderDetail.List[index].SanPham_HinhAnh)[0]
                                }`
                            }/></td>
                            <td>${objOrderDetail.List[index].SanPham_Ten}</td>
                            <td>${objOrderDetail.List[index].SoLuong}</td>
                            <td>${
                                objOrderDetail.List[index].SanPham_GiaGoc &&
                                objOrderDetail.List[index].SanPham_GiaGoc.toLocaleString("en-US")
                            } VND</td>
                            <td>${
                                objOrderDetail.List[index].PhiVanChuyen &&
                                objOrderDetail.List[index].PhiVanChuyen.toLocaleString("en-US")
                            } VND</td>
                            <td>0</td>
                            <td>${
                                objOrderDetail.List[index].ThanhTien &&
                                objOrderDetail.List[index].ThanhTien.toLocaleString("en-US")
                            } VND</td>
                        </tr>`
        }
    }
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            h3{
                color: red;
                font-size: 1.5rem;
                font-weight: bold;
            }
            
            span {
                color: blue;
                min-width: fit-content;
            }
    
            li{
                color: #666;
                font-weight: bold;
                padding: 5px 10px;
            }
        </style>
    </head>
    <body style="background: #ccc; width: 100%;">
        <div>
            <h2 style="text-align: center; color: #333;">Đặt hàng thành công</h2>
        </div>
        <div style="padding: 10px;">
            <div className="order-info order-section" style="display: flex; justify-content: space-around;">
                <div>
                    <h3>Thông tin đặt hàng</h3>
                    <div><span>Họ tên:  </span> ${
                        objOrderDetail.HoTen
                            ? objOrderDetail.HoTen
                            : objOrderDetail.ThongTinDatHang && objOrderDetail.ThongTinDatHang.HoTen
                    }</div>
                    <div><span>Email: </span>${
                        objOrderDetail.Email
                            ? objOrderDetail.Email
                            : objOrderDetail.ThongTinDatHang && objOrderDetail.ThongTinDatHang.Email
                    }</div>
                    <div><span>Số điện thoại: </span> ${
                        objOrderDetail.SoDienThoai
                            ? objOrderDetail.SoDienThoai
                            : objOrderDetail.ThongTinDatHang &&
                              objOrderDetail.ThongTinDatHang.SoDienThoai
                    } </div>
                    <div><span>Địa chỉ giao hàng: </span> ${
                        objOrderDetail.TinhThanh
                            ? `${objOrderDetail.SoNha}, ${objOrderDetail.PhuongXa}, ${objOrderDetail.QuanHuyen}, ${objOrderDetail.TinhThanh}`
                            : objOrderDetail.ThongTinDatHang &&
                              `${objOrderDetail.ThongTinDatHang.SoNha}, ${objOrderDetail.ThongTinDatHang.PhuongXa}, ${objOrderDetail.ThongTinDatHang.QuanHuyen}, ${objOrderDetail.ThongTinDatHang.TinhThanh}`
                    } </div>
                </div>
                <div>
                    <h3>Thông tin đơn hàng</h3>
                    <div><span>Mã đơn hàng: </span> ${objOrderDetail.MaDonHang} </div>
                    <div><span>Ngày đặt hàng: </span> ${new Date(
                        objOrderDetail.ThoiGianTao * 1000
                    ).toLocaleDateString()}</div>
                    <div><span>Trạng thái: </span>${Status[objOrderDetail.TrangThai]} </div>
                    <div><span>Hình thức thanh toán: </span> ${
                        objOrderDetail.IDPhuongThucThanhToan === 1
                            ? "Thanh toán khi nhận hàng"
                            : "Thanh toán qua momo"
                    } </div>
                </div>
            </div>
    
            <div className="order-section" style="margin-top: 20px;">
                <table style="width: 100%;">
                    <tr className="order-item-list-title" style="border-bottom: 2px solid #aaa;
                    padding: 20px 0;
                    font-weight: bold;">
                        <th>STT</th>
                        <th>Mã sản phẩm</th>
                        <th>Hình ảnh</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá gốc</th>
                        <th>Phí vận chuyển</th>
                        <th>Phụ phí</th>
                        <th>Tổng cộng</th>
                    </tr>
                    ${strListItem}
                </table>
            </div>
    
            <div className="order-section order-bill-list" style="width: 300px;
            margin: 0 auto;
            border: none;
            box-shadow: none;">
                <div>
                    <h3>Chi phí đơn hàng</h3>
                    <div className="order-bill" style="display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #aaa;
                    font-weight: bold;">
                        <span>Số  sản phẩm</span>
                        <span>${
                            objOrderDetail && objOrderDetail.List && objOrderDetail.List.length
                                ? objOrderDetail.List.length
                                : 0
                        }</span>
                    </div>
                    <div className="order-bill" style="display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #aaa;
                    font-weight: bold;">
                        <span>Tổng phí vận chuyển</span>
                        <span>+ ${
                            objOrderDetail.TongPhiVanChuyen
                                ? objOrderDetail.TongPhiVanChuyen.toLocaleString("en-US")
                                : 0
                        } VND</span>
                    </div>
                    <div className="order-bill" style="display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #aaa;
                    font-weight: bold;">
                        <span>Phụ phí</span>
                        <span>+ ${
                            objOrderDetail.PhuPhi
                                ? objOrderDetail.PhuPhi.toLocaleString("en-US")
                                : 0
                        } VND</span>
                    </div>
                    <div className="order-bill" style="display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #aaa;
                    font-weight: bold;">
                        <span>Tổng giá trị chiết khấu</span>
                        <span>- ${
                            objOrderDetail.TongGiaTriChietKhau
                                ? objOrderDetail.TongGiaTriChietKhau.toLocaleString("en-US")
                                : 0
                        } VND</span>
                    </div>
                    
                    <div className="order-bill order-total">
                        <span>Tổng thành tiền</span>
                        <span>${
                            objOrderDetail.TongThanhTien
                                ? objOrderDetail.TongThanhTien.toLocaleString("en-US")
                                : 0
                        } VND</span>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>`
}
