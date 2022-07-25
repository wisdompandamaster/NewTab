import { Button, message } from 'antd';
import { useState } from 'react';
import defaultSetting from '../../config/index';
import './Account.css';
import cookie from "react-cookies";

export default function Account(){
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

    const handleSubmit = (e)=>{
      e.preventDefault();
      let url = defaultSetting.site + '/account/signin/'
      let data = new FormData()
      data.append('username', username)  
      data.append('password', password)
       console.log(username, password);
      fetch(url,{
        method: 'post',
        body: data,
        credentials: "include"
     }).then(function (res) {
        return res.json();
     }).then(function (data) {
        if (data.code === "200") {
          //message.success(data.msg)
          window.location.reload()
        }else if (data.code === '201') {
          message.error(data.msg)
        }
     })
    }

    const onSignOut = (e)=>{
       e.preventDefault()
       let url = defaultSetting.site + '/account/signout/'
       fetch(url,{
         method:'get',
         credentials: "include"
       }).then(function (res) {
        return res.json();
     }).then(function (data) {
          // message.success(data.msg)
          localStorage.clear()
          // cookie.remove('status')
          // console.log('remove cookie')
          // cookie.remove('username')
          window.location.reload()
     })
    }

    if(cookie.load('status')==='200')    //如果已经登录
    {
      return(
        <div className='onsignin'>{cookie.load('username')}
          <Button danger onClick={onSignOut}>退出登录</Button>
        </div>
      )
    }
    else
    return (
    <>
    <form onSubmit={handleSubmit} className='login_form'>
        <label>
          用户名:
          <input type="text" value={username} placeholder='' onChange={event => setUsername(event.target.value)}
          name="username"/>
        </label>
        <label>
          密  码:
          <input type="password" value={password} placeholder='' onChange={event => setPassword(event.target.value)}
          name="password"/>
        </label>
        <input type="submit" value="登 录"/>
    </form>
    <div></div>
    <div className='noaccount'><div>没有账户？ 注册</div></div>
    </>
    )
}