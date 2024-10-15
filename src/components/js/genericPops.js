import { nanoid } from "nanoid"
import React from "react"
// * add 'coverx' to class of pop screen main parent (i.e the transparent cover)
/**
 * Feed a Object that has key .visible and is using to optioning render coverx :)
 *  Genric CSS in packets.css file
 * @returns pop screen close btn
 */
export function ClosePopScreenBtn({myCloseFun}){

    //  <div class='coverx'>
    //    <div class='content-box'>
    //       <ClosePopScreenBtn setVisiblity={setVisiblity__}  />
    //    </div>
    //  </div>
    const unique_id = React.useRef(nanoid())
    
    React.useEffect(function(){
        function closeCoverScreen(e){
            if(e.key==="Escape"){
                myCloseFun()
            }
        }

        document.querySelector('body').addEventListener('keyup',closeCoverScreen)        
        return () => document.querySelector('body').removeEventListener('keyup',closeCoverScreen)
        

    },[])
    return (
        <button id={unique_id.current} onClick={myCloseFun} className="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
            </svg>
        </button>
    )
}
export function ConfrimDialog({saveFun,closeBox,closeParent}){
    // console.log(default_value,setResponses)
    // <ConfrimDialog setVisiblity={setSearch_SettingVisiblity} setResponses={setSearchSettings} value={DEFAULT_SEARCH_SETTINGS} />
    const list_of_btn_ids=[nanoid(),nanoid(),nanoid()]
    React.useEffect(function(){
        document.getElementById(list_of_btn_ids[0]).focus()
        function moveFocus(e){
            const focused_btn = document.querySelector('.confirm-settings section.btns-box button:focus')
            const btns = [...document.querySelectorAll('.confirm-settings section.btns-box button')]
            let i = btns.indexOf(focused_btn)
            // i=i==-1&&0
            if(['ArrowLeft','ArrowUp'].includes(e.key)){
                if(i===-1){
                    i=0
                }else if(i===0){
                    i=btns.length-1
                }else{
                    i-=1
                }
                // else if(i===-1){
                // }
                
            }else if(['ArrowRight','ArrowDown'].includes(e.key)){
                if(i===btns.length-1 || i===-1){
                   i=0 
                }else{i+=1}

            }
            else if(e.key==='End'){i=btns.length-1}
            else if(e.key==='Home'){i=0}
            // console.log(e.code)
                // i=btns.length?0:i+i
            btns[i].focus()
        }
        document.querySelector('body').addEventListener('keyup',moveFocus)
        return ()=> document.querySelector('body').removeEventListener('keyup',moveFocus)

    },[])
    function cancel(){//closes Dialog
        closeBox(false)
    }
    function dontSave(){
        closeBox(false)//closes Dialog
        closeParent(false)//closes Parent Screen
    }
    return(
        <div className="cover-screen coverx">
            <div className="confirm-settings search">
                <section className="head">
                    <h3>Save Settings</h3>
                    <ClosePopScreenBtn myCloseFun={cancel}/>
                </section>
                <section className="content">
                    <p>Do you want to Save Changes</p>
                </section>
                <section className="btns-box">
                    <button className="activ" onClick={saveFun} id={list_of_btn_ids[0]}>Save</button>
                    <button id={list_of_btn_ids[1]} onClick={dontSave}>Don't Save</button>
                    <button id={list_of_btn_ids[2]} onClick={cancel}>Cancel</button>
                </section>
            </div>
        </div>
    )

}