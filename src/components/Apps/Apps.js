import './Apps.css'
import '../../font/iconfont.css'
import Bilibili from '../../AppIcons/Bilibili.svg'
import Bytedance from '../../AppIcons/Bytedance.svg'
import Douban from '../../AppIcons/Douban.svg'
import Github from '../../AppIcons/Github.svg'
import Juejin from '../../AppIcons/Juejin.svg'
import Leetcode from '../../AppIcons/Leetcode.svg'
import Toutiao from '../../AppIcons/Toutiao.svg'
import Weibo from '../../AppIcons/Weibo.svg'
import Xigua from '../../AppIcons/Xigua.svg'
import Douyin from '../../AppIcons/Douyin.svg'


export default function Apps(){
    let apps = [Bilibili,Bytedance,Douban,Douyin,Github,Juejin,Leetcode,Toutiao,Weibo,Xigua]
    let urls = [
        'https://www.bilibili.com/',
        'https://www.bytedance.com/zh/',
        'https://www.douban.com/',
        'https://www.douyin.com/',
        'https://github.com/',
        'https://juejin.cn/',
        'https://leetcode-cn.com/',
        'https://www.toutiao.com/',
        'https://weibo.com/',
        'https://www.ixigua.com/'
    ]
    return(
        <div className='Apps'>
           {
               apps.map((item,index)=>{
                   return (
                    <a key={index} href={urls[index]} target={'_blank'}><img src={item} className='icon'/></a>
                   )
               })

           }
        </div>
    )

}