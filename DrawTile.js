var TileSize = 60;
var TileArray = [];
var NumberArray = [5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11];
var OrderArray = [14,15,16,17,18,9,7,8,10,11,12,13,4,5,6,1,2,3,0];
var Desert = {ID:0,Color:"#D6C694",NumberOfTiles:1};
var Hill = {ID:1,Color:"#BD5515",NumberOfTiles:3};
var Forest = {ID:2,Color:"#146300",NumberOfTiles:4};
var Mountain = {ID:3,Color:"#2E5A85",NumberOfTiles:3};
var Field = {ID:4,Color:"#F0D041",NumberOfTiles:4};
var Pasture = {ID:5,Color:"#9BD439",NumberOfTiles:4};
var ResourceArray = [Desert, Hill, Forest, Mountain, Field, Pasture];

function AssignNumbers() {
	var TempTile = [];
	for (var i = 0; i < TileArray.length; i += 1) {
		TempTile[i] = TileArray[OrderArray[i]];
	}
	TileArray = TempTile;
	var index = 0;
	for (var i = 0; i < TileArray.length; i += 1) {
		console.log(TileArray[i].Resource.ID);
		if (TileArray[i].Resource.ID !== 0) {
			TileArray[i].SetNumber(NumberArray[index]);
			index += 1;
		}
	}
}



function AssignResources() {
	var NumberOfTiles = [Desert.NumberOfTiles, Hill.NumberOfTiles, Forest.NumberOfTiles, Mountain.NumberOfTiles, Field.NumberOfTiles, Pasture.NumberOfTiles];
	var RandomResourceArray = [];
	for (var i = 0; i < NumberOfTiles.length; i += 1) {
		for (var j = 0; j < NumberOfTiles[i]; j += 1) {
			RandomResourceArray.push(i);	
		}
	}
	RandomResourceArray = Shuffle(RandomResourceArray);
	for (var i = 0; i < TileArray.length; i += 1) {
		TileArray[i].SetResource(ResourceArray[RandomResourceArray[i]]);
	} 
	
}

function DrawTile(Xcenter,Ycenter,size,ID,color) {
	var canvas = document.getElementById("CanvasBox");
	if (canvas.getContext) {
		var cxt = canvas.getContext('2d');
		var numberOfSides = 6;
		cxt.beginPath();
		cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

		for (var i = 1; i <= numberOfSides;i += 1) {
			cxt.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
		cxt.closePath();
		cxt.strokeStyle = "#000000";
		cxt.lineWidth = 0;
		cxt.stroke();
		cxt.fillStyle = color;
		cxt.fill();
		cxt.font = "30px Arial";
		cxt.fillStyle = "black";
		cxt.textAlign = "center";
		cxt.fillText(ID,Xcenter,Ycenter);
	   

	} else {
		alert('You need HTML5 compatible browser to see this demo.');
	}
}



function DrawMap() {
	var canvas = document.getElementById("CanvasBox");
	var cxt = canvas.getContext('2d');
	var NumberOfTiles = 19;
	var size = 2*Math.cos(Math.PI/6)*TileSize;
	var TileID = 0;
	var MatchFound = 0;
	var x = 0;
	var y = 0;
	var Done = 0;
	CanvasHeight = canvas.height;
	CanvasWidth = canvas.width;
	cxt.translate(CanvasWidth/2,CanvasHeight/2);
	TileArray.push(new Tile(0,0,0,7));
	while (!Done) {
		
		// try to populate all of the tiles around the given tile
		
		for (var i = 0; i < 6;i += 1) {
			x = TileArray[TileID].Getx() + size * Math.sin(i * 2 * Math.PI / 6);
			y = TileArray[TileID].Gety() + size * Math.cos(i * 2 * Math.PI / 6);
			
			MatchFound = 0;
			// check the last 6 tiles in the array. 
			for (var j = 0; j < TileArray.length; j += 1) {
				if (Math.abs(TileArray[j].Getx()-x)<1 && Math.abs(TileArray[j].Gety()-y)<1) {
					MatchFound = 1;
				}				
			}
			
			if (MatchFound == 0) {
				TileArray.push(new Tile(x,y,TileArray.length,7));			
			}
			if (TileArray.length >= NumberOfTiles) {
				Done = 1;
				break;
			}
		}
		TileID += 1;
	} 
	
	AssignResources();
	AssignNumbers();
	
	for (var i = 0; i < TileArray.length; i += 1) {
		TileArray[i].DrawTile();
	}
}
function Resource() {
	this.ID = 0;
	this.Color = "#FFFFFF";
	this.NumberOfTiles = 1;
}

function Tile(x,y,id,Number) {
	this.x = x;
	this.y = y;
	this.id = id;
	this.Resource = new Resource();
	this.Number = Number;
	this.DrawTile = function () {
		DrawTile(this.x,this.y,TileSize,this.Number,this.Resource.Color);
	}
	this.Getx = function () {
		return this.x;
	}
	this.Gety = function () {
		return this.y;
	}
	this.SetResource = function (Resource) {
		this.Resource = Resource;
	}
	this.SetNumber = function (Number) {
		this.Number = Number;
	}
}



function Shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}