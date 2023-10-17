var count = 1;
let pickdates = 0;

document
  .getElementById("StartDate")
  .addEventListener("change", updateMonthAndYear);
document
  .getElementById("EndDate")
  .addEventListener("change", updateMonthAndYear);
document.getElementById("lead-count").addEventListener("change", updatedrr);
// for exluded date
function datapicker() {
  let startDate = new Date(document.getElementById("StartDate").value);
  let endDate = new Date(document.getElementById("EndDate").value);
  flatpickr("#datePicker", {
    mode: "multiple",
    dateFormat: "Y-m-d",
    minDate: startDate,
    maxDate: endDate,
    onChange: function (selectedDates, dateStr, instance) {
      // Handle selected dates here
      pickdates = selectedDates.length;
      document.getElementById("days-counter").textContent = pickdates;
      console.log(selectedDates);
    },
  });
}
// for uxpected DRR
function updatedrr() {
  const DRR = document.getElementById("lead-count").value;
  const drr = DRR / 5;
  document.getElementById("drr").textContent = drr;
}
// for atomatically printing month and year
function updateMonthAndYear() {
  const startDate = new Date(document.getElementById("StartDate").value);
  const endDate = new Date(document.getElementById("EndDate").value);
  // for checking end date not preceding start date and  telling user that end date is preceding or not.
  if (startDate.getTime() > endDate.getTime()) {
    console.log("its higher");
    document.getElementById("notice").textContent =
      "note-write the endate higher than startdate";
  } else {
    document.getElementById("notice").innerHTML = null;
  }

  if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
    var selectedMonth = startDate.getMonth() + 1;
    const selectedYear = startDate.getFullYear();
    document.getElementById("selected-month").textContent = selectedMonth;
    document.getElementById("selected-year").textContent = selectedYear;
  }
}
// function for print the data in the new row
function updateTable() {
  const startDate = new Date(document.getElementById("StartDate").value);
  const endDate = new Date(document.getElementById("EndDate").value);
  // checking that end date is higher than  start date if this conditon is true than function will work
  if (startDate.getTime() < endDate.getTime()) {
    var inputFields = document.getElementsByClassName("inputField");
    // for input values
    var table = document.getElementById("TableData");
    var newRow = table.insertRow(table.rows.length);
    for (var i = 0; i < inputFields.length; i++) {
      var value = inputFields[i].value;
      var newCell = newRow.insertCell(i);
      newCell.innerHTML = value;
    }
    // for other values
    var date = new Date();
    newRow.insertCell(0).innerHTML = null;
    newRow.insertCell(1).innerHTML = count;
    newRow.insertCell(4).innerHTML =
      startDate.getMonth() + 1 + "-" + startDate.getFullYear();
    newRow.insertCell(6).innerHTML = pickdates;
    newRow.insertCell(8).innerHTML = inputFields[3].value / pickdates;
    newRow.insertCell(9).innerHTML = date;

    count++;
  }
}
function clearInputs(button) {
  var row = button.parentElement.parentElement; // <==Get the parent row of the button
  var cells = row.getElementsByTagName("td");

  for (var i = 0; i < cells.length - 1; i++) {
    // Loop through all td elements except the last one
    var input = cells[i].querySelector("input"); // <==Get the input element
    if (input) {
      input.value = ""; //<== Clear the input value
    }
    // far clearing the text in td
    cells[4].textContent = " ";
    cells[6].textContent = " ";
    cells[8].textContent = " ";
  }
}
