import { memo } from "react";
import FuncCard from "../FuncCard/FuncCard";

function FormHabit() {
  return (
    <FuncCard
      title='习惯养成'
      iconStyle={{
        background: "linear-gradient(180deg, #00ffd2 14.58%, #00ffa2 100%)",
        boxShadow: "0px 3px 6px #00ffa2",
      }}
      width='165px'
    ></FuncCard>
  );
}

export default memo(FormHabit);
