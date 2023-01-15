import "./ServerMonitor.css";
import FuncCard from "../FuncCard/FuncCard";
import { memo, useEffect, useState } from "react";
import md5 from "js-md5";

const ServerMonitor = () => {
  const [type, setType] = useState(0);

  const handleChangeType = value => {
    setType(value);
  };

  const request_time = new Date().getTime();
  const api_sk = "2tIiizP1DahyBmypN00hqdkdV9OaooI6";
  let request_token = md5(request_time.toString() + md5(api_sk));
  let args = {
    request_token: request_token,
    request_time: request_time,
  };

  useEffect(() => {
    // fetch("http://121.196.148.27:8899/system?action=GetNetWork",{
    //     method:'POST',
    //     body:args,
    //     credentials:'include'
    // }).then((res)=>{
    //     console.log(res.data)
    // })
  }, []);

  return (
    <FuncCard
      title='服务器监控'
      kinds={["性能", "网络", "负载"]}
      changeType={handleChangeType}
      iconStyle={{
        background: "linear-gradient(180deg, #00e0ff 14.58%, #00b0ff 100%)",
        boxShadow: "0px 3px 6px #00b0ff",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          height: "120px",
          width: "100%",
          textAlign: "center",
          lineHeight: "110px",
          fontWeight: "700",
          color: "#00000033",
          letterSpacing: "8px",
        }}
      >
        待完成API接口
      </div>
    </FuncCard>
  );
};

export default memo(ServerMonitor);
