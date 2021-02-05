
//show search history to the user
function showHistory(history){
	//if history was not passed in, grab it fresh
	if (typeof(history) == "undefined"){
		var history = getHistory();
	}

	//delete existing history html
	$('#historyItems').empty();
	
	//re-build history html based on history variable
	if (history.length > 0){
		history.forEach(function(item){
		    $('#historyItems').append('<li style="cursor: pointer;" onclick="getWeather(' +  item.id + ')">' + item.name + '</li>');
		});
	}
	//step 3 make sure each city shown has an onclick that fires getWeather with cityId
    
}

//get our search history from local storage
function getHistory(){
    var history = localStorage.getObj('history');
    if (history === null){ history = []; }

    return history;
}

//save our search history to local storage
function setHistory(history){
    localStorage.setObj('history', history);
}

//add a city to search history
function addToHistory(cityObj){
	var history = getHistory();
	
	//check to see if this cityObj already exists in the array.
	var pos = findCityArray(history, cityObj);
	if (pos != -1){
		//it does exists. Let's remove it so it gets moved to the top instead without creating duplicates
		history.splice(pos, 1);
	}
    
    history.unshift(cityObj); //unshift instead of push becuase unshift puts the object at the front of the array
    setHistory(history.slice(0, 5)); //slice ensures the history array never exceeds 5 items
}

//see if an object exists in an array already and return the position
function findCityArray(list, obj) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i].id === obj.id) {
            return i;
        }
    }

    return -1;
}