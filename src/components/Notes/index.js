import React, { useState, useEffect, memo } from "react";
import { Button, message} from 'antd';
import MarkdownNotes from "./markdown-notes/index";
import './index.css';
import {PlusOutlined} from '@ant-design/icons';
import useLocalStorage from "../../hooks/useLocalStorage";
import NoesTabs from "./noesTabs";
import {nanoid} from "nanoid";
import cookie from 'react-cookies';
import defaultSetting from "../../config";
import FuncCard from '../FuncCard/FuncCard';
import FuncModal from '../FuncModal/FuncModal';

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
      
    // useEffect(()=>{
    //     console.log('notes改变')
    //     let url = defaultSetting.site + '/functions/savemynotes/' 
    //       async function saveNotes(){   
    //         fetch(url,{
    //             method:'post',
    //             body:JSON.stringify(notesData),
    //             headers: {
    //               'Content-Type': 'application/json'
    //             },
    //             credentials:'include'
    //         }).then((response)=>response.json())
    //         .then((data)=>{ })
    //     .catch((e)=>console.log("error"));
    //     }
    //     if(cookie.load('status')==='200'){          //保存到数据库
    //         saveNotes() 
    //     }
    //   },[notesData])



    // 是否显示弹框
    const isShowModal = () => {
        setNotesVisible(!isNotesVisible);
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
        if(cookie.load('status')==='200' && isNotesVisible){          //保存到数据库
            saveNotes() 
            message.success('笔记保存成功')
        }
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
            <FuncCard 
            // className='note-card' 
            title='笔记'
            iconStyle={{
                background: 'linear-gradient(180deg, #6CB9FF 0%, #3355FF 100%)',
                boxShadow: '0px 3px 6px rgba(55, 135, 255, 0.8)'
            }}
            >
                {/* <header className="note-header">
                    <div className="note-icon"/>
                    <h1 className="note-title">笔记</h1>
                </header> */}
                <div className='note-body' onClick={isShowModal}>
                    <div  className='note-content'>{ notesData[0]?.value }</div>
                    <div  className='note-content'>{notesData[1]?.value}</div>
                    <div  className='note-content'>{notesData[2]?.value}</div>
                    <div  className='note-content'>{notesData[3]?.value}</div>
                </div>
            </FuncCard>
            <FuncModal title={<div style={{fontSize:'25px',fontWeight:'500',letterSpacing:'8px',marginLeft:'24px'}}>笔记</div>}
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
            </FuncModal>
        </>
    );
};


export default memo(Notes);