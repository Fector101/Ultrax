const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('bridge',{
    notificationApi:{
        sendNotification(message){
            ipcRenderer.send('notify',message)
        }
    },
    batteryApi:{

    },
    someOtherCoolApi:{

    },
    
    toggleWinSize:()=>ipcRenderer.invoke('toggle-window-size'),
    terminate:()=>ipcRenderer.invoke('close_window'),
    toggleDock:()=>ipcRenderer.invoke('toggle-dock'),
    checkIfMax:()=>ipcRenderer.invoke('checkIfMax'),
    show_screen:()=>ipcRenderer.invoke('show_screen'),
    refresh:()=>ipcRenderer.invoke('refresh'),


    getAll:(arg)=>ipcRenderer.invoke('Get_Audios',arg),
    isthere_saved_folders:()=>ipcRenderer.invoke('g_s_f'),
    getSettingsData: () =>ipcRenderer.invoke('getSettingsData'),
    setSettingsData: data =>ipcRenderer.invoke('setSettingsData',data),
})
ipcRenderer.on('isMax',(event,isMax)=>{
    try{
        let mmBtn = document.querySelector('.mmbtn')
        if(isMax){
            mmBtn.querySelector('.mini').classList.add('display-none')
            mmBtn.querySelector('.max').classList.remove('display-none')
        }else{
            mmBtn.querySelector('.max').classList.add('display-none')
            mmBtn.querySelector('.mini').classList.remove('display-none')
        }
    }
    catch(err){
        console.log(err)
        
    }
   
    
})