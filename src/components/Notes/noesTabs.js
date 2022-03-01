import React, {useState} from "react";
import {Button, Card, Modal} from "antd";
import {DeleteOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const NoesTabs =(data) =>{
    const [isCardDelete, setIsCardDelete] = useState(false); // 删除按钮

    // 是否显示删除按钮
    const handleMouse = (flag) => {
        setIsCardDelete(flag)
    };
    // 选中当前笔记
    const isShowNotes = (item, index) =>{
        data.setNoteIndex(index)
    };
    // 删除笔记
    const isDelete = (item,index) => {
        Modal.confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined/>,
            content: '删除这条笔记?',
            okText: '确认',
            cancelText: '取消',
            onOk: function () {
                const newNotesData = data.notesData.filter(i  => i.id !== item.id)
                data.setNotesData(newNotesData)
                data.setNotesList(newNotesData)
                data.setNoteIndex(index-1)
            },
            onCancel: function () {
                console.log("取消")
            }
        });
    };
    return (
        <>
            <Card
                className={ data?.index === data.noteIndex ? 'notes-tabs-item notes-tabs-checked' : 'notes-tabs-item'}
                onMouseEnter={() => handleMouse(true)}
                onMouseLeave={() => handleMouse(false)}
                onClick={() => isShowNotes(data.item,data.index)}
                hoverable={true}>
                <Meta title={data.item.value}/>
                <Button
                    className='notes-del'
                    onClick={() => isDelete(data.item,data.index)}
                    type="text"
                    style={{display: isCardDelete ? 'block' : 'none'}}
                    shape="circle"
                    icon={<DeleteOutlined/>}/>
            </Card>
        </>

    )

};

export default NoesTabs