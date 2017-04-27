
function onWindowLoad() {
  var stringText;
  var totalCount = 0;
  var message = document.querySelector('#message');

  chrome.runtime.onMessage.addListener(function(request, sender) {
    
        if (request.action == "getSource") {
            // message.innerText = request.source;
            stringText = request.source;
        }
        
        // stringArray = stringText.split(' ')
        wordsArray = ["</p>", "</body>", "</h1>", "</li>", "</ul>", "</script>","</div>","</form>"]
        counterObj = {};

        
        wordsArray.forEach((e)=>{
            let count = stringText.split(e).length;
            counterObj[e] = count;
            totalCount += count;
        })

        //add div elements to the popup page
        for (key in counterObj){
          let word = $('<div>');
          word.attr('class','words')
          word.attr('id',key)
          heightVal = (counterObj[key] < 5) ? 25 :
                        (counterObj[key] < 10) ? 50 :
                          (counterObj[key] < 25) ? 75 :
                            (counterObj[key] < 100) ? 100 : 125;
          widthVal = heightVal *2.8;
          fontSize = 0.4 * heightVal;
          lineHeight = heightVal;
          word.css({height: heightVal, width: widthVal, "font-size": fontSize, "line-height": lineHeight+'px'})

          backgroundColor = (counterObj[key] < 5) ?  '#FFD1BF' :
                              (counterObj[key] < 10) ? '#F8B195':
                                (counterObj[key] < 25) ? '#F67280' :
                                  (counterObj[key] < 100) ? '#C06C84' : '#6C5B7B';


          word.css({"background-color": backgroundColor})
          word.text(key) // = key + counterObj[key];
          $('body').prepend(word)
        }

    });

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });


      
}

window.onload = onWindowLoad;