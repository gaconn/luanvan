import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import CategoryAPI from '../../services/API/CategoryAPI';
import { useState, useEffect } from 'react';
const Category = () => {
    const [category, setCategory] = useState([]);
    useEffect(() => {

    }, [])
    return (
        <div className="col-lg-3 col-md-5">
            <div className="sidebar">
                <div className="sidebar__item ">
                    <div className="flex justify-center">
                        <div className="bg-white rounded-lg border border-gray-200 w-96 text-gray-900">
                            <a
                                href="#!"
                                aria-current="true"
                                className="
  block
  px-6
  py-2
  border-b border-gray-200
  w-full
  rounded-t-lg
  bg-blue-600
  text-white
  cursor-pointer
"                            >
                                The current link item
                                
                            </a>
                            <a
                                href="#!"
                                className="
  block
  px-6
  py-2
  border-b border-gray-200
  w-full
  hover:bg-gray-100 hover:text-gray-500
  focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
  transition
  duration-500
  cursor-pointer
"
                            >
                                A second link item
                                
                            </a>
                            <a
                                href="#!"
                                className="
  block
  px-6
  py-2
  border-b border-gray-200
  w-full
  hover:bg-gray-100 hover:text-gray-500
  focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
  transition
  duration-500
  cursor-pointer
"
                            >
                                A third link item
                            </a>
                            <a
                                href="#!"
                                className="
  block
  px-6
  py-2
  border-b border-gray-200
  w-full
  hover:bg-gray-100 hover:text-gray-500
  focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
  transition
  duration-500
  cursor-pointer
"
                            >
                                A fourth link item
                            </a>
                            <a
                                href="#!"
                                className="
  block
  px-6
  py-2
  border-gray-200
  w-full
  rounded-b-lg
  focus:outline-none focus:ring-0
  text-gray-400
  cursor-default
"
                            >
                                A disabled link item
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
}

export default Category;