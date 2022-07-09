import imgIcon from '../assets/img/icon/icon1.png'
const Information = () => {
    return (
        <>
            {/* component */}
            {/* post card */}
            <div className="flex bg-white shadow-lg rounded-lg mx-auto md:mx-auto  my-20 max-w-md md:max-w-2xl ">
                {/*horizantil margin is just for display*/}
                <div className="flex items-start px-4 py-6">
                    <img
                        className="w-12 h-12 rounded-full object-cover mr-4 shadow"
                        src={imgIcon}
                        alt="avatar"
                    />
                    <div className="">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900 -mt-1">
                                Brad Adams{" "}
                            </h2>
                        </div>
                        <p className="text-gray-700">Joined 12 SEP 2012. </p>
                        <p className="mt-3 text-gray-700 text-sm">
                           Họ Tên : <label >?</label>
                        </p>
                        <p className="mt-3 text-gray-700 text-sm">
                           Email : <label >?</label>
                        </p>
                        <p className="mt-3 text-gray-700 text-sm">
                           Số Điện thoại : <label >?</label>
                        </p>
                        <p className="mt-3 text-gray-700 text-sm">
                           Ngày sinh : <label >?</label>
                        </p>
                        <p className="mt-3 text-gray-700 text-sm">
                           Địa chỉ : <label >?</label>
                        </p>
                        
                    </div>
                </div>
            </div>
        </>

    );
}

export default Information;