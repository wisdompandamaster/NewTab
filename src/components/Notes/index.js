import React, { useState, useEffect } from "react";
import {Modal, Button} from 'antd';
import MarkdownNotes from "./markdown-notes/index";
import './index.css';
import {PlusOutlined} from '@ant-design/icons';
import useLocalStorage from "../../hooks/useLocalStorage";
import NoesTabs from "./noesTabs";
import {nanoid} from "nanoid";
import cookie from 'react-cookies';
import defaultSetting from "../../config";

const Notes = () => {
    const [notesList, setNotesList] = useLocalStorage("notesList", []);
    const [notesData, setNotesData] = useState(notesList); //笔记数据
    const [noteIndex, setNoteIndex] = useState(0); // 选中第几个
    const [isNotesVisible, setNotesVisible] = useState(false); // 弹框

    useEffect(()=>{
        let url = defaultSetting.site + '/functions/getmynotes/' 
        async  function getNotes(){   
        fetch(url,{
            credentials:'include'
        }).then((response)=>response.json())
        .then((data)=>{ 
            setNotesData(JSON.parse(data.res));
            setNotesList(JSON.parse(data.res));
        })
       .catch((e)=>console.log(e.message));
      }
       if(cookie.load('status')==='200'){          //获取数据
          getNotes()
    }},[])
      
    useEffect(()=>{
        let url = defaultSetting.site + '/functions/savemynotes/' 
          async function saveNotes(){   
            fetch(url,{
                method:'post',
                body:JSON.stringify(notesData),
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials:'include'
            }).then((response)=>response.json())
            .then((data)=>{ })
        .catch((e)=>console.log("error"));
        }
        if(cookie.load('status')==='200'){          //保存到数据库
            saveNotes() 
        }
      },[notesData])



    // 是否显示弹框
    const isShowModal = () => {
        setNotesVisible(!isNotesVisible);
    };
    // 添加笔记
    const isNoteAdd = () => {
        if (notesData.length === 0) setNoteIndex(0)
        const data = notesData.concat([{id:nanoid(), value: '无内容', text:""}]);
        setNotesData(data);
        setNotesList(data);
    };

    return (
        <>
            <div className='note-card' onClick={isShowModal}>
                <header className="note-header">
                    <div className="note-icon"/>
                    <h1 className="note-title">笔记</h1>
                </header>
                <div className='note-body'>
                    <div  className='note-content'>{ notesData[0]?.value }</div>
                    <div  className='note-content'>{notesData[1]?.value}</div>
                    <div  className='note-content'>{notesData[2]?.value}</div>
                    <div  className='note-content'>{notesData[3]?.value}</div>
                </div>
            </div>
            <Modal title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>笔记</div>}
                   width={1000}
                   footer={null}
                   visible={isNotesVisible}
                   onCancel={isShowModal}>
                <div className='memorandum'>
                    <div className='notes-tabs'>
                        <div className='notes-tabs-body'>
                            {
                                notesData.length !== 0
                                    ? notesData.map((item, index) => {
                                        return (
                                            <NoesTabs key={index} noteIndex={noteIndex} notesData={notesData} setNotesList={setNotesList} setNotesData={setNotesData} setNoteIndex={setNoteIndex} item={item} index={index}/>
                                        )
                                    })
                                    : <p  className='wrapper'>快来添加第一条笔记吧</p>
                            }
                        </div>
                        <Button className='notes-add'
                                onClick={isNoteAdd}
                                shape="circle"
                                size='large'
                                icon={<PlusOutlined/>}/>
                    </div>
                    <MarkdownNotes  setNotesList={setNotesList} notesData={notesData} setNotesData={setNotesData} noteIndex={noteIndex}/>
                </div>
            </Modal>
        </>
    );
};


export default Notes;