import React from "react"
import './../css/titlebar.css'
function toggleIcon(isMax){
    let mmBtn = document.querySelector('.mmbtn')
    if(isMax){
        mmBtn.querySelector('.mini').classList.add('display-none')
        mmBtn.querySelector('.max').classList.remove('display-none')

    }else{
        mmBtn.querySelector('.max').classList.add('display-none')
        mmBtn.querySelector('.mini').classList.remove('display-none')

    }
}

/**
 * 
 * @param {String} dataset a key for a dataset of the TitleBar Component. 
 */
export function buttonClickedForTab_btn(dataset=''){
    Object.keys(document.querySelector('.BIGBAR').dataset).forEach(key=>{
        if(key=== dataset){
            document.querySelector('.BIGBAR').dataset[dataset] = 'true'
        }
        else{
            document.querySelector('.BIGBAR').dataset[key] = 'false'
        }
    })
}

export default function Titlebar({name_of_albums,screens,setIndex,index,setBigTab, setMiniTab,setFolderToShow,setAlbum_name}){
    // let index=React.useRef(undefined)
    let mini_tabs=['choosen_folders', 'all_folders', 'all_artists', 'all_songs']
    let big_tabs=['first', 'albums', 'fav']
    React.useEffect(function(){
        bridge.checkIfMax().then(isMax=>toggleIcon(isMax))
    },[])
    function checkActiveState(i){
        // console.log(i,screens.length)
        // if(index.current===undefined){index.current=screens.length}
        if(i <= screens.length-2 && screens.length !==1){
            document.querySelector('.BIGBAR .foward-btn').classList.remove('inactive')
        }else{
            document.querySelector('.BIGBAR .foward-btn').classList.add('inactive')
        }
        if (i>0 && screens.length >1){
            document.querySelector('.BIGBAR .back-btn').classList.remove('inactive')
        }else{
            document.querySelector('.BIGBAR .back-btn').classList.add('inactive')
        }
    }
    
    React.useEffect(function(){
       setIndex(()=>{
            const i = screens.length-1
            checkActiveState(i)
            return i
        })
    },[screens])
    function backFunc(event){
        document.querySelector('.BIGBAR').dataset.frm_btn = 'true'

        if(index===0||screens.length===1){return}
        const index__ = index - 1
        const list__=screens.at(index__)
        console.log(screens,index__)    //For debugging
        const big_screen = list__[0]
        const sub_tab=list__[1]
        
        if(big_screen ==='favs'){
            setBigTab(big_screen)
        }
        else if(big_screen ==='albums'){
            if(name_of_albums.includes(sub_tab)){
                setAlbum_name(sub_tab)
            }else{
                setAlbum_name('')
            }
            setBigTab('albums')

        }else{
            setBigTab('first')
            if(mini_tabs.includes(sub_tab)){
                setMiniTab(sub_tab)
                setFolderToShow('')
            }else{
                setFolderToShow(sub_tab)
            }
        }
        checkActiveState(index__)
        setIndex(i=>i-1)

    }
    function forwardFunc(event){
        document.querySelector('.BIGBAR').dataset.frm_btn = 'true'
        if(screens.length-1===index){return}
        const index__ = index + 1
        const list__=screens.at(index__)
        console.log(screens,index__)    //For debugging
        const big_screen = list__[0]
        const sub_tab=list__[1]
        if(big_screen ==='favs'){
            setBigTab(big_screen)
        }
        else if(big_screen ==='albums'){
            if(name_of_albums.includes(sub_tab)){
                setAlbum_name(sub_tab)
            }else{
                setAlbum_name('')
            }
            setBigTab('albums')

        }else{
            setBigTab('first')
            if(mini_tabs.includes(sub_tab)){
                setMiniTab(sub_tab)
                setFolderToShow('')
            }else{
                setFolderToShow(sub_tab)
            }
        }
        checkActiveState(index__)
        setIndex(i=>i+1)
    }
    return (
        <section className="BIGBAR"  data-frm_btn='false' data-frm_folder='false' data-frm_album='false' >
            <button onClick={backFunc} title="Go Back (Alt+LeftArrow)" className="back-btn inactive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
            </button>
            <button onClick={forwardFunc} title="Go Forward (Alt+RightArrow)" className="back-btn foward-btn inactive">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{transform: "rotate(180deg)"}}><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"></path></svg>
            </button>
            <button onClick={bridge.refresh} title="F2" className="back-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                    <path d="M386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H464c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0s-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3s163.8-62.5 226.3 0L386.3 160z"/>
                </svg>
            </button>
            <p className="path-text"></p>
            <button onClick={bridge.toggleDock}className="dockbtn"> <img src="components/icons/dock.png" alt=""/> </button>
            <button onClick={bridge.toggleWinSize} className="mmbtn">
                <svg className="display-none mini" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"> <path d="M464 48V464H48V48H464zM48 0H0V48 464v48H48 464h48V464 48 0H464 48z" /></svg>
                <img className="display-none max" src="components/icons/Untitled-2.png" alt="" />
            </button>
            <button onClick={bridge.terminate} className="terminate" title="Close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
            </button>
        </section>
    )
}