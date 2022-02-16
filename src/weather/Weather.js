import React, {
    useState
}
    from 'react';
import useScript from "./useScript";
import { Modal, Button } from 'antd';
import { InfoOutlined } from '@ant-design/icons';
import "./plugin.js"
import "./style.css"

const url1 = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0"
const url2 = "https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=auto&key=45b6b9fb03ef47f681c8c6f4c0e8f934&v=_1644894516681"

const Weather = () =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    }
    // const handleOK = () => {
    //     setIsModalVisible(false);
    // }
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    useScript(url1);
    return (
        <div className="Weather">
            <div className="plugin">
                <div className="pluginBody">
                <div id = "he-plugin-standard"/>
                </div>
                <div className="pluginFooter">
                <Button type="ghost" onClick={showModal} ghost={true} shape='circle' icon={<InfoOutlined />} size='small'>
                </Button>
                </div>
            </div>
            <Modal title="" visible={isModalVisible} 
            // onOK={handleOK}
            onCancel={handleCancel}
            footer={null}
            getContainer={false}
            wrapClassName = {'Weather'}
            >
                <div className="content">
                    <iframe title="weather details" frameBorder="0" width='500' height='500' scrolling="" allowtransparency="true" hspace="0" vspace="0"
                    src={url2}
                    />
                </div>
            </Modal>
        </div>
    )
}
export default Weather;
