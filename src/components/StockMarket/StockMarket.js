import { memo } from "react";
import FuncCard from "../FuncCard/FuncCard";

function StockMarket() {
  return (
    <FuncCard
      title='股市'
      iconStyle={{
        background: "linear-gradient(180deg, #ff0838 14.58%, #ff0808 100%)",
        boxShadow: "0px 3px 6px #ff0808",
      }}
      width='165px'
    ></FuncCard>
  );
}

export default memo(StockMarket);
