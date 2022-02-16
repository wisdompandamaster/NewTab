import React, {useState} from "react";
import {Modal, Button} from 'antd';
import MarkdownNotes from "../components/markdown-notes/index";
import './index.css';
import {PlusOutlined} from '@ant-design/icons';
import useLocalStorage from "../hooks/useLocalStorage";
import NoesTabs from "./noesTabs";
import {nanoid} from "nanoid";

const Notes = () => {
    const [notesList, setNotesList] = useLocalStorage("notesList", []);
    const [notesData, setNotesData] = useState(notesList); //笔记数据
    const [noteIndex, setNoteIndex] = useState(0); // 选中第几个
    const [isNotesVisible, setNotesVisible] = useState(false); // 弹框
    const [showNote, setShowNote] = useState([]); // 弹框

    React.useEffect(() => {
        setShowNote(notesData.slice(0,4))
        return () => {}
    },[]);
    // 是否显示弹框
    const isShowModal = () => {
        setNotesVisible(!isNotesVisible);
    };
    // 添加笔记
    const isNoteAdd = () => {
        const data = notesData.concat([{id:nanoid(), value: '无内容'}]);
        setNotesData(data);
        setNotesList(data);
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
                    {
                        showNote.map(item => {
                            return (
                                <span key={item.id} className='note-content'>{item.value}</span>
                            )
                        })

                    }

                </div>
            </div>
            <Modal title="备忘录"
                   width={1000}
                   footer={null}
                   visible={isNotesVisible}
                   onCancel={isShowModal}>
                <div className='memorandum'>
                    <div className='notes-tabs'>
                        <div className='notes-tabs-body'>
                            {
                                notesData.map((item, index) => {
                                    return (
                                        <NoesTabs key={index} notesData={notesData} setNotesList={setNotesList} setNotesData={setNotesData} setNoteIndex={setNoteIndex} item={item} index={index}/>
                                    )
                                })
                            }
                        </div>
                        <Button className='notes-add'
                                onClick={isNoteAdd}
                                shape="circle"
                                size='large'
                                icon={<PlusOutlined/>}/>
                    </div>
                    <MarkdownNotes setShowNote={setShowNote} setNotesList={setNotesList} notesData={notesData} setNotesData={setNotesData} noteIndex={noteIndex}/>
                </div>
            </Modal>
        </>
    );
};


export default Notes;