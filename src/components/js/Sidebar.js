import React from "react";
import './../css/sidebar.css'
import { buttonClickedForTab_btn } from "./Titlebar";
export default function Sidebar({screen, setFolderToShow,setScreen}){
    const screen_=screen.replace(' btn','')
    function changeScreen(event){
        // console.log(event)
        if(typeof event === 'string'){

        }else{
            const btn = event.target.closest('.SB-btn')
            document.querySelector('.side-bar .SB-btn .strip:not(.display-none)')?.classList.add('display-none')
            btn.querySelector('.strip').classList.remove('display-none')
            const screen= btn.dataset.screen

            buttonClickedForTab_btn('no dataset')
            // document.querySelector('.BIGBAR').dataset.frm_btn = 'false'
            // document.querySelector('.BIGBAR').dataset.frm_folder = 'false'
            // document.querySelector('.BIGBAR').dataset.frm_album = 'false'
            
            if(document.querySelector('.folder_case')){//checking if displaying a folder tab 
                // document.querySelector('.BIGBAR').dataset.frm_btn = 'true'
                // document.querySelector('.BIGBAR').dataset.frm_folder = 'true'
                setFolderToShow('') 
            }
            // else{
                setScreen(screen)
            // }
        }

    }
    return (
        <div className="side-bar">
                <button className="SB-btn SB-menu-btn">
                    
                    <svg className="SB-menu-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    <svg className="SB-close-menu-svg display-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                    </svg>
                </button>
                <div className="SB-user-details-box">
                    <div style={{backgroundImage: "url('components/icons/placeHolder.jpg')"}} className="SB-profile-pic">
                        <div></div>
                    </div>
                    <p className="User-id User-id-js">@Fector</p>

                </div>
                <button className="SB-btn SB-home-btn" title="Explore Home">
                    <div className="strip display-none"></div>
                    <svg className="SB-home-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                    </svg>
                    <p>Home</p>
                    
                </button>
                <button data-screen="first"  onClick={changeScreen} className="SB-btn SB-music-btn" title="View All Tracks">
                    <div className={"strip" + (screen_==='first'? '':" display-none")}></div>
                    <svg className="SB-music-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" /></svg>
                    <p>Tracks</p>
                </button>
                <button data-screen="albums"  onClick={changeScreen} className="SB-btn SB-album-btn" title="Albums">
                    <div className={"strip" + (screen_==='albums'? '':" display-none")}></div>
                    <svg className="SB-album-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-96-32a96 96 0 1 0 192 0 96 96 0 1 0 -192 0zM96 240c0-35 17.5-71.1 45.2-98.8S205 96 240 96c8.8 0 16-7.2 16-16s-7.2-16-16-16c-45.4 0-89.2 22.3-121.5 54.5S64 194.6 64 240c0 8.8 7.2 16 16 16s16-7.2 16-16z" /></svg>
                    <p>Albums</p>
                </button>
                <button data-screen="favs"  onClick={changeScreen} className="SB-btn SB-fav-btn" title="Favourites">
                    <div className={"strip" + (screen_==='favs'? '':" display-none")}></div>
					<svg className="SB-fav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
                    <p>Favourite Tracks</p>				
                </button>
                <button className="SB-btn SB-search-btn" title="Search Online">
                    <div className="strip display-none"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="search-svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>
                    <p>Find a new Song</p>
				</button>
                <button className="SB-btn SB-recent-btn" title="View Recently Played">
                    <div className="strip display-none"></div>
                    <svg width="800px" height="800px" viewBox="0 0 24 24" id="_24x24_On_Light_Recent" data-name="24x24/On Light/Recent" xmlns="http://www.w3.org/2000/svg">
                        <path id="Shape" d="M9.682,18.75a.75.75,0,0,1,.75-.75,8.25,8.25,0,1,0-6.189-2.795V12.568a.75.75,0,0,1,1.5,0v4.243a.75.75,0,0,1-.751.75H.75a.75.75,0,0,1,0-1.5H3a9.75,9.75,0,1,1,7.433,3.44A.75.75,0,0,1,9.682,18.75Zm2.875-4.814L9.9,11.281a.754.754,0,0,1-.22-.531V5.55a.75.75,0,1,1,1.5,0v4.889l2.436,2.436a.75.75,0,1,1-1.061,1.06Z" transform="translate(1.568 2.25)"/>
                    </svg>
                    <p>Recently Played</p>
				</button>
                <div className="downloading-case">
                    <div className="DC-header">
                        <h3>Downloads</h3>
                        <button className="toggle-downloads-vis">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>    
                        </button>
                    </div>
                    <div className="downloading-items display-none">
                        <div className="download-item">
                            <div className="img-case">
                                <div className="img"></div>
                            </div>
                            <div className="DI-second">
                                <p className="title">Portland - Drake.mp3</p>
                                <div className="progess-case">
                                    <progress></progress>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                                        </svg>
                                    </button>
                                </div>
                                <p className="details">1.5 of 4.4MB <i>(273 KB/s)</i> </p>
                            </div>
                        </div>

                    </div>
                </div>
                <button className="SB-btn SB-settings-btn" title="Controls">
                    <div className="strip display-none"></div>
                    <svg className="SB-settings-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z" /></svg>
                    <p>Settings</p>
                </button>
        </div>
    )
}