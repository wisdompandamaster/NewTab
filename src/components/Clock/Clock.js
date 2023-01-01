/**
 * Clock 停用，暂时使用 TopClock
 */
import "./Clock.css";
import "../../font/iconfont.css";
import { UnorderedListOutlined } from "@ant-design/icons";
import { useState, useEffect, memo } from "react";
import { Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import FuncModal from "../FuncModal/FuncModal";
import SetClock from "./SetClock/SetClock";
// import { CodepenOutlined } from '@ant-design/icons'

//显示时间的组件
function DateTime(props) {
  const { timezone, city } = props;
  const weekdays = ["天", "一", "二", "三", "四", "五", "六"];
  const [now, setNow] = useState(
    new Date(Number(new Date()) - timezone * 60 * 60 * 1000)
  );

  useEffect(() => {
    //每次渲染都会调用该函数
    const t = setInterval(() => {
      setNow(new Date(Number(new Date()) - timezone * 60 * 60 * 1000));
    });
    return () => {
      //每次都执行此函数，清除定时器
      clearTimeout(t);
    };
  });

  let h = String(now.getHours()).padStart(2, "0"),
    m = String(now.getMinutes()).padStart(2, "0");

  return (
    <div style={{ margin: "0 1rem" }}>
      <div
        style={{ fontSize: "1.5rem", fontWeight: "600", fontFamily: "YaHei" }}
      >
        {city}
      </div>
      <div>
        <div className='h'>{h}</div>:<div className='m'>{m}</div>
      </div>
      <div className='clock-day'>
        {now.getFullYear() +
          " 年 " +
          (now.getMonth() + 1) +
          " 月 " +
          now.getDate() +
          " 日 "}
        <span style={{ marginLeft: "2%" }}>
          {"星期" + weekdays[now.getDay()]}
        </span>
      </div>
    </div>
  );
}

//时钟显示的倒计时
function CountDownInClock() {
  const now = new Date();

  const dataSource = useSelector(state => state.countdownList);
  const [itemIndex, setItemIndex] = useState(0);

  const handleWheelCapture = e => {
    // e.preventDefault();
    e.stopPropagation();
    //   console.log(e)
    if (e.deltaY > 0 && itemIndex < dataSource.length - 1) {
      setItemIndex(itemIndex + 1);
    }
    if (e.deltaY < 0 && itemIndex >= 1) {
      setItemIndex(itemIndex - 1);
    }
  };

  const no_countdown = (
    <div
      style={{
        fontSize: "30px",
        height: "120px",
        width: "100%",
        textAlign: "center",
        lineHeight: "110px",
        fontWeight: "700",
        color: "#00000033",
        letterSpacing: "8px",
      }}
    >
      暂无倒计时，在倒计时卡片添加
    </div>
  );

  const have_countdown = dataSource.map((item, index) => {
    const timeRemainning = new Date(item.ddl) - now;
    const day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1;
    if (index === itemIndex)
      return (
        <div key={item.id}>
          <div>距离{item.name}还剩</div>
          <div>
            {day}
            <span>days</span>
          </div>
        </div>
        //继续写countdown 变换的代码
      );
  });
  return (
    <div
      className='countdown_content_clock'
      onWheelCapture={handleWheelCapture}
    >
      {dataSource.length > 0 ? have_countdown : no_countdown}
    </div>
  );
}

const SetTimePos = memo(() => {
  const timePos = useSelector(state => state.timePos);
  const dispatch = useDispatch();
  const onChange = e => {
    //console.log('radio checked', e.target.value);
    // setValue(e.target.value);
    dispatch({
      type: "CHANGE_TIMEPOS",
      timePos: e.target.value,
    });
  };

  return (
    <div>
      <span>时间位置</span>
      <span>
        <Radio.Group value={timePos} onChange={onChange}>
          <Radio value={0}>页面</Radio>
          <Radio value={1}>顶部</Radio>
        </Radio.Group>
      </span>
    </div>
  );
});
//时钟的功能
const Clock = memo(() => {
  // 时钟

  const dispatch = useDispatch();
  //时间模式 0 普通时间 1 世界时间 2 倒计时
  const [timeType, setTimeType] = useState(0);
  // const timePos = useSelector(state => state.timePos);

  let display = "none";
  // modal组件控制函数
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    // openNotification();
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChangeClear() {
    let value = clear ? 0 : 1;
    dispatch({
      type: "CHANGE_CLEAR",
      clear: value,
    });
  }

  const onSetClock = e => {
    e.stopPropagation();
    showModal();
  };

  const onChange = e => {
    setTimeType(e.target.value);
  };

  const clear = useSelector(state => state.clear);
  let top = clear ? "10vh" : "3vh";
  const timefont = useSelector(state => state.timefont);
  const digitalfont = timefont === 2 ? " digitalfont" : "";

  function ClockType() {
    switch (timeType) {
      case 0:
        return <DateTime timezone={0} city={""} />;
      case 1:
        return (
          <>
            <DateTime timezone={0} city={"北京"} />
            <DateTime timezone={8} city={"伦敦"} />
            {/* <DateTime timezone={12} city={'纽约'}/> */}
          </>
        );
      case 2:
        return (
          <div>
            <CountDownInClock />
          </div>
        );
    }
  }

  return (
    <>
      <div
        style={{ top: top, display: display }}
        onClick={() => onChangeClear()}
        className={"clock fade_in" + digitalfont}
      >
        <span className='clock-setting' onClick={e => onSetClock(e)}>
          <UnorderedListOutlined />
        </span>
        <div style={{ display: "flex" }}>{ClockType()}</div>
      </div>
      <FuncModal
        bodyStyle={{ padding: "11px" }}
        title={
          <div
            style={{
              fontSize: "25px",
              fontWeight: "500",
              letterSpacing: "8px",
              marginLeft: "24px",
            }}
          >
            时钟设置
          </div>
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"30vw"}
      >
        <SetClock />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>时间格式</span>
          <span>
            <Radio.Group onChange={onChange} value={timeType}>
              <Radio value={0}>普通时间</Radio>
              <Radio value={1}>世界时间</Radio>
              <Radio value={2}>倒计时</Radio>
            </Radio.Group>
          </span>
        </div>
      </FuncModal>
    </>
  );
});

const TopClock = memo(() => {
  const [now, setNow] = useState(new Date());
  const clear = useSelector(state => state.clear);
  const dispatch = useDispatch();

  useEffect(() => {
    //每次渲染都会调用该函数
    const t = setInterval(() => {
      setNow(new Date());
    });
    return () => {
      //每次都执行此函数，清除定时器
      clearTimeout(t);
    };
  });

  const handleClick = e => {
    e.stopPropagation();
    // e.preventDefault();
    let value = clear ? 0 : 1;
    dispatch({
      type: "CHANGE_CLEAR",
      clear: value,
    });
  };

  return (
    <div
      onClick={handleClick}
      style={{
        color: "#fffa",
        background: "#0009",
        fontWeight: "600",
        fontSize: "20px",
        height: "32px",
        lineHeight: "32px",
        padding: "0 16px",
        borderRadius: "16px",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {/* <DateTime timezone={0} /> */}
      {String(now.getHours()).padStart(2, "0") +
        " : " +
        String(now.getMinutes()).padStart(2, "0") +
        " : " +
        String(now.getSeconds()).padStart(2, "0")}
    </div>
  );
});

export { Clock, SetTimePos, TopClock };
