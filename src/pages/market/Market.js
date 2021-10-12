import Order from "./Order";
import List from "./List";
import { useState } from "react";

import "./Market.css";

const Market = () => {
  const [date, setDate] = useState([]);

  return (
    <div className="market-index">
      <Order add={setDate} />
      <List listData={date} deleteData={setDate} />
    </div>
  );
};
export default Market;
