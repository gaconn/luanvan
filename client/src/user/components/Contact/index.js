import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { BsTextCenter } from "react-icons/bs"
const ContactComponent = () => {
    return (
        <div>
            {/* Contact Section Begin */}
            <section className="contact spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_phone" />
                                <h4>Số điện thoại</h4>
                                <p>0334596482</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_pin_alt" />
                                <h4>Địa Chỉ </h4>
                                <p>180 Cao Lỗ</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_clock_alt" />
                                <h4>Thời gian mở của</h4>
                                <p>7h00 sáng đến 22h00 tối</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 text-center">
                            <div className="contact__widget">
                                <span className="icon_mail_alt" />
                                <h4>Email</h4>
                                <p>company@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section End */}
            {/* Map Begin */}

            <div>
                <>
                    {/* component */}
                    <section
                        className="py-20 px-4 lg:px-16 overflow-hidden relative z-10"
                        data-aos="fade-up"
                        id="contact"
                    >
                        <div className="container">
                            <div className="mb-5 flex items-center max-w-md">
                                <h2 className="text-slate-900 dark:text-gray-200 text-3xl font-bold">
                                    {" "}
                                    Liên Hệ Công Ty
                                </h2>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center text-slate-900 dark:text-gray-200 lg:justify-between -mx-4">
                                <div
                                    className="w-full lg:w-1/2 xl:w-6/12 px-4"
                                    data-aos="fade-up"
                                    data-aos-delay={200}
                                >
                                    <div className="map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9459979472686!2d106.67820281411625!3d10.738645562828017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fac4c2ec679%3A0x1b72da582829a169!2zMTgwIMSQLiBDYW8gTOG7lywgUGjGsOG7nW5nIDQsIFF14bqtbiA4LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1659691931255!5m2!1svi!2s"
                                            height={500}
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            aria-hidden="false"
                                            tabIndex={0}
                                        />
                                        <div className="map-inside">
                                            <i className="icon_pin" />
                                            <div className="inside-widget">
                                                <h4>CompanyAuto</h4>
                                                <ul>
                                                    <li>Số điện thoại:0334596482</li>
                                                    <li>
                                                        Địa chỉ: 180 Cao lỗ, Quận 8, Thành phố hồ
                                                        chí minh
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="w-full lg:w-1/2 xl:w-5/12 px-4"
                                    data-aos="fade-up"
                                    data-aos-delay={500}
                                    data-aos-duration={2000}
                                >
                                    <div className="bg-gray-100 dark:bg-slate-800 relative rounded-lg p-8 sm:p-12 shadow-lg">
                                        <form>
                                            <div className="mb-6">
                                                <input
                                                    type="text"
                                                    placeholder="Họ tên"
                                                    className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                                                    name="HoTen"
                                                    id="full_name"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                                                    name="Email"
                                                    id="email"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <input
                                                    inputMode="numeric"
                                                    placeholder="Số điện thoại"
                                                    className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                                                    name="SoDienThoai"
                                                    id="phone_number"
                                                />
                                            </div>
                                            <div className="mb-6">
                                                <textarea
                                                    rows={6}
                                                    placeholder="Tin nhắn"
                                                    className="
                              w-full
                              rounded
                              p-3
                              text-gray-800
                              dark:text-gray-50
                              dark:bg-slate-700
                              border-gray-500
                              dark:border-slate-600
                              outline-none
                              focus-visible:shadow-none
                              focus:border-primary
                              "
                                                    name="message"
                                                    id="message"
                                                    defaultValue={""}
                                                />
                                            </div>
                                            <div>
                                                <button
                                                    type="submit"
                                                    className="
                              w-full
                              text-gray-100
                              hover:text-gray-700
                              bg-yellow-400
                              rounded
                              border border-primary
                              dark:border-slate-600
                              p-3
                              transition
                              ease-in-out
                              duration-500
                              hover:bg-yellow-300
                              "
                                                >
                                                    Send Message
                                                </button>
                                            </div>
                                        </form>
                                   
                                        <div>
                                            <span className="absolute -top-10 -right-9 z-[-1]">
                                                <svg
                                                    width={100}
                                                    height={100}
                                                    viewBox="0 0 100 100"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                                                        fill="#FACC15"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="absolute -right-10 top-[90px] z-[-1]">
                                                <svg
                                                    width={34}
                                                    height={134}
                                                    viewBox="0 0 34 134"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        cx="31.9993"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                </svg>
                                            </span>
                                            <span className="absolute -left-7 -bottom-7 z-[-1]">
                                                <svg
                                                    width={107}
                                                    height={134}
                                                    viewBox="0 0 107 134"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <circle
                                                        cx="104.999"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="104.999"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 104.999 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="90.3333"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 90.3333 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="75.6654"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 75.6654 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="31.9993"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 31.9993 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="60.9993"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 60.9993 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="17.3333"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 17.3333 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={132}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 132)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="117.333"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 117.333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="102.667"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 102.667)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={88}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 88)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="73.3333"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 73.3333)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={45}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 45)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={16}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 16)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy={59}
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 59)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="30.6666"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 30.6666)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="46.3333"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 46.3333 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                    <circle
                                                        cx="2.66536"
                                                        cy="1.66665"
                                                        r="1.66667"
                                                        transform="rotate(180 2.66536 1.66665)"
                                                        fill="#13C296"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            </div>
        </div>
    )
}

export default ContactComponent
