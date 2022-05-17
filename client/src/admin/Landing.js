import Home from "./pages/Home"
import Login from "./pages/Login"
import Sidebar from "./compoments/sidebar/sidebar"
import "./assets/css/sb-admin-2.css"
import "./assets/css/sb-admin-2.min.css"
import "./assets/vendor/fontawesome-free/css/all.css"
import React, { Component } from 'react';
import Topbar from "./compoments/topbar/topbar"
import { Route, Routes } from "react-router-dom"
import Footer from "./compoments/footer/footer"


class Landing extends Component {
    render() {
        return (
            <div>
               <body id="page-top">
               <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            <Topbar />
                            <Routes>
                                <Route index element={<Home />} />
                                <Route path="login" element={<Login />} />
                            </Routes>
                            <Footer />
                        </div>
                    </div>

                </div>
                <>
                    {/* Scroll to Top Button*/}
                    <a className="scroll-to-top rounded" href="#page-top">
                        <i className="fas fa-angle-up" />
                    </a>
                    {/* Logout Modal*/}
                    <div
                        className="modal fade"
                        id="logoutModal"
                        tabIndex={-1}
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                        Ready to Leave?
                                    </h5>
                                    <button
                                        className="close"
                                        type="button"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Select "Logout" below if you are ready to end your current session.
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="btn btn-secondary"
                                        type="button"
                                        data-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <a className="btn btn-primary" href="login.html">
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
               </body>
            </div>



        );
    }
}

export default Landing;