const defalutState = {
     cover:localStorage.getItem('cover')? localStorage.getItem('cover'):20,
     blur:localStorage.getItem('blur')? localStorage.getItem('blur'):0,
     currentbg:localStorage.getItem('currentbg')? localStorage.getItem('currentbg'):'background/bg9.png',
     mybglist:localStorage.getItem('mybglist')? JSON.parse(localStorage.getItem('mybglist')):[],
     onlineimglist:['background/bg1.jpg','background/bg2.jpg','background/bg3.jpg','background/bg4.jpg','background/bg5.jpg','background/bg6.jpg','background/bg7.jpg','background/bg8.jpg','background/bg9.png','background/bg10.jpg','background/bg11.jpg','background/bg12.jpg','background/bg13.jpg','background/bg14.jpg','background/bg15.jpg','background/bg16.jpg','background/bg17.jpg','background/bg18.jpg'],
     clear:0,
     TodoDatePos:new Date().toLocaleDateString(),
     TodoDates:[],
     // apps
    myApps: localStorage.getItem("apps")
    ? JSON.parse(localStorage.getItem("apps"))
    : [],
    deleteApp: false,
    functionList: '[<News/>,<Todo/>,<Notes/>,<Weather/>,<CalComponent/>,<Pictures/>,<Apps/>]'
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
                mybglist:action.mybglist
            }
        case 'CHANGE_CLEAR':
            return {
                ...state,
                clear:action.clear
            }
        case 'CHANGE_TODODATES':
            return {
                ...state,
                TodoDates:action.TodoDates
            }
        case 'CHANGE_TODODATEPOS':
            return {
                ...state,
                TodoDatePos:action.TodoDatePos
            }
        case "CHANGE_APPS":
            return {
                ...state,
                myApps: action.myApps,
            }
        case "CHANGE_DELETEAPP":
            return {
                ...state,
                deleteApp: action.deleteApp,
            }
        default:
            return { ...state }
      }
}
