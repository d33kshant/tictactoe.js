var coms = [[0, 1, 2], [0, 3, 6], [3, 4, 5], [0, 4, 8], [2, 5, 8], [6, 7, 8], [1, 4, 7], [2, 4, 6]];
var left = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var player = [];
var enemy = [];
var isPlayer = true;
var btnRestrat = document.getElementById("restart");
var buttons = document.getElementsByClassName("btnBoard");

function isSub(a, b) {
    if (b.length >= 3) {
        var score = 0;
        for (var i = 0; i < b.length; i++) {
            for (var j = 0; j < a.length; j++) {
                if (b[i] == a[j]) {
                    score++;
                }
            }
        }

        if (score == a.length) {
            return true;
        } else {
            return false;
        }

    } else {
        return false;
    }
}

function isWin(a) {
    for (var i = 0; i < coms.length; i++) {
        var com = coms[i];
        if (isSub(com, a)) {
            return true;
        }
    }
    return false;
}

function mark(a, b) {
    var button = document.getElementById(a);
    switch (b) {
        case "X":
            button.innerText = "X";
            button.style.color = "#FF7575";
            break;
        case "O":
            button.innerText = "O";
            button.style.color = "#5E8FF2"
            break;
    }
}

function markRandom() {
    if (player.length <= 4) {
        var r = Math.floor(Math.random() * 9).toString();
        if (!player.includes(r) && !enemy.includes(r)) {
            mark(r, "O");
            enemy.push(r);
        } else {
            markRandom();
        }
    } 
    if (isWin(enemy)) {
        restart();
        alert("Compuer Win");
    }
}

function restart() {
    player = []
    enemy = []
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.color = "#272727";
        buttons[i].innerText = "-";
    }

}

btnRestrat.addEventListener('click',function(){
    restart();
});

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        if (!player.includes(this.id.toString()) && !enemy.includes(this.id.toString())) {
            player.push(this.id);
            mark(this.id, "X");
            markRandom();
            if (isWin(player)) {
                restart();
                alert("Player Win");
            }
        }
    })
}