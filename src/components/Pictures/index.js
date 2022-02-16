import React, {
    useState,
    useEffect
} from 'react';
import { Carousel, Modal, Table, Upload, Button, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import data from './data';
import './style.css';

const Pictures = () => {
    let initialList = localStorage.getItem('myimglist')? JSON.parse(localStorage.getItem('myimglist')):['']
    // 图片列表的弹窗
    const [modalVisible, setModalVisible] = useState(false);
    // 当前用户的id
    // const [userId, setUserId] = useState('');
    // 当前图片数量
    // const [picNumber, setPicNumber] = useState(0);
    const [myimglist, setMyImgList] = useState(initialList);

    // 图片的数据
    // const [picData, setPicData] = useState([]);

    
    useEffect(() => {
           
        let url = 'http://121.196.148.27:8000/img/getmyimglist/' 
        async function getList(){   
            fetch(url).then((response)=>response.json())
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
    }

    const deletePic = (pic) => {
        let url = 'http://121.196.148.27:8000/img/deletemyimg/?file_name='+ pic.split('/')[1]
        fetch(url).then((response)=>response.json())
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
                
                let url = 'http://121.196.148.27:9000/'+text
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
                console.log(text)
                return (
                    <>
                        <Button danger onClick={() => { deletePic(text) }}>删除</Button>
                    </>
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
        action: 'http://121.196.148.27:8000/img/uploadmyimg/',
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
            <Carousel {...settings} className='carousel'>
                {
                    // picData.map(() => { })
                    myimglist.map((item, index) => {
                        let url = 'http://121.196.148.27:9000/'+item
                        return (
                            <div className='panel' key={index} onClick={showModal}>
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
            <Modal
                title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>图片墙</div>}
                visible={modalVisible}
                onCancel={() => { setModalVisible(false) }}
                footer={null}
            >
                <Table showHeader={false} dataSource={myimglist} columns={columns} pagination={false} scroll={{ y: 300 }} />
                <Upload {...props}
                     
                >
                    <Button
                        icon={<UploadOutlined />}
                        type='primary'
                        style={{ marginTop: '10px' }}
                    >添加图片</Button>
                </Upload>
            </Modal>
        </>
    )
}


export default Pictures;