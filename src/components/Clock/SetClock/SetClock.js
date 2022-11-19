import "./SetClock.css";
import { Radio } from "antd";
import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function SetClock() {
  const dispatch = useDispatch();
  // const [value, setValue] = useState(1);
  const [, setTimeFont] = useLocalStorage("timefont");
  const TimeFont = useSelector(state => state.timefont);

  const onChange = e => {
    // setValue(e.target.value);
    dispatch({
      type: "CHANGE_TIMEFONT",
      timefont: e.target.value,
    });
    setTimeFont(e.target.value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>时间样式</span>
        <span>
          <Radio.Group onChange={onChange} value={TimeFont}>
            <Radio value={1}>普通</Radio>
            <Radio value={2}>数码</Radio>
          </Radio.Group>
        </span>
      </div>
    </div>
  );
}
