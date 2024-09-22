/*
* time separate values with ':' ie (hrs:mins:secs) or (mins:secs)
*/
function timeToSeconds(time = "01:30:10") {
  let [hours, minutes, seconds] = time.split(":")
  let total_secs=0
  
  if(seconds){//if seconds has a value that means hrs had been inputed
 total_secs=(+hours*60*60)+(+minutes*60)+parseInt(seconds)
} else { // here's is only minutes and seconds 
//Here minutes is stored in hours variable and seconds in minutes, then second var is undefined 
   total_secs = 
   (+hours * 60) + parseInt(minutes)
   
 }
  return total_secs
}
console.log(timeToSeconds())
