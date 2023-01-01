import "./Search.css";
import "../../font/iconfont.css";
import fetchJsonp from "fetch-jsonp";
import {
  TranslationOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useState, useEffect, memo } from "react";
import { useSelector } from "react-redux";
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

function Search() {
  //搜索框

  const clear = useSelector(state => state.clear);
  // const timePos = useSelector(state => state.timePos);
  const cardstyle = useSelector(state => state.cardstyle);
  const cardstyles = ["", " filter"];

  let top = clear ? "40vh" : "10vh";
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
}

export default memo(Search);
