import Information from "./infomationCustomer";
import Table from 'react-bootstrap/Table';
const ManageComponents = () => {
    return (<>
        <Information />
        <section className="w-2/3 mx-auto">
            <header class="px-5 py-4 border-b border-gray-100">
                <div class="font-semibold text-gray-800">Manage Carts</div>
            </header>
            <Table striped bordered responsive hover>
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Ngày đặt</th>
                        <th>Sản Phẩm</th>
                        <th>Tất Cả</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </section>
    </>);
}

export default ManageComponents;