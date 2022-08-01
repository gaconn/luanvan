import { useNavigate } from "react-router-dom"
import IMG from "../../assets/img/icon/icon3.png"

const CartRong = () => {
    const navigate = useNavigate()
    const ReloadShop = () => {
        navigate("/Shop")
    }
    return (
        <>
            <div className="flex justify-center">
                <div className="block rounded-lg shadow-lg bg-white max-w-sm text-center">
                    <div className="py-3 px-6 border-b border-gray-300">Giỏ hàng của bạn</div>
                    <div className="p-6">
                        <h5 className="text-gray-900 text-xl font-medium mb-2">
                            <img src={IMG} style={{ width: 400, height: 150 }} />
                        </h5>
                        <p className="text-gray-700 text-base mb-4">
                            Chưa có sản phẩm nào trong giỏ hàng của bạn
                        </p>
                        <button
                            onClick={() => ReloadShop()}
                            type="button"
                            className=" inline-block px-6 py-2 border-2 border-gray-800 text-gray-800 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                        >
                            tiếp tục mua sắm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartRong
