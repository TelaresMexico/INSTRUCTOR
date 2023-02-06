let HideStyle = document.querySelector(".ContainerSelector");
let HideObjects = document.querySelector(".EsconderObjetos");

var txtArr = [];
var fr = new FileReader();
var ConteoLinea = 0;

function ShoworHide() {
  HideStyle.style.display = "block";
  HideObjects.style.display = "none";
}

var file = document.getElementById("selectedFile");

file.addEventListener("change", () => {
  fr.onload = function () {
    // By lines
    var lines = this.result.split("\n");
    for (var line = 0; line < lines.length; line++) {
      txtArr = [...txtArr, ...lines[line].split(",")];
    }
  };

  fr.onloadend = function () {
    ShoworHide();
    UpdateTexts();
    listenForKeys = true;
  };

  fr.readAsText(file.files[0]);
});

function SetNumLin() {
  if (document.getElementById("IraLinea").value > 0) {
    ConteoLinea = document.getElementById("IraLinea").value - 1;
  } else {
    ConteoLinea = 0;
  }
  UpdateTexts();
}

document.body.onkeydown = function (e) {
  if (!listenForKeys) {
    return;
  }

  if (e.keyCode == 39) {
    //right key
    MasCookie();
  } else if (e.keyCode == 37) {
    //left key
    MenosCookie();
  } else if (e.keyCode == 13) {
    //left key
    SetNumLin();
  }
};

if (get_cookie("NumLin") == null) {
  document.cookie = "NumLin=0; expires=Thu, 18 Dec 2023 12:00:00 UTC";
}

window.onload = function () {
  ConteoLinea = ConteoLinea + get_cookie("NumLin");
  UpdateTexts();
};

function MasCookie() {
  if (ConteoLinea < txtArr.length -1) {
    ConteoLinea++;
    UpdateTexts();
  }else{
    document.getElementById("output2").textContent = "Finalizaste!";
  }

  
}

function MenosCookie() {
  if (ConteoLinea > 0) {
    ConteoLinea--;
  }

  UpdateTexts();
}

function UpdateTexts() {
  document.cookie = "NumLin" + "=" + ConteoLinea + "; ";
  document.getElementById("output1").textContent = txtArr[Number(ConteoLinea)];
  document.getElementById("output2").textContent = txtArr[Number(ConteoLinea) + 1];
  document.getElementById("NumLin").textContent = "No de Linea: " + (Number(get_cookie("NumLin")) + 1);
}

function setCookie(cName, cValue, expDays) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

function get_cookie(cookie_name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + cookie_name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function ClearCookies() {
  var cookies = document.cookie.split("; ");
  for (var c = 0; c < cookies.length; c++) {
    var d = window.location.hostname.split(".");
    while (d.length > 0) {
      var cookieBase =
        encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
        "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
        d.join(".") +
        " ;path=";
      var p = location.pathname.split("/");
      document.cookie = cookieBase + "/";
      while (p.length > 0) {
        document.cookie = cookieBase + p.join("/");
        p.pop();
      }
      d.shift();
    }
  }
}
