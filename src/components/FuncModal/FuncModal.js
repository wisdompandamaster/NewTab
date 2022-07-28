import { Modal } from 'antd'
import './FuncModal.css'
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';

export default function FuncModal(props){

    const [disabled, setDisabled] = useState(false);
    const [bounds, setBounds] = useState({
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      });
    const draggleRef = useRef(null);

    // 拖拽组件
    const onStart = (_event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggleRef.current?.getBoundingClientRect();
    
        if (!targetRect) {
          return;
        }
    
        setBounds({
          left: -targetRect.left + uiData.x,
          right: clientWidth - (targetRect.right - uiData.x),
          top: -targetRect.top + uiData.y,
          bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
      };
    

    return (
        <Modal 
        title={props.title}
        width={props.width}
        height={props.height}
        closable={false}
        visible={props.visible}
        mask={false}
        bodyStyle={{background:"#00000000"}}
        onOk={props.onOk}
        footer={null}
        onCancel={props.onCancel}
        modalRender={(modal)=>(
            <Draggable
              disabled={disabled}
              bounds={bounds}
              onStart={(event, uiData) => onStart(event, uiData)}
            >
              <div ref={draggleRef}>{modal}</div>
            </Draggable>
          )}
        >
            {props.children}
        </Modal>
    )
}