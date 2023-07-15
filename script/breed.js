"use strict";

//Khai báo các biến input để lấy ra các DOM Element
const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const btnSubmit = document.getElementById("submit-btn");
const tableBody = document.getElementById("tbody");

//Hiển thịbảng thông tin thú cưng
renderTableBreed(breedArr);

//Sự kiện click vào nút submit - thêm loại giống
btnSubmit.addEventListener("click", function () {
  const data = {
    breed: breedInput.value,
    type: typeInput.value,
  };
  const isValidate = validateData(data);

  if (isValidate) {
    //Khai báo mảng breed và hàm push dữ liệu vào mảng
    breedArr.push(data);
    //Lưu dữ liệu - cập nhật lại
    saveToStorage("breedArr", breedArr);
    //Hiển thị thông tin breed
    renderTableBreed(breedArr);
    //Xòa thông tin từ form nhập
    deleteForm();
  }
});

//Hàm kiểm tra dữ liệu nhập thiếu
function validateData(data) {
  //Khai báo biến cờ hiệu
  let isValidate = true;
  //Báo lỗi khi nhập vào khoảng trắng hoặc chuỗi rỗng
  if (breedInput.value.trim().length === 0) {
    alert("Please input for breed! ");
    isValidate = false;
  }
  //Báo lỗi khi chưa chọn type
  else if (data.type === "Select Type") {
    alert("Please select Type! ");
    isValidate = false;
  }
  return isValidate;
}

//Hàm xóa thông tin form
function deleteForm() {
  breedInput.value = "";
  type.value = "Select Type";
}

//Hàm hiển thị thông tin breed lên bảng
function renderTableBreed() {
  tableBody.innerHTML = "";
  //Thêm 1 dòng dữ liệu vào bảng
  breedArr.forEach(function (breedItem, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td scope="col">${index + 1}</td>
    <td scope="col">${breedItem.breed}</td>
    <td scope="col">${breedItem.type}</td>
    <td>
    <button type="button" onclick="deleteBreed('${
      breedItem.breed
    }')" class= "btn btn-danger">Delete</button>
    </td>`;
    tableBody.appendChild(row);
  });
}

//Hàm xóa thú cưng với id
function deleteBreed(breed) {
  const isDelete = confirm("Are you sure? ");

  if (isDelete) {
    //Duyệt mảng tìm id muốn xóa
    for (let i = 0; i < breedArr.length; i++) {
      if (breed === breedArr[i].breed) {
        //Xóa khỏi mảng
        breedArr.splice(i, 1);
        //Cập nhật dữ liệu
        saveToStorage("breedArr", breedArr);
        //Hiển thị lại dữ liệu sau khi xóa
        renderTableBreed(breedArr);
        break;
      }
    }
  }
}
