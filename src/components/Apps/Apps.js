import "./Apps.css";
import "../../font/iconfont.css";

import { useSelector } from "react-redux";

export default function Apps() {

  const myApps = useSelector((state) => state.myApps);

  const renderCard = (item)=>{
    return (   //因为click事件会引发拖动，所以这里click没有生效，设置transition解决了
      <a rel="noreferrer" key={item.name} href={item.href} target={'_blank'} ><img alt={item.name} src={item.imgPath}/></a>
    )
  }             
  
  return (
      <div className="Apps">{myApps.map((item, i) => renderCard(item))}</div>
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
