import './News.css'
import '../../font/iconfont.css'
import defaultSetting from '../../config';
import React, { useEffect, useState } from 'react';
import { Modal, Tooltip, Tabs, List, Typography} from 'antd';

let initialData=[
  {
      "web_title": "微博",
      "icon": "https://file.ipadown.com/tophub/assets/images/media/s.weibo.com.png_50x50.png",
      "content": [
          {
              "num": "1",
              "text": "情人节",
              "other": "296.9万",
              "url": "https://s.weibo.com/weibo?q=%E6%83%85%E4%BA%BA%E8%8A%82&Refer=top"
          },
          {
              "num": "2",
              "text": "苏翊鸣摔倒",
              "other": "269.0万",
              "url": "https://s.weibo.com/weibo?q=%23%E8%8B%8F%E7%BF%8A%E9%B8%A3%E6%91%94%E5%80%92%23&Refer=top"
          },
          {
              "num": "3",
              "text": "冬奥过半多项纪录被打破",
              "other": "262.1万",
              "url": "https://s.weibo.com/weibo?q=%23%E5%86%AC%E5%A5%A5%E8%BF%87%E5%8D%8A%E5%A4%9A%E9%A1%B9%E7%BA%AA%E5%BD%95%E8%A2%AB%E6%89%93%E7%A0%B4%23&Refer=top"
          },
          {
              "num": "4",
              "text": "谷爱凌四小时吃了四顿饭",
              "other": "260.0万",
              "url": "https://s.weibo.com/weibo?q=%23%E8%B0%B7%E7%88%B1%E5%87%8C%E5%9B%9B%E5%B0%8F%E6%97%B6%E5%90%83%E4%BA%86%E5%9B%9B%E9%A1%BF%E9%A5%AD%23&Refer=top"
          },
          {
              "num": "5",
              "text": "你对象比谷爱凌还忙吗",
              "other": "201.0万",
              "url": "https://s.weibo.com/weibo?q=%E4%BD%A0%E5%AF%B9%E8%B1%A1%E6%AF%94%E8%B0%B7%E7%88%B1%E5%87%8C%E8%BF%98%E5%BF%99%E5%90%97&Refer=top"
          },
          {
              "num": "6",
              "text": "徐梦桃第一跳101.10分",
              "other": "131.0万",
              "url": "https://s.weibo.com/weibo?q=%23%E5%BE%90%E6%A2%A6%E6%A1%83%E7%AC%AC%E4%B8%80%E8%B7%B3101.10%E5%88%86%23&Refer=top"
          },
          {
              "num": "7",
              "text": "教育部称双一流不是给高校分三六九等",
              "other": "130.7万",
              "url": "https://s.weibo.com/weibo?q=%23%E6%95%99%E8%82%B2%E9%83%A8%E7%A7%B0%E5%8F%8C%E4%B8%80%E6%B5%81%E4%B8%8D%E6%98%AF%E7%BB%99%E9%AB%98%E6%A0%A1%E5%88%86%E4%B8%89%E5%85%AD%E4%B9%9D%E7%AD%89%23&Refer=top"
          },
          {
              "num": "8",
              "text": "劝分组",
              "other": "105.9万",
              "url": "https://s.weibo.com/weibo?q=%E5%8A%9D%E5%88%86%E7%BB%84&Refer=top"
          }
      ]
  },
  {
      "web_title": "抖音",
      "icon": "https://file.ipadown.com/tophub/assets/images/media/iesdouyin.com.png_50x50.png",
      "content": [
          {
              "num": "1",
              "text": "#抖音美食创作人 #一口吃掉春天 好久没给林先生做小零食了！准备了12斤凤梨给他做凤梨酥和凤梨罐头～",
              "other": "9.6万",
              "url": "https://www.iesdouyin.com/share/video/6943940575011867908/?region=&mid=6943940627499764488&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "2",
              "text": "oh 我化了#陪你长大",
              "other": "9.6万",
              "url": "https://www.iesdouyin.com/share/video/6923835539430952206/?region=&mid=6916416675407579912&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "3",
              "text": "悲伤从来不会缺席 它只是迟到了#小朋友能有什么坏心眼呢",
              "other": "7.5万",
              "url": "https://www.iesdouyin.com/share/video/6921241124522708239/?region=&mid=6874866345545190152&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "4",
              "text": "你看看是不是有内味儿了#Zara #拍照 #时尚",
              "other": "7.2万",
              "url": "https://www.iesdouyin.com/share/video/6940193532233731328/?region=&mid=6940193551011613454&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "5",
              "text": "橙可爱祝大家新年快乐！",
              "other": "3.6万",
              "url": "https://www.iesdouyin.com/share/video/6927900352347933959/?region=&mid=6927900389111237383&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "6",
              "text": "谁说农村喝不到奶茶的，这也太好喝了吧#抖音美食创作人 #奶茶",
              "other": "3.1万",
              "url": "https://www.iesdouyin.com/share/video/6922807498877504779/?region=&mid=6922807693451299592&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "7",
              "text": "大家好 我们是搞笑二人组😅😄",
              "other": "2.8万",
              "url": "https://www.iesdouyin.com/share/video/6918682090515074304/?region=&mid=6830725185570671374&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          },
          {
              "num": "8",
              "text": "开春甜！#孙俪 俪boss笑得要甜出汁啦！岁月静好，有你相伴，祝大家#情人节快乐 ❤️@抖音小助手",
              "other": "2.2万",
              "url": "https://www.iesdouyin.com/share/video/6928953754343574787/?region=&mid=6928953805157468935&u_code=0&did=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title"
          }
      ]
  },
  {
      "web_title": "掘金",
      "icon": "https://file.ipadown.com/tophub/assets/images/media/juejin.im.png_50x50.png",
      "content": [
          {
              "num": "1",
              "text": "2021 从跳槽到被裁",
              "other": "2.6万",
              "url": "https://juejin.im/post/7062176624241803294"
          },
          {
              "num": "2",
              "text": "Element Plus 正式版发布啦！ 🎉🎉",
              "other": "2.5万",
              "url": "https://juejin.im/post/7061850934095609863"
          },
          {
              "num": "3",
              "text": "来自未来，2022 年的前端人都在做什么?",
              "other": "8409",
              "url": "https://juejin.im/post/7062617190981173278"
          },
          {
              "num": "4",
              "text": "移动端适配解决方案(二)",
              "other": "8241",
              "url": "https://juejin.im/post/7061866685166256142"
          },
          {
              "num": "5",
              "text": "金3银4面试前，把自己弄成卷王！",
              "other": "9534",
              "url": "https://juejin.im/post/7062496938058317855"
          },
          {
              "num": "6",
              "text": "Go 学习路线（2022）",
              "other": "7289",
              "url": "https://juejin.im/post/7061980386640789540"
          },
          {
              "num": "7",
              "text": "Hooks 对于 Vue 意味着什么？",
              "other": "9026",
              "url": "https://juejin.im/post/7062259204941152293"
          },
          {
              "num": "8",
              "text": "2022年，到底如何写一个优雅的函数？来呀，看这里！",
              "other": "6877",
              "url": "https://juejin.im/post/7061842017487159333"
          }
      ]
  }
]

function NewsBrief(){    //热榜简单面板
    const [type,setType] = useState(0)
   // useEffect 异步请求数据，写入localstorage, 从local里面读取数据
    useEffect(()=>{
      //这里目前页面刷新一次才请求一次，后续需要定时请求更新，并且添加节流
          
        let url = defaultSetting.site + '/news/get/' 
        async function getList(){   
                
            fetch(url).then((response)=>response.json())
            .then((data)=>{localStorage.setItem('briefList',JSON.stringify(data.briefres));
                           localStorage.setItem('resList',JSON.stringify(data.res))}
            ).catch((e)=>console.log("error"));
        }
        getList() 
         

    },[])

    function handleClick(e){    //阻止事件冒泡
        e.stopPropagation()
    }
   
    let res = localStorage.getItem('briefList') && localStorage.getItem('briefList')!='[]'? JSON.parse(localStorage.getItem('briefList')):initialData
    let List = [res[1].content, res[2].content, res[0].content] 
    let briefList = List[type]

    return (
        <>
        <div className='briefNav'>
            <div className='left'><div></div><p>话题热榜</p></div>
            <div className='right'>
                <span onMouseOver={()=>setType(0)} style={{color:(type===0? '#000000':'#00000033')}} className="iconfont icon-zhihu"></span>
                <span onMouseOver={()=>setType(1)} style={{color:(type===1? '#000000':'#00000033')}}className="iconfont icon-bilibili-copy-copy"></span>
                <span onMouseOver={()=>setType(2)} style={{color:(type===2? '#000000':'#00000033')}}className="iconfont icon-weibo"></span>
            </div>
            <div className='briefList'>
                {
                    briefList.map((item, index)=>{
                      return (<div onClick={(e)=>handleClick(e)} key={index} className='briefListItem'><span>{item.num}</span>
                     <Tooltip placement="bottomLeft" title={item.text}><a rel="noreferrer" target={'_blank'} href={item.url}>{item.text}</a></Tooltip></div>)
                     })
                }
            </div>
            <div className='line'></div>
        </div>
        </>
    )

}

function NewsDetail(props){     //热榜二级页面右边的列表
     
    const data = props.dataSource
     

    return (
        <>
        <List className='newsList' style={{height:'500px',overflowY:'scroll'}}
          size='small'
          dataSource={data.content}
          renderItem={item => (
            <List.Item className="newsItem">
              {/* rel='noreferer' 用来保证安全 */}
              <Typography.Text><span className='newsItemNum'>{item.num}</span><a rel="noreferrer" target={'_blank'} style={{color:'#000000CC',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} href={item.url}><span>{item.text}</span></a></Typography.Text>
              <div>{item.other}</div>
            </List.Item>
          )}
        />
  </>
  )

    
}

export default function News(){  

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { TabPane } = Tabs;
     
    let resList = localStorage.getItem('resList')? JSON.parse(localStorage.getItem('resList')):initialData 

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <>
        <div className='news' onClick={showModal}>       {/*新闻面版*/}
        <NewsBrief></NewsBrief>
        </div>
        {/*新闻详情弹窗*/}
        <Modal title={<div style={{fontSize:'30px',letterSpacing:'10px',marginLeft:'54px'}}>热搜榜</div>} visible={isModalVisible}  width={'900px'}  footer={null}  onCancel={handleCancel}>
        <>
            <Tabs type='card' style={{height:'500px',}} tabPosition='left'>   {/*二级页面左边的标签页*/}
             {
               resList.map((item,index)=>{
                 return(
                  <TabPane tab={<><img alt='' style={{width:'35px',height:'35px',padding:'0',borderRadius:'50%',marginRight:'40px',marginTop:'0',border:'0'}} src={item.icon}/><span>{item.web_title}</span></>} key={index}>
                  <NewsDetail dataSource={item}></NewsDetail>
                 </TabPane>
                 )
               })
             }
            </Tabs>
        </>
        </Modal>   
        </>
    )
}