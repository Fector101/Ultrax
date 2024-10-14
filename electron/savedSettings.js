const Store=require("electron-store")

class UserSettings{
    data_to_init=[
                    'playlists','search_settings',
                    'fav_albums','fav_songs',
                    'choosen_folders',
                    'win-size','win-pos',
                    'win_size_b4_max','win_pos_b4_max',
                    'initialized',
                ]
    FIRST_RUN=false
    isdev=false
    constructor(isdev){
        this.isdev=isdev
        this.storage= new Store({
            paths:{
                type:'TypedArray'
            }
        })
        if(!this.storage.has('initialized')){
            this.init()
            this.FIRST_RUN=true
        }
        
        // else{
        //     console.log(this.storage.get('initialized'))
        // }
    }
    init(){
        this.data_to_init.forEach(key=>{
            let data=[]
            if(['playlists', 'search_settings'].includes(key)){
                if(key==='search_settings'){
                    // data={"used filters":[], "un_used filters":[]}
                    data={
                        spelling_accuracy: true,
                        adv_opt_visible:false,
                        used_basic_opts:['Song Title','Artist'],
                        un_used_basic_opts: ["Album", "Length"],
                        used_adv_opts:[],
                        un_used_adv_opts:[],
                        confirm:true,
                    }
                }else{
                    data={}
                }
            }else if(key === 'win-pos'){ 
                data=[null,null]
            }else if(key === 'initialized'){ 
                data=true
            }
            else if(key === 'win-size'){ 
                // data=[undefined,undefined]
                data=[900,650]

            }
            else if(key === 'win_size_b4_max'){
                data=[null,null]
            }
            this.storage.set(key,data)
        })
    }
    async unshiftData(key='',value=[]){
        // value sending a list of songs incase user adds alot of songs at once
        // savedSettings.unshiftData('playlists',["bish",['zname','122']])
        const old_data = this.storage.get(key)
        let new_data=undefined
        if(key==='playlists'){
            const playlist_name=value[0]
            const new_songs=value[1]
            // value[1] sending a list of songs incase user adds alot of songs at once

            new_data ={
                // this is to keep new at the top
                [playlist_name]:{
                    songs:[...new_songs,...old_data[playlist_name]['songs']],
                    date_created:old_data[playlist_name]['date_created'],
                    date_mod:Date.now() 
                }
            }
            
            const playlist_names =Object.keys(old_data)
            const playlist_tags =[]
            const playlists_songs =Object.values(old_data).map(each=>{
                                    playlist_tags.push({date_created:each['date_created'],date_mod:each['date_mod']})
                                    return each['songs']
                                })
            // cole.log(playlist_names)
            // cole.log(playlist_tags)
            // cole.log(playlists_songs)
            
            playlist_names.forEach((each,i)=>{
                if(each!== playlist_name){
                    new_data[each]={
                        songs:[...playlists_songs[i]],
                        date_created:playlist_tags[i]['date_created'],
                        date_mod:playlist_tags[i]['date_mod']
                        }
                }
            })
        }else{
            new_data=[...value,...old_data]
        }
        this.storage.set(key,new_data)
    }
    get filePath(){
        return this.storage.path
    }
    get isFirstRun(){
        return this.FIRST_RUN
    }
    get getListOf_Playlists(){
        return Object.keys(this.storage.get('playlists'))
    }
    createPlaylist(playlist_name=''){
        // savedSettings.createPlaylist('soft')
        
        const old_data = this.storage.get('playlists')
        if(this.getListOf_Playlists.includes(playlist_name)){
            return "already created"
        }else{
            this.storage.set('playlists',
                {
                    
                    [playlist_name]:{
                        songs:[],
                        date_created:Date.now(),
                        date_mod:Date.now()
                    }
                    ,
                    ...old_data
                }
            )
            return 'successfull'
        }
    }
    getData(key=''){
        return this.storage.get(key)
    }
    setData(key,value){
        this.storage.set(key,value)
    }
    get_coords(){
        const pos=this.getData('win-pos')
        const size=this.getData('win-size')
        let obj={
            x:pos[0],
            y:pos[1],
            width:size[0],
            height:size[1],
        }
        return obj
    }
}
module.exports=UserSettings
// }
// module.exports={
//     UserSettings
// }