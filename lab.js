<div className="search-settings cover-screen coverx">
            <div className="search-settings-box">
                <ClosePopScreenBtn myCloseFun={checkSettings} setVisiblity={setSearch_SettingVisiblity}/>
                {/* <h3>Settings</h3> */}
                <section className="filter-box">
                    <h3>Current Filters</h3>
                    <div onClick={removeSearchFilter} className="using-filters">
                        {search_settings.used_basic_opts.map( opt => <AddFilter_btn key={nanoid()} opt_name={opt} show_btn={search_settings.adv_opt_visible} /> )}
                        {search_settings.used_adv_opts.map( opt => <AddFilter_btn key={nanoid()} opt_name={opt} show_btn={search_settings.adv_opt_visible} adv={true}/> )}
                        {/* <AddFilter_btn opt_name='Artist'/>
                        <AddFilter_btn opt_name='Song Title'/>
                        <AddFilter_btn adv='true' opt_name='.MP3'/>
                        <AddFilter_btn adv='true' opt_name='.WAV'/>
                        <AddFilter_btn adv='true' opt_name='.OPUS'/>
                        <AddFilter_btn adv='true' opt_name='.M4A'/> */}
                    </div>
                    <h3>Add Filters</h3>
                    <div className="unused-filters">
                        <div onClick={addSearchFilter} className="unused-box">
                            {/* <AddFilter_btn opt_name='Album'/>
                            <AddFilter_btn opt_name='Length'/> */}
                            {search_settings.un_used_basic_opts.map( opt => <AddFilter_btn key={nanoid()} show_btn={search_settings.adv_opt_visible} opt_name={opt}/> )}
                            {search_settings.un_used_adv_opts.map( opt => <AddFilter_btn key={nanoid()} show_btn={search_settings.adv_opt_visible} opt_name={opt} adv={true}/> )}

                            <button className="show-more-filters" onClick={toggleSearch_AdvOpts}>
                                {checkIfUsingAdvFilter()}
                            </button>
                        </div>
                        {/* <div className="warning">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="info"><g data-name="Layer 2"><path d="M8 2a6 6 0 1 0 6 6 6 6 0 0 0-6-6Zm0 11a5 5 0 1 1 5-5 5 5 0 0 1-5 5Z"></path><path d="M8 6.85a.5.5 0 0 0-.5.5v3.4a.5.5 0 0 0 1 0v-3.4a.5.5 0 0 0-.5-.5zM8 4.8a.53.53 0 0 0-.51.52v.08a.47.47 0 0 0 .51.47.52.52 0 0 0 .5-.5v-.12A.45.45 0 0 0 8 4.8z"></path></g></svg>
                            <p>This means Files with .mp3 won't be displayed in search result</p>
                        </div> */}
                    </div>
                </section>
                {/* <section className="un-named-box">
                    <div>
                        <input className='datetime' type="time" value={formValues.filter_date_start} name="filter_date_start" onChange={formOnChange}/>
                    </div>
                </section> */}
                <section className="switches-box">

                    <div className="spelling">
                        <div className="action-box">
                            <h3>Spelling Accuracy</h3>
                            <label className="switch">
                                {/* <input type="checkbox switch checked" /> */}
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
                </section>
            </div>
        </div>
    }
    {ask_to_discard&&
    // add discard settings genreic 
        <ConfrimDialog closeBox={setAskToDiscard} setVisiblity={setSearch_SettingVisiblity} setResponses={setSearchSettings} value={DEFAULT_SEARCH_SETTINGS} />
            