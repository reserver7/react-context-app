import React, { useContext } from "react";
import Type from "../../components/Type";
import { OrderContext } from "../../context/OrderContext";

const OrderPage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);

  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>
        <div style={{ width: "50%" }}>
          <h2>Total Price: {orderData.totals.total}</h2>
          <button
            onClick={() => {
              if (orderData.totals.total > 0) {
                setStep(1);
              } else {
                alert("상품을 선택해주세요.");
              }
            }}
          >
            주문
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
