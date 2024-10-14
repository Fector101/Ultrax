import React from "react"
import "./../css/albumtab.css"
import { roundBtn_Ele } from "./FirstScreen_MiniTabs"
import { nanoid } from "nanoid"
import { formatTime, get_avg_rgb, MY_LOCAL_VARIABLES, toHHMMSS } from "./helper_funcs"
import { buttonClickedForTab_btn } from "./Titlebar"
export function SeacrhComponent({setSettingsVisiblity}){
    let [formValues, setFormValues]= React.useState({
        search_txt:''
        // password:'',
        // "confirm-password":'',
        // check:true,
    })   
    let [results, setResults]=React.useState([])
    function formOnChange(element){
        // console.log(MY_LOCAL_VARIABLES.list_for_search)
          setFormValues(
              function (oldObject){
                const {name,value,type,checked}=element.target
                return {
                        ...oldObject,
                        [name]: type==='checkbox'?checked:value
                      }
              }
            )
            const mini_tab = document.querySelector('.songs')||document.querySelector('.folders-case')
            const songs=document.querySelector('.build1')?Array.from(mini_tab.querySelectorAll('.build1')):Array.from(mini_tab.querySelectorAll('.folderBuild'))
            setResults([])
            const value__ = element.target.value

            songs.forEach((each,i)=>{
                if(value__&&MY_LOCAL_VARIABLES.list_for_search[i].includes(value__.toLocaleLowerCase())){
                    const a_btn_title = each.querySelector('.song-titlejs')
                    const a_folder_btn = each.classList.contains('folderBuild')
                    let searchSugg=each?.dataset.src.split('\\')
                    let prefix=searchSugg?.at(-2)?searchSugg.at(-2):'Root'
                    let suffix=searchSugg?.at(-1)
                    let item = a_folder_btn? <li data-index="${ele_index}" key={nanoid()}><p>{prefix} -&gt; {suffix}</p></li> : <li key={nanoid()} data-src={each.dataset.src}><p>{a_btn_title.textContent}</p></li>
                    setResults(old=> [...old,item])
                    each.classList.remove('display-none')
                }else if(value__===''){
                    each.classList.remove('display-none')
                }else{
                    each.classList.add('display-none')
                }
            })
    }
    React.useEffect(function(){
        document.querySelector('button.filter-btn').addEventListener('click',function(){
            setSettingsVisiblity(true)
            
        })
    },[])
    return (
        <div className="search-box">
            <div className="case">
                <button type="button" className="filter-btn filter-btn-td" title="Add filters to your search (Ctrl+Q)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"></path></svg>
                </button>
                <input name='search_txt' title="search" placeholder="Find a track" className="dcmjs search-input search-input-td" type="text" value={formValues.search_txt} onChange={formOnChange} />
                <button type="button" className="search-btn search-btn-td" title="Focus Search (Ctrl+S)">
                    <svg xmlns="http://www.w3.org/2000/svg" className="search-svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" className="c-search-svg display-none" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/></svg>
                </button>
            </div>
            <div className="search-result-case modal">
                <ul className="search-list" id="search-list-id">
                    {results}
                </ul>
                <div className="search-loader-box display-none">
                    <div className="search-loader">
                        <span className="stroke"></span>
                        <span className="stroke"></span>
                        <span className="stroke"></span>
                        <span className="stroke"></span>
                        <span className="stroke"></span>
                        <span className="stroke"></span>
                        <span className="stroke"></span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export function MyBanner({setSearch_settings_visiblity}){
    return (
        <div className="banner">
            <h1 className="brand">Libary</h1>
            <div className="profile-box display-none">
                <button title="nofications" className="nofications-btn" type="button">N</button>
                <button title="settings" className="settings-btn" type="button">S</button>
                <img className="profile-pic" src="components/icons/img2.png" alt="" srcSet=""/>
                <p className="inline-block">Fabian Joseph</p>
            </div>
            <SeacrhComponent setSettingsVisiblity={setSearch_settings_visiblity}/>
        </div>
    )
}
function choosenFoldersSongs_MiniTab(){
    return (
        <div id='tracks-tab' className="forbuild1js mini-tab display-none">
        </div>
    )
}
const in_fav_svg=<svg className="fav-svg fav-svgjs in-favjs" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
const not_in_fav_svg=<svg className="fav-svg fav-svgjs not-in-favjs" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>

let dev={
    duration(){
        let front=`${Math.trunc(Math.random()*13)+1}`.padStart(2,'0')
        let back=`${Math.trunc(Math.random()*13)+1}`.padStart(2,'0')
        return `${front}:${back}`
    },
    ranI(){
        return `${Math.trunc(Math.random()*20)+1}`
    }
}
function AblumSongBuild({tags:{title, artist, genre, year, track, picture, album_artist, dur, size, date, fav,album
        },file_path: path}){
    return (
        <div data-fav={fav || "false"} data-src={path} data-count={track} className="build3 build1js">
            <div className='index'><p>{track}</p></div>
            <div className='track-name song-titlejs'>{title  || path.split('\\').at(-1).split('.').at(0)}</div>
            <div className='count'>{dev.ranI().padStart(2,'0')}</div>
            <div data-durate={dur||0} className='durate song-lengthjs'>{formatTime(dur)}</div>
            <div className='buttons'>
            <div className="build3-round-btn favbtnjs">
                {fav?in_fav_svg:not_in_fav_svg}
            </div>
            </div>
            <div style={{display:'none'}} className="song-artistjs">{artist}</div>
            <div style={{display:'none'}} className="song-album song-albumjs"><p>{album || ''}</p></div>
            <div style={{display:'none'}} className="size">{size || ''}</div>
            <div className="song-coverjs" style={{display:'none','backgroundImage': picture}}>
                    {!picture && 
                        <svg className="song-cover-svg" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>
                    }
                </div>
        </div>
    )
}
function TheAlbum({album,data}){
    // console.log({album,data})
    const name=album
    const {songs,tags:{album_artist,len,img,date_cre,fav_album,dur}} = data[album]
// function TheAlbum({songs_,tags:{album_artist,len,img,date_cre,fav_album,dur},name}){
// function TheAlbum({songs_,tags:{album_artist,len,pic,year,fav_album,dur},name}){
    let [songs_,setSongs] = React.useState([])
    React.useEffect(function(){
        setSongs([])
        function renderBatch(start,index){
            // console.log(index-start,'batc')
            const list = DATA_PARSED.slice(start,index).map(([file_path,file_tags],i)=><AblumSongBuild key={nanoid()} tags={file_tags} file_path={file_path}/> )
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
                },1000)
            }
        }
        let DATA_PARSED=Object.entries(songs)
        
        const TOTAL_COMPONENTS=DATA_PARSED.length
        // console.log(TOTAL_COMPONENTS)
        // renderBatch(0,TOTAL_COMPONENTS)        
        DATA_PARSED.length && renderBatch(0,10)        
        
    },[songs])
    // console.log(songs,tags,name)
    // return <p>Hell</p>
    return(
        <div className="container-toscroll forHeaderBtnsjs" id={name}>
            <div className="preview-album">
                <div className="album-cover" style={{'backgroundImage': img}}>
                    {!img && <svg className="song-cover-svg" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>
                    }
                </div>
                <div className="preview-text">
                    <p className="PA-name"> {name || "Unknown Album"} </p>
                    <p className="PA-artist" style={{color: get_avg_rgb(img)}}>by <span>{album_artist || 'Unknown Artist'}</span></p>
                    <p className="PA-details"> <span className="PA-details-len">{len} Songs</span> • <span>101</span> Plays • <span className="PA-details-dur">{toHHMMSS(dur)} hrs</span> • <span className="year">{date_cre||''}</span></p>
                    <div className="PA-btns-box">
                        <div className="PA-play-btn">
                            <svg className="PA-play-svg playjs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"> <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" /></svg>
                            <svg className="PA-play-svg pausejs display-none" viewBox="0 0 448 512"><path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>
                            <span className="PA-play-txt">Play</span>
                        </div>
                        {roundBtn_Ele(fav_album?in_fav_svg:not_in_fav_svg,['PA-round-btn', 'album-fav-btn'])}
                        {roundBtn_Ele(<svg className="PA-share-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z" /></svg>,['PA-round-btn'])}
                    </div>
                </div>
            </div>
            <div className="album-songs-box">
                <div className="AS-table gridSetting" aria-colcount="5">
                    <div className="build3 myth">
                        <div className='index'><p>#</p></div>
                        <div>Title</div>
                        <div>Times Played</div>
                        <div>Duration</div>
                        <div></div>
                    </div>
                    <span id="AS-con" className="AS-con forbuild1js">
                        {songs_}
                    </span>
                </div>
            </div>
            
        </div>
    )
}
export function AlbumsTab({data,album_name,setAlbum_name}){
    let [albums, setAlbums] = React.useState([])
    // let [DATA, setDATA] = React.useState(data)
    // let [a_album, setA_Album] = React.useState('')
    // console.log(DATA)    
    let timer = React.useRef()
    // React.useEffect(function(){
    //     set
    // },[])


    function AlbumBtn({album_name__,tags}){
        const pic = tags.img
        return(
            <div className="album-build album-box-js" onClick={ ()=> {
                                                                // document.querySelector('.BIGBAR').dataset.frm_btn = 'false'
                                                                // document.querySelector('.BIGBAR').dataset.frm_folder = 'false'
                                                                // document.querySelector('.BIGBAR').dataset.frm_album = 'true'
                                                                buttonClickedForTab_btn('frm_album')
                                                                setAlbum_name(album_name__)
                                                                }}>
            {/* <div className="album-build album-box-js" onClick={ ()=> setA_Album({name:album_name,tags,songs:DATA[album_name].songs}) }> */}
                    {roundBtn_Ele(<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg>,['play'])}
                    <div className="cover" style={{'backgroundImage': pic}}>
                        {!pic && <svg className="song-cover-svg" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"></path></svg>}
                    </div>
                    <p className="name">{album_name__}</p>
                    <p className="artist">{tags?.album_artist}</p>
                </div>
        )
    }
    React.useEffect(function(){
        setAlbums([])
        clearTimeout(timer.current)
        function renderBatch(start,index){
            const list = ALBUM_NAMES.slice(start,index).map((album_name__)=> <AlbumBtn key={nanoid()} tags={data[album_name__].tags} album_name__={album_name__}/>)
            setAlbums(old=>[...old,...list])
            if(TOTAL_COMPONENTS_NO - index>0){
                const no = Math.trunc(TOTAL_COMPONENTS_NO/15)+index > TOTAL_COMPONENTS_NO ? index+(TOTAL_COMPONENTS_NO-index) :index + Math.trunc(TOTAL_COMPONENTS_NO/6)
                timer.current=setTimeout(()=>renderBatch(index,no),1)
            }
        }
        let ALBUM_NAMES=Object.keys(data)
        const TOTAL_COMPONENTS_NO=ALBUM_NAMES.length
        // console.log(TOTAL_COMPONENTS)
        // renderBatch(0,TOTAL_COMPONENTS)        
        ALBUM_NAMES.length&&renderBatch(0,10)   
    },[data])


    return ( 
        <div className="albums-tab">
            {
                album_name?
                    <TheAlbum data={data} album={album_name}/>
                    // <TheAlbum tags={DATA[a_album.name].tags} songs_={DATA[a_album.name].songs} album={a_album.name}/>
                    // <TheAlbum tags={a_album.tags} songs_={a_album.songs} album={a_album.name}/>
                :
                    <div className="case-for-albums">
                            <h1 className="albums-head-text">Albums</h1>
                            <div className="my-albums">
                                {albums}
                            </div>
                    </div>
            }
        </div>
    )
}
