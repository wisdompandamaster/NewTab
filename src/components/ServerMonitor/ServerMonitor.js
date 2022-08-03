import './ServerMonitor.css';
import FuncCard from '../FuncCard/FuncCard';
import { useEffect } from 'react';
import md5 from 'js-md5';

export default function ServerMonitor(){


    const request_time = (new Date()).getTime()
    const api_sk = '2tIiizP1DahyBmypN00hqdkdV9OaooI6'
    let request_token = md5(request_time.toString() + md5(api_sk))
    let args = {
        "request_token":request_token,
        "request_time":request_time
    }

    useEffect(()=>{
        // fetch("http://121.196.148.27:8899/system?action=GetNetWork",{
        //     method:'POST',
        //     body:args,
        //     credentials:'include'
        // }).then((res)=>{
        //     console.log(res.data)
        // })
    },[])

    return (
        <FuncCard
           title="服务器监控"
           kinds={["性能","网络","负载"]}
        >
            <div> {request_token}</div>
            <div>待调试api接口</div>
        </FuncCard>
    )

}