//sandbox driver

var sandboxTest = (function () {

    var sandboxInit = function () { start(); };

    var _liveSnap, _lockX, _lockY, _s, _rectWidth, _rectHeight;
    
    function start() {

        $("#initialize").click(function () {
            go();
        });
    }

    function go() {

        //clear any pre-existing rectangles out
        $("#svg").empty();

        _s = Snap("#svg");
		$("#svg").height(960);
		$("#svg").width(1700);
        _liveSnap = $("#live").is(':checked');
        _lockX = $("#lockX").is(':checked');
        _lockY = $("#lockY").is(':checked');
		_rectWidth = 48;
        _rectLength = 48;

        var gridSize = 48;
        var orig = { x: 0, y: 0 };
        var moving = { dx: 0, dy: 0 };
        var offsetX = parseFloat($("#offsetX").val()) || 0;
        var offsetY = parseFloat($("#offsetY").val()) || 0;
		
		offsetX = (offsetX > _rectWidth) ? offsetX = offsetX % _rectWidth : offsetX = offsetX;
		offsetY = (offsetY > _rectLength) ? offsetY = offsetY % _rectLength : offsetY = offsetY;


        //create "room" and grid pattern
        var scaledPts = [0, 0, 0, 480, 1064, 480, 1064, 0, 0, 0];
        var roomOutline = _s.polyline(scaledPts).attr({ stroke: '#000', fill: 'transparent', strokeWidth: 1 });
        var p_line1 = _s.paper.line(0, offsetY, _rectWidth, offsetY).attr({ stroke: 'lightgray' });
        var p_line2 = _s.paper.line(offsetX, 0, offsetX, _rectLength).attr({ stroke: 'lightgray' });
        var pattern = _s.paper.g(p_line1, p_line2).pattern(0, 0, _rectWidth, _rectLength);

        //apply pattern
        roomOutline.attr({
            fill: pattern
        });

        //create our rectangle and give it a random color and starting position
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        //the svg library appears to drag from the top left corner of the rect, that's why the Y coord is a little weird
        var bigRect = _s.rect(0 + offsetX, 0 + offsetY, _rectWidth, _rectLength, 0, 0); //x, y, width, height, rx, ry

        bigRect.attr({
            fill: color,
            stroke: "#000",
            strokeWidth: 3
        });

        bigRect.click(rectClick);
        toggleZPD(true); //make the grid move

        //drag function is drag(moveFunction, startFunction, stopFunction)
        if (_liveSnap) {
            bigRect.drag(

                //moving
                function (dx, dy, x, y, e) {

                    dx = (_lockX) ? 0 : dx;
                    dy = (_lockY) ? 0 : dy;

                    this.attr({
                        x: Snap.snapTo(gridSize, orig.x + dx, 25) + offsetX,
                        y: Snap.snapTo(gridSize, orig.y + dy, 25) - (_rectLength - offsetY)
                    });
                },

                //start
                function (x, y, e) { 
                    orig.x = e.target.x.baseVal.value;
                    orig.y = e.target.y.baseVal.value;
                    toggleZPD(false);
                },

                //stop
                function (e) { 
                    //stop code goes here
                    toggleZPD(true);
                }
            );
        }
        else {
            bigRect.drag(

                //moving
                function (dx, dy, x, y, e) {

                    dx = (_lockX) ? 0 : dx;
                    dy = (_lockY) ? 0 : dy;

                    this.attr({
                        x: orig.x + dx,
                        y: orig.y + dy
                    });

                    moving.dx = dx;
                    moving.dy = dy;
                },

                //start
                function (x, y, e) {

                    e.preventDefault();
                    e.stopPropagation();

                    orig.x = e.target.x.baseVal.value;
                    orig.y = e.target.y.baseVal.value;
                    toggleZPD(false);
                },

                //stop
                function (e) {

                    this.attr({
                        x: Snap.snapTo(gridSize, orig.x + moving.dx, 25) + offsetX,
                        y: Snap.snapTo(gridSize, orig.y + moving.dy, 25) + offsetY
                    });

                    //reset these
                    moving.dx = moving.dy = 0;
                    toggleZPD(true);
                }
            );
        }
    }

    function rectClick(e) {
        console.log("rect clicked");
    }
    
    //zoom, pan, drag library found here: https://github.com/huei90/snap.svg.zpd
    function toggleZPD(bool) {
        _s.zpd({ zoom: bool, pan: bool});
    }

    return {
        sandboxInit: sandboxInit
    };
})();