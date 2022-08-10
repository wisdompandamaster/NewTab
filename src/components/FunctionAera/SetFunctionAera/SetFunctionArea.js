import './SetFunctionArea.css'
import { memo, useState } from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import FuncModal from "../../FuncModal/FuncModal";
import News from '../../News/News'
import Todo from '../../Todo/Todo'
import Pictures from '../../Pictures'
import Notes from "../../Notes";
import Weather from '../../Weather/Weather'
import CalComponent from '../../Calendar/CalComponent'
import Competition from '../../Competition/Competition'
import CountDown from '../../CountDown/CountDown'
import ServerMonitor from '../../ServerMonitor/ServerMonitor'
import ToolKit from '../../ToolKit/ToolKit'
import Demos from '../../Demos/Demos'
import Memo from '../../Memo/Memo'


const SetFunctionArea = ()=>{

    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useDispatch()
    
    const funcs = [{id:0, node:<News/>},
               {id:1, node:<Todo/>},
               {id:2, node:<Pictures/>},
               {id:3, node:<Notes/>},
               {id:4, node:<Weather/>},
               {id:5, node:<CalComponent/>},
               {id:6,node:<CountDown/>},
               {id:7, node:<Competition/>},
               {id:8, node:<ServerMonitor/>},
               {id:9, node:<ToolKit/>},
               {id:10, node:<Demos/>},
               {id:11, node:<Memo/>}
              ]
    
      const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

      const addFunc = (id) => {

        let newList = JSON.parse(localStorage.getItem('functionList'));
        if(newList.indexOf(id) === -1 && newList.length < 8){
          newList.push(id);
          localStorage.setItem('functionList',JSON.stringify(newList));
          dispatch({
           type: "CHANGE_FUNCS",
           functionList: newList,
          }); 
        }
        else{
          message.info("功能组件已存在 或 已超过最大放置组件数")
        }
      };
     

    return (
        <div>
        <span style={{marginRight:'60px'}}>添加 Cards</span>
        <Button
        type="dash"
        onClick={showModal}
        >
         添加
        </Button>
        <FuncModal width="42vw"
         title={<div style={{display:'inline-flex',alignItems:'center',color:'white'}}>
             <span style={{fontSize:'25px'}}>添加 Card</span> 
             </div>}
        closable={false}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}>
           <div style={{display:'grid',gridTemplateColumns:'repeat(2, 50%)',height:'50vh', rowGap:'3%',margin:'1% 0 1% 0', overflowY:'scroll'}}>
            {
                funcs.map((item,index)=>{
                    return (
                      //FIXME:天气应用无法显示
                      <div key={index} style={{justifySelf:'center',position:'relative'}}>
                        <div className='addfunc'>
                        <Button
                          shape="circle"
                          icon={ <PlusOutlined /> }
                          size="large"
                          onMouseDown={(e) => addFunc(item.id)}
                        />
                        </div>
                         {item.node}
                      </div>
                    )
                })
            }
          </div>
        </FuncModal>
        </div>
    )
}


export default memo(SetFunctionArea);