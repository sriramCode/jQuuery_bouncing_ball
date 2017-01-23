//generate a random number within a range
function randomXToY(minVal, maxVal, floatVal) {
    var randVal = minVal + (Math.random() * (maxVal - minVal));
    return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
}

// The Ball class
Ball = (function () {

    // constructor
    function Ball(x, y, radius, color) {
        this.center = {
            x: x,
            y: y
        };
        this.radius = radius;
        this.color = color;
        this.dx = 2;
        this.dy = 2;
        this.boundaryHeight = $('#ground').height();
        this.boundaryWidth = $('#ground').width();

        this.dom = $('<p class="circle"></p>').appendTo('#ground');

        // the rectange div a circle
        this.dom.width(radius * 2);
        this.dom.height(radius * 2);
        this.dom.css({
            'border-radius': radius,
            background: color
        });

        this.placeAtCenter(x, y);
    }

    // Place the ball at center x, y
    Ball.prototype.placeAtCenter = function (x, y) {
        this.dom.css({
            top: Math.round(y - this.radius),
            left: Math.round(x - this.radius)
        });
        this.center.x = Math.round(x);
        this.center.y = Math.round(y);
    };

    /* Ball.prototype.setColor = function (color) {
         if (color) {
             this.dom.css('background', color);
         } else {
             this.dom.css('background', this.color);
         }
     };*/

    // move and bounce the ball
    Ball.prototype.move = function () {
        var diameter = this.radius * 2;
        var radius = this.radius;
        if (this.center.x - radius < 0 || this.center.x + radius > this.boundaryWidth) {
            this.dx = -this.dx;
        }
        if (this.center.y - radius < 0) {
            this.dy = -this.dy;
        }
        //my if
        if (((this.center.y + this.radius >= this.boundaryHeight - 10) && (this.center.y <= this.boundaryHeight - 8)) && ((this.center.x + this.radius) >= ($("#playerA").offset().left - 20) && (this.center.x + this.radius) <= ($("#playerA").offset().left + 90))) {
            this.dy = -this.dy;
        }
        this.placeAtCenter(this.center.x + this.dx, this.center.y + this.dy);
    };



    return Ball;
})();

var number_of_balls;
var balls = [];
$(document).ready(function () {
    var values = {
        ground: {
            width: parseInt($("#ground").width()),
            height: parseInt($("#ground").height())
        },
        playerA: {
            x: 0,
            left: $("#playerA").offset().left,
            height: $("#playerA").height(),
            width: $("#playerA").width()
        }
    };
    $("#ground").mousemove(function (e) {
        values.playerA.x = parseInt(e.pageX - values.playerA.left - parseInt($("#playerA").width()));

        $("#playerA").css("left", values.playerA.x);

    });
});

function assign(ball) {
    number_of_balls = ball;
    for (i = 0; i < number_of_balls; i++) {
        var boundaryHeight = $('#ground').height();
        var boundaryWidth = $('#ground').width();
        var y = randomXToY(30, boundaryHeight - 50);
        var x = randomXToY(30, boundaryWidth - 50);
        var radius = randomXToY(15, 30);
        balls.push(new Ball(x, y, radius, '#' + Math.floor(Math.random() * 16777215).toString(16)));
    }
    loop();
}
loop = function () {
    for (var i = 0; i < balls.length; i++) {
        balls[i].move();
    }
    setTimeout(loop, 5);
};