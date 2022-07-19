import { Modal } from 'antd'
import './FuncModal.css'

export default function FuncModal(props){
    return (
        <Modal>
            props.children
        </Modal>
    )
}