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
import { useState, useCallback } from 'react';
import { Card } from './card';
import update from 'immutability-helper';


export default function Apps() {

    const [cards, setCards] = useState([
        {
            id: 1,
            com: <a href='https://www.bilibili.com/' rel='noreferrer' target={'_blank'}><img alt='bilibili' src={Bilibili} className='icon' /></a>
        },
        {
            id: 2,
            com: <a href='https://www.bytedance.com/zh/' rel='noreferrer' target={'_blank'}><img alt='bytedance' src={Bytedance} className='icon' /></a>
        },
        {
            id: 3,
            com: <a href='https://www.douban.com/' rel='noreferrer' target={'_blank'}><img alt='douban' src={Douban} className='icon' /></a>
        },
        {
            id: 4,
            com: <a href='https://www.douyin.com/' rel='noreferrer' target={'_blank'}><img alt='douyin' src={Douyin} className='icon' /></a>
        },
        {
            id: 5,
            com: <a href='https://github.com/' rel='noreferrer' target={'_blank'}><img alt='github' src={Github} className='icon' /></a>
        },
        {
            id: 6,
            com: <a href='https://juejin.cn/' rel='noreferrer' target={'_blank'}><img alt='juejin' src={Juejin} className='icon' /></a>
        },
        {
            id: 7,
            com: <a href='https://leetcode-cn.com/' rel='noreferrer' target={'_blank'}><img alt='leetcode' src={Leetcode} className='icon' /></a>
        },
        {
            id: 8,
            com: <a href='https://www.toutiao.com/' rel='noreferrer' target={'_blank'}><img alt='toutiao' src={Toutiao} className='icon' /></a>
        },
        {
            id: 9,
            com: <a href='https://weibo.com/' rel='noreferrer' target={'_blank'}><img alt='weibo' src={Weibo} className='icon' /></a>
        },
        {
            id: 10,
            com: <a href='https://www.ixigua.com/' rel='noreferrer' target={'_blank'}><img alt='xigua' src={Xigua} className='icon' /></a>
        }
    ]);

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        setCards((prevCards) => update(prevCards, {
            $splice: [
                [dragIndex, 1],
                [hoverIndex, 0, prevCards[dragIndex]],
            ],
        }));
    }, []);

    const renderCard = useCallback((card, index) => {
        return (
            <Card key={card.id} index={index} id={card.id} moveCard={moveCard} com={card.com} />
        );
    }, [moveCard]);

    return (
        <>
            <div className='Apps'>{cards.map((card, i) => renderCard(card, i))}</div>
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