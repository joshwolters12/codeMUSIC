
function onWindowLoad() {
  var stringText;
  var message = document.querySelector('#message');

  chrome.runtime.onMessage.addListener(function(request, sender) {
    
        if (request.action == "getSource") {
            // message.innerText = request.source;
            stringText = request.source;
        }
        
        // stringArray = stringText.split(' ')
        wordsArray = ["</p>", "/body", "</h1>", "</li>", "</ul>", "</script>"]
        counterObj = {};

        wordsArray.forEach((e)=>{
            let count = stringText.split(e).length;
            counterObj[e] = count;
            console.log(counterObj[e])
        })
        
        message.innerText = counterObj["</p>"]
        console.log(counterObj["</p>"])
  


    });


  
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

    // alert(stringText)
      
}

window.onload = onWindowLoad;