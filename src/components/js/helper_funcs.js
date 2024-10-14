function toHHMMSS(str){
    let sec_num=parseInt(str,10)
    let hrs=Math.floor(sec_num/3600)
    let mins=Math.floor((sec_num - (hrs * 3600)) / 60)
    let secs=sec_num - (hrs * 3600) - (mins * 60)
    let change=(input)=>input.toString().padStart(2,'0')
    return `${change(hrs)}:${change(mins)}:${change(secs)}`
}
/**
 * 
 * @param {Number} secs representing a single element. 
 * @returns {String}
 */
let formatDate=(secs)=>Intl.DateTimeFormat('default',{hour12:true,hour:'numeric',minute:'numeric',weekday:'long',month:'short',year:'numeric'}).format(secs) || 'None'

function formatTime(ver,for_playlist=false){
    // console.log(ver,typeof ver)
    if(!ver)return 0
    let change=(input)=>input.toString().padStart(2,'0')
    ver = typeof ver === 'string'?parseFloat(ver):ver
    // let hrs = 0
    let mins = Math.floor(ver/60)
    let secs = Math.round(ver % 60)//.toString().padStart(2,'0')
    if(secs==60){
        secs=0
        mins++
    }
    return `${mins}:${change(secs)}`
}

function formatSize(bytes){
    let dec_place= (float,places=2) => float.toFixed(places)
    if(typeof bytes === 'string'){
        bytes=parseFloat(bytes)
    }
    if(bytes >=(1024*1024*1024)){
        return dec_place(bytes/(1024*1024*1024)) + ' GB'
    }else if(bytes >= (1024*1024) ){
        return dec_place(bytes/(1024*1024)) + ' MB'
    }else if(bytes>=1024){
        return dec_place(bytes/1024) + ' KB'
    }else{
        return dec_place(bytes) + ' bytes'
    }
}

let MY_LOCAL_VARIABLES={
    list_for_search:[]
}



/**
 * @returns {String} rgb(0, 0, 0)
 */
export function get_avg_rgb(img){
    if(!img)return ''
    img=typeof img === 'object' ? img.style.backgroundImage.replace('url("','').replace('")',''):img
    let context=document.createElement('canvas').getContext('2d')
    
    if(typeof img==='string'){
        let src=img.replace('url(','').replace(')','')
        img = new Image
        img.setAttribute('crossOrign','')
        img.src=src.replace('&quot;','')
        // console.log(img)
        
    }
    context.imageSmoothingEnabled=true
    context.drawImage(img,0,0,1,1)
    let to_return=context.getImageData(0,0,1,1).data.slice(0,3)
    let offset=2.3
    // console.log(to_return)
    if(to_return[0]<=50 && to_return[1]<=50 && to_return[2]<=50){
        let offset=9.5
        // console.log(to_return[0],to_return[1],to_return[2])
        return `rgb(${to_return[0]*offset}, ${to_return[1]*offset}, ${to_return[2]*offset})`
    }else if(to_return[0]>=180 && to_return[1]>=180 && to_return[2]>=180){
        let offset=1.5
        return `rgb(${to_return[0]/offset}, ${to_return[1]/offset}, ${to_return[2]/offset})`
    }else if(to_return[0]>=100 && to_return[1]>=100 && to_return[2]>=100){
        return `rgb(${to_return[0]}, ${to_return[1]}, ${to_return[2]})`
    }
        // console.log(to_return[0],to_return[1],to_return[2])
    // console.log(`rgb(${to_return[0]*offset}, ${to_return[1]*offset}, ${to_return[2]*offset})`)
    return `rgb(${to_return[0]*offset}, ${to_return[1]*offset}, ${to_return[2]*offset})`
    // console.log(img.style.backgroundImage.replace('url("','').replace('")',''))
    // rgb(35, 67, 88) rgb(149 173 189)
}

export {formatDate,formatTime,formatSize,toHHMMSS,MY_LOCAL_VARIABLES}

