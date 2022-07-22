import './CountDown.css';
import { Modal } from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import useLocalStorage from "../../hooks/useLocalStorage";
import FuncCard from '../FuncCard/FuncCard';
import FuncModal from '../FuncModal/FuncModal';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import "swiper/css/navigation";
// import { Pagination,Navigation} from "swiper";


// const waitTime = (time = 100) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve(true);
//         }, time);
//     });
// };
 


//一个想法，把顶部的时间变成倒计时，可选
export default function CountDown(){

    const temp = []
    
    //添加localstorage支持
    const [countdownList, setcountdownList] = useLocalStorage('countdownList',temp)
    // const [countdown, setcountdown] = useState(countdownList)
     //pro component 表格组件
     const [editableKeys, setEditableRowKeys] = useState([]);
     const [dataSource, setDataSource] = useState(countdownList);

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
   useEffect(()=>{
      setcountdownList(dataSource)
    //   setcountdown(dataSource)
   },[dataSource])
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
            width:100,
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
            width: 100,//
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                        var _a;
                        (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
                    }}>
          编辑
        </a>,
                <a key="delete" onClick={() => {
                        setDataSource(dataSource.filter((item) => item.id != record.id));
                        //setcountdown(dataSource.filter((item) => item.id !== record.id))
                        //setcountdownList(dataSource.filter((item) => item.id !== record.id))
                    }}>
          删除
        </a>,
            ],
        },
    ];

    const handleWheelCapture = (e) => {
        // e.preventDefault();
        if(dataSource.length >= 2)
        {
          e.stopPropagation();
        }
        
    } 

    const no_countdown = <div style={{fontSize:"30px", height:"120px",width:"100%",textAlign:"center",lineHeight:"110px",fontWeight:"700",color:"#00000033",letterSpacing:"8px"}}>添加倒计时</div>

    const have_countdown = dataSource.map((item)=>{
        const timeRemainning = new Date(item.ddl) - now;
        const day = Math.floor(timeRemainning / 1000 / 60 / 60 / 24) + 1
        return (
                    <div key={item.id}>
                    <div>距离{item.name}还剩</div>
                    <div>{day}<span>days</span></div>
                    </div>
            //继续写countdown 变换的代码
        )
       
    })

    return (
        <>
        <FuncCard 
        // className='CountDown' 
          title='倒计时'
          iconStyle={{
            background:'linear-gradient(180deg, #31c5ff 14.58%, #26f5f5 100%)',
            boxShadow:'0px 3px 6px rgba(109, 214, 233, 0.8)'
         }}
        >
            {/* <div className='left'><div></div><p>倒计时</p></div> */}
            <div className='countdown_content' onClick={showModal} onWheelCapture={handleWheelCapture}>
            { 
                dataSource.length > 0 ? have_countdown:no_countdown
            }
           </div>
           </FuncCard>
        <FuncModal title={<div style={{fontSize:'30px',letterSpacing:'10px',marginLeft:'54px'}}>倒计时设置</div>} visible={isModalVisible}  width={'600px'} onCancel={handleCancel}>
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
                data: countdownList,
                total: 3,
                success: true,
            })} 
            value={dataSource} onChange={setDataSource} editable={{
            type: 'multiple',
            editableKeys,
            onSave:async (rowKey, data, row) => {        //有bug，已有项目更改后会产生新的相同ID的项目 
                // console.log('onSave')
                // let datasource = dataSource.concat(data)
                // let map = new Map();
                // for (let item of datasource) {
                //     map.set(item.id, item);
                // }
                // dataSource = [...map.values()];
                console.log(data)
                // await waitTime(500);
                // setDataSource(dataSource)
                // setcountdown(dataSource)
                //console.log(dataSource)
            },
            onChange: setEditableRowKeys,
        }}/>
      </>
      {/* <ProCard title="表格数据" headerBordered collapsible defaultCollapsed>
        <ProFormField ignoreFormItem fieldProps={{
            style: {
                width: '100%',
            },
        }} mode="read" valueType="jsonCode" text={JSON.stringify(dataSource)}/>
      </ProCard> */}
        {/* <div>hello</div> */}
        </FuncModal>   
        </>
    )

}