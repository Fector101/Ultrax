import React from "react";
import { formatSize } from "./helper_funcs";
import './../css/folderbtn.css'
export default function FolderBtn({sendPath,name_,len,size,date_cre,date_mod,dur}){
    return (
        <div onClick={(e)=>{sendPath(e.target.closest('.folderBuild').dataset.src)}} data-src={name_} data-date={date_mod} data-size={size || 0} className="folder-grid folderBuild">
            <div className="folder-cover-box-grid" >
                <div className="folder">
                    <div className="folder-cap"></div>
                </div>
                {/* <div className="folder-cover-grid"> */}
                    {/* <img src="components/icons/folder1.png" alt="" srcSet=""/> */}
                {/* </div> */}
            </div>
            <div className="folder-words-grid">
                <p className="folder-name"> {name_.split('\\').at(-1)} </p>
                <div className="folder-info">
                    <span className="file-nojs">
                        {len}
                        </span> <em>audio files</em>
                    <span className='display-list folder-size' style={{display: 'none'}}> 
                        {formatSize(size)}
                    </span>
                </div>
                <p className='display-list' style={{display: "none",padding: "0 5px",fontSize: "15px",color: "#a2a2a2f2",background: "#6fbf6e00", borderRadius: '7px'}}>{name_}</p>
            </div>
        </div>
    )
}