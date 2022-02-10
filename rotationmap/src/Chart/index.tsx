import React, { useState } from 'react';
import { Carousel, Modal, Table, Upload, Button, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import data from './data';
import './style.css';

const Chart: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const showModal = () => {
        setModalVisible(true);
    }

    const columns = [
        {
            title: '图片',
            dataIndex: 'src',
            key: 'src',
            render: (text: any) => {
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
                <Upload>
                    <Button icon={<UploadOutlined />} type='primary' style={{ marginTop: '10px' }}>添加图片</Button>
                </Upload>
            </Modal>
        </>
    )
}


export default Chart;