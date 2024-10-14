import React from "react";
import "./../css/playercontrol.css"




class PlayerControl_BackEnd{
    #_prevPlayingElement=undefined
    #current_build=undefined
    _CURRENT_PLAYING=undefined
    #looping=false
    #shuffling=false
    volume=0.5
    #playlistCase=undefined

    #timestamp_for_prevBtn=30
    // for next method
    #going_back;
    // #playingElement = undefined
    #pre_full=[]
    #pre_empty=[]

    // SONG SLIDER
    #SLIDER_LOOP;
    play_as_slider_moves=true

    // Playback speed
    play_back_speed=1
    // favHeaderPlayBtn= document.querySelector('.fav_subBox.songs .curved-play-btn')


    songSeek = document.querySelector('.track-slider')
    PP_BTN=document.querySelector('#play-pause-btn')
    SKIP_BTN = document.querySelector('#skip-btn')
    PREV_BTN = document.querySelector('#prev-btn')
    skip10Btn = document.querySelector('#skip-10-btn')
    prev10Btn = document.querySelector('#prev-10-btn')
    VOLUME_SLIDER = document.querySelector('.volume-slider')
    toggleVolume = document.querySelector('.mute-btn')
    LOOP_BTN = document.querySelector('.loop-btn')
    SHUFFLE_BTN = document.querySelector('.shuffle-btn')
    

    constructor(){
        
        
        // Play Skip Prev
        this.PP_BTN.addEventListener('click',this.forPlayBtn.bind(this))
        
        // I have to send two arguments for order
        this.SKIP_BTN.addEventListener('click',this.nextHandler.bind(this,false))
        this.PREV_BTN.addEventListener('click',this.nextHandler.bind(this,'reverse'))
        this.skip10Btn.addEventListener('click',this.foward10Sec.bind(this,false))
        this.prev10Btn.addEventListener('click',this.foward10Sec.bind(this,'back'))      
        
        // SLIDER SONG
        this.songSeek.addEventListener('mousedown',this.cancelSeekLoop.bind(this))
        this.songSeek.addEventListener('input',this.raiseThumbSongSlider.bind(this))
        this.songSeek.addEventListener('mouseup',this.dropThumbSongSlider.bind(this))

        // LOOP && VOLUME && SHUFFLE
        this.LOOP_BTN.addEventListener('click',this.toggleLooping.bind(this))
        this.VOLUME_SLIDER.value=this.volume*100
        this.SHUFFLE_BTN.addEventListener('click',this.shuffleBtn.bind(this))

    }
    get give_current_playing_ele(){
        return this.#current_build
    }
    shuffleBtn(e){
        if(e.pointerId === -1)return
        SHUFFLING = !SHUFFLING
        this.SHUFFLE_BTN.classList.toggle('active-circle')
    }
    cancelSeekLoop(){
        // There are no errors if loop is not ongoing (I Checked)
        clearInterval(this.#SLIDER_LOOP)
        this.#SLIDER_LOOP=undefined
    }
    raiseThumbSongSlider(){
        if(_CURRENT_PLAYING && this.play_as_slider_moves)
        _CURRENT_PLAYING.currentTime=Number(this.songSeek.value)
        
        if(_CURRENT_PLAYING) {
            startTime.textContent=formatTime(this.songSeek.value)
            this.sliderDesign(false)
        }
        else{
            this.sliderDesign()
        }
    }
    dropThumbSongSlider(){
        if(!_CURRENT_PLAYING) return
        _CURRENT_PLAYING.currentTime=Number(this.songSeek.value)
        this.continueLoopSongSlider()
    }
    continueLoopSongSlider(){
        this.sliderDesign()
        this.#SLIDER_LOOP=setInterval(()=>{
        this.sliderDesign()
        },300)
    }
    setSlider(element){
        this.songSeek.max=element.querySelector('.song-lengthjs').dataset.durate
        currentSongLeng=+this.songSeek.max
        this.sliderDesign()
        this.cancelSeekLoop()
        this.continueLoopSongSlider()
    }
    sliderDesign(notUser=true){
        let current_time__;
        if(_CURRENT_PLAYING && notUser){
            current_time__=_CURRENT_PLAYING.currentTime
            startTime.textContent=formatTime(current_time__)||'0:00'
            this.songSeek.value=current_time__
    
        }
        if(_CURRENT_PLAYING && displayBackwards && notUser)endTime.textContent = '- '+formatTime(currentSongLeng - current_time__)
        if(!notUser&&_CURRENT_PLAYING && displayBackwards)endTime.textContent = '- '+formatTime(this.songSeek.max - this.songSeek.value)
        const x = (this.songSeek.value/this.songSeek.max)*100 +0.1
        this.songSeek.style.background=`linear-gradient(90deg, #41af3e ${x}%, rgb(214,214,214) ${x}%)`
    }
    
    forPlayBtn(event){
        if(event.pointerId == -1)return
        if(!_CURRENT_PLAYING){
            if(_PLAYLIST.length==0){
                let currentMiniTab = Tabs.current_big_tab.querySelector('.forbuild1js:not([style*="display: none;"])')
                let firstVisibleSong=currentMiniTab?.querySelector('.build1js:not([style*="display: none"])')
                if(firstVisibleSong){
                    this.processSource(firstVisibleSong.dataset.src,firstVisibleSong,true)   
                    return
                }
            }
            else if(_PLAYLIST){
                this.processSource(_PLAYLIST[0].dataset.src,_PLAYLIST[0],false)   
                return
            }
        }
        
        this.cancelSeekLoop()
        this.togglePlaying()
    
    }
    togglePlaying(){
        if(_CURRENT_PLAYING){
            if(_CURRENT_PLAYING?.paused){
                this.myPlay()
                this.continueLoopSongSlider()

            }
            else{
                this.myPause()
            }
                
        }
    }
    processSource(audioSrc,currentBuild,frm_Build){        
        if(_CURRENT_PLAYING){
            this.stopPlaying()
        }
        this.#current_build=currentBuild
        this._PlayingDesign(currentBuild)
        this.#playlistCase =currentBuild.closest('.forbuild1js')
        _CURRENT_PLAYING = new Audio(`${audioSrc}`)
        // currentBuild.classList.add('current')
        _CURRENT_PLAYING.addEventListener('error',this.errorPlaying.bind(this,false))

        // Do check for through bridge if path exists else call this.errorPlaying()
        this.myPlay()

        displayNowPlaying(currentBuild)
        this.setSlider(currentBuild)
        _CURRENT_PLAYING.loop=this.#looping
        _CURRENT_PLAYING.playbackRate=this.play_back_speed
        _CURRENT_PLAYING.volume=this.volume
        endTime.textContent=currentBuild.querySelector('.song-lengthjs').textContent

        if(frm_Build){
            _PLAYLIST=[...this.#playlistCase.querySelectorAll('.build1js:not([style*="display: none"])')]
            this._makePlayList()
        }
        else{
            if(currentBuild.style.display!=='none')buildScroll(currentBuild)
            this._makePlayList()
        }

        cancelPlayerControlAnime()
        setTimeout(startTitleAni,1000)
        _CURRENT_PLAYING.addEventListener('ended',this.nextHandler.bind(this,false))

    }
    favHeaderDesPause(){
        this.favHeaderPlayBtn.querySelector('.pausejs').classList.add('display-none')
        this.favHeaderPlayBtn.querySelector('.playjs').classList.remove('display-none')
        this.favHeaderPlayBtn.querySelector('span').textContent='Play'
    }
    favHeaderDesPlay(){
        this.favHeaderPlayBtn.querySelector('.playjs').classList.add('display-none')
        this.favHeaderPlayBtn.querySelector('.pausejs').classList.remove('display-none')
        this.favHeaderPlayBtn.querySelector('span').textContent='Pause'
    }
    myPlay(){
        // console.log(this)
        const self=this
        async function fromAlbum(){
            const album_name =self.#current_build.querySelector('.song-albumjs').innerText
            const album_case=document.getElementById(`${album_name}`)
            if(!album_case)return
            const album_btn = album_case.querySelector('.PA-play-btn')
            album_btn.querySelector('.playjs').classList.add('display-none')
            album_btn.querySelector('.pausejs').classList.remove('display-none')
            album_btn.querySelector('.PA-play-txt').textContent='Pause'
            

            // Header
            const current_album_user_sees = document.querySelector('.popup-texts .album')
            const header_album_btn = document.querySelector('.popup-btns-container .PA-play-btn')
            if(current_album_user_sees.innerText===self.#current_build.querySelector('.song-albumjs').innerText){
                header_album_btn.querySelector('.playjs').classList.add('display-none')
                header_album_btn.querySelector('.pausejs').classList.remove('display-none')
                header_album_btn.querySelector('.PA-play-txt').textContent='Pause'
            }

            // For Fav Section
            if(self.#current_build.dataset.fav){ 
                self.favHeaderDesPlay()    
            }
            
            
        }
        _CURRENT_PLAYING.play()
        fromAlbum()
        this.PP_BTN.querySelector('.pause-icon').classList.remove('display-none')
        this.PP_BTN.querySelector('.play-icon').classList.add('display-none')
        this.PP_BTN.setAttribute('title','pause')
    }
    myPause(){
        const self=this
        async function fromAlbum(){
            const album_name =self.#current_build.querySelector('.song-albumjs').innerText
            const album_case=document.getElementById(`${album_name}`)
            if(!album_case)return
            const album_btn = album_case.querySelector('.PA-play-btn')
            album_btn.querySelector('.pausejs').classList.add('display-none')
            album_btn.querySelector('.playjs').classList.remove('display-none')
            album_btn.querySelector('.PA-play-txt').textContent='Play'

             // Header
             const current_album_user_sees = document.querySelector('.popup-texts .album')
             const header_album_btn = document.querySelector('.popup-btns-container .PA-play-btn')
             if(current_album_user_sees.innerText===self.#current_build.querySelector('.song-albumjs').innerText){
                 header_album_btn.querySelector('.playjs').classList.remove('display-none')
                 header_album_btn.querySelector('.pausejs').classList.add('display-none')
                 header_album_btn.querySelector('.PA-play-txt').textContent='Play'
             }

             if(self.#current_build.dataset.fav){
                self.favHeaderDesPause()
            }
        }
        if(!_CURRENT_PLAYING)return
        _CURRENT_PLAYING.pause()
        fromAlbum()
        this.PP_BTN.querySelector('.play-icon').classList.remove('display-none')
        this.PP_BTN.querySelector('.pause-icon').classList.add('display-none')
        this.PP_BTN.setAttribute('title','play')
    }
    stopPlaying(){
        this.#timestamp_for_prevBtn = _CURRENT_PLAYING.currentTime
        try{
            this.myPause()
        }catch{console.log('change song to fast error')}
    
        _CURRENT_PLAYING.currentTime = 0
        _CURRENT_PLAYING=undefined
        this.cancelSeekLoop()
    }
    async _PlayingDesign(tappedElement){
        this.#_prevPlayingElement?.classList.remove('playing-src')
        tappedElement.classList.add('playing-src')
        this.#_prevPlayingElement=tappedElement
        document.querySelectorAll(`.build1js`).forEach(each=>{
            if(each.dataset.src===tappedElement.dataset.src){
                each.classList.add('playing-src')
            }else{
                each.classList.remove('playing-src')
            }
        })
    }
    errorPlaying(){
            this.#current_build.classList.remove('current')
            _PLAYLIST=Array.from(this.#playlistCase.querySelectorAll('.build1js:not([style*="display: none"])'))
            const endBlock=document.querySelector('.end')
            endBlock.querySelector('.EF-S-I-data').style.backgroundImage=''
            endBlock.querySelector('.end-song-title').textContent=''
            endBlock.querySelector('.end-song-title1').textContent=''
            endBlock.querySelector('.end-song-artist').textContent=''
            endBlock.querySelector('.start-time').textContent='0:00'
            endBlock.querySelector('.end-time').textContent='0:00'
            this.songSeek.value=0
            // console.log(endBlock.querySelector('.track-slider'))
            // this.sliderDesign()
            this.songSeek.style.background=`linear-gradient(90deg, #41af3e 0%, rgb(214,214,214) 0%)`

            remove_song_frm_app(this.#current_build.dataset.src,true)
            // let folder_box= Array.from(document.querySelectorAll('.folderBuild')).find(each=>each.dataset.src===this.#playlistCase.getAttribute('id'))
            // console.log(folder_box,'can"t be empty check if empty')
            
            // if(folder_box){
            //     let no_of_files=folder_box.querySelector('.file-nojs')
            //     let num__=parseInt(no_of_files.textContent)-1
            //     no_of_files.textContent= num__
            //     if(num__==0){
            //         document.querySelector('.tapped-folder').textContent=''
            //         document.querySelector('.path-text').textContent=''
            //         folder_box.style.display='none'
            //         folder_box.remove()
            //         Tabs.FT.switchMiniTabs('FOLDERS')
            //     }else{
            //         let no_of_size=folder_box.querySelector('.folder-size')
            //         no_of_size.textContent= parseInt(no_of_size.textContent)-parseFloat(this.#current_build.querySelector('.size').innerText)
            //     }
    
            // }
            //  document.querySelectorAll(`.build1js`).forEach(each=>{
            //     if(each.dataset.src===this.#current_build.dataset.src){
            //         each.style.display='none'
            //         each.remove()
            //     }
            // })
            notificationControl(`Can't Play ${_CURRENT_PLAYING.getAttribute('src')}`,7)
            this.stopPlaying()

            this.next()
            
            
    }
    async _makePlayList(){
        await makePlaylist()
        makeMiniPlaylist()
    }
    nextHandler(reverse=false,event){        
        if (event.pointerId !== -1) this.next(reverse)
    }
    
    next(reverse=false){
        const ranIntFun=()=> Math.floor(Math.random()*this.#pre_full.length)
        if(!_CURRENT_PLAYING) return
        this.stopPlaying()
        if(this.#shuffling){
            if(reverse){
                let ind;
                if(this.#going_back){
                    ind = this.#pre_empty.indexOf(this.#current_build)-1
                }else{
                    ind = this.#pre_empty.length-1
                    this.#pre_empty.push(this.#current_build)
                }
                this.#going_back=true
                if(ind===-1){
                    console.log(ind,'start')
                    
                    ind=this.#pre_empty.length-1
                    console.log(ind,'end')
                }
                let choosenEle=this.#pre_empty.at(ind)
                this.processSource(`${choosenEle.dataset.src}`,choosenEle,false)
            }
            else{
                let ind = this.#pre_full.indexOf(this.#current_build)
                this.#pre_full.splice(ind,1)
                if(!this.#pre_full.length){
                    this.#pre_full=_PLAYLIST
                    
                }
                this.#going_back?{}:this.#pre_empty.push(this.#current_build)//for skipping back
                this.#going_back=false
                let choosenEle=this.#pre_full[ranIntFun()]
                this.processSource(`${choosenEle.dataset.src}`,choosenEle,false)
                }
            return
        }

        else{
            let use_Index;
            if(reverse){
                if(this.#timestamp_for_prevBtn < 10){ 
                use_Index = _PLAYLIST.indexOf(this.#current_build)=== 0? _PLAYLIST.length-1: _PLAYLIST.indexOf(this.#current_build)-1}
                else{
                    use_Index=_PLAYLIST.indexOf(this.#current_build)
                }
            }
            else {
                use_Index = _PLAYLIST.indexOf(this.#current_build) === _PLAYLIST.length -1? 0: _PLAYLIST.indexOf(this.#current_build)+1
            }    
            if(_PLAYLIST.length===0)return
            this.processSource(`${_PLAYLIST[use_Index].dataset.src}`,_PLAYLIST[use_Index],false)
        }
        this.#going_back=false
    }
    foward10Sec(if_back,event){
        if(event.pointerId == -1)return
        if(!_CURRENT_PLAYING)return
        this.cancelSeekLoop()
        _CURRENT_PLAYING.currentTime += if_back ? -10 : 10
        this.continueLoopSongSlider()
    }
    speedFun(textContent){
        this.play_back_speed=parseFloat(textContent)
        // console.log(this.play_back_speed)
        
        if(1===Number(this.play_back_speed)){
            playBackBtn.querySelector('svg').style.fill='white'
        }else{
            playBackBtn.querySelector('svg').style.fill='#a6e48c'
            // playBackBtn.querySelector('svg').style.fill='#67b546'
        }
        if(_CURRENT_PLAYING){
            _CURRENT_PLAYING.playbackRate=this.play_back_speed
        }
    }
    toggleLooping(event){
        if(event.pointerId === -1)return
        if(_CURRENT_PLAYING )_CURRENT_PLAYING.loop=!this.#looping
        this.#looping=!this.#looping
        this.LOOP_BTN.classList.toggle('active-circle')
    
    }
}

export default function PlayerControl(){
    React.useEffect(function(){
        const omega_control= new PlayerControl_BackEnd()
    },[])
    function raiseThumbSongSlider(e){
        console.log(e)
    }
    return (
        <section className="end">
            <div className="end-first">
                <div className="EF-S-I-data"></div>
                <div className="end-current-song-texts">
                    <div className="casex">
                        <p className="end-song-title"> </p>
                        <p className="end-song-title1"></p>
                    </div>
                    <p className="end-song-artist"></p>
                </div>
            </div>

            <div className="end-second">
                <div className="end-second-first">
                    <div className="playercon-main-btns-box">


                        <button title="rewind 10 secs" id="prev-10-btn" type="button">
                            <svg fill="white" height="23" viewBox="0 0 24 24" width="23" xmlns="http://www.w3.org/2000/svg">
                                <path d="m9.5415 16.6708c-.41 0-.75-.34-.75-.75v-3.39l-.19.22c-.28.31-.75.33-1.06.06-.31-.28-.33-.75-.06-1.06l1.5-1.67c.21-.22999.54-.30999.83-.19999s.48.38999.48.69999v5.35c0 .41-.33.74-.75.74z" />
                                <path d="m12.0011 3.47974c-.08 0-.16.01-.24.01l.82-1.02c.26-.32.21-.8-.12-1.05-.32-.26-.79-.21-1.05.12l-1.97001 2.46c-.01.01-.01.02-.02.04-.03.04-.05.09-.07.13-.02.05-.04.09-.05.13-.01.05-.01.09-.01.14v.15.05c.01.03.03.05.04.09.02.05.03.09.06.13s.06.08.1.12c.02.02.04.05.06.07.01.01.03.01.04.02.03.02.06.04.1.05.05.03.1.05.15.06.04.02.07.02.11.02.03 0 .05001.01.08001.01.02 0 .05-.01.07-.02h.1c.64-.15 1.24-.22 1.81-.22 4.49 0 8.14 3.65 8.14 8.13996 0 4.49-3.65 8.14-8.14 8.14-4.49001 0-8.14001-3.65-8.14001-8.14 0-1.74.57-3.41996 1.65-4.85996.25-.33.18-.8-.15-1.05s-.8-.18-1.05.15c-1.28 1.7-1.95 3.68996-1.95 5.75996 0 5.31 4.32 9.64 9.64001 9.64 5.32 0 9.64-4.32 9.64-9.64 0-5.31996-4.34-9.62996-9.65-9.62996z" />
                                <path d="m14 16.6703c-1.52 0-2.75-1.23-2.75-2.75v-1.35c0-1.52 1.23-2.74999 2.75-2.74999s2.75 1.22999 2.75 2.74999v1.35c0 1.52-1.23 2.75-2.75 2.75zm0-5.34c-.69 0-1.25.56-1.25 1.25v1.35c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25v-1.35c0-.69-.56-1.25-1.25-1.25z" />
                            </svg>

                        </button>
                        <button title="rewind" id="prev-btn" type="button">
                            <img src="components/icons/previous.png" id="prev-icon" alt=""/>
                        </button>
                        <button title="play" id="play-pause-btn" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" className="play-icon" viewBox="0 0 448 512">
                                <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                            </svg>
                            <svg viewBox="0 0 448 512" className="pause-icon display-none">
                                <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/>
                            </svg>
                        </button>
                        <button title="forward" id="skip-btn" type="button">
                            <img src="components/icons/skip.png" id="skip-icon" alt=""/>
                        </button>
                        <button title="forward 10 secs" id="skip-10-btn" type="button">
                            <svg fill="none" height="23" viewBox="0 0 24 24" width="23"
                                xmlns="http://www.w3.org/2000/svg">
                                <g stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
                                    <path d="m13.98 4.46997-1.98-2.46997" />
                                    <path
                                        d="m19.0899 7.79999c1.11 1.48 1.8 3.31001 1.8 5.31001 0 4.91-3.98 8.89-8.89 8.89-4.91002 0-8.89004-3.98-8.89004-8.89 0-4.91001 3.98002-8.89003 8.89004-8.89003.68 0 1.34.09005 1.98.24005" />
                                    <path d="m9.54004 15.92v-5.3399l-1.5 1.67" />
                                    <path
                                        d="m14 10.5801c1.1 0 2 .9 2 2v1.35c0 1.1-.9 2-2 2s-2-.9-2-2v-1.35c0-1.11.9-2 2-2z" />
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div className="block0">
                        <p className="inline-block start-time">0:00</p>
                        <input title="song-seek" className="track-slider" onInput={raiseThumbSongSlider} type="range" min="0" max="130" value="0" style={{accentColor: "#2ecc71"}}/>
                        <p className="inline-block end-time">3:15</p>
                    </div>
                </div>
                <div className="end-second-last">
                    <div className="control-adv-btns">


                        <div className="control-btns">
                            <div className="pb-box modal coverx display-none">
                                <div className="speed-head">
                                    <p>Playback speed</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">3.5x</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">3x</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">2.5x</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">2x</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">1.5x</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">1.2x</p>
                                </div>
                                <div className="speed-btn1 active-speed">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"> <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" /></svg>
                                    <p className="dcmjs">1x (Normal)</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">0.8x</p>
                                </div>
                                <div className="speed-btn1">
                                    <p className="dcmjs">0.5x</p>
                                </div>
                            </div>
                            <button title="Chang Song Speed" className="playback-btn">
                                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m9.60751 1.51737c.77009-.17508 1.57099-.26737 2.39249-.26737 5.9371 0 10.75 4.81294 10.75 10.75 0 5.9371-4.8129 10.75-10.75 10.75-.8215 0-1.6224-.0923-2.39249-.2674-.40391-.0918-.6569-.4937-.56507-.8976s.4937-.6569.89761-.565c.66175.1504 1.35105.23 2.05995.23 5.1086 0 9.25-4.1414 9.25-9.25 0-5.10863-4.1414-9.25-9.25-9.25-.7089 0-1.3982.0796-2.05995.23004-.40391.09183-.80578-.16116-.89761-.56507s.16116-.80578.56507-.8976z" />
                                    <path d="m7.31372 3.13198c.22071.35052.11547.81359-.23504 1.03429-1.17519.73996-2.17245 1.73722-2.91241 2.91241-.22071.35051-.68377.45575-1.03429.23504-.35052-.2207-.45575-.68377-.23505-1.03428.85953-1.36508 2.01743-2.52298 3.3825-3.38251.35052-.2207.81359-.11547 1.03429.23505z" />
                                    <path d="m2.98004 9.94005c.09183-.40391-.16116-.80578-.56507-.89761s-.80578.16116-.8976.56507c-.17508.77009-.26737 1.57099-.26737 2.39249s.09229 1.6224.26737 2.3925c.09182.4039.49369.6569.8976.5651.40391-.0919.6569-.4937.56507-.8976-.15044-.6618-.23004-1.3511-.23004-2.06s.0796-1.3982.23004-2.05995z" />
                                    <path d="m3.13198 16.6863c.35052-.2207.81359-.1155 1.03429.235.73996 1.1752 1.73722 2.1725 2.91241 2.9124.35051.2207.45575.6838.23504 1.0343-.2207.3505-.68377.4558-1.03428.2351-1.36508-.8596-2.52298-2.0175-3.38251-3.3825-.2207-.3506-.11547-.8136.23505-1.0343z" />
                                    <path d="m15.4137 10.941c.7817.4616.7817 1.6564 0 2.118l-4.7202 2.7868c-.75979.4486-1.6935-.1353-1.6935-1.059v-5.57364c0-.92369.93371-1.50755 1.6935-1.05897z" />
                                </svg>
                            </button>

                            <button type="button" className="loop-btn" title="btn">
                                <img src="components/icons/loop.png" alt="" srcSet=""/>
                            </button>
                            <button type="button" className="shuffle-btn" id="" title="btn">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M403.8 34.4c12-5 25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V160H352c-10.1 0-19.6 4.7-25.6 12.8L284 229.3 244 176l31.2-41.6C293.3 110.2 321.8 96 352 96h32V64c0-12.9 7.8-24.6 19.8-29.6zM164 282.7L204 336l-31.2 41.6C154.7 401.8 126.2 416 96 416H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c10.1 0 19.6-4.7 25.6-12.8L164 282.7zm274.6 188c-9.2 9.2-22.9 11.9-34.9 6.9s-19.8-16.6-19.8-29.6V416H352c-30.2 0-58.7-14.2-76.8-38.4L121.6 172.8c-6-8.1-15.5-12.8-25.6-12.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H96c30.2 0 58.7 14.2 76.8 38.4L326.4 339.2c6 8.1 15.5 12.8 25.6 12.8h32V320c0-12.9 7.8-24.6 19.8-29.6s25.7-2.2 34.9 6.9l64 64c6 6 9.4 14.1 9.4 22.6s-3.4 16.6-9.4 22.6l-64 64z" />
                                </svg>
                            </button>

                        </div>
                        <div className="control-btns2">
                            <button type="button" className="heart-btn" title="btn"><img src="components/icons/heart.png" alt=""
                                    srcSet=""/></button>
                            <button type="button" className="addlist-btn" title="btn"><img src="components/icons/add list.png"
                                    alt="" srcSet=""/></button>
                            <button type="button" className="playlist-btn" title="btn"><img src="components/icons/playlist.png"
                                    alt="" srcSet=""/></button>
                            <button type="button" className="share-btn" title="btn">
                                <svg className="PA-vert-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" /></svg>
                                
                            </button> 
                        </div>
                    </div>
                    <div className="volume-box">
                        <button type="button" className="mute-btn" title="btn">
                            <p className="vol-per display-none"></p>

                            <svg className='mute-vol display-none' viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="m2 7.5v3c0 .8.6 1.5 1.4 1.5h2.3l3.2 2.8c.1.1.3.2.4.2s.2 0 .3-.1c.2-.1.4-.4.4-.7v-.9l-7.2-7.2c-.5.2-.8.8-.8 1.4zm8 2v-5.8c0-.3-.1-.5-.4-.7-.1 0-.2 0-.3 0s-.3 0-.4.2l-2.8 2.5-4.1-4.1-1 1 3.4 3.4 5.6 5.6 3.6 3.6 1-1z" fillRule="evenodd"/>
                            </svg>
                            <svg className='low-vol display-none' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m0 0h24v24h-24z" fill="#fff" opacity="0"/>
                                <path d="m20.78 8.37a1 1 0 1 0 -1.56 1.26 4 4 0 0 1 0 4.74 1 1 0 0 0 .78 1.63 1 1 0 0 0 .78-.37 6 6 0 0 0 0-7.26z"/>
                                <path d="m16.47 3.12a1 1 0 0 0 -1 0l-6.47 4.45h-5a1 1 0 0 0 -1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4a1.06 1.06 0 0 0 .59.17 1 1 0 0 0 1-1v-16a1 1 0 0 0 -.53-.88z"/>
                            </svg>
                            <svg className='mid-vol display-none' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m0 0h24v24h-24z" fill="#fff" opacity="0"/>
                                <path d="m18.28 8.37a1 1 0 1 0 -1.56 1.26 4 4 0 0 1 0 4.74 1 1 0 0 0 .78 1.63 1 1 0 0 0 .78-.37 6 6 0 0 0 0-7.26z"/>
                                <path d="m19.64 5.23a1 1 0 1 0 -1.28 1.54 6.8 6.8 0 0 1 2.64 5.23 6.8 6.8 0 0 1 -2.64 5.23 1 1 0 0 0 -.13 1.41 1 1 0 0 0 .77.36 1 1 0 0 0 .64-.23 8.75 8.75 0 0 0 3.36-6.77 8.75 8.75 0 0 0 -3.36-6.77z"/>
                                <path d="m14.47 3.12a1 1 0 0 0 -1 0l-6.47 4.45h-5a1 1 0 0 0 -1 1v6.86a1 1 0 0 0 1 1h5l6.41 4.4a1.06 1.06 0 0 0 .59.17 1 1 0 0 0 1-1v-16a1 1 0 0 0 -.53-.88z"/>
                            </svg>
                            <svg className='nom-vol display-none' viewBox="0 0 640 512">
                                <path d="M533.6 32.5C598.5 85.3 640 165.8 640 256s-41.5 170.8-106.4 223.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C557.5 398.2 592 331.2 592 256s-34.5-142.2-88.7-186.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM473.1 107c43.2 35.2 70.9 88.9 70.9 149s-27.7 113.8-70.9 149c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C475.3 341.3 496 301.1 496 256s-20.7-85.3-53.2-111.8c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zm-60.5 74.5C434.1 199.1 448 225.9 448 256s-13.9 56.9-35.4 74.5c-10.3 8.4-25.4 6.8-33.8-3.5s-6.8-25.4 3.5-33.8C393.1 284.4 400 271 400 256s-6.9-28.4-17.7-37.3c-10.3-8.4-11.8-23.5-3.5-33.8s23.5-11.8 33.8-3.5zM301.1 34.8C312.6 40 320 51.4 320 64V448c0 12.6-7.4 24-18.9 29.2s-25 3.1-34.4-5.3L131.8 352H64c-35.3 0-64-28.7-64-64V224c0-35.3 28.7-64 64-64h67.8L266.7 40.1c9.4-8.4 22.9-10.4 34.4-5.3z"/>
                            </svg>
                        </button>
                        <input className="volume-slider" onInput={raiseThumbSongSlider} type="range" min="0" max="100" value="0"/>
                    </div>


                </div>


            </div>
        </section>
    )
}

        // SLIDER SONG
// this.songSeek.addEventListener('mousedown',this.cancelSeekLoop.bind(this))
// this.songSeek.addEventListener('input',this.raiseThumbSongSlider.bind(this))
// this.songSeek.addEventListener('mouseup',this.dropThumbSongSlider.bind(this))
