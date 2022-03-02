import "./Apps.css";
import "../../font/iconfont.css";
import Bilibili from "../../AppIcons/Bilibili.svg";
import Bytedance from "../../AppIcons/Bytedance.svg";
import Douban from "../../AppIcons/Douban.svg";
import Github from "../../AppIcons/Github.svg";
import Juejin from "../../AppIcons/Juejin.svg";
import Leetcode from "../../AppIcons/Leetcode.svg";
import Toutiao from "../../AppIcons/Toutiao.svg";
import Weibo from "../../AppIcons/Weibo.svg";
import Xigua from "../../AppIcons/Xigua.svg";
import Douyin from "../../AppIcons/Douyin.svg";
import { useState, useCallback, useEffect } from "react";
import { Card } from "./card";
import update from "immutability-helper";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";

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
    imgPath: "http://favicon.cccyun.cc/www.baidu.com",
    name: "百度",
  },
  {
    id: 12,
    href: "https://www.taptap.com/",
    imgPath: "https://favicon.cccyun.cc/www.taptap.com/",
    name: "TapTap",
  },
];

export default function Apps() {
  const [apps, setApps] = useLocalStorage("apps", []);
  const myApps = useSelector((state) => state.myApps);
  const dispatch = useDispatch();
  const [cards, setCards] = useState(apps);

  useEffect(() => {
    if (!myApps.length) {
      setApps(defaultIcons);
      setCards(defaultIcons);
      dispatch({
        type: "CHANGE_APPS",
        myApps: defaultIcons,
      });
    }
  }, []);

  useEffect(() => {
    setCards(myApps);
    setApps(myApps);
  }, [myApps]);

  useEffect(() => {
    setApps(cards);
  }, [cards]);

  const deleteApp = (name) => {
    let updatecards = cards.filter((item) => item.name != name);
    setCards(updatecards);
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        })
      );
    },
    [cards]
  );

  const renderCard = useCallback(
    (card, index) => {
      return (
        <Card
          key={card.id}
          id={card.id}
          index={index}
          info={card}
          moveCard={moveCard}
          deleteApp={deleteApp}
        />
      );
    },
    [moveCard]
  );

  return (
    <>
      <div className="Apps">{cards.map((card, i) => renderCard(card, i))}</div>,
    </>
  );

  // let apps = [Bilibili, Bytedance, Douban, Douyin, Github, Juejin, Leetcode, Toutiao, Weibo, Xigua]
  // let urls = [
  //     'https://www.bilibili.com/',
  //     'https://www.bytedance.com/zh/',
  //     'https://www.douban.com/',
  //     'https://www.douyin.com/',
  //     'https://github.com/',
  //     'https://juejin.cn/',
  //     'https://leetcode-cn.com/',
  //     'https://www.toutiao.com/',
  //     'https://weibo.com/',
  //     'https://www.ixigua.com/'
  // ]
  // return (
  //     <div className='Apps'>
  //         {
  //             apps.map((item, index) => {
  //                 return (
  //                     <a key={index} href={urls[index]} rel='noreferrer' target={'_blank'}><img alt={item} src={item} className='icon' /></a>
  //                 )
  //             })

  //         }
  //     </div>
  // )
}
