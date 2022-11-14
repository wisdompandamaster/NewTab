import "./WoodenFish.css";
import FuncCard from "../FuncCard/FuncCard";
import { memo, useState } from "react";
import woodenfish from "../../asset/woodenfish.png";
import woodenfish_audio from "../../asset/woodenfish.mp3";

function WoodenFish() {
  const [count, setCount] = useState(0);
  let audio = new Audio(woodenfish_audio);

  const addCount = e => {
    e.stopPropagation();
    // console.log(count);
    audio.play();
    setCount(count => count + 1);
  };
  return (
    <div>
      <FuncCard width='175px' title='电子木鱼'>
        <div className='woodenfish' onClick={addCount}>
          <img
            width={130}
            src={woodenfish}
            style={{ marginTop: "5%", marginLeft: "12%" }}
          />
          <div className='woodenfish_tag'>功德 + 1</div>
          <div
            style={{
              fontWeight: "800",
              fontSize: "14px",
              color: "#fffc",
              fontFamily: "Kaiti",
              textAlign: "center",
            }}
          >
            {"今日功德 " + count}
          </div>
        </div>
      </FuncCard>
    </div>
  );
}

export default memo(WoodenFish);
