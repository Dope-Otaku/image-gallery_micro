import React from "react";
import "./css/OrderList.css";

const OrderList = ({ orders }) => {
  return (
    <ul className="order-list">
      {orders.map((order) => (
        <li key={order._id} className="order-item">
          <div className="order-details">
            <h3>Customer Name: {order.customerName}</h3>
            <p>Book Title: {order.bookTitle}</p>
            <p>
              Initial Date: {new Date(order.initialDate).toLocaleDateString()}
            </p>
            <p>
              Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default OrderList;
