var input = document.getElementById("data");
var excelData;
var rows;
var i = 0;
var text;
var emailIndex;
var subject;
var autoFill1;
var autoFill2;
var autoFill3;
var autoFill4;

//Grab data from excel file
input.addEventListener("change", function () {
  readXlsxFile(input.files[0]).then(function (data) {
    excelData = data;
  });
});

function UpdateInfo() {
  autoFill1 = document.getElementById("autoFill1").value;
  autoFill2 = document.getElementById("autoFill2").value;
  autoFill3 = document.getElementById("autoFill3").value;
  autoFill4 = document.getElementById("autoFill4").value;
  text = document.getElementById("template").value;
  if (autoFill1.length != 0) {
    text = text.replaceAll("data1", excelData[i][autoFill1]);
    subject = subject.replaceAll("data1", excelData[i][autoFill1]);
  }
  if (autoFill2.length != 0) {
    text = text.replaceAll("data2", excelData[i][autoFill2]);
    subject = subject.replaceAll("data2", excelData[i][autoFill2]);
  }
  if (autoFill3.length != 0) {
    text = text.replaceAll("data3", excelData[i][autoFill3]);
    subject = subject.replaceAll("data3", excelData[i][autoFill3]);
  }
  if (autoFill4.length != 0) {
    text = text.replaceAll("data4", excelData[i][autoFill4]);
    subject = subject.replaceAll("data4", excelData[i][autoFill4]);
  }
  document.getElementById("preview").value = text;
}

function GetNextInfo() {
  if (excelData != undefined && i + 1 != excelData.length) {
    i++;
    UpdateInfo();
  }
}

function GetPreviousInfo() {
  if (i > 0 && excelData != undefined) {
    i--;
    UpdateInfo();
  }
}

function SendEmail() {
  emailIndex = document.getElementById("email").value;
  subject = document.getElementById("subject").value;
  if (emailIndex != "") {
    UpdateInfo();
  }
  if (excelData != undefined) {
    window.open(
      "mailto:" +
        excelData[i][emailIndex] +
        "?subject=" +
        subject +
        "&body=" +
        encodeURIComponent(text),
      "_blank"
    );
  }
}
