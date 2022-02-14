import {useState} from "react";
import {Modal, Button, Card} from 'antd';
import MarkdownNotes from "../components/markdown-notes/index";
import './index.css';
import Meta from "antd/es/card/Meta";
import {DeleteOutlined, PlusOutlined, ExclamationCircleOutlined} from '@ant-design/icons';

const Notes = (modalData) => {
    const [notesData, setNotesData] = useState(['11111', '22222', '333']);
    const [noteIndex, setNoteIndex] = useState(0);

    // 添加备忘录
    const isCardAdd = () => {
        const data = notesData.concat(['无标题']);
        setNotesData(data)
    };

    return (
        <>
            <Modal title="备忘录"
                   width={1000}
                   footer={null}
                   visible={modalData?.isModalVisible}
                   onCancel={modalData?.isShowModal}>
                <div className='memorandum'>
                    <div className='notes-tabs'>
                        <div className='notes-tabs-body'>
                            {
                                notesData.map((item, index) => {
                                    return (
                                        <NoesTabs key={index} setNoteIndex={setNoteIndex} item={item} index={index} />
                                    )
                                })
                            }
                        </div>
                        <Button className='notes-add'
                                onClick={isCardAdd}
                                shape="circle"
                                size='large'
                                icon={<PlusOutlined/>}/>
                    </div>
                    <MarkdownNotes  notesData={notesData} setNotesData={setNotesData} noteIndex={noteIndex}/>
                </div>
            </Modal>

        </>
    );
};

const NoesTabs =(data) =>{
    const [isCardDelete, setIsCardDelete] = useState(false);
    // 是否显示删除按钮
    const handleMouse = (flag) => {
        setIsCardDelete(flag)
    };
    // 选中当前笔记
    const isShowNotes = (item, index) =>{
        data.setNoteIndex(index)
    };
    // 删除备忘录
    const isDelete = (index) => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined/>,
            content: '删除这条备忘录?',
            okText: '确认',
            cancelText: '取消',
            onOk: function () {
                console.log("确认",index)
            },
            onCancel: function () {
                console.log("取消",index)
            }
        });
    };
    return (
        <Card
            onMouseEnter={() => handleMouse(true)}
            onMouseLeave={() => handleMouse(false)}
            onClick={e => isShowNotes(data.item,data.index)}
            className='notes-tabs-item'
            hoverable={true}>
            <Meta title={data.item}/>
            <Button
                className='notes-del'
                onClick={() => isDelete(data.index)}
                type="text"
                style={{display: isCardDelete ? 'block' : 'none'}}
                shape="circle"
                icon={<DeleteOutlined/>}/>
        </Card>
        )

};
export default Notes;