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
//gửi đến khách hàng
exports.sendMail = (to, subject, htmlContent) => {
    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent,
    }
    return transport.sendMail(options)
}
//gửi đến nhân viên
exports.sendMail2 = (to, subject, htmlContent) => {
    const options = {
        from:to ,
        to: mailConfig.USERNAME,
        subject: subject,
        html: htmlContent,
    }
    return transport.sendMail(options)
}
exports.contactFormat = (objContact = {}) => {
    if (!objContact) {
        return ""
    }
    return `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <style>
    .column {
      float: left;
      width: 33.3%;
      margin-bottom: 16px;
      padding: 0 8px;
    }
    
    @media screen and (max-width: 650px) {
      .column {
        width: 100%;
        display: block;
      }
    }
    
    
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    
    
    .container {
      padding: 0 16px;
    }
    
    .container::after, .row::after {
      content: "";
      clear: both;
      display: table;
    }
    
    .title {
      color: grey;
    }
    
    .button {
      border: none;
      outline: 0;
      display: inline-block;
      padding: 8px;
      color: white;
      background-color: #000;
      text-align: center;
      cursor: pointer;
      width: 100%;
    }
    
    .button:hover {
      background-color: #555;
    }
    </style>
      </head>
      <body>
     
      <div class="row">
      <div class="column">
        <div class="card">
        
          <div class="container">
            <h2>${objContact.HoTen}</h2>
            <p class="title">Số điện thoại: ${objContact.SoDienThoai}</p>
            <p>${objContact.Message}</p>
        
            <p><button class="button">liên hệ</button></p>
          </div>
        </div>
      </div>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js" integrity="sha384-Xe+8cL9oJa6tN/veChSP7q+mnSPaj5Bcu9mPX5F5xIGE0DVittaqT5lorf0EI7Vk" crossorigin="anonymous"></script>
    
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.min.js" integrity="sha384-kjU+l4N0Yf4ZOJErLsIcvOU2qSb74wXpOhqTvwVx3OElZRweTnQ6d31fXEoRD1Jy" crossorigin="anonymous"></script>
      </body>
    </html>`
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
