var bookName = document.getElementById("bookName");
var bookURL = document.getElementById("bookURL");
var submitButton = document.getElementById("submitButton");
var dataRow = document.getElementById("dataRow");
bookmarkList = [];
if (localStorage.getItem("bookmark")) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
  display();
}

function addBook() {
  if (bookName.value === "" && bookURL.value === "") {
    window.alert("Enter Bookmark Name  and  Website URL");
    return;
  }
  if (!isValidUrl(bookURL.value)) {
    window.alert("Enter a valid URL , Must start with https");
    return;
  }
  if (bookName.value.length < 3) {
    window.alert("The bookmark name must be more than 3 characters long");
    return;
  }
  if (bookmarkList.find((bookmark) => bookmark.bName.toLowerCase() === bookName.value.toLowerCase())) {
    window.alert("Bookmark name already exists. Please choose a unique name.");
    return;
  }
  var bookObj = {
    id: Date.now(),
    bName: bookName.value,
    pURL: bookURL.value,
  };
  bookmarkList.push(bookObj);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  display();
  clearForm();

}

function display(List = bookmarkList) {
  var box = "";
  let index = 1;
  for (var i = 0; i < List.length; i++) {
    box += `<div class="col-3 text-center text-capitalize p-2">
              <h5 class="pt-2 h6">${index++}</h5>
            </div>
            <div class="col-3 text-center text-capitalize p-2">
              <h5 class="pt-2 h6">${List[i].bName}</h5>
            </div>
            <div class="col-3 text-center text-capitalize p-2">
              <button type="button" onclick="window.open('${
                List[i].pURL
              }', '_blank')"  class="btn btn-success" data-index="0">
                <i class="fa-solid fa-eye pe-2"></i>Visit
              </button>
            </div>
            <div class="col-3 text-center text-capitalize p-2">
              <button onclick="deleteFun(${
                List[i].id
              })" type="button" class="btn btn-danger" data-index="0">
                <i class="fa-solid fa-trash-can"></i>
                Delete
              </button>
            </div>`;
  }
  dataRow.innerHTML = box;
}
function clearForm() {
  bookName.value = null;
  bookURL.value = null;
  submitButton.disabled = true;
}

function deleteFun(id) {
  bookmarkList = bookmarkList.filter(function (ele) {
    return ele.id !== id;
  });
  localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  display();
}
function bookVisit() {}

function bookVisit(bookmarkId) {
  var bookmark = bookmarkList.find((bookmark) => bookmark.id === bookmarkId);
  window.location.href = bookmark.pURL;
}

function isValidUrl(urlString) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d%_.~+=-]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
}
