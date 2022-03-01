const defalutState = {
     cover:localStorage.getItem('currentbg')? localStorage.getItem('cover'):20,
     blur:localStorage.getItem('currentbg')? localStorage.getItem('blur'):0,
     currentbg:localStorage.getItem('currentbg')? localStorage.getItem('currentbg'):'background/bg9.png',
     mybackgroundimglist:localStorage.getItem('mybackgroundimglist')? JSON.parse(localStorage.getItem('mybackgroundimglist')):["mybackgroundimg/wallpaper-415671.jpg"],
     onlineimglist:['background/bg1.jpg','background/bg2.jpg','background/bg3.jpg','background/bg4.jpg','background/bg5.jpg','background/bg6.jpg','background/bg7.jpg','background/bg8.jpg','background/bg9.png','background/bg10.jpg','background/bg11.jpg','background/bg12.jpg','background/bg13.jpg','background/bg14.jpg','background/bg15.jpg','background/bg16.jpg','background/bg17.jpg','background/bg18.jpg'],
     clear:0
}

//eslint-disable-next-line
export default (state = defalutState,action) =>{
      console.log('action', action)
      switch(action.type)
      {
        case 'CHANGE_COVER':
            return {
                ...state,
                cover:action.cover
            }
        case 'CHANGE_BLUR':
            return {
                ...state,
                blur:action.blur
            }
        case 'CHANGE_BG':
            return {
                ...state,
                currentbg:action.currentbg
            }
        case 'CHANGE_MYBG':
            return {
                ...state,
                mybackgroundimglist:action.mybackgroundimglist
            }
        case 'CHANGE_CLEAR':
            return {
                ...state,
                clear:action.clear
            }
        default:
            return { ...state }
      }
}