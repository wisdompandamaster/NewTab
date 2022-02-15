import {useState} from "react";
import {Button} from 'antd';
import Notes from "./notes";

const App = () => {
    const [isNotesVisible, setNotesVisible] = useState(false);

    // 是否显示弹框
    const isShowModal = () => {
        setNotesVisible(!isNotesVisible);
    };

    return (
        <>
            <div className='note-card' onClick={isShowModal}>
                <header className="note-header">
                    <div className="note-icon"></div>
                    <h1 className="note-title">笔记</h1>
                </header>

                <div className='note-body'>
                    {/*只能有四条*/}
                    <span className='note-content'>123</span>
                </div>
            </div>
            <Notes isModalVisible={isNotesVisible} isShowModal={isShowModal}/>
        </>
    );
};

export default App
