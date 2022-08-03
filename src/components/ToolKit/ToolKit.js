import './ToolKit.css'
import FuncCard from '../FuncCard/FuncCard'

export default function ToolKit(){
    return (
        <FuncCard
          title="工具箱"
          kinds={["前端","学术","其它"]}
        >
        </FuncCard>
    )
}