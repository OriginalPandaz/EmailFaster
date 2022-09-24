var input = document.getElementById("data");
var headers;
var excelData;
var rows;
var i = 1;
var text;
var emailIndex;
var subject;
var keyword1;
var keyword2;
var keyword3;
var keyword4;
var selectedOption1;
var selectedOption2;
var selectedOption3;
var selectedOption4;

//Grab data from excel file
input.addEventListener("change", function () {
  readXlsxFile(input.files[0]).then(function (data) {
    headers = data[0];
    PopulationOptions("email");
    PopulationOptions("option1");
    PopulationOptions("option2");
    PopulationOptions("option3");
    PopulationOptions("option4");
    excelData = data;
  });
});

function UpdateInfo() {
  keyword1 = document.getElementById("option1").value;
  keyword2 = document.getElementById("option2").value;
  keyword3 = document.getElementById("option3").value;
  keyword4 = document.getElementById("option4").value;
  selectedOption1 = document.getElementById("option1").selectedIndex - 1;
  selectedOption2 = document.getElementById("option2").selectedIndex - 1;
  selectedOption3 = document.getElementById("option3").selectedIndex - 1;
  selectedOption4 = document.getElementById("option4").selectedIndex - 1;
  text = document.getElementById("template").value;
  subject = document.getElementById("subject").value;
  if (keyword1 != "None") {
    text = text.replaceAll("{" + keyword1 + "}", excelData[i][selectedOption1]);
    subject = subject.replaceAll(
      "{" + keyword1 + "}",
      excelData[i][selectedOption1]
    );
  }
  if (keyword2 != "None") {
    text = text.replaceAll("{" + keyword2 + "}", excelData[i][selectedOption2]);
    subject = subject.replaceAll(
      "{" + keyword2 + "}",
      excelData[i][selectedOption2]
    );
  }
  if (keyword3 != "None") {
    text = text.replaceAll("{" + keyword3 + "}", excelData[i][selectedOption3]);
    subject = subject.replaceAll(
      "{" + keyword3 + "}",
      excelData[i][selectedOption3]
    );
  }
  if (keyword4 != "None") {
    text = text.replaceAll("{" + keyword4 + "}", excelData[i][selectedOption4]);
    subject = subject.replaceAll(
      "{" + keyword4 + "}",
      excelData[i][selectedOption4]
    );
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
  emailIndex = document.getElementById("email").selectedIndex - 1;
  if (emailIndex != -1 && excelData != undefined) {
    UpdateInfo();
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

function PopulationOptions(id) {
  selection = document.getElementById(id);

  for (var i = 0; i < headers.length; i++) {
    var opt = document.createElement("option");
    opt.value = headers[i];
    opt.innerHTML = headers[i];
    selection.appendChild(opt);
  }
}
