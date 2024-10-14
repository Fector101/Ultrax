import React from "react"
import "./../css/mini_tabs.css"
import "./../css/foldertab.css"
import SongBuild from "./SongBuild"
import FolderBtn from "./folderBtn"
import { nanoid } from "nanoid"
import { toHHMMSS,formatSize,formatDate, MY_LOCAL_VARIABLES } from "./helper_funcs"
import { buttonClickedForTab_btn } from "./Titlebar"
export function roundBtn_Ele(svg='',btn_classes=[]){
    return (
        <button className={'round-btn '+btn_classes.join(' ')}>
            {svg}
        </button>
        )    
}
function MyMiniHeader({___using2_rescale}){
    // ___using2_rescale important for styling header (no way to montior addition on of scroll bar in CSS)
    React.useEffect(function(){
        const header_songs_box = document.querySelector('.songs')
        document.querySelector('.build1.bud1head').style.paddingRight= (header_songs_box.scrollHeight - header_songs_box.clientHeight) !== 0?'10px':'0'
        
    },[___using2_rescale])
    return (
        <div className="build1 bud1head bud1headjs" id="withoutfolder">
            <div className="song-cover-th"></div>
            <div className="song-title-th">TITLE</div>
            <div className="song-artist-th">ARTIST</div>
            <div className="song-album-th">ALBUM</div>
            <div className="song-length-th">LENGTH</div>
            <div className="header-build1-btn-case">
                <button  className="sort-btn" onClick={function(){coverScreen.classList.remove('display-none')}} style={{height: "30px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style={{width: '100%',height: '100%',fill: 'white'}}>
                        <path d="M30,37.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V40C32.5,38.6,31.4,37.5,30,37.5z   M27.5,57.5h-15v-15h15V57.5z"/>
                        <path d="M90,7.5H70c-1.4,0-2.5,1.1-2.5,2.5v50c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V10C92.5,8.6,91.4,7.5,90,7.5z   M87.5,57.5h-15v-45h15V57.5z"/>
                        <path d="M30,67.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V70C32.5,68.6,31.4,67.5,30,67.5z   M27.5,87.5h-15v-15h15V87.5z"/>
                        <path d="M60,37.5H40c-1.4,0-2.5,1.1-2.5,2.5v50c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V40C62.5,38.6,61.4,37.5,60,37.5z   M57.5,87.5h-15v-45h15V87.5z"/>
                        <path d="M90,67.5H70c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V70C92.5,68.6,91.4,67.5,90,67.5z   M87.5,87.5h-15v-15h15V87.5z"/>
                        <path d="M60,7.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h50c1.4,0,2.5-1.1,2.5-2.5V10C62.5,8.6,61.4,7.5,60,7.5z   M57.5,27.5h-45v-15h45V27.5z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
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

export function AFolder_Screen({dir,songs,data:{folderDuration,folderSize,folderDate_created}}){
// export function AFolder_Screen(props){
    // console.log(dir,songs)
    // console.log(props)
    // return <p>dir</p>
    let [songs_,setSongs] = React.useState([])
    React.useEffect(function(){
        setSongs([])
        function renderBatch(start,index){
            const list = DATA_PARSED.slice(start,index).map(([file_path,file_tags],i)=><SongBuild key={nanoid()} fav={file_tags.fav} title={file_tags.title} size={file_tags.size} dur={file_tags.dur} file_path={file_path} album={file_tags.album} album_artist={file_tags.album_artist} pic={file_tags.picture}/> )
            setSongs(old=>[...old,...list])
            if(TOTAL_COMPONENTS-index>0){
                const no = Math.trunc(TOTAL_COMPONENTS/15)+index > TOTAL_COMPONENTS ? index+(TOTAL_COMPONENTS-index) :index + Math.trunc(TOTAL_COMPONENTS/6)
                setTimeout(()=>renderBatch(index,no),1)
            }
        }
        let DATA_PARSED=songs
        const TOTAL_COMPONENTS=DATA_PARSED.length
        // renderBatch(0,TOTAL_COMPONENTS)        
        songs.length&&renderBatch(0,10)   
    },[songs])
    
        
    function curvedPlayBtn_Ele(btn_classes=[]){
        return (
            <div className={"curved-play-btn " + btn_classes.join(' ')}>
                <svg className="playjs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                <svg className="pausejs display-none" viewBox="0 0 448 512"><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>
                <span>Play</span>
            </div>
        )
    }
        
    function aboutFolder_Ele(no_of_songs=0,duration_of_folder=0,date_created=0,folder_size=0){
        
        return <>
                <p className="PA-details">
                <span className="PA-details-len">{no_of_songs} songs</span> • 
                <span className="size"> {formatSize(folder_size)}</span> • 
                <span className="PA-details-dur" data-dur={duration_of_folder}> {toHHMMSS(duration_of_folder)}</span> • 
                <span title="Last Modified" className="year"> {formatDate(date_created)}</span></p>
            </>
    }
    function input_Ele(placeholder='ultrax',btn_classes=[]){
        return <input placeholder={placeholder} className={"search-album "+btn_classes.join(' ')} type="text" name=""/>
        
    }
    let sort_view_ele = 
            <div className="sort-view-root">
                <div className="ascend-descend-box">
                    <button>
                        <svg className="che-up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>    
                    </button>
                    <button>
                        <svg className="che-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>    
                    </button>                                    
                </div>
                <select className="sort-input"> 
                    <option value="running">Name</option> 
                    <option value="running">Times Played</option> 
                    <option value="cycling">Date Modified</option>
                    <option value="cycling">Date Added</option>
                    <option value="cycling">Date Released</option>
                    <option value="running">Album</option> 
                    <option value="running">Artist</option> 
                    <option value="running">Size</option> 
                </select>
                <div className="sort-view-options">
                    <button className="opts-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"/></svg>
                    </button>
                    <div className="opts-list">
                        <p>Enter select mode</p>
                    </div>
                </div>
            </div>
        
    
    // ${generic_banner(folderDir,folderDir.split('\\').at(-1),list_of_songs.length,folderDuration,folderDate,folderSize)}
    // const folderDir=data[]
    return(
        <div id={dir} className="folder_case mini-tab forHeaderBtnsjs">
            <div className="larger-seethro-banner">
                    <div className="cover">
                        {input_Ele('Search folder')}
                        <div className="btm-corner">
                            <h3 title={dir}>{dir.split('\\').at(-1)}</h3>
                                {aboutFolder_Ele(songs.length,folderDuration,folderDate_created,folderSize)}
                            <div className="generic-header-btns">
                                {curvedPlayBtn_Ele(['play-favs'])}
                                {roundBtn_Ele(<svg viewBox="0 0 512 512"><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" /></svg>,['share'])}
                                {roundBtn_Ele(<svg viewBox="0 0 512 512"><path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z"/></svg>,['share'])}
                                {roundBtn_Ele(<svg viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>,['opt'])}
                            </div>
                        </div>
                    </div>
                    <img src="components/icons/covers/img_5.jpg" alt=""/>
            </div>
            <div className="folder-songs-con" id="withoutfolder">
                {sort_view_ele}
                <div className="forbuild1js">
                    {songs_}
                </div>
            </div>
        </div>
    )
}
function Choosenfolders_MiniTab({data}){
    let [songs,setSongs] = React.useState([])
    React.useEffect(function(){
        function renderBatch(start,index){
            const list = DATA_PARSED.slice(start,index).map(([file_path,file_tags],i)=><SongBuild key={nanoid()} fav={file_tags.fav} title={file_tags.title} size={file_tags.size} dur={file_tags.dur} file_path={file_path} album={file_tags.album} album_artist={file_tags.album_artist} pic={file_tags.picture}/> )
            setSongs(old=>[...old,...list])
            if(TOTAL_COMPONENTS-index>0){
                const no = Math.trunc(TOTAL_COMPONENTS/15)+index > TOTAL_COMPONENTS ? index+(TOTAL_COMPONENTS-index) :index + Math.trunc(TOTAL_COMPONENTS/6)
                setTimeout(()=>renderBatch(index,no),1)
            }else{
                setTimeout(()=>{
                    const songs_box=document.querySelector('.mini-tabs--box .songs')
                    if(!songs_box)return   // for when tabs are switched out fast IMPORTANT
                    let allTitle=Array.from(songs_box.querySelectorAll('.song-artistjs'))
                    const forSearch=Array.from(songs_box.querySelectorAll('.song-titlejs')).map((each,ind)=> {
                            let str = each.innerText.replace(/ /g,'')
                            if(allTitle[ind].innerText){str+=allTitle[ind].innerText}
                            return str.toLocaleLowerCase()
                        })
                    
                    MY_LOCAL_VARIABLES.list_for_search=forSearch
                    // setSongs(o=>[<SongBuild key='dead' fav={true} title='ant' file_path='ant' album='god' size={1} dur={64} album_artist='fabian' pic={undefined}/> ,...o])
                })
            }
        }
        let DATA_PARSED=data
        const TOTAL_COMPONENTS=DATA_PARSED.length
        Object.keys(data).length&&renderBatch(0,10)        
        
    },[data])
    return (
        <div id='tracks-tab' className="mini-tab">
            <MyMiniHeader ___using2_rescale={songs.length}/>    
            <div className="songs">
                    {songs}
            </div>
        </div>
    )
}
function Allfolders_MiniTab({data,setFolderDir__}){
    // let [data__,setData]=React.useState(data)
    let [folders,setFolders]=React.useState([])

    React.useEffect(function(){
        setFolders([])
        function renderBatch(start,index){
            // console.log(index-start,'batc')
            const list = DATA_PARSED.slice(start,index)
                                .map(([folder_path,folder_tags],i)=>{
                                    return <FolderBtn 
                                                sendPath={
                                                    (path)=>{
                                                    //     document.querySelector('.BIGBAR').dataset.frm_btn = 'false'
                                                    //     document.querySelector('.BIGBAR').dataset.frm_album = 'false'
                                                    //     document.querySelector('.BIGBAR').dataset.frm_folder = 'true'
                                                        buttonClickedForTab_btn('frm_folder')
                                                        setFolderDir__(path)
                                                        // {dir:path,songs:data[1][path]}
                                                    }
                                                } 
                                                key={nanoid()} name_={folder_path} len={folder_tags.len}
                                                date_cre={folder_tags.folderDate_created}
                                                date_mod={folder_tags.folderDate_mod} 
                                                size={folder_tags.folderSize} 
                                                dur={folder_tags.folderDuration} 
                                        />
                                })
            setFolders(old=>[...old,...list])
            if(TOTAL_COMPONENTS-index>0){
                const no = Math.trunc(TOTAL_COMPONENTS/15)+index > TOTAL_COMPONENTS ? index+(TOTAL_COMPONENTS-index) :index + Math.trunc(TOTAL_COMPONENTS/6)
                setTimeout(()=>renderBatch(index,no),1)
            }else{
                setTimeout(()=>{
                    // setFolders(o=>[<FolderBtn key={nanoid()} name_={'fabian/science'} len={20} date_cre={113435283} date_mod={113435270} size={666} dur={125} />,...o])
                    const songs_box=document.querySelector('.mini-tabs--box .folders-case')
                    if(!songs_box)return   // for when tabs are switched out fast IMPORTANT
                    const forSearch=Array.from(songs_box.querySelectorAll('.folderBuild')).map((each,ind)=> {
                            let str = each.dataset.src.replace(/ /g,'')
                            return str.toLocaleLowerCase()
                        })
                    
                    MY_LOCAL_VARIABLES.list_for_search=forSearch

                    //  console.log(songs)
                    // setSongs((i)=>{
                    //     console.log(i)
                    //     return i
                    // })
                })
            }
        }
        let DATA_PARSED=data
        // console.log(data)
        // console.log(DATA_PARSED)
        const TOTAL_COMPONENTS=DATA_PARSED.length
        // console.log(TOTAL_COMPONENTS)
        // renderBatch(0,TOTAL_COMPONENTS)        
        Object.keys(data).length&&renderBatch(0,10)   
    },[data])
    return (
        <div id="FOLDERS" className="sticky mini-tab">
            <div className="folder-header">
                <div className="tapped-folder">
                    <p></p>
                </div>
                <div className="header-build1-btn-case">
                    <button className="sort-btn" onClick={()=>coverScreen.style.display='flex'}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125">
                            <path d="M30,37.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V40C32.5,38.6,31.4,37.5,30,37.5z   M27.5,57.5h-15v-15h15V57.5z"></path>
                            <path d="M90,7.5H70c-1.4,0-2.5,1.1-2.5,2.5v50c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V10C92.5,8.6,91.4,7.5,90,7.5z   M87.5,57.5h-15v-45h15V57.5z"></path>
                            <path d="M30,67.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V70C32.5,68.6,31.4,67.5,30,67.5z   M27.5,87.5h-15v-15h15V87.5z"></path>
                            <path d="M60,37.5H40c-1.4,0-2.5,1.1-2.5,2.5v50c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V40C62.5,38.6,61.4,37.5,60,37.5z   M57.5,87.5h-15v-45h15V87.5z"></path>
                            <path d="M90,67.5H70c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V70C92.5,68.6,91.4,67.5,90,67.5z   M87.5,87.5h-15v-15h15V87.5z"></path>
                            <path d="M60,7.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h50c1.4,0,2.5-1.1,2.5-2.5V10C62.5,8.6,61.4,7.5,60,7.5z   M57.5,27.5h-45v-15h45V27.5z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="grid-view" className="folders-case">
                {folders}
            </div>
        </div>
    )
}
const Allartist_MiniTab=React.memo(function({data}){
    return(
        <div id="ARTISTS" className="sticky mini-tab">
            <div className="folder-header">
                <div className="tapped-folder">
                    <p></p>
                </div>
                <div className="header-build1-btn-case">
                    <button className="sort-btn" onClick={()=>coverScreen.style.display='flex'}>
                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 125">
                            <path d="M30,37.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V40C32.5,38.6,31.4,37.5,30,37.5z   M27.5,57.5h-15v-15h15V57.5z"></path>
                            <path d="M90,7.5H70c-1.4,0-2.5,1.1-2.5,2.5v50c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V10C92.5,8.6,91.4,7.5,90,7.5z   M87.5,57.5h-15v-45h15V57.5z"></path>
                            <path d="M30,67.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V70C32.5,68.6,31.4,67.5,30,67.5z   M27.5,87.5h-15v-15h15V87.5z"></path>
                            <path d="M60,37.5H40c-1.4,0-2.5,1.1-2.5,2.5v50c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V40C62.5,38.6,61.4,37.5,60,37.5z   M57.5,87.5h-15v-45h15V87.5z"></path>
                            <path d="M90,67.5H70c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h20c1.4,0,2.5-1.1,2.5-2.5V70C92.5,68.6,91.4,67.5,90,67.5z   M87.5,87.5h-15v-15h15V87.5z"></path>
                            <path d="M60,7.5H10c-1.4,0-2.5,1.1-2.5,2.5v20c0,1.4,1.1,2.5,2.5,2.5h50c1.4,0,2.5-1.1,2.5-2.5V10C62.5,8.6,61.4,7.5,60,7.5z   M57.5,27.5h-45v-15h45V27.5z"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div id="grid-view" className="folders-case">
                {/* {folders} */}
            </div>
        </div>
    )
})
// function Allsongs_MiniTab(pro){
const Allsongs_MiniTab=React.memo(function({data}){
    // console.log('all songs minintab ren')
    // console.log(pro)
    // console.log()
    // return
    let [songs,setSongs] = React.useState([])
    React.useEffect(function(){
        function renderBatch(start,index){
            // console.log(index-start,'batc')
            const list = DATA_PARSED.slice(start,index).map(([file_path,file_tags],i)=><SongBuild key={nanoid()} fav={file_tags.fav} title={file_tags.title} size={file_tags.size} dur={file_tags.dur} file_path={file_path} album={file_tags.album} album_artist={file_tags.album_artist} pic={file_tags.picture}/> )
            setSongs(old=>[...old,...list])
            if(TOTAL_COMPONENTS-index>0){ //cause Boolean(-1) returns true :)
                const no = Math.trunc(TOTAL_COMPONENTS/15)+index > TOTAL_COMPONENTS ? index+(TOTAL_COMPONENTS-index) :index + Math.trunc(TOTAL_COMPONENTS/6)
                setTimeout(()=>renderBatch(index,no),1)
            }else{
                setTimeout(()=>{
                    // setSongs(o=>[<SongBuild key='dead' fav={true} title='ant' file_path='ant' album='god' size={1} dur={64} album_artist='fabian' pic={undefined}/> ,...o])
                    //  console.log(songs)
                    // setSongs((i)=>{
                    //     console.log(i)
                    //     return i
                    // })
                    // async function listForSearch(){
                        const songs_box=document.querySelector('.mini-tabs--box .songs')
                        if(!songs_box)return   // for when tabs are switched out fast IMPORTANT
                        let allTitle=Array.from(songs_box.querySelectorAll('.song-artistjs'))
                        const forSearch=Array.from(songs_box.querySelectorAll('.song-titlejs')).map((each,ind)=> {
                                let str = each.innerText.replace(/ /g,'')
                                if(allTitle[ind].innerText){str+=allTitle[ind].innerText}
                                return str.toLocaleLowerCase()
                            })
                        
                        MY_LOCAL_VARIABLES.list_for_search=forSearch
                        // Array.from(document.querySelector('.songs').querySelectorAll('.song-artistjs')).map(each=>each.textContent)

                        // setList4Search(forSearch)
                    // }
                    // console.log(Array.from(document.querySelector('.songs').querySelectorAll('.song-artistjs')).map(each=>each.textContent))
                })
            }
        }
        let DATA_PARSED=data
        
        const TOTAL_COMPONENTS=DATA_PARSED.length
        // console.log(TOTAL_COMPONENTS)
        // renderBatch(0,TOTAL_COMPONENTS)        
        Object.keys(data).length&&renderBatch(0,10)        
        
    },[data])
    return (
        <div id='all-songs-tab' className="mini-tab">
            <MyMiniHeader ___using2_rescale={songs.length}/>
            
                <div className="songs">
                    {songs}
                </div>
            
            
            <div className="scan-cover display-none">
                <div className="scanning-device-box">
                    <p className="dialog">Scanning your device for Audio Files this may take a while.</p>
                    <p className="file-name"></p>
                    <p className="file-name fno">Found 0 Audio Files.</p>
                    <div className="hint-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="info"><path d="M50.5 84.6c18.8 0 34.1-15.3 34.1-34.1S69.3 16.4 50.5 16.4 16.4 31.7 16.4 50.5s15.3 34.1 34.1 34.1zm0-63.4c16.1 0 29.3 13.1 29.3 29.3S66.6 79.8 50.5 79.8 21.2 66.6 21.2 50.5s13.2-29.3 29.3-29.3z"></path><path d="M44.8 65.5c-1.3 0-2.4 1.1-2.4 2.4 0 1.3 1.1 2.4 2.4 2.4h15.8c1.3 0 2.4-1.1 2.4-2.4 0-1.3-1.1-2.4-2.4-2.4h-5.5V44.3c0-1.3-1.1-2.4-2.4-2.4h-7.9c-1.3 0-2.4 1.1-2.4 2.4s1.1 2.4 2.4 2.4h5.5v18.8h-5.5z"></path><circle cx="49.4" cy="34" r="3.9"></circle></svg>
                        <p>You Could add a particular folder From settings.</p>
                    </div>
                    <div className="loader1"></div>
                </div>
            </div>
            </div>
    )
// }
})
export function MiniTab_Manager({screen,setMiniTab_,setFolderDir__, all_songs_nd_folders_data,Choosenfolders_data_n_folders}){
    // console.log(all_songs_nd_folders_data,Choosenfolders_data_n_folders)
    // console.log('mini manager ren')
    // let [current_mini_tab,setCurrentMinitab]=React.useState(screen)
    // let [list_4_search, setList4Search]=React.useState([])  // this is to check text seacrh against
    
    function switchMiniTab(event){
        const target =event.target
        if(!target) return
        document.querySelector('.tab-active')?.classList.remove('tab-active')
        const tab_name=target.dataset.forClick
        target.classList.add('tab-active')  
        // setCurrentMinitab(tab_name)
        // document.querySelector('.BIGBAR').dataset.frm_folder = 'false'
        // document.querySelector('.BIGBAR').dataset.frm_btn = 'false'
        buttonClickedForTab_btn('no key blah blah can leave para empty')
        setMiniTab_(tab_name)
    }
    React.useEffect(function(){
        // console.log(Array.from(document.querySelector('.songs').querySelectorAll('.song-artistjs')).map(each=>each.textContent))
    },[])
    return (
            <div className="mini-tabs">
                <div className="tab-btns-box" onClick={switchMiniTab}>
                    <button className={screen==='choosen_folders'?'tab-active':''} data-for-click='choosen_folders' title="Tracks From Added Folders" id="">Tracks</button>
                    <button className={screen==='all_folders'?'tab-active':''} data-for-click='all_folders' title="View Folders" id="">Folders</button>
                    <button className={screen==='all_artists'?'tab-active':''} data-for-click='all_artists' title="Artist" id="">Artists</button>
                    <button className={screen==='all_songs'?'tab-active':''} data-for-click='all_songs' title="Show All Tracks in Device" id="tab-active">All Songs</button>
                </div>                
                <div className="mini-tabs--box">
                    
                    {screen === 'choosen_folders' && <Choosenfolders_MiniTab data={Choosenfolders_data_n_folders.length?Choosenfolders_data_n_folders[0]:[]}/>}
                    {screen === 'all_folders' && <Allfolders_MiniTab setFolderDir__={setFolderDir__}data={all_songs_nd_folders_data.length?all_songs_nd_folders_data[1]:Choosenfolders_data_n_folders[1]}/>}
                    {screen === 'all_artists' && <Allartist_MiniTab/>}
                    {screen === 'all_songs' && <Allsongs_MiniTab data={all_songs_nd_folders_data.length?all_songs_nd_folders_data[0]:[]}/>}
                    
                </div>
            </div>

    )
}