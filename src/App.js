//import logo from './logo.svg';
import './App.css';
import ClockSearch from './components/ClockSearch/ClockSearch';
import TopNav from './components/TopNav/TopNav';
import FunctionAera from './components/FunctionAera/FunctionAera';
import MottoFooter from './components/MottoFooter/MottoFooter';
import {useSelector} from 'react-redux'


//配置minio 永久访问



function App() {

  const blur = useSelector(state=>state.blur)
  const cover = useSelector(state=>state.cover)
  const currentbg = useSelector(state=>state.currentbg)
   
  let blurNum = 'blur(' + blur + 'px)'
  let scale ='scale(' + (1 + blur * 0.003) + ')'
  let coverNum = cover * 0.01
  let background = 'url(http://121.196.148.27:9000/'+currentbg+')'
  return (
    <div className="App">
      <div className='background' style={{filter:blurNum,transform:scale,backgroundImage:background,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}></div>
      <div className='mask' style={{opacity:coverNum}}></div>
       <TopNav></TopNav>
       <ClockSearch></ClockSearch>
       <FunctionAera></FunctionAera>
       <MottoFooter></MottoFooter>
    </div>
    
     
  );
}

export default App;
