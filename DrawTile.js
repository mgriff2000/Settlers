    function DrawTile(ID,Xcenter,Ycenter) {
        var canvas = document.getElementById(ID);
        if (canvas.getContext) {
            var cxt = canvas.getContext('2d');
			var numberOfSides = 6,
				size = 20;
				//Xcenter = 50,
				//Ycenter = 25;

			cxt.beginPath();
			cxt.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));          

			for (var i = 1; i <= numberOfSides;i += 1) {
				cxt.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			cxt.closePath();
			cxt.strokeStyle = "#000000";
			cxt.lineWidth = 2;
			cxt.stroke();
            cxt.fillStyle = "rgb(0,200,0)";
            cxt.fill();
           
 
        } else {
            alert('You need HTML5 compatible browser to see this demo.');
        }
    }