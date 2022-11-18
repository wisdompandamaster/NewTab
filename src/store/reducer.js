import Bilibili from "../AppIcons/Bilibili.svg";
import Bytedance from "../AppIcons/Bytedance.svg";
import Douban from "../AppIcons/Douban.svg";
import Github from "../AppIcons/Github.svg";
import Juejin from "../AppIcons/Juejin.svg";
import Leetcode from "../AppIcons/Leetcode.svg";
import Toutiao from "../AppIcons/Toutiao.svg";
import Weibo from "../AppIcons/Weibo.svg";
import Xigua from "../AppIcons/Xigua.svg";
import Douyin from "../AppIcons/Douyin.svg";

const defaultIcons = [
  {
    id: 1,
    href: "https://www.bilibili.com/",
    imgPath: Bilibili,
    name: "Bilibili",
  },
  {
    id: 2,
    href: "https://www.bytedance.com/zh/",
    imgPath: Bytedance,
    name: "Bytedance",
  },
  {
    id: 3,
    href: "https://www.douban.com/",
    imgPath: Douban,
    name: "豆瓣",
  },
  {
    id: 4,
    href: "https://www.douyin.com/",
    imgPath: Douyin,
    name: "抖音",
  },
  {
    id: 5,
    href: "https://github.com/",
    imgPath: Github,
    name: "Github",
  },
  {
    id: 6,
    href: "https://juejin.cn/",
    imgPath: Juejin,
    name: "掘金",
  },
  {
    id: 7,
    href: "https://leetcode-cn.com/",
    imgPath: Leetcode,
    name: "Leetcode",
  },
  {
    id: 8,
    href: "https://www.toutiao.com/",
    imgPath: Toutiao,
    name: "头条",
  },
  {
    id: 9,
    href: "https://weibo.com/",
    imgPath: Weibo,
    name: "微博",
  },
  {
    id: 10,
    href: "https://www.ixigua.com/",
    imgPath: Xigua,
    name: "西瓜视频",
  },
  {
    id: 11,
    href: "https://www.baidu.com/",
    imgPath: "https://www.baidu.com/favicon.ico",
    name: "百度",
  },
  {
    id: 12,
    href: "https://www.taptap.com/",
    imgPath: "https://www.taptap.com/favicon.ico",
    name: "TapTap",
  },
];

const defalutState = {
  cover: localStorage.getItem("cover") || 20,
  blur: localStorage.getItem("blur") || 0,
  currentbg:
    localStorage.getItem("currentbg") || "background/cool-background1.png",
  mybglist: localStorage.getItem("mybglist")
    ? JSON.parse(localStorage.getItem("mybglist"))
    : [],
  onlineimglist: [
    "background/bg1.jpg",
    "background/bg2.jpg",
    "background/bg3.jpg",
    "background/bg4.jpg",
    "background/bg5.jpg",
    "background/bg6.jpg",
    "background/bg7.jpg",
    "background/bg8.jpg",
    "background/bg9.png",
    "background/bg10.jpg",
    "background/bg11.jpg",
    "background/bg12.jpg",
    "background/bg13.jpg",
    "background/bg14.jpg",
    "background/bg15.jpg",
    "background/bg16.jpg",
    "background/bg17.jpg",
    "background/bg18.jpg",
    "background/cool-background1.png",
    "background/cool-background2.png",
    "background/cool-background3.png",
    "background/cool-background4.svg",
    "background/cool-background5.png",
    "background/cool-background6.svg",
    "background/cool-background7.png",
  ],
  clear: 1,
  TodoDatePos: new Date().toLocaleDateString(),
  TodoDates: [],
  // apps
  myApps: localStorage.getItem("apps")
    ? JSON.parse(localStorage.getItem("apps"))
    : defaultIcons,
  functionList: localStorage.getItem("functionList")
    ? JSON.parse(localStorage.getItem("functionList"))
    : [0, 1, 2, 3, 4, 5, 6, 7],
  deleteApp: false,
  deleteFunc: false,
  // functionList:localStorage.getItem('functionList')? localStorage.getItem('functionList'):"[0,1,2,3,4,5,6]"
  footerexist: localStorage.getItem("footerset")
    ? JSON.parse(localStorage.getItem("footerset")).footerexist
    : true,
  footerkinds: localStorage.getItem("footerset")
    ? JSON.parse(localStorage.getItem("footerset")).footerkinds
    : ["i"],
  timefont: localStorage.getItem("timefont")
    ? JSON.parse(localStorage.getItem("timefont"))
    : 0,
  cardstyle: localStorage.getItem("cardstyle")
    ? JSON.parse(localStorage.getItem("cardstyle"))
    : 1,
  countdownList: localStorage.getItem("countdownList")
    ? JSON.parse(localStorage.getItem("countdownList"))
    : [],
  snippets: [],
  bgtype: 1,
  timePos: 1,
};

//eslint-disable-next-line
export default (state = defalutState, action) => {
  // console.log("action", action);
  switch (action.type) {
    case "CHANGE_COVER":
      return {
        ...state,
        cover: action.cover,
      };
    case "CHANGE_BLUR":
      return {
        ...state,
        blur: action.blur,
      };
    case "CHANGE_BG":
      return {
        ...state,
        currentbg: action.currentbg,
      };
    case "CHANGE_MYBG":
      return {
        ...state,
        mybglist: action.mybglist,
      };
    case "CHANGE_CLEAR":
      return {
        ...state,
        clear: action.clear,
      };
    case "CHANGE_TODODATES":
      return {
        ...state,
        TodoDates: action.TodoDates,
      };
    case "CHANGE_TODODATEPOS":
      return {
        ...state,
        TodoDatePos: action.TodoDatePos,
      };
    case "CHANGE_APPS":
      return {
        ...state,
        myApps: action.myApps,
      };
    case "CHANGE_DELETEAPP":
      return {
        ...state,
        deleteApp: action.deleteApp,
      };
    case "CHANGE_FOOTEREXIST":
      return {
        ...state,
        footerexist: action.footerexist,
      };
    case "CHANGE_FOOTERKINDS":
      return {
        ...state,
        footerkinds: action.footerkinds,
      };
    case "CHANGE_TIMEFONT":
      return {
        ...state,
        timefont: action.timefont,
      };
    case "CHANGE_CARDSTYLE":
      return {
        ...state,
        cardstyle: action.cardstyle,
      };
    case "CHANGE_DELETEFUNC":
      return {
        ...state,
        deleteFunc: action.deleteFunc,
      };
    case "CHANGE_FUNCS":
      return {
        ...state,
        functionList: action.functionList,
      };
    case "CHANGE_COUNTDOWNLIST":
      return {
        ...state,
        countdownList: action.countdownList,
      };
    case "CHANGE_SNIPPETS":
      return {
        ...state,
        snippets: action.snippets,
      };
    case "CHANGE_BGTYPE":
      return {
        ...state,
        bgtype: action.bgtype,
      };
    case "CHANGE_TIMEPOS":
      return {
        ...state,
        timePos: action.timePos,
      };
    // case "CHANGE_FUNCTIONLIST":
    //     return {
    //         ...state,
    //         functionList: action.functionList,
    //     }
    default:
      return { ...state };
  }
};
