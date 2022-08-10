import './Memo.css'
import FuncCard from '../FuncCard/FuncCard'
import { memo } from 'react'

const Memo = ()=>{
    return (
        <FuncCard
          title="备忘录"
        >

        </FuncCard>
    )
}

export default memo(Memo);