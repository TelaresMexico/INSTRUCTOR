let HideStyle = document.querySelector(".ContainerSelector");
let HideObjects = document.querySelector(".EsconderObjetos");

var countArr = localStorage.getItem('NodeLinea', 0);

var txtArr = [];
var fr = new FileReader();

window.onbeforeunload = function () {

    localStorage.setItem('NodeLinea', countArr);

}

function ShoworHide() {
    HideStyle.style.display = "block";
    HideObjects.style.display = "none";
}

var file = document.getElementById('selectedFile');

file.addEventListener('change', () => {

    fr.onload = function () {
        // By lines
        var lines = this.result.split('\n');
        for (var line = 0; line < lines.length; line++) {
            txtArr = [...txtArr, ...(lines[line].split(","))];
        }
    }

    fr.onloadend = function () {

        ShoworHide();
        UpdateTexts();
        listenForKeys = true;
    }

    fr.readAsText(file.files[0]);
})

function incrementValue() {
    countArr++;
    UpdateTexts();
}

function decrementValue() {
    if (countArr > 0) {
        countArr--;
    }
    UpdateTexts();
}

function UpdateTexts() {

    document.getElementById('output1').textContent = txtArr[Number(countArr)];
    document.getElementById('output2').textContent = txtArr[Number(countArr) + 1];

    document.getElementById('NumLin').textContent = "No de Linea: " + (Number(countArr) + 1);
}

function SetNumLin() {

    countArr = document.getElementById('IraLinea').value - 1;
    UpdateTexts();
}

document.body.onkeydown = function (e) {
    if (!listenForKeys) { return; }

    if (e.keyCode == 39) { //right key
        incrementValue();
    } else if (e.keyCode == 37) { //left key
        decrementValue();
    } else if (e.keyCode == 13) { //left key
        SetNumLin();
    }
}