var input = document.getElementById("data");
var headers;
var excelData;
var rows;
var i = 1;
var text;
var emailIndex;
var subject;
var email;

//Grab data from excel file
input.addEventListener("change", function () {
  readXlsxFile(input.files[0]).then(function (data) {
    headers = data[0];
    PopulationOptions("email");
    PopulationOptions("options");
    excelData = data;
    UpdateRecipientCount();
  });
});

function GetValues() {
  email = document.getElementById("email").value;
  emailIndex = document.getElementById("email").selectedIndex - 1;
  text = document.getElementById("template").value;
  subject = document.getElementById("subject").value;
}

function UpdateInfo() {
  GetValues();
  UpdateRecipientCount();
  ReplaceEmailKeyword();
  ReplaceAllCheckedBoxes();
  document.getElementById("preview").value = text;
}

function ReplaceEmailKeyword() {
  if (email != "None") {
    text = text.replaceAll("{" + email + "}", excelData[i][emailIndex]);
    subject = subject.replaceAll("{" + email + "}", excelData[i][emailIndex]);
  }
}

function ReplaceAllCheckedBoxes() {
  for (var j = 0; j < headers.length; j++) {
    if (document.getElementById(headers[j]).checked) {
      text = text.replaceAll("{" + headers[j] + "}", excelData[i][j]);
      subject = subject.replaceAll("{" + headers[j] + "}", excelData[i][j]);
      console.log(text);
    }
  }
}

function GetNextInfo() {
  if (excelData != undefined && i + 1 != excelData.length) {
    i++;
    UpdateInfo();
  }
}

function GetPreviousInfo() {
  if (i > 1 && excelData != undefined) {
    i--;
    UpdateInfo();
  }
}

function SendEmail() {
  UpdateInfo();
  if (emailIndex != -1 && excelData != undefined) {
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
  selection.innerHTML = "";
  for (var i = 0; i < headers.length; i++) {
    if (id == "email") {
      var opt = document.createElement("option");
      opt.value = headers[i];
      opt.innerHTML = headers[i];
      selection.appendChild(opt);
    } else {
      var checkBox = CreateCheckBox(i);
      var label = CreateLabel(i);
      selection.appendChild(checkBox);
      selection.appendChild(label);
    }
  }
}

function CreateCheckBox(i) {
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  checkBox.type = "checkbox";
  checkBox.value = headers[i];
  checkBox.innerHTML = headers[i];
  checkBox.name = headers[i];
  checkBox.id = headers[i];
  return checkBox;
}

function CreateLabel(i) {
  let label = document.createElement("label");
  label.htmlFor = headers[i];
  label.innerHTML = headers[i];
  return label;
}

function UpdateRecipientCount() {
  if (excelData != undefined) {
    document.getElementById("recipient-num").innerHTML =
      "Recipient " + i + " / " + (excelData.length - 1);
  }
}
