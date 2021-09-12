import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import {
  doc,
  query,
  orderBy,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { useStateValue } from "../StateProvider";
import Order from "./Order";
import { useHistory } from "react-router-dom";

function Orders() {
  document.title = "Your Orders";
  // eslint-disable-next-line
  const [{ cart, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      const usersRef = doc(db, "users", user?.uid);
      const ordersCollectionRef = collection(usersRef, "orders");
      const q = query(ordersCollectionRef, orderBy("created", "desc"));
      // eslint-disable-next-line
      const snap = onSnapshot(q, (snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    } else {
      setOrders([]);
      history.replace("/");
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <OrdersBody>
        <OrdersContainer>
          <OrdersTitle>Your Orders</OrdersTitle>
          <OrdersItems>
            {orders?.map((order) => (
              <Order order={order} />
            ))}
          </OrdersItems>
        </OrdersContainer>
      </OrdersBody>
    </div>
  );
}

export default Orders;

const OrdersBody = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 80vh;
  min-width: 920px;
`;
const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 920px;
  margin-bottom: 20px;
`;
const OrdersTitle = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 36px;
  margin: 20px 0;
`;
const OrdersItems = styled.div``;
