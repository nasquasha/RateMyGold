//akldjflksjdf
function main() {
	var cells = document.getElementsByClassName('clcellprimary');
	var professors = [];
	var profCount = 0;

	//increment list to retrieve professor cell only
	for (var i=3; i<cells.length; i+=18) {
		//slice off &nbsp; character
		var profName = cells[i].innerText.slice(0,-1);	
		if (profName != 'T.B.A.' && profName != 'Cancel'){

			//slice off remaining space at end and push to professor array
			professors.push(profName.slice(0,-1));

			//create button for professor rating below professor name and add an event listener
			var div = cells[i+9];
			var searchName = professors[profCount].split(' ')[0];
			div.url = 'http://www.ratemyprofessors.com/search.jsp?queryBy=teacherName&schoolName=university+of+california+santa+barbara&queryoption=HEADER&query='+ searchName +'&facetSearch=true';
			div.innerHTML = '<input class="ratingButton" type="button" value="Show Rating" />';
			div.cell = cells[i+10];
			div.clicked = false;
			div.addEventListener('click', openPopup);

			profCount++;
		}//end if
	}

	//action on button click 
	function openPopup() {
		if (this.clicked == true) {
			//remove popup
			this.cell.innerHTML = '';
			this.innerHTML = '<input class="ratingButton" type="button" value="Show Rating" />';
			this.clicked = false;
		}
		else{
			//change the button to say "Hide Rating"
			this.clicked = true;
			this.innerHTML = '<input class="ratingButton" type="button" value="Hide Rating" />';

			//create and show popup
			var popup = document.createElement('div');
			popup.className = 'popup';

			this.cell.style.position = 'relative';
			this.cell.appendChild(popup);

			//create a new XMLHttpRequest to get data
			var xhr = new XMLHttpRequest();
			xhr.popup = popup;
			var url = this.url;
			//xhr.open('GET', url, true);
			xhr.open('GET', 'http://www.ratemyprofessors.com/', true);

			xhr.onreadystatechange=function() {
  				if (xhr.readyState==4 && xhr.status==200) {
   				var data = xhr.response;
   				this.popup.innerHTML = data;
   				//var test = document.getElementsByClassName('profName');//causing error when prof search turns up null

   				//this.popup.innerHTML = test[2].innerHTML;


    			}
  			}
  			xhr.send();
		}//end else
	}//end openPopup()
};//end main


main();







