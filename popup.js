
function onWindowLoad() {
  var stringText;
  var message = document.querySelector('#message');

  chrome.runtime.onMessage.addListener(function(request, sender) {
    
        if (request.action == "getSource") {
            // message.innerText = request.source;
            stringText = request.source;
        }
        
        stringArray = stringText.split(' ')
        let outputArray = [{text: '<li>', weight: 9}, {text: '<p>', weight: 12}, {text: '<body>', weight: 4} ];
        console.log(outputArray)
        // stringArray.forEach((e)=>{
        //   let obj = {
        //     text: e,
        //     weight: Math.random()*15
        //   }
        //   outputArray.push(obj);
        // })

        $(function() {
        // When DOM is ready, select the container element and call the jQCloud method, passing the array of words as the first argument.
          $("#message").jQCloud(outputArray);
        });

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