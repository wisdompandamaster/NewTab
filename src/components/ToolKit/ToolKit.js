import "./ToolKit.css";
import FuncCard from "../FuncCard/FuncCard";
import { memo, useState } from "react";
import { GlobalOutlined, HddOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const wait = (
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
    寻找图标中
  </div>
);

// const colors = [
//   'pink',
//   'red',
//   'yellow',
//   'orange',
//   'cyan',
//   'green',
//   'blue',
//   'purple',
//   'geekblue',
//   'magenta',
//   'volcano',
//   'gold',
//   'lime',
// ];

const frontend_toolkit_list = [
  {
    name: "CSS Shadow",
    href: "https://box-shadow.dev/",
    icon: "https://box-shadow.dev/favicon.svg",
  },
  {
    name: "Get Man",
    href: "https://getman.cn/",
    icon: "https://getman.cn/img/icon.png",
  },
  {
    name: "Cool Background",
    href: "http://coolbackgrounds.io/",
    icon: "http://coolbackgrounds.io/images/favicon-fe5a0ff5.png",
  },
  {
    name: "零代码工具箱",
    href: "https://lingdaima.com/",
    icon: <GlobalOutlined />,
  },
  {
    name: "Can I Use",
    href: "https://caniuse.com/",
    icon: "https://caniuse.com/img/favicon-128.png",
  },
  { name: "随机占位图", href: "https://placem.at/", icon: <GlobalOutlined /> },
  {
    name: "图标库",
    href: "https://thenounproject.com/",
    icon: "https://static.production.thenounproject.com/img/favicons/favicon-32x32.015f779a87e7.png",
  },
];

function ToolkitBox(props) {
  const list = props.list;

  return (
    <div className='toolkit-box'>
      {list.map((item, index) => {
        return (
          <Tooltip title={item.name} color={"#0008"} key={index}>
            <a href={item.href} target='_blank' rel='noreferrer'>
              {typeof item.icon === "string" ? (
                <img
                  style={{ width: "48px", height: "48px", padding: "5px" }}
                  src={item.icon}
                  alt={item.name}
                />
              ) : (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    padding: "5px",
                    fontSize: "38px",
                    display: "flex",
                    justifyContent: "center",
                    color: "#0008",
                  }}
                >
                  {item.icon}
                </div>
              )}
            </a>
          </Tooltip>
        );
      })}
    </div>
  );
}

const ToolKit = () => {
  const [type, setType] = useState(0);

  const handleChangeType = value => {
    setType(value);
  };

  return (
    <FuncCard
      title='工具箱'
      kinds={["前端", "学术", "其它"]}
      changeType={handleChangeType}
    >
      <div className='toolkit'>
        <div style={{ display: type === 0 ? "block" : "none", height: "100%" }}>
          <ToolkitBox list={frontend_toolkit_list} />
        </div>
        <div style={{ display: type === 1 ? "block" : "none" }}>{wait}</div>
        <div style={{ display: type === 2 ? "block" : "none" }}>{wait}</div>
      </div>
    </FuncCard>
  );
};

export default memo(ToolKit);
