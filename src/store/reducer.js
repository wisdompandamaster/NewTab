const defalutState = {
     cover:localStorage.getItem('currentbg')? localStorage.getItem('cover'):0,
     blur:localStorage.getItem('currentbg')? localStorage.getItem('blur'):0,
     currentbg:localStorage.getItem('currentbg')? localStorage.getItem('currentbg'):'bg9.png',
     myimglist:localStorage.getItem('myimglist')? JSON.parse(localStorage.getItem('myimglist')):[],
     onlineimglist:['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','bg6.jpg','bg7.jpg','bg8.jpg','bg9.png','bg10.jpg','bg11.jpg','bg12.jpg','bg13.jpg','bg14.jpg','bg15.jpg','bg16.jpg','bg17.jpg','bg18.jpg'],
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
                myimglist:action.myimglist
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