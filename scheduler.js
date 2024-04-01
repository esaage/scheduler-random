import fs from 'fs';
let dataArrayPrivateKey = fs.readFileSync('tespk.txt', 'utf-8').split('\n');

/* 
  Scheduler begin
*/

function randomNumberS(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
} 

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
// get date di masa depan
function getListOfFutureDates(numDays) {
    var dateList = [];
    var currentDate = new Date();
  
    for (var i = 1; i <= numDays; i++) {
      var futureDate = new Date(currentDate.getTime() + (i * 24 * 60 * 60 * 1000));
      var formattedDate = futureDate.getFullYear() + '-' + ('0' + (futureDate.getMonth() + 1)).slice(-2) + '-' + ('0' + futureDate.getDate()).slice(-2);
      dateList.push(formattedDate);
    }
  
    return dateList;
  }
  // get date hari ini
  function dateNow() {
  
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
  }
  // menyimpan "date hari ini" ke list "date di masa depan"
  let firstDate = dateNow()
  var futureDates = getListOfFutureDates(20);
  futureDates.unshift(firstDate)

  // menyimpan semua future date ke array schedule
  let schedule = []
  for (let i = 0; i < futureDates.length; i++) {
    schedule[futureDates[i]] = []
  }

  let random =  randomNumberS(4,7) 
  for (let p = 0; p < dataArrayPrivateKey.length; p++) {

      for (let i = 0; i < futureDates.length; i++) {
        
        if(i == random) {

          random = random + randomNumberS(4,7)
          continue

        } else {

          schedule[futureDates[i]].push(dataArrayPrivateKey[p])

        }
      }
    random = randomNumberS(4,7) // reset lagi nilai "random" tiap pergantian akun
      
  }
console.log(schedule);
// process.exit()
/* 
  Scheduler end
*/

(async()=>{    

    while (true) {
      
      let dateToday = dateNow() // get date hari ini

      // looping schedule hari ini untuk di ambil PK yg jadwal run-nya hari ini
      for (let i = 0; i < schedule[dateToday].length; i++) {
        console.log("processing pk = "+ schedule[dateToday][i]);
        // PROCESS HERE
        // PROCESS HERE
        // PROCESS HERE
        // PROCESS HERE
        // PROCESS HERE
        console.log('NEXT ACCOUNT')
        await sleep(1000)
      }

      console.log('delay 24jam')
      await sleep(86400000)
    }
})()
