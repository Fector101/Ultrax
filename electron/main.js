const {app, BrowserWindow, dialog,ipcMain,Notification,session,Tray,globalShortcut, nativeImage,screen,shell}=require('electron')

const fs = require('fs')
const {promisify} = require('util')
const stat = promisify(fs.stat)
// const stats_= await stat(filePath)

const jsmediatags= require('jsmediatags') 
const path = require('node:path');
// const path=require('path')
const mime = require('mime-types')
const {getAudioDurationInSeconds} = require('get-audio-duration');
// const { resolve } = require('path');
const child = require('child_process').execFile;
const UserSettings = require('./savedSettings')
const appPath=app.getAppPath()//.replace("Space",'ff')
const isDev = !app.isPackaged;


let ffprobePath = isDev?path.join(appPath,'node_modules','@ffprobe-installer','win32-x64','ffprobe.exe'): appPath.replace('app.asar','app.asar.unpacked')+'/node_modules/@ffprobe-installer/win32-x64/ffprobe.exe'
// let ffprobePath = appPath.replace('app.asar','app.asar.unpacked')+'/node_modules/@ffprobe-installer/win32-ia32/ffprobe.exe' 

// let rootPath = path.join(...[require("os").userInfo().homedir ,'Downloads','group .mp3','folder'])
// let rootPath__ = path.join(...[require("os").userInfo().homedir ,'Downloads','group .mp3'])
let rootPath__ = path.join(...[require("os").userInfo().homedir ,'Downloads'])
// let rootPath__ =require("os").userInfo().homedir
// let rootPath =require("os").userInfo().homedir

async function getDuration(fileName){
    try{
        return isDev?await getAudioDurationInSeconds(fileName):await getAudioDurationInSeconds(fileName,ffprobePath)
    }
    catch(err){return 0}
}
function awaitableJsmediatagsPro(filename){
    return new Promise(function(resolve,reject){
        jsmediatags.read(filename,{
            onSuccess:function(tag){
                    let img=''
                    const pic=tag?.tags?.picture
                    if(pic){
                        let data = pic.data
                        let format= pic.format
                        const base64String=`${Buffer.from(data).toString('base64')}`
                        img=`url(data:${format};base64,${base64String})`
                    }
                    let relevantTags={
                    'title':tag?.tags?.title || '',
                    'album':tag?.tags?.album || '',
                    'artist':tag?.tags?.artist || '',
                    'genre':tag?.tags?.genre || '',
                    'year':tag?.tags?.year || '',
                    'track':parseInt(tag?.tags?.track?.split('/')[0])?parseInt(tag?.tags?.track?.split('/')[0])+'' : '',
                    'picture':img,
                    'album_artist':tag.tags.TPE2?.data || tag?.tags?.artist ||''
                }
                if(Object.values(relevantTags).every(n=> n===''))relevantTags={}
                resolve(relevantTags)
            },
            onError: function(error){
                if(error.info==='No suitable tag reader found'){
                    resolve({})
                }
                reject([':( Error While getting Tags',error,filename])
            }
        })
    })
}

function get_folderPath_frm_file_path(file_path){
    let folderPath=file_path.split('\\')
    folderPath.pop()
    return path.join(...folderPath).replace("'",'`')
}

// let OBJECT_TO_DELIVER={}
// let list_cup=[]
let collected_songs=[]
let getting_second_time=false
async function getAll(pathQ,get_all_song=false){
    let skipFolders=[path.join(rootPath__,'AppData'), path.join(rootPath__,'OneDrive'),'node_modules','site-packages',path.join(rootPath__,'Searches')]
    let no_of_songs=0
    // typeof [] returns 'object'
    let folders=[]
    if(typeof pathQ==='object'){
        folders=pathQ
        pathQ=pathQ[0]
        console.log(pathQ)
    }else{
        folders.push(pathQ)
    }
    let LIST_TO_DELIVER=[]
    console.log(LIST_TO_DELIVER.length,folders)
    // OBJECT_TO_DELIVER={}
    // let test_stopwatch=undefined
    let total_formatting_time=0
    const fav_songs=[]//getFavSongs()// might need to move in loop so when add paths by user is added and user adds to fav it reflects to allsongs section
    let A_Folder={}
    let formats=[]
    while(folders.at(0)){
        const pathQ=folders.at(0)
        let accum=0
        let folder_dur=0
        const _=(
            await fs.readdirSync(pathQ).reduce(async function(arr,each,index,whole_array){
            const array = await arr
            const filePath=path.join(pathQ, each)
            // const stats_= await stat(filePath)             //(7.284 6.3 Download folder)      (27.822 || 27.148 whole drive)
            // const stats_= await fs.promises.stat(filePath) //(7.589 6.63 Download folder)     (27.857 || 24.807 whole drive)
            const stats_= fs.statSync(filePath)               //(7.348 6.288 Download folder) || (24.294 || 22.557 whole drive)   first run after a while -->(82.213 22.95 whole drive)
            
            if(stats_.isDirectory()){
                let bool=0
                try{bool = fs.readdirSync(filePath).length}catch{bool=0}
                let pathInList =skipFolders.includes(each)||skipFolders.includes(filePath)// filePath is folder path here
                if(!pathInList && bool && each.indexOf('.') !== 0 ) {
                    folders.push(filePath)
                }
            }else{
                const mimeType = mime.lookup(filePath)
                if(mimeType && mimeType.startsWith('audio/')){
                    const promises__= await Promise.allSettled([awaitableJsmediatagsPro(filePath),getDuration(filePath)])
                    const dur=promises__[1]?.value
                    const modtime__=stats_.mtime.getTime()
                    let tags_=promises__[0]?.value
                    tags_['dur']=dur
                    tags_['size']=stats_.size
                    tags_['date']=modtime__
                    tags_['fav']=fav_songs.includes(each)? true:false
                    //found_formats [...new Set(found_formats),{adv:true,opt:mimeType.split('/').at(-1)}]
                    const format=filePath.split('.').at(-1)
                    // console.log(formats,format)
                    if(!formats.includes(format)){
                        formats.push(format)
                        // found_formats.push({adv:true,opt:mimeType.split('/').at(-1)})
                    }
                    array.push({
                        name:each,
                        time:modtime__,
                        tags:tags_

                    })
                    // collected_songs.push(filePath)
                }
                // else if(collected_songs.includes(filePath)){
                //     if(!getting_second_time)getting_second_time=true
                //     list_cup.push(filePath)
                //     collected_songs.splice(collected_songs.indexOf(filePath),1)
                // }
            }
            return array
        },[])
        )
        // .sort((a,b)=> a.folderDate - b.folderDate)
        .sort((a,b)=> b.time - a.time)
        .forEach((each,index,array)=>{
            
            const start_formating_tim_con=new Date()
          
            if(index===0){
                // console.log(pathQ)
                // OBJECT_TO_DELIVER[pathQ]={'list_of_tags':[],'list_of_songs':[]}
                // OBJECT_TO_DELIVER[pathQ]['folderDate'] = fs.statSync(pathQ).mtime.getTime()
                // OBJECT_TO_DELIVER[pathQ]['folderDate_created'] = fs.statSync(pathQ).birthtime.getTime()

                A_Folder={[pathQ]: {'list_of_tags':[],'list_of_songs':[]}}
                A_Folder['folderDate_mod'] = fs.statSync(pathQ).mtime.getTime()
                A_Folder['folderDate_created'] = fs.statSync(pathQ).birthtime.getTime()

            }
                let each_file_name = each.name  // file name without folder path
                const tags_=each.tags
                folder_dur+=tags_.dur
                const each_file_size = tags_.size
                const each_file_path = path.join(pathQ, each_file_name)
                accum+=parseFloat(each_file_size)       

                A_Folder[pathQ]['list_of_songs']?.push(each_file_path)
                A_Folder[pathQ]['list_of_tags']?.push(tags_)

                // OBJECT_TO_DELIVER?.[pathQ]?.['list_of_songs']?.push(each_file_path)
                // OBJECT_TO_DELIVER?.[pathQ]?.['list_of_tags']?.push(tags_)


            if(index===array.length-1){
                no_of_songs+=array.length
                A_Folder['folderSize'] = accum.toFixed(2)
                A_Folder['folderDuration'] = folder_dur.toFixed(2)
                LIST_TO_DELIVER.push(A_Folder)
                
                // OBJECT_TO_DELIVER[pathQ]['folderSize'] = accum.toFixed(2)
                // OBJECT_TO_DELIVER[pathQ]['folderDuration'] = folder_duration.toFixed(2)

                if(get_all_song){
                    // win.webContents.send('scanned audio',{fileFound,no_of_songs,end:false})
                }
            } 
            const end_formating=new Date()
            total_formatting_time+=(end_formating.getTime()-start_formating_tim_con.getTime())

        })
        folders.shift()
        skipFolders.push(pathQ)

    }
    console.log('total formatting time ',total_formatting_time/1000,total_formatting_time)
    console.log(LIST_TO_DELIVER.length)
    return {
        structure:LIST_TO_DELIVER.sort((a,b)=> b['folderDate_mod'] - a['folderDate_mod']),
        // structure:Array.prototype.sort.call(OBJECT_TO_DELIVER)
        paths_to_remove:getting_second_time?collected_songs:[],
        list_of_fav_albums:[],
        formats
        }//getFavAlbums()}
 
}














async function resizeAndMoveFun(){
    const size=win.getSize()
    savedSettings.setData('win-size',size)
    let pos=win.getPosition() // Important when resizing and window position changes
    const screenSize=screen.getPrimaryDisplay().workAreaSize
    // console.log(win.getBounds())
    // console.log(screenSize)
    const avaliable_pixels_x=screenSize.width - pos[0]
    let x=pos[0]
    if(pos[0]<0){
        x=0
    }else if(avaliable_pixels_x < size[0]){
        x= pos[0] - (size[0]-avaliable_pixels_x)  // this is perciesly the amount needed for the app to enter the screen back
    } 
    let y=pos[1]
    const avaliable_pixels_y=screenSize.height - pos[1]
    if(pos[1]<0){
        y=0
    }else if(avaliable_pixels_y < size[1]){
        y=pos[1] - (size[1]-avaliable_pixels_y)
    }
    savedSettings.setData('win-pos',[x,y])


    // let response=await dialog.showOpenDialog(win,
    //             {
    //                 properties:['openDirectory'],
    //                 title:'Add a Master Folder',
    //             })
    //         if(response.canceled) return
    //         let gottenPath=response.filePaths[0]
    //         savedSettings.unshiftData('choosen_folders',[gottenPath])
}


const savedSettings=new UserSettings(isDev)
// console.log(savedSettings.filePath)
let win;
function coordinatesWorker(){
    
    const screenSize=screen.getPrimaryDisplay().workAreaSize
    win.setMaximumSize(screenSize.width,screenSize.height) 
    const coords=savedSettings.get_coords()
    
    if(coords.width>screenSize.width && coords.height > screenSize.height){
        const size=savedSettings.getData('win_size_b4_max')
        if(size[0]){
            const pos_=savedSettings.getData('win_pos_b4_max')
            win.setSize(size[0],size[1])// So when user minizes it show's in a smaller window "changing it's last size before I call maximize()"
            win.setPosition(pos_[0],pos_[1])
            savedSettings.setData('win_pos_b4_max',[undefined,undefined])
            savedSettings.setData('win_size_b4_max',[undefined,undefined])
        }else{
            // So when user minizes it show's in a smaller window "changing it's last size before I call maximize()"
            // this is for maximize without toggle button like hitting the title bar to the top
            //              FIND HOW TO CAPTURE EVENT BEFORE SCREEN IS MAXIMIZED AND CAPTURE SIZE & POS TO DELETE THIS ELSE BLOCK
            win.setSize(900,650)
            win.center()
        }
        win.maximize()
        win.show()// setTimeout(()=>win.show(),50)
        // console.log('too big')
    }else{
        win.show()
    }

    if(savedSettings.FIRST_RUN){
        savedSettings.setData('win-pos',win.getPosition())
        savedSettings.setData('win-size',win.getSize())
    }

    ipcMain.handle('checkIfMax',async (event,code)=> win.isMaximized())
    ipcMain.handle('show_screen',async ()=> win.show())

    ipcMain.handle('toggle-window-size',async ()=>{
        if(win.isMaximized()){
            win.unmaximize()
        }else{
            savedSettings.setData('win_size_b4_max',win.getSize())
            savedSettings.setData('win_pos_b4_max',win.getPosition())
            win.maximize()
        }
        // cle.log(win.getSize())
        // cle.log(screenSize)
        resizeAndMoveFun()
    })
    ipcMain.handle('toggle-dock',async (event,code)=>win.minimize())
    ipcMain.handle('close_window',async ()=> win.close())

    win.on("maximize",async () => { // this is for maximize without toggle button like hitting the title bar to the top
        win.webContents.send('isMax',true)
        // cle.log('maximize')
        resizeAndMoveFun()
    })
    win.on("unmaximize",()=>win.webContents.send('isMax',false))
    win.on("moved", resizeAndMoveFun)
    win.on("resized", resizeAndMoveFun)
    ipcMain.handle('refresh',async ()=> win.reload())

    
}
function createWindow(){
    const coords=savedSettings.get_coords()
    win=new BrowserWindow({
        // width:1200,
        // height:800,
        // x:undefined,
        // y:undefined,
        ...coords,
        icon:'src/icons/log.ico',
        autoHideMenuBar:true,
        frame:false,
        minWidth:230,
        
        minHeight:340,
        show:0,
        
        webPreferences:{
            nodeIntegration:false,
            worldSafeExecuteJavaScript:true,
            contextIsolation:true,
            preload:path.join(__dirname,'preload.js')
        }
    })
    coordinatesWorker()
    

    if(isDev)win.webContents.openDevTools()
    win.loadFile('src/index.html')
}




let dir_for_reloader=__dirname.split('\\')
dir_for_reloader.pop()
dir_for_reloader=path.join(...dir_for_reloader)
// if (isDev) {
//     require('electron-reload')(dir_for_reloader, {
//       electron: path.join(dir_for_reloader, 'node_modules', '.bin', 'electron')
//     })
// }
ipcMain.on('notify',(_,message)=>{
    new Notification({title :"Ultrax sent",body:message}).show()
})

app.whenReady().then(()=>{
    createWindow()
    ipcMain.handle('g_s_f',async ()=> Boolean(savedSettings.getData('choosen_folders').length))
    ipcMain.handle('Get_Audios',async (event,get_all_bool)=> {
        if(get_all_bool==='saved_folders'){
            let st=new Date()
            
            let respond=await getAll(savedSettings.getData('choosen_folders'),get_all_bool)
            let end=new Date()
            console.log((end.getTime()-st.getTime())/1000+' seconds \n')
            return respond

        }
        else if(get_all_bool){
            let st=new Date()
            let respond=await getAll(rootPath__,get_all_bool)
            let end=new Date()
            console.log((end.getTime()-st.getTime())/1000+' seconds \n')
            return respond

        }else{
            countt=0
            let response=await dialog.showOpenDialog(win,
                {
                    properties:['openDirectory'],
                    title:'Add a Master Folder',
                })
            if(response.canceled) return
            let gottenPath=response.filePaths[0]
            savedSettings.unshiftData('choosen_folders',[gottenPath])
            // console.log(response)
            let res=await getAll(gottenPath)
            return res
        }
        })
    ipcMain.handle('getSettingsData',async () => savedSettings.getData('search_settings'))//arg 
    ipcMain.handle('setSettingsData',async (event,data) => savedSettings.setData('search_settings',data))
})
