import React from 'react'
import ListOrder from "./ListOrder"
const Order = ({option}) => {


    switch (option) {
        case 'list':
            return <ListOrder />
        default:
            break;
    }
  return (
    <div>Order</div>
  )
}

export default Order