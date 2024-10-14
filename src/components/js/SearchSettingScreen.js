import React from "react";
import { ClosePopScreenBtn,ConfrimDialog } from "./genericPops";

export default function SearchSettingScreen({display_setting__,setDisplaySetting__}){
    //  FIX change filter settings button color when not using default settings
    // const DEFAULT_SEARCH_SETTINGS__={
    //     spelling_accuracy: true,
    //     adv_opt_visible:false,
    //     used_basic_opts:['Song Title','Artist'],
    //     un_used_basic_opts:['Album','Length'],
    //     used_adv_opts:[],
    //     un_used_adv_opts:[],
    //     confirm:true,
    // }
    const [search_settings,setSearchSettings__]=React.useState({})
    // let [display_setting,setDisplaySetting__]=[display_,setDisplaySetting]
    let [ask_to_discard,setAskToDiscard]=React.useState(false)

    async function setSettingsData(){
        const data = await bridge.getSettingsData()
        setSearchSettings__(data)
    }
    React.useEffect(function(){
        setSettingsData()
        // setDisplaySetting__(display_)
        console.log('popo')
    },[])

    function checkSettings(){
        // console.log(search_settings)
        if(search_settings.confirm){
            setSearch_SettingVisiblity(false)
        }else{
            setAskToDiscard(true)
            return false // this makes search settting not close
        }
    }
    return (
        // {display_setting&&
        <div style={{display: display_setting__}} className="search-settings cover-screen coverx">
            <div className="search-settings-box">
                <ClosePopScreenBtn myCloseFun={checkSettings} setVisiblity={setDisplaySetting__}/>
            {/* 
            <section className="filter-box">
                <h3>Current Filters</h3>
                <div onClick={removeSearchFilter} className="using-filters">
                    {search_settings.used_basic_opts.map( opt => <AddFilter_btn key={nanoid()} opt_name={opt} show_btn={search_settings.adv_opt_visible} /> )}
                    {search_settings.used_adv_opts.map( opt => <AddFilter_btn key={nanoid()} opt_name={opt} show_btn={search_settings.adv_opt_visible} adv={true}/> )}
                
                </div>
                <h3>Add Filters</h3>
                <div className="unused-filters">
                    <div onClick={addSearchFilter} className="unused-box">                        {search_settings.un_used_basic_opts.map( opt => <AddFilter_btn key={nanoid()} show_btn={search_settings.adv_opt_visible} opt_name={opt}/> )}
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
                            <input type="checkbox" name="spelling_name" checked={formValues.spelling_name} onChange={formOnChange}/>
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
                <button onClick={()=>setSearchSettings(old=>({...old,confirm:true}))}>Save</button>
                <button>Cancel</button>
            </section> */}
            {ask_to_discard && <ConfrimDialog closeParent={()=>setDisplaySetting__('none')} closeBox={setAskToDiscard}/>
            //  setResponses={setSearchSettings}   value={DEFAULT_SEARCH_SETTINGS} />
              }
            </div>
        </div>
    
    )
}