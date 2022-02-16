import React, {
    useEffect,
    useState,
} from 'react';
import { Carousel, Modal, Table, Upload, Button, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import data from './data';
import './style.css';
import { GET_PICS, ADD_PIC, DEL_PIC } from '../service';
import getCookie from '../service/getCookie';

const Pictures = () => {
    // 图片列表的弹窗
    const [modalVisible, setModalVisible] = useState(false);
    // 当前用户的id
    const [userId, setUserId] = useState('');
    // 当前图片数量
    const [picNumber, setPicNumber] = useState(0);

    // 图片的数据
    // const [picData, setPicData] = useState([]);

    // 拿到当前用户id并获取对应的图片信息
    useEffect(() => {
        let cookieStr = getCookie('userId');
        setUserId(cookieStr);
    }, []);

    // 每当弹窗状态变化或图片数量变化时触发重新获取图片列表
    useEffect(() => {
        GET_PICS(userId).then((res) => {
            // setPicData(res.data);
            setPicNumber(res.data.length);
        })
    }, [modalVisible, picNumber, userId]);

    const showModal = () => {
        setModalVisible(true);
    }

    const deletePic = (pic) => {
        // console.log(pic);
        DEL_PIC(userId, pic.id).then(res => {
            if (res.status === 200) {
                message.success('删除成功');
                setPicNumber(picNumber - 1);
            }
        }).catch(() => message.error('删除失败'));
    }

    const columns = [
        {
            title: '图片',
            dataIndex: 'src',
            key: 'src',
            render: (text) => {
                return (
                    <>
                        <Image width={50} height={50} alt={text} src={require(`../asset/${text}.jpg`)} />
                    </>
                );
            }
        },
        {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <>
                        <Button danger onClick={() => { deletePic(record) }}>删除</Button>
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
        autoplaySpeed: 4000,
    };

    return (
        <>
            <Carousel {...settings} className='carousel'>
                {
                    // picData.map(() => { })
                    data.map((item, index) => {
                        return (
                            <div className='panel' key={index} onClick={showModal}>
                                <img
                                    width='100%'
                                    alt={item.src}
                                    // src={item.src} 
                                    src={require(`../asset/${item.src}.jpg`)}
                                />
                            </div>
                        )
                    })
                }
            </Carousel>
            <Modal
                title='图片墙'
                visible={modalVisible}
                onCancel={() => { setModalVisible(false) }}
                footer={null}
            >
                <Table dataSource={data} columns={columns} pagination={false} scroll={{ y: 300 }} />
                <Upload
                    accept="image/*"
                    customRequest={(option) => {
                        console.log(option);
                        let imgProps = new FormData();
                        imgProps.append('file', option.file);
                        imgProps.append('userId', userId);
                        ADD_PIC(imgProps).then(res => {
                            if (res.status === 200) {
                                message.success('添加成功');
                                option.onSuccess(res, option.file);
                                setPicNumber(picNumber + 1);
                            }
                        }).catch(() => message.error('添加失败'));
                    }}
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