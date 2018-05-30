$('.box').addClass("spacer");

$('.btn').click(function() {
  
  $('.text').text('getting music..');
  $('.box').removeClass("spacer");
	
  $.ajax({
    type:"GET",
    data: {
      q: "indie pop",
			sort: "new",
      restrict_sr: "true"
    },
    url:"https://www.reddit.com/r/music/search.json",
    success: function(response) {
     
			$('.text').html('<br><br>');
			var children = response.data.children;
      for (var i = 0; i < children.length; i++) {
        if (children[i].data.thumbnail !== "self" && children[i].data.thumbnail !== "default") {
					//only want youtube links, extract youtubeID from end of url
					var ytID;
					if(children[i].data.url.indexOf("youtu") != -1){
						//yt url
						var x = children[i].data.url.lastIndexOf("?v=");
						if (x != -1){
							//makes sure no garbage in url
							x+=3;
							//extract 11 character ID from end of url
							ytID = children[i].data.url.substr(x,11);
						} else {
							//youtube URL is in shortened format 
							x = children[i].data.url.lastIndexOf(".be/");
							if (x != -1){
								//make sure no garbage
								x+=4;
								ytID = children[i].data.url.substr(x,11);
							}
						}
						var ytURL = "https://www.youtube.com/embed/" + ytID; 
						//$('.text').append(ytURL+'<br>');
						
						$('.text').append('<iframe width="420" height="315" src="'+ytURL+'"></iframe><br>');
						
					}
					
					
        }
      }
      
    },
  });
  
});