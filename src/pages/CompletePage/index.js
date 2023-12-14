import React, { useEffect, useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";
import axios from "axios";

const CompletePage = ({ setStep }) => {
  const [orderData] = useContext(OrderContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    try {
      const res = await axios.post("http://localhost:4000/order", orderData);
      setOrderHistory(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const orderTable = orderHistory.map((item, key) => (
    <tr key={key}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if (loading) {
    return <div>...loading</div>;
  } else {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>주문이 성공했습니다.</h2>
        <h2>지금까지 모든 주문</h2>
        <table style={{ margin: "auto" }}>
          <tbody>
            <tr>
              <th>Number</th>
              <th>Price</th>
            </tr>
            {orderTable}
          </tbody>
        </table>
        <br />
        <button onClick={() => setStep(0)}>첫 페이지로</button>
      </div>
    );
  }
};

export default CompletePage;
