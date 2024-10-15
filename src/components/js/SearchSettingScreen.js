import React from "react";
import { ClosePopScreenBtn,ConfrimDialog } from "./genericPops";
import { nanoid } from "nanoid";
function AddFilter_btn({opt_name, show_btn, adv=false}){
    // console.log({opt_name, show_btn, adv})
    return(
        // <button className={'round-btn '+btn_classes.join(' ')}>
        <button className={"filter" + (adv?' adv':'') + (show_btn?'':' hide')}>
        <p>{opt_name}</p>
        <svg className='remove'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" /></svg>
        <svg className='add' viewBox="0 0 45.402 45.402">
            <path d="M41.267,18.557H26.832V4.134C26.832,1.851,24.99,0,22.707,0c-2.283,0-4.124,1.851-4.124,4.135v14.432H4.141 c-2.283,0-4.139,1.851-4.138,4.135c-0.001,1.141,0.46,2.187,1.207,2.934c0.748,0.749,1.78,1.222,2.92,1.222h14.453V41.27 c0,1.142,0.453,2.176,1.201,2.922c0.748,0.748,1.777,1.211,2.919,1.211c2.282,0,4.129-1.851,4.129-4.133V26.857h14.435 c2.283,0,4.134-1.867,4.133-4.15C45.399,20.425,43.548,18.557,41.267,18.557z"/>
        </svg>
    </button>
    )
}
export default function SearchSettingScreen({display_setting__,setDisplaySetting__}){
    //  FIX change filter settings button color when not using default settings
    const DEFAULT_SEARCH_SETTINGS__={
        spelling_accuracy: true,
        adv_opt_visible:false,
        used_basic_opts:['Song Title','Artist'],
        un_used_basic_opts:['Album','Length'],
        used_adv_opts:[],
        un_used_adv_opts:[],
        confirm:true,
    }
    const [search_settings,setSearchSettings__]=React.useState(DEFAULT_SEARCH_SETTINGS__)
    let old_search_settings=React.useRef()
    // console.log(search_settings,'||||||||||||||||||||||||||')
    // console.log(default_settings,'------------')
    // let [display_setting,setDisplaySetting__]=[display_,setDisplaySetting]
    let [ask_to_discard,setAskToDiscard]=React.useState(false)
    let [formValues, setFormValues]= React.useState({ spelling_accur:true })  

    function handleSettingsChange(user_inputs,force_confirm=false){

        setSearchSettings__(old=>{
            /**
            * Checks if new user input same as old
            */    
            function isSameAsOld(){
                let keys_match = true
                for (const key in user_inputs) {
                    if(key !=='confirm'){
                        const user_value=user_inputs[key]
                        const old_settings_value=old_search_settings.current[key]
                        if(Array.isArray(user_value)){
                            keys_match = user_value.sort().every( (each, index) => each === old_settings_value.sort()[index])
                        }else if( user_value !== old_settings_value){
                            console.log(user_value,'new shit')
                            console.log(old_settings_value, 'old shit')
                            keys_match=false
                        }
                    }
                }

                return keys_match
            }
            // console.log(old_search_settings.current,'-------Old----------')
            // console.log({...old,...user_inputs},'-------New----------')
            // console.log(force_confirm)
            const data_={...old,...user_inputs, confirm : !force_confirm?isSameAsOld() : true}
            console.log(data_)
            // setTimeout(()=>console.log(search_settings),2000)
            return data_
        })
    }
    React.useEffect(function(){
        console.log(old_search_settings.current)
    },[old_search_settings.current])
    async function setSettingsData(){
        const data = await bridge.getSettingsData()
        old_search_settings.current= structuredClone(data)
        handleSettingsChange(data,true)
        console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[once')
        // setDefaultSettings(data)//Default settings is only set here to be a reference point when user changes settings
    }
    React.useEffect(function(){
        setSettingsData()
        // console.log(999999)
    },[])
    // React.useEffect(function(){
    //     console.log(search_settings)
    // },[search_settings])
    function checkSettingsConfirmed(){
        console.log(search_settings)
        if(search_settings.confirm){
            console.log('confirm')
            setDisplaySetting__('none')
        }else{
            console.log('question')
            setAskToDiscard(true)
        }
    }
   
    function formOnChange(element){//This is for the toggle input for spelling accuracy
        // TODO Move This function to helperfunctions file
        // console.log(MY_LOCAL_VARIABLES.list_for_search)
          setFormValues(
              function (oldObject){
                const {name,value,type,checked}=element.target
                if(name === 'spelling_accur'){
                    handleSettingsChange({'spelling_accuracy':!search_settings.spelling_accuracy})
                    

                }
                return {
                        ...oldObject,
                        [name]: type==='checkbox'?checked:value
                      }
              }
            )
    }
    function removeSearchFilter(e){
        const filter_btn = e.target.closest('button.filter')
        if(!filter_btn) return
        function check_opts(list,used_opts_key,un_used_opts_key){
            let opts=list
            for(let i =0;i<opts.length;i++){
                const each=opts[i]
                if(each === filter_btn.innerText){
                    const option = opts.splice(i,1)
                    handleSettingsChange({ [used_opts_key]:opts, [un_used_opts_key]:[...search_settings[un_used_opts_key], ...option]})
                    break
                }
            }
        }

        check_opts(search_settings.used_basic_opts,'used_basic_opts','un_used_basic_opts')
        search_settings.adv_opt_visible && check_opts(search_settings.used_adv_opts,'used_adv_opts','un_used_adv_opts')
    }

    function addSearchFilter(e){
        const filter_btn = e.target.closest('button.filter')
        if(!filter_btn) return
        function check_opts(list,used_opts_key,un_used_opts_key){
            let opts=list
            for(let i =0;i<opts.length;i++){
                const each=opts[i]
                if(each === filter_btn.innerText){
                    const option = opts.splice(i,1)
                    handleSettingsChange({[un_used_opts_key]:opts, [used_opts_key]:[...search_settings[used_opts_key],...option]})
                    break
                }
            }
        }   

        check_opts(search_settings.un_used_basic_opts,'used_basic_opts','un_used_basic_opts')
        search_settings.adv_opt_visible && check_opts(search_settings.un_used_adv_opts,'used_adv_opts','un_used_adv_opts')
        // checkIfUsingAdvFilter()
    }

    function toggleSearch_AdvOpts(){
        if(search_settings.adv_opt_visible === true){
            if(document.querySelector('.search-settings .unused-filters button.show-more-filters').innerText==='Revert Advanced options'){
                document.querySelector('.search-settings .unused-filters button.show-more-filters').innerText='Hide Advanced options'
                // return old // adv buttons still visible so return 'old value' or {...old,adv_opt_visible: true}
                handleSettingsChange({used_adv_opts: search_settings.used_adv_opts.concat(search_settings.un_used_adv_opts), un_used_adv_opts:[], adv_opt_visible: true})
            }else{
                handleSettingsChange({adv_opt_visible: false})
            }
        }
        else{         
            handleSettingsChange({adv_opt_visible: true})
        }

    }
    function checkIfUsingAdvFilter(){
        if(search_settings.un_used_adv_opts.length>0){
            return 'Revert Advanced options'
        }else if(search_settings.adv_opt_visible){
            return 'Hide Advanced options'
        }else{
            return "Show Advanced options"
        }
    }
    function saveSettings(){
        // setSearchSettings__(old=>({...old,confirm:true}))
        handleSettingsChange({confirm:true}, true)
        old_search_settings.current=structuredClone(search_settings)
        setAskToDiscard(false)
        setDisplaySetting__('none')
    }

    return (
        // {display_setting&&
        <div style={{display: display_setting__}} className="search-settings cover-screen coverx">
            <div className="search-settings-box">
                <ClosePopScreenBtn myCloseFun={checkSettingsConfirmed} setVisiblity={setDisplaySetting__}/>
                <section className="filter-box">
                    <h3>Current Filters</h3>
                    <div onClick={removeSearchFilter} className="using-filters">
                        {search_settings.used_basic_opts.map( opt => <AddFilter_btn key={nanoid()} opt_name={opt} show_btn={search_settings.adv_opt_visible} /> )}
                        {search_settings.used_adv_opts.map( opt => <AddFilter_btn key={nanoid()} opt_name={opt} show_btn={search_settings.adv_opt_visible} adv={true}/> )}
                    
                    </div>
                    <h3>Add Filters</h3>
                    <div className="unused-filters">
                        <div onClick={addSearchFilter} className="unused-box">
                            {search_settings.un_used_basic_opts.map( opt => <AddFilter_btn key={nanoid()} show_btn={search_settings.adv_opt_visible} opt_name={opt}/> )}
                            {search_settings.un_used_adv_opts.map( opt => <AddFilter_btn key={nanoid()} show_btn={search_settings.adv_opt_visible} opt_name={opt} adv={true}/> )}
                            <button className="show-more-filters" onClick={toggleSearch_AdvOpts}>
                                {checkIfUsingAdvFilter()}
                            </button>
                        </div>
                        
                    </div>
                </section>
                <section className="switches-box">

                    <div className="spelling">
                        <div className="action-box">
                            <h3>Spelling Accuracy</h3>
                            <label className="switch">
                                <input type="checkbox" name="spelling_accur" checked={formValues.spelling_accur} onChange={formOnChange}/>
                                <span className="slider round"></span>
                            </label>
                            <div className="sample">
                                <p>If turned Off&nbsp; </p>
                                <span>
                                    <p>Input: yob</p>
                                    <p>&nbsp;➡&nbsp;</p>
                                    <p>Result: boy</p>
                                </span>
                            </div>
                        </div>
                        <div className="warning">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="info"><g data-name="Layer 2"><path d="M8 2a6 6 0 1 0 6 6 6 6 0 0 0-6-6Zm0 11a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z"></path><path d="M8 6.85a.5.5 0 0 0-.5.5v3.4a.5.5 0 0 0 1 0v-3.4a.5.5 0 0 0-.5-.5zM8 4.8a.53.53 0 0 0-.51.52v.08a.47.47 0 0 0 .51.47.52.52 0 0 0 .5-.5v-.12A.45.45 0 0 0 8 4.8z"></path></g></svg>
                            <p>This may delay Search results</p>
                        </div>
                    </div>

                </section>
                <section className="btns-box">
                    <button>Reset</button>
                    <button onClick={saveSettings}>Save</button>
                    <button>Cancel</button>
                </section> 
                {ask_to_discard && <ConfrimDialog saveFun={saveSettings} closeParent={()=>setDisplaySetting__('none')} closeBox={setAskToDiscard}/>}
            </div>
        </div>
    
    )
}