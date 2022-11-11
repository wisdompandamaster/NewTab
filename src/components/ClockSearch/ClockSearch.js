import "./ClockSearch.css";
import "../../font/iconfont.css";
import fetchJsonp from "fetch-jsonp";
import {
  TranslationOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState, useEffect, memo } from "react";
import { Radio, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import FuncModal from "../FuncModal/FuncModal";
import SetClock from "./SetClock/SetClock";
// import { CodepenOutlined } from '@ant-design/icons'

let t = null;
function debounce(fn, time) {
  //防抖函数
  return function () {
    if (t) {
      clearTimeout(t);
    }
    t = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
}

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
      <span>Time Position</span>
      <span>
        <Radio.Group value={timePos} onChange={onChange}>
          <Radio value={0}>Norm</Radio>
          <Radio value={1}>Top</Radio>
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
  const timePos = useSelector(state => state.timePos);

  let display = timePos ? "none" : "inline-block";
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

const Search = memo(() => {
  //搜索框

  const clear = useSelector(state => state.clear);
  const timePos = useSelector(state => state.timePos);
  const cardstyle = useSelector(state => state.cardstyle);
  const cardstyles = ["", " filter"];

  let top = clear ? "40vh" : timePos ? "10vh" : "28vh";
  //TODO:搜索历史待完成
  // const history = [{ q: "添加" }, { q: "历史搜索" }];
  let oldhistory = localStorage.getItem("searchHistory")
    ? JSON.parse(localStorage.getItem("searchHistory"))
    : [];
  const [history, setHistory] = useState(oldhistory);
  const [select, setSelect] = useState(1);
  const [preselect, setPreSelect] = useState(0);
  const [query, setQuery] = useState("");
  const [presearch, setPreSearch] = useState(history);
  const icons = [
    "icon-google",
    "icon-baidu",
    "icon-biying",
    "icon-bilibili-copy-copy",
    "icon-zhihu",
    "icon-github",
  ];
  const urls = [
    "https://www.google.com/search?q=",
    "https://www.baidu.com/s?tn=44004473_38_oem_dg&ie=utf-8&wd=",
    "https://cn.bing.com/search?q=",
    "https://search.bilibili.com/all?keyword=",
    "https://www.zhihu.com/search?type=content&q=",
    "https://github.com/search?q=",
  ];
  const preUrl = [
    "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=7548,32606,1463,31254,32046,32672,32116,7564,32692,26350&wd=",
  ];

  // query 为空时，显示历史搜索
  useEffect(() => {
    if (query == "") {
      setPreSearch(history);
    }
  }, [query]);

  // useEffect(() => {
  //   console.log(presearch);
  // }, [presearch]);

  const change = (n, e) => {
    setSelect(n);
  };

  const search = (url, text) => {
    //保存历史搜索
    // let history = localStorage.getItem("searchHistory")
    //   ? JSON.parse(localStorage.getItem("searchHistory"))
    //   : [];
    // setQuery("");
    // setPreSearch(history);
    setQuery("");
    setPreSelect(0);
    const w = window.open("_black");
    // 使用 encodeURIComponent 转义text中的特殊字符如&
    w.location.href = url + encodeURIComponent(text);

    if (text !== "")
      setHistory(history => {
        let newhistory = [...history];
        //去重
        newhistory = newhistory.reduce((pre, cur) => {
          return cur.q !== text ? pre.concat(cur) : pre;
        }, []);
        if (history.length > 9) {
          newhistory.pop();
        }
        // type: 0 历史 1 联想词
        newhistory.unshift({ q: text, type: 0 });
        localStorage.setItem("searchHistory", JSON.stringify(newhistory));
        // 同时更新presearch
        setPreSearch(newhistory);
        return newhistory;
      });
    // history.push({ q: text });

    //去焦点
    // focus();
  };

  const handleChange = e => {
    setPreSelect(0);
    setQuery(e.target.value);
    const getPreSearchList = () => {
      fetchJsonp(preUrl[0] + e.target.value, { jsonpCallback: "cb" })
        .then(res => res.json())
        .then(json => {
          json.g ? setPreSearch(json.g) : setPreSearch(history);
        });
    };
    // fetch(preUrl[1]+e.target.value).then((res)=>{res.json()})
    debounce(getPreSearchList, 300)();
  };

  const translate = text => {
    // setPreSearch(history);
    // console.log(text);
    const w = window.open("_black");
    w.location.href =
      "https://translate.volcengine.com/translate?&text=" +
      encodeURIComponent(text) +
      "&op=translate";
    setQuery("");
    setPreSelect(0);
  };

  const inputKeyDown = e => {
    e.key !== "ArrowUp" || e.preventDefault(); //防止按上键时光标跑到左边
    switch (e.key) {
      case "Enter":
        if (preselect === 1) {
          translate(query ? query : history[0].q);
        } else {
          search(urls[select], query);
        }
        break;
      case "ArrowUp":
        setPreSelect(preselect - 1);
        break;
      case "ArrowDown":
        setPreSelect(preselect + 1);
        break;
      default:
        break;
    }
    if (preselect <= 1 && e.key === "ArrowUp") {
      setPreSelect(presearch.length + 1);
    } else if (preselect >= presearch.length + 1 && e.key === "ArrowDown") {
      setPreSelect(1);
    }
  };

  const deleteHitory = (e, index) => {
    e.stopPropagation();
    // 让 input 框不失去焦点
    e.preventDefault();
    let newhistory = [...history];
    newhistory.splice(index, 1);
    setHistory(newhistory);
    setPreSearch(newhistory);
    localStorage.setItem("searchHistory", JSON.stringify(newhistory));
    // console.log(index);
  };

  return (
    <div style={{ top: top }} className={"search" + cardstyles[cardstyle]}>
      {/* 左边 */}
      <button placeholder='hello' className={"engine" + cardstyles[cardstyle]}>
        <span
          style={{ color: "grey" }}
          className={"iconfont" + " " + icons[select]}
        ></span>
        {/* <span className="icon-downArrow iconfont"></span> */}
      </button>

      <ul className={"engineList" + cardstyles[cardstyle]}>
        <li onMouseDown={e => change(0, e)}>
          <span className='icon-google iconfont'></span> 谷 歌
        </li>{" "}
        {/*onClick 在失焦之后，不起作用，用onMouseDown*/}
        <li onMouseDown={e => change(1, e)}>
          <span className='icon-baidu iconfont'></span> 百 度{" "}
        </li>
        <li onMouseDown={e => change(2, e)}>
          <span className='icon-biying iconfont'></span> 必 应{" "}
        </li>
        <li onMouseDown={e => change(3, e)}>
          <span className='icon-bilibili-copy-copy iconfont'></span> Bilibili{" "}
        </li>
        <li onMouseDown={e => change(4, e)}>
          <span className='icon-zhihu iconfont'></span> 知 乎{" "}
        </li>
        <li onMouseDown={e => change(5, e)}>
          <span className='icon-github iconfont'></span> Github{" "}
        </li>
      </ul>
      {/* 中间 */}
      <input
        onKeyDown={e => {
          inputKeyDown(e);
        }}
        style={{ width: "80%" }}
        type='text'
        // allowClear
        onChange={handleChange}
        value={query}
        placeholder='输入并查找'
      />
      {/* 右边 */}
      {/* 搜索联想词 */}
      <div className='presearch-list'>
        {query || (history.length == 0 ? false : history) ? (
          <div
            className={1 === preselect ? "pre-hover" : ""}
            onMouseDown={() => translate(query ? query : history[0]?.q)}
            style={{ paddingLeft: "1.5%" }}
          >
            <TranslationOutlined />
            <div
              className={1 === preselect ? "pre-div-hover" : ""}
              style={{ display: "inline-block" }}
            >
              {query ? query : history[0]?.q}
            </div>
          </div>
        ) : (
          ""
        )}
        {presearch.map((item, index) => {
          if (index + 2 === preselect && query !== item.q) {
            setQuery(item.q);
          }
          // let selected = 1;
          return (
            <div
              key={index}
              className={index + 2 === preselect ? "pre-hover" : ""}
              onMouseDown={() => {
                // setQuery(item.q);
                search(urls[select], item.q);
              }}
            >
              {" "}
              <SearchOutlined />
              <div
                className={index + 2 === preselect ? "pre-div-hover" : ""}
                style={{ display: "inline-block" }}
              >
                {item ? item.q : ""}
              </div>
              <span
                style={{
                  display: item?.type ? "none" : "inline-block",
                }}
                className='search-history-delete'
                onMouseDown={e => deleteHitory(e, index)}
              >
                <CloseOutlined />
              </span>
            </div>
          );
        })}
      </div>

      <span
        onClick={() => {
          search(urls[select], query);
        }}
        className='icon-sousuo iconfont'
      ></span>
    </div>
  );
});

const ClockSearch = () => {
  //时间显示 + 搜索框

  return (
    <div className='clockSearch'>
      <Clock></Clock>
      <Search></Search>
    </div>
  );
};

export { Clock, Search, SetTimePos };
