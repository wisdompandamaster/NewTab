import {useState} from "react";
import {Button} from 'antd';
import Notes from "./notes";

const App = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 是否显示弹框
    const isShowModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <>
            <Button type="primary" onClick={isShowModal}>Open Modal</Button>
            <Notes isModalVisible={isModalVisible} isShowModal={isShowModal}/>
        </>
    );
}

export default App
