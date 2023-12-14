import { createContext, useState, useMemo, useEffect } from "react";

const OrderContext = createContext();

export function OrderContextProvider(props) {
  const [orderCounts, setOrderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, setTotals] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  useEffect(() => {
    const productsTotal = calculateSubTotal("products", orderCounts);
    const optionsTotal = calculateSubTotal("options", orderCounts);
    const total = productsTotal + optionsTotal;
    setTotals({
      products: productsTotal,
      options: optionsTotal,
      total,
    });
  }, [orderCounts]);

  const calculateSubTotal = (orderType, orderCounts) => {
    let optionCount = 0;
    for (const count of orderCounts[orderType].values()) {
      optionCount += count;
    }

    return optionCount * pricePerItem[orderType];
  };

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, orderType) {
      const newOrderCount = { ...orderCounts };
      const orderCountsMap = orderCounts[orderType];

      orderCountsMap.set(itemName, parseInt(newItemCount));

      setOrderCounts(newOrderCount);
    }

    return [{ ...orderCounts, totals }, updateItemCount];
  }, [orderCounts]);

  return <OrderContext.Provider value={value} {...props} />;
}
