import './CountDown.css';
import { Modal } from 'antd';
import { EditableProTable, ProCard, ProFormField, ProFormRadio } from '@ant-design/pro-components';
import React, { useState } from 'react';
import useLocalStorage from "../../hooks/useLocalStorage";

const defaultData = [
    {
        id: 624748504,
        title: '活动名称一',
        readonly: '活动名称一',
        decs: '这个活动真好玩',
        state: 'open',
        created_at: '2020-05-26T09:42:56Z',
        update_at: '2020-05-26T09:42:56Z',
    },
    {
        id: 624691229,
        title: '活动名称二',
        readonly: '活动名称二',
        decs: '这个活动真好玩',
        state: 'closed',
        created_at: '2020-05-26T08:19:22Z',
        update_at: '2020-05-26T08:19:22Z',
    },
];


//一个想法，把顶部的时间变成倒计时，可选
export default function CountDown(){

    const temp =  [{id:123,name:'考研',ddl:'2022-12-24 00:00'},{id:125,name:'答辩',ddl:'2022-5-24 00:00'}]

    //添加localstorage支持
    const [countdownList, setcountdownList] = useLocalStorage('countdownList',temp)
   
    const [countdown, setcountdown] = useState(countdownList)

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  
    
    const now = new Date()
    //const nowDate = now.getHours().toLocaleString();
    // const deadline = new Date('2022-12-24 00:00')
    // const timeRemainning = deadline - now;
    // let day, hour, minute, second;
    
    // second = Math.floor(timeRemainning / 1000 % 60)     //用余数来把毫秒转化为可表示的时间
    // minute = Math.floor(timeRemainning / 1000 / 60 % 60)
    // hour = Math.floor(timeRemainning / 1000 / 60 / 60 % 24)
    // day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1
    //pro component 表格组件
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    //表格配置
    const columns = [
        // {
        //     title: '活动名称',
        //     dataIndex: 'title',
        //     tooltip: '只读，使用form.getFieldValue获取不到值',
        //     formItemProps: (form, { rowIndex }) => {
        //         return {
        //             rules: rowIndex > 1 ? [{ required: true, message: '此项为必填项' }] : [],
        //         };
        //     },
        //     // 第一行不允许编辑
        //     editable: (text, record, index) => {
        //         return index !== 0;
        //     },
        //     width: '15%',
        // },
        // {
        //     title: '活动名称二',
        //     dataIndex: 'readonly',
        //     tooltip: '只读，使用form.getFieldValue可以获取到值',
        //     readonly: true,
        //     width: '15%',
        // },
        // {
        //     title: '状态',
        //     key: 'state',
        //     dataIndex: 'state',
        //     valueType: 'select',
        //     valueEnum: {
        //         all: { text: '全部', status: 'Default' },
        //         open: {
        //             text: '未解决',
        //             status: 'Error',
        //         },
        //         closed: {
        //             text: '已解决',
        //             status: 'Success',
        //         },
        //     },
        // },
        {
            title: '倒计时项目',
            dataIndex: 'name',
            width:'200px',
            fieldProps: (from, { rowKey, rowIndex }) => {
                if (from.getFieldValue([rowKey || '', 'title']) === '不好玩') {
                    return {
                        disabled: true,
                    };
                }
                if (rowIndex > 9) {
                    return {
                        disabled: true,
                    };
                }
                return {};
            },
        },
        {
            title: 'DDL',
            dataIndex: 'ddl',
            valueType: 'date',
            width: 100,
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,//
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                        var _a;
                        (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                    }}>
          编辑
        </a>,
                <a key="delete" onClick={() => {
                        setDataSource(dataSource.filter((item) => item.id !== record.id));
                    }}>
          删除
        </a>,
            ],
        },
    ];






    return (
        <>
        <div className='CountDown' onClick={showModal}>
            <div className='left'><div></div><p>倒计时</p></div>
            <div className='countdown_content'>
            {
                countdown.map((item)=>{
                    const timeRemainning = new Date(item.ddl) - now;
                    const day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1
                    return (
                        <div>
                        <div>距离{item.name}还剩</div>
                        <div>{day}<span>days</span></div>
                        </div>
                    )

                })
            }
           </div>
           </div>
        <Modal title={<div style={{fontSize:'30px',letterSpacing:'10px',marginLeft:'54px'}}>倒计时设置</div>} visible={isModalVisible}  width={'1000px'}  footer={null}  onCancel={handleCancel}>
        {/* {   //这里等着用列表组件来添加
            countdown.map((item)=>{
                return (
                <div>
                <span>{item.name}</span>
                <span>{item.ddl}</span>
                </div>
                )
            })
        } */}
         <>
        <EditableProTable rowKey="id" headerTitle="" maxLength={5}  
        recordCreatorProps={ {
                position:'bottom',
                record: () => ({ id: (Math.random() * 1000000).toFixed(0) }),  //新建一行时的记录标识
            }
            } loading={false}  
            columns={columns} 
            request={async () => ({
                data: temp,
                total: 3,
                success: true,
            })} 
            value={dataSource} onChange={setDataSource} editable={{
            type: 'multiple',
            editableKeys,
            onSave: async (rowKey, data, row) => {
                console.log(rowKey, data, row);
            },
            onChange: setEditableRowKeys,
        }}/>
      </>
        <div>hello</div>
        </Modal>   
        </>
    )

}