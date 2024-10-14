import React from "react"
import { formatDate, formatTime} from "./helper_funcs"

const SongBuild=React.memo(function({file_path,album,album_artist,title,pic,dur,size,fav}){
    const in_fav_svg=<svg className="fav-svg fav-svgjs in-favjs" viewBox="0 0 512 512"><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
    const not_in_fav_svg=<svg className="fav-svg fav-svgjs not-in-favjs" viewBox="0 0 512 512"><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
    return (
        <div data-fav="${currentTag__.fav || ''}" data-src="${each_file_path.replace(/#/g,'%23')}" className="build1js build1">
            <div className="song-cover-box song-cover-boxjs" >
                <div className="song-cover song-coverjs" style={{'backgroundImage': pic}}>
                {!pic && 
                    <svg className="song-cover-svg" viewBox="0 0 512 512"><path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7v72V368c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V147L192 223.8V432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6V200 128c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z"/></svg>
                }
                </div>
            </div>
    
            <div className="song-title song-titlejs"><p>{title ||file_path.split('\\').at(-1).split('.').at(0)}</p></div>
            
            <div className="song-artist song-artistjs"><p>{album_artist}</p></div>
            <div className="song-album song-albumjs"><p>{album || ''}</p></div>
            <div className="size display-none">{size || 0}</div>
            
            <div data-durate="${currentTag__?.duration||0}" className="song-length song-lengthjs">
                {formatTime(dur)}
                </div>
            
            
            <div className="build1-btn-case">
                <button type="button" className="fav-btn-build">
                {fav?in_fav_svg:not_in_fav_svg}
                </button>
            </div>
        </div>
        )
    })
export default SongBuild