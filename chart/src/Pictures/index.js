import React, {
    useState,
    // useEffect,
} from 'react';
import { Carousel, Modal, Table, Upload, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import data from './data';
import './style.css';
// import { GET_PICS, ADD_PIC, DEL_PIC } from '../service';

const Pictures = () => {
    const [modalVisible, setModalVisible] = useState(false);
    // const [picData, setPicData] = useState([]);

    const showModal = () => {
        setModalVisible(true);
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
            render: () => {
                return (
                    <>
                        <Button danger>删除</Button>
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

    // useEffect(() => {
    //     GET_PICS().then();
    // }, [modalVisible])

    return (
        <>
            <Carousel {...settings} className='carousel'>
                {
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
                        let imgProps = new Map();
                        imgProps.set('file', option.file);
                        // ADD_PIC(imgProps).then();
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