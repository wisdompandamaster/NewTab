import React, { useState, useEffect, memo } from 'react';
import defaultSetting from '../../config';
import { Carousel, Modal, Table, Upload, Button, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import data from './data';
import './style.css';
import cookie from "react-cookies";
import FuncCard from '../FuncCard/FuncCard';
import FuncModal from '../FuncModal/FuncModal';

const Pictures = () => {

    let initialList = localStorage.getItem('myimglist')? JSON.parse(localStorage.getItem('myimglist')):['']

    const [modalVisible, setModalVisible] = useState(false);
    
    const [myimglist, setMyImgList] = useState(initialList);

    useEffect(() => {
           
        let url = defaultSetting.site + '/img/getmyimglist/' 
        async function getList(){   
            fetch(url,{
                credentials:'include'
            }).then((response)=>response.json())
            .then((data)=>{localStorage.setItem('myimglist',JSON.stringify(data.objectList));
                        setMyImgList(data.objectList)}
            ).catch((e)=>console.log("error"));
        }
        getList() 
        
    },[]);

    // 每当弹窗状态变化或图片数量变化时触发重新获取图片列表
    // useEffect(() => {
    //     GET_PICS(userId).then((res) => {
    //         // setPicData(res.data);
    //         setPicNumber(res.data.length);
    //     })
    // }, [modalVisible, picNumber, userId]);

    const showModal = () => {
        setModalVisible(true);
        // console.log("showmodel")
    }

    const deletePic = (pic) => {
        console.log('delete pic')
        let url = defaultSetting.site + '/img/deletemyimg/?file_name='+ pic.split('/')[1]
        fetch(url,{
            credentials:'include'
        }).then((response)=>response.json())
            .then((data)=>{localStorage.setItem('myimglist',JSON.stringify(data.objectList));
        setMyImgList(data.objectList)}
            ).catch((e)=>console.log("error"));
        }
    

    const columns = [
        {
            title: '图片',
            dataIndex: '',
            key: '',
            render: (text) => {
                
                let url = defaultSetting.imgSite + text
                return (
                    <>
                        <Image width={80} height={45} alt={text} src={url}/>
                    </>
                );
            }
        },
        {
            title: '操作',
            dataIndex: '',
            key: '',
            render: (text, index) => {
                 
                return (
                    myimglist.length < 2 ? 
                     <div></div>:<Button disabled={cookie.load('status')==='200'? false:true} danger onClick={() => { deletePic(text) }}>删除</Button>
                    
                );
            }
        }
    ];

    const settings = {
        dots: true,
        fade: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,   //间隔
    };

    const props = {
        name: 'file',
        withCredentials:true,
        action: defaultSetting.site + '/img/uploadmyimg/',
        onChange(info) {
        const { status, response } = info.file;
          if ( status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if ( status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            setMyImgList(response.objectList)  
            localStorage.setItem('myimglist',JSON.stringify(response.objectList))
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    return (
        <>  
            <div onClick={showModal}>
            <FuncCard className='carousel_func'>
            <Carousel {...settings} className='carousel'>
                {
                    // picData.map(() => { })
                    myimglist.map((item, index) => {
                        let url = defaultSetting.imgSite + item
                        return (
                            <div className='panel' key={index}>
                                <img alt={''} 
                                    width={'100%'}
                                    // alt={item.src}
                                    // style={{objectFit:'scale-down'}}
                                    // src={item.src} 
                                    src={url}
                                />
                            </div>
                        )
                    })
                }
            </Carousel>
            </FuncCard>
            </div>
            <FuncModal
                title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>图片墙</div>}
                visible={modalVisible}
                onCancel={() => { setModalVisible(false) }}
                footer={null}
            >
                <Table showHeader={false} dataSource={myimglist} columns={columns} pagination={false} scroll={{ y: 300 }} />
                <Upload {...props}
                     
                >
                    <Button disabled={cookie.load('status')==='200'? false:true}
                        icon={<UploadOutlined />}
                        type='primary'
                        style={{ marginTop: '10px' }}
                    >添加图片</Button>
                </Upload>
            </FuncModal>
        </>
    )
}


export default memo(Pictures);