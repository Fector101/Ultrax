import React from "react";
import './components/css/packets.css'
import './components/css/app.css'//kept above components import so components style doesn't wipe or get interfered
import Titlebar from "./components/js/Titlebar";
import Sidebar from "./components/js/Sidebar";
import PlayerControl from "./components/js/Playercontrol";
import SearchSettingScreen from "./components/js/SearchSettingScreen";
import {AlbumsTab} from "./components/js/Tabs";
import {MiniTab_Manager,AFolder_Screen} from './components/js/FirstScreen_MiniTabs'
import {MyBanner} from './components/js/Tabs'
import './components/css/toggle.css'

// import './components/css/packets.css'
import './components/css/welcome_screen.css'
import { ClosePopScreenBtn,ConfrimDialog } from "./components/js/genericPops";
import ReactDom from 'react-dom/client'
import { nanoid } from "nanoid";


function getAllSong_async_helper_fun(){

}


async function createPages(get_all_song=false){
    try{
        let test_stopwatch=new Date()
        let gottenFFTags=await bridge.getAll(get_all_song)
        let end=new Date()
        console.log((end.getTime()-test_stopwatch.getTime())/1000+' seconds',(end.getTime()-test_stopwatch.getTime()) + ' millisecs')
        console.log(gottenFFTags)
        return gottenFFTags
    }
    catch{
        console.log('err')
    }
}


function WelcomeScreen(total__){//total__ is to set total to 100 when process loading complete
    let [total,setTotal]=React.useState(0)
    React.useEffect(function(){
        const randInt=()=> Math.trunc(Math.random()*70)
        const random_points=[randInt(),randInt()]//,randInt()]
        function runMe(){
            let millisecs=5//50
            if(total<100){
                if(total===random_points[0]){
                    setTotal(old=>old+10)
                    millisecs=300
                }else if(total===random_points[1]){
                    setTotal(old=>old+5)
                    millisecs=200
                }else if(total===80){
                    
                    setTotal(old=>old+15)
                    millisecs=300
                }else{
                    setTotal(old=>old+2)
                }
                setTimeout(runMe, millisecs)
            }
        }
        runMe()
    },[total__])

    return (
        <section className="welcome-screen">
            <div className="welcome-loader-box">
                <div className="welcome-loader">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(each=><span key={each} className="stroke"></span>)}
                    {/* <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span> */}
                    
                </div>
            </div>
            {/* <div className="app-name"> */}
                <h1 className="app-name">ULTRAX</h1>
                <div className="loader" style={{background:`linear-gradient(90deg, var(--green_color) ${total}%, rgb(214,214,214) ${total}%)`}}></div>
            {/* </div> */}
        </section>
    )
}
let g=undefined
export default function App(){
    // class searchSettngs{
    //     spelling_accuracy= true
    //     adv_opt_visible=false
    //     used_basic_opts=['Song Title','Artist']
    //     un_used_basic_opts=['Album','Length']
    //     used_adv_opts=[]
    //     un_used_adv_opts=[]
    //     confirm=false
    //     constructor(){

    //     }
    //     checkSettings(this){
    //         console.log(this)
    //     }
    // }
    // let [app,setApp]=React.useState(<><Titlebar/><WelcomeScreen/></>)

    // let [allFolders_data__,setAllFolders_data]=React.useState({})
    let [small_data,setSmallData]=React.useState([]) //['data for choosen folders',['data for folders minitab',obj_4_folders]]
    let [data_big,setdata]=React.useState([]) //['data for choosen folders',['data for folders minitab',obj_4_folders]]
    let [value__,setValue]=React.useState(false)
    let [index_of_4_Titlebar,setIndex]=React.useState(0)
    let [a_miniTab_2_show,setMiniTab]=React.useState('all_songs')
    let [screen,setScreen]  = React.useState('first')  //
    let [openedScreens,setOpenedScreens]=React.useState([])
    let [folder_path,setFolder_path]=React.useState('')
    let [album_name,setAlbum_name]=React.useState('')
    let [obj_for_folder_tabs,setObj_4_foldersTabs]=React.useState({})
    let [obj_for_albums_tabs,setObj_4_albumsTabs]=React.useState({})
    let [display_setting,setDisplaySetting]=React.useState('flex')



    React.useEffect(function(){
        if(document.querySelector('.BIGBAR').dataset.frm_btn !== 'true' ){
        // if((!screen.includes('btn') && screen !== 'first')|| (screen === 'first' && (!a_miniTab_2_show.includes('btn')))){
            // console.log(index_of_4_Titlebar,screen,a_miniTab_2_show)
            let sub_tab=undefined
            let mini_tabs=['choosen_folders', 'all_folders', 'all_artists', 'all_songs']

            if(document.querySelector('.BIGBAR').dataset.frm_folder==='true'){
                sub_tab=folder_path
            }else if(document.querySelector('.BIGBAR').dataset.frm_album==='true'){
                sub_tab=album_name
            }else if(screen==='first'){
                sub_tab=a_miniTab_2_show
            }else{
                sub_tab=''  //No sub tab
            }
            setOpenedScreens(old_list=>{
                let screens__=[...old_list.slice(0,index_of_4_Titlebar+1),[screen,sub_tab]]
                // console.log(screens__)
                g=screens__
                return screens__
            })

        }
    },[screen,a_miniTab_2_show,folder_path,album_name])
  

    React.useEffect(function(){
        function refresh(e){
            if(e.key==='F2'){
                bridge.refresh()
            }
        }
        window.addEventListener('keyup',refresh)

        console.log('getting data....')
        // createPages('get_all').then(res=>{//get_all
        //     if(!res){
        //         return
        //         // send app nofitication "No folder choosen"
        //     }
        //     let ALL_SONGS_LIST=[]
        //     let ALL_FOLDERS_LIST=[]
        //     let FOLDERS_OBJ={}
        //     let ALBUMS_OBJ={}

        //     res.structure.forEach(function(each){
        //         const keys_=Object.keys(each)
        //         const values_=Object.values(each)
        //         const {list_of_songs,list_of_tags}=values_[0]

        //         let folder_name=keys_[0]
        //         let folder_data={len:list_of_songs.length,folderDate_mod:values_[1],folderDate_created:values_[2],folderSize:values_[3],folderDuration:values_[4]}
        //         const folder_=[folder_name,folder_data]
        //         // FOLDERS_OBJ[folder_name]={list_of_songs:list_of_songs,list_of_tags:list_of_tags,...folder_data}
        //         ALL_FOLDERS_LIST.push(folder_)
        //         const song_name_tags_4_eachfolder=list_of_songs.map((song_path,i)=>{
        //             const album_name=list_of_tags[i]['album'] || 'Unknown Album'
        //                     if(!ALBUMS_OBJ.hasOwnProperty(album_name)){
        //                         ALBUMS_OBJ[album_name]={
        //                             'songs':{
        //                                 [song_path]:list_of_tags[i]
        //                             },
        //                              tags:{'dur':list_of_tags[i]['dur'],
        //                             'size':list_of_tags[i]['size'],
        //                             'album_artist':list_of_tags[i]['artist'],
        //                             'len':1,
        //                             fav_album:false,
        //                             'img':list_of_tags[i]['picture'],
        //                             'date_cre':list_of_tags[i]['year']}
        //                             }
                                   
        //                     }else{
        //                         if(ALBUMS_OBJ[album_name].tags.album_artist===undefined && album_name==='Unknown Album'){
        //                             ALBUMS_OBJ[album_name].tags.album_artist=list_of_tags[i]['artist']
        //                         }
        //                         ALBUMS_OBJ[album_name]['songs'][song_path]=list_of_tags[i]
        //                         ALBUMS_OBJ[album_name]['tags']['dur']+=list_of_tags[i]['dur']//||0
        //                         ALBUMS_OBJ[album_name]['tags']['len']+=1
        //                     }
        //             return [song_path,list_of_tags[i]]
        //         })
        //         ALL_SONGS_LIST.push(...song_name_tags_4_eachfolder)
        //         // FOLDERS_OBJ[folder_name]=[...song_name_tags_4_eachfolder]
        //         FOLDERS_OBJ[folder_name]={songs:[...song_name_tags_4_eachfolder],data:folder_data}

        //     })
        //     setObj_4_albumsTabs(old=>({...old,...ALBUMS_OBJ}))
        //     setObj_4_foldersTabs(old=>({...old,...FOLDERS_OBJ}))
        //     setdata([ALL_SONGS_LIST,ALL_FOLDERS_LIST])
        //     setSearchSettings(old=>{
        //         let old_formats=[...old.used_adv_opts,...old.un_used_adv_opts]
        //         let formats_to_add = old.used_adv_opts
        //         // Checking if format has been gotten before adding to search_settings.used_adv_opts
        //         res.formats.forEach(e_format=>!old_formats.includes(e_format)&&formats_to_add.push(e_format))
                      
        //         return {...old, used_adv_opts:formats_to_add}
        //     })
        //     setValue(true)
        //     // setAllFolders(ALL_FOLDERS_LIST)
        // })
        // return
        bridge.isthere_saved_folders().then(bool__=>{
            if(bool__){
                createPages('saved_folders').then( async res=>{//get_all
                    if(!res){
                        return
                        // send app nofitication "No folder choosen"
                    }
                    let ALL_SONGS_LIST=[]
                    let ALL_FOLDERS_LIST=[]
                    let FOLDERS_OBJ={}
                    let ALBUMS_OBJ={}

                    res.structure.forEach(function(each){
                        const keys_=Object.keys(each)
                        const values_=Object.values(each)
                        const {list_of_songs,list_of_tags}=values_[0]
        
                        const folder_name=keys_[0]
                        const folder_data={len:list_of_songs.length,folderDate_mod:values_[1],folderDate_created:values_[2],folderSize:values_[3],folderDuration:values_[4]}
                        const folder_=[folder_name,folder_data]
                        // FOLDERS_OBJ[folder_name]={list_of_songs:list_of_songs,list_of_tags:list_of_tags,...folder_data}

                        ALL_FOLDERS_LIST.push(folder_)
                        const song_name_nd_tags_4_eachfolder=list_of_songs.map((song_path,i)=>{
                            const album_name=list_of_tags[i]['album'] || 'Unknown Album'
                            if(!ALBUMS_OBJ.hasOwnProperty(album_name)){
                                ALBUMS_OBJ[album_name]={
                                    'songs':{
                                        [song_path]:list_of_tags[i]
                                    },
                                    tags:{'dur':list_of_tags[i]['dur'],
                                    'size':list_of_tags[i]['size'],
                                    'album_artist':list_of_tags[i]['artist'],
                                    'len':1,
                                    fav_album:false,
                                    'img':list_of_tags[i]['picture'],
                                    'date_cre':list_of_tags[i]['year']}
                                    }
                            }else{
                                

                                if(ALBUMS_OBJ[album_name].tags.album_artist===undefined && album_name==='Unknown Album'){
                                    ALBUMS_OBJ[album_name].tags.album_artist=list_of_tags[i]['artist']
                                }
                                ALBUMS_OBJ[album_name]['songs'][song_path]=list_of_tags[i]
                                ALBUMS_OBJ[album_name]['tags']['dur']+=list_of_tags[i]['dur']//||0
                                ALBUMS_OBJ[album_name]['tags']['len']+=1
                            }
                            return [song_path,list_of_tags[i]]
                        })
                        // list_of_songs.map((each,i)=>{
                        //     ALL_SONGS_LIST.push([each,list_of_tags[i]])
                        // })
                        ALL_SONGS_LIST.push(...song_name_nd_tags_4_eachfolder)
                        FOLDERS_OBJ[folder_name]={songs:[...song_name_nd_tags_4_eachfolder],data:folder_data}
                    })
                    setObj_4_albumsTabs(old=>({...old,...ALBUMS_OBJ}))
                    setObj_4_foldersTabs(old=>({...old,...FOLDERS_OBJ}))
                    setSmallData([ALL_SONGS_LIST, ALL_FOLDERS_LIST])
                    
                    const old_search_settings = await bridge.getSettingsData()
                    await bridge.setSettingsData(
                        {...old_search_settings, used_adv_opts:Array.from(new Set([...res.formats, ...old_search_settings.used_adv_opts]))},'user'
                    )
                    // setSearchSettings(old=>({...old, used_adv_opts:Array.from(new Set([...res.formats, ...old.used_adv_opts]))}))
                    setValue(true)
                    // setAllSongs(ALL_SONGS_LIST)
                })
            }
        })
        return ()=>window.removeEventListener('keyup',refresh)
        
    },[])
    // welcome()
    
    return (
        <>
            {/* {app} */}
            <Titlebar name_of_albums={Object.keys(obj_for_albums_tabs)} setAlbum_name={setAlbum_name} setFolderToShow={setFolder_path} setBigTab={setScreen} setIndex={setIndex} index={index_of_4_Titlebar}  setMiniTab={setMiniTab} screens={openedScreens}/>
            {!value__?
                <WelcomeScreen/>
                :
                <>
                    <section className="main-body-side-bar-box">
                        <Sidebar setFolderToShow={setFolder_path}  screen={screen}setScreen={setScreen}/>
                        <div className="SIDES-BOX">
                            <div className="left-side">
                                {/* <FirstTab all_songs_data_n_folders_={allSongs_data_n_folders_} Choosenfolders_data_n_folders_={Choosenfolders_data_n_folders__}/> */}
                                {/* <FirstTab choosenfolders_data_n_folders_={small_data}  data_4_all_folders_n_songs={data} /> */}
                                {screen.replace(' btn','')=='first'&& 
                                    <div className="first-tab">
                                        {
                                            folder_path?
                                                <AFolder_Screen dir={folder_path} songs={obj_for_folder_tabs[folder_path].songs} data={obj_for_folder_tabs[folder_path].data}/>
                                            :
                                            <>
                                                <MyBanner setDisplaySetting__={setDisplaySetting}/> 
                                                <MiniTab_Manager
                                                    all_songs_nd_folders_data={data_big} Choosenfolders_data_n_folders={small_data}
                                                    setFolderDir__={setFolder_path}  screen={a_miniTab_2_show} setMiniTab_={setMiniTab} />
                                            </>
                                        }
                                        <SearchSettingScreen setDisplaySetting__={setDisplaySetting} display_setting__={display_setting}/>
                                    </div>
                                }
                                {screen.replace(' btn','')==='albums'&&
                                    <AlbumsTab album_name={album_name} setAlbum_name={setAlbum_name}data={obj_for_albums_tabs}/>
                                }
                            
                            </div>
                            <div className="right-side"></div>
                        </div>

                    </section>
                    <PlayerControl/> 
                </>
            }
          
        </>
)}



// function welcome(){
//     setTimeout(()=>{

//         setApp(
//             <>
//                 <Titlebar/>
//                 <section className="main-body-side-bar-box">
//                     <Sidebar/>
//                     <div className="SIDES-BOX">
//                         <div className="left-side">
//                             {screen=='first'&&<FirstTab/>}
//                             {screen=='albums'&&<AlbumsTab/>}
//                             <div className="albums-tab display-none"></div>
//                             <div className="fav-tab display-none"></div>
//                         </div>
//                         <div className="right-side"></div>
//                     </div>
    
//                 </section>
//                 <PlayerControl/>
//             </>
//         )
//     },3000)
// }