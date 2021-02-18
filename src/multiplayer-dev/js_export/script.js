let gpio = getP8Gpio();
const url = 'http://192.168.7.206:4444';
let serverPins;

async function sendPostRequest(c) {
  let params = `${c}=${gpio[parseInt(c)]}`;
  let myPromise = new Promise(function(myResolve, myReject) {
    let req = new XMLHttpRequest();
    req.open('POST',url,true);
    req.onload = function() {
      if (req.status == 200) {
        myResolve(req.statusText);
      } else {
        myResolve("Error");
      }
    };
    req.send(params);
  });
  console.log(await myPromise);
}

async function get() {
  let myPromise = new Promise(function(myResolve, myReject) {
    let req = new XMLHttpRequest();
    req.open('GET',url,true);
    req.send(null);
    if (req.status==200)
    {
      myResolve(req.responseText);
    }
  });
  console.log(await myPromise);
}
