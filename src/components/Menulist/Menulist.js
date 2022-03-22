import React from 'react';
import './style.css'
import {Modal, Button} from 'antd'

class Menulist extends React.Component {

    state = {
        modalVisible: false,
        visible: false,
    };
    componentDidMount() {
        document.addEventListener('contextmenu',this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount(){
        document.removeEventListener('contextmenu',this._handleContextMenu);
        document.removeEventListener('click',this._handleClick);
        document.removeEventListener('scroll',this._handleScroll);
    }

    _handleContextMenu = (event) => {
        event.preventDefault();

        this.setState({visible: true});
        //定位
        const clickX = event.clientX;
        const clickY = event.clientY;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;
        //确定菜单显示位置，默认右下角，放不下就换地方
        const right = (screenW -clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if(right){
            this.root.style.left = `${clickX+5}px`;
        }

        if(left){
            this.root.style.left = `${clickX - rootW - 5}px`;
        }

        if(top){
            this.root.style.top = `${clickY+5}px`;
        }

        if(bottom){
            this.root.style.bottom = `${clickY - rootH - 5}px`;
        }
    };
    //滚动和点击事件，右键菜单消失
    _handleClick = (event) =>{
        const {modalVisible, visible} = this.state;
        const wasOutside = !(event.target.contains === this.root);
        if(wasOutside&&visible&&!modalVisible){
            this.setState({visible: false,});
        }
    };

    _handleScroll = () =>{
        const {visible} = this.state;
        if(visible){
            this.setState({visible: false,});
        }
    }
    
    showModal = () =>{
        this.setState({modalVisible: true, visible: true});
    }

    handleCancel = () =>{
        this.setState({modalVisible: false});
    }
    render() {
        const currentbg = localStorage.getItem('currentbg')
        const background ='http://121.196.148.27:9000/'+currentbg
        function DownloadBackground(){
            // window.open(background);
          const a = document.createElement('a');
          a.style.display = 'none';
          //a.download = text;
          a.href = background;
          document.body.appendChild(a);
          a.click();  // 自动触发点击a标签的click事件
          document.body.removeChild(a);
 
          console.log('download: '+background);
        }
        const {modalVisible, visible} = this.state;
        return ((visible)&&
        <div className='leftMouse'>
        <div ref={ref => {this.root = ref}} className="contextMenu" >
            <div className="contextMenu-list">
            {/* <div className="contextMenu-item" ><Button type="text" width={150} onClick={this.showModal}>查看壁纸</Button></div> */}
            <div className="contextMenu-item-divider" />
            <div className="contextMenu-item"><Button type="text" width={150} onClick={DownloadBackground}>下载壁纸</Button></div>
            </div>
        </div>

        <Modal
            // bodyStyle={{background:'#00000000'}}
            closable={false}            
            width = {1100}
            height={600}
            visible = {modalVisible}
            onCancel={this.handleCancel}
            footer={null}
            Title="查看壁纸"
        >
            <img className="viewBackground" src={background} alt="" height="600px"></img>
        </Modal>
        </div>
        )
    }
}


export default Menulist;