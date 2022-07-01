-- quanlylinhkienoto.quyen definition

CREATE TABLE `quyen` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TenQuyen` varchar(100) NOT NULL,
  `HoatDong` int NOT NULL,
  PRIMARY KEY (`id`)
);
-- quanlylinhkienoto.capdotaikhoan definition

CREATE TABLE `capdotaikhoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(100) NOT NULL,
  `TrangThai` int NOT NULL,
  `ThoiGianTao` int DEFAULT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);
-- quanlylinhkienoto.taikhoan definition

CREATE TABLE `taikhoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `HoTen` varchar(100) DEFAULT NULL,
  `NgaySinh` int DEFAULT NULL,
  `SoDienThoai` varchar(15) NOT NULL,
  `Email` varchar(200) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `TinhThanh` varchar(100) DEFAULT NULL,
  `QuanHuyen` varchar(100) DEFAULT NULL,
  `PhuongXa` varchar(100) DEFAULT NULL,
  `SoNha` int DEFAULT NULL,
  `IDCapDoTaiKhoan` int DEFAULT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `DaXoa` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tk_lv` FOREIGN KEY (`IDCapDoTaiKhoan`) REFERENCES `capdotaikhoan` (`id`)
);
-- quanlylinhkienoto.cart_addresses definition

CREATE TABLE `cart_addresses` (
  `cart_address_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `customer_id` int unsigned NOT NULL DEFAULT '0',
  `customer_address_id` int unsigned NOT NULL DEFAULT '0',
  `save_in_address_book` tinyint unsigned NOT NULL DEFAULT '0',
  `address_type` char(15) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `customer_name` varchar(50) DEFAULT NULL,
  `company` varchar(125) DEFAULT NULL,
  `street` varchar(125) DEFAULT NULL,
  PRIMARY KEY (`cart_address_id`)
);

-- quanlylinhkienoto.theloai definition

CREATE TABLE `theloai` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(100) NOT NULL,
  `MoTa` text,
  `DaXoa` int NOT NULL,
  `HoatDong` int DEFAULT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `IDTheLoaiCha` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_tlc_tl` FOREIGN KEY (`IDTheLoaiCha`) REFERENCES `theloai` (`id`)
);

-- quanlylinhkienoto.nhacungcap definition

CREATE TABLE `nhacungcap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(100) NOT NULL,
  `TrangThai` int NOT NULL,
  `DaXoa` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- quanlylinhkienoto.phuongthucthanhtoan definition

CREATE TABLE `phuongthucthanhtoan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TenPhuongThucThanhToan` varchar(100) NOT NULL,
  `TrangThai` int NOT NULL,
  `ViDienTu` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- quanlylinhkienoto.sanpham definition

CREATE TABLE `sanpham` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(200) NOT NULL,
  `HinhAnh` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `TrangThai` int NOT NULL,
  `XuatXu` varchar(100) NOT NULL,
  `MauSac` varchar(100) DEFAULT NULL,
  `KichThuoc` int DEFAULT NULL,
  `CanNang` int DEFAULT NULL,
  `SoLuong` int NOT NULL,
  `MoTa` text NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `GiaGoc` int NOT NULL,
  `DaXoa` int NOT NULL,
  `IDTheLoai` int NOT NULL,
  `IDNhaCungCap` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_p_c` FOREIGN KEY (`IDTheLoai`) REFERENCES `theloai` (`id`),
  CONSTRAINT `fk_p_s` FOREIGN KEY (`IDNhaCungCap`) REFERENCES `nhacungcap` (`id`),
  CONSTRAINT `sanpham_chk_1` CHECK (json_valid(`HinhAnh`))
);
-- quanlylinhkienoto.chietkhau definition

CREATE TABLE `chietkhau` (
  `id` int NOT NULL AUTO_INCREMENT,
  `TrangThai` int NOT NULL,
  `TenChuongTrinh` varchar(100) NOT NULL,
  `GiaChietKhauToiDa` int DEFAULT NULL,
  `DieuKienGiaToiThieu` int DEFAULT NULL,
  `DieuKienGiaToiDa` int DEFAULT NULL,
  `SoLuongSuDungToiDa` int DEFAULT NULL,
  `ThoiGianBatDau` int NOT NULL,
  `ThoiGianKetThuc` int NOT NULL,
  `IDPhuongThucThanhToan` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `DaXoa` int NOT NULL,
  `GiaTriChietKhau` int DEFAULT NULL,
  `PhanTramChietKhau` int DEFAULT NULL,
  `MaChietKhau` varchar(100) NOT NULL,
  `IDSanPham` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ck_sp` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`id`),
  CONSTRAINT `fk_d_pm` FOREIGN KEY (`IDPhuongThucThanhToan`) REFERENCES `phuongthucthanhtoan` (`id`)
);

-- quanlylinhkienoto.donhang definition

CREATE TABLE `donhang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `IDTaiKhoan` int NOT NULL,
  `IDPhuongThucThanhToan` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `DaXoa` int NOT NULL,
  `TongGiaTriDonHang` int NOT NULL,
  `PhuPhi` int DEFAULT NULL,
  `TrangThai` int NOT NULL,
  `MaChietKhau` int DEFAULT NULL,
  `TongGiaTriChietKhau` int DEFAULT NULL,
  `GiaVanChuyen` int DEFAULT NULL,
  `MaDonHang` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_o_pm` FOREIGN KEY (`IDPhuongThucThanhToan`) REFERENCES `phuongthucthanhtoan` (`id`),
  CONSTRAINT `fk_o_u` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`id`)
);
-- quanlylinhkienoto.chitietdonhang definition

CREATE TABLE `chitietdonhang` (
  `IDSanPham` int NOT NULL,
  `IDDonHang` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `SoLuong` int NOT NULL,
  `DonGia` int NOT NULL,
  `ThanhTien` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `PhiVanChuyen` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `chitietdonhang_FK` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`id`),
  CONSTRAINT `fk_ctdh_dh` FOREIGN KEY (`IDDonHang`) REFERENCES `donhang` (`id`)
);
CREATE TABLE `giohang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `SoLuongDanhMuc` int NOT NULL,
  `SoLuongSanPham` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `IDTaiKhoan` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_c_u` FOREIGN KEY (`IDTaiKhoan`) REFERENCES `taikhoan` (`id`)
);

-- quanlylinhkienoto.chitietgiohang definition

CREATE TABLE `chitietgiohang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `IDSanPham` int NOT NULL,
  `IDGioHang` int NOT NULL,
  `SoLuong` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_ci_c` FOREIGN KEY (`IDGioHang`) REFERENCES `giohang` (`id`),
  CONSTRAINT `fk_ci_p` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`id`)
);
-- quanlylinhkienoto.chitietquyen definition

CREATE TABLE `chitietquyen` (
  `IDCapDoTaiKhoan` int NOT NULL AUTO_INCREMENT,
  `IDQuyen` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `HoatDong` int NOT NULL,
  PRIMARY KEY (`IDCapDoTaiKhoan`,`IDQuyen`),
  CONSTRAINT `chitietquyen_FK` FOREIGN KEY (`IDCapDoTaiKhoan`) REFERENCES `capdotaikhoan` (`id`),
  CONSTRAINT `chitietquyen_FK_1` FOREIGN KEY (`IDQuyen`) REFERENCES `quyen` (`id`)
);
-- quanlylinhkienoto.dondoitra definition

CREATE TABLE `dondoitra` (
  `id` int NOT NULL AUTO_INCREMENT,
  `IDDonHang` int NOT NULL,
  `LyDo` varchar(200) DEFAULT NULL,
  `IDPhuongThucThanhToan` int DEFAULT NULL,
  `PhuPhi` int DEFAULT NULL,
  `ThoiGianTao` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_oe_o` FOREIGN KEY (`IDDonHang`) REFERENCES `donhang` (`id`)
);


-- quanlylinhkienoto.giatrisanpham definition

CREATE TABLE `giatrisanpham` (
  `id` int NOT NULL,
  `GiaGoc` int NOT NULL,
  `IDSanPham` int NOT NULL,
  `ThoiGianTao` int DEFAULT NULL,
  `HoatDong` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_gtsp_sp` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`id`)
);
-- quanlylinhkienoto.giohang definition

-- quanlylinhkienoto.vandon definition

CREATE TABLE `vandon` (
  `id` int NOT NULL AUTO_INCREMENT,
  `IDDonHang` int NOT NULL,
  `ThoiGianTao` int NOT NULL,
  `ThoiGianCapNhat` int DEFAULT NULL,
  `TrangThai` int NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bol_o` FOREIGN KEY (`IDDonHang`) REFERENCES `donhang` (`id`)
)