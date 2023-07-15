"use strict";

//Khai báo các biến input để lấy ra các DOM Element
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const findBtn = document.getElementById("find-btn");
const tableBody = document.getElementById("tbody");
const form = document.getElementById("container-form");

//Hiển thị danh sách thú cưng
renderTableData(petArr);

//Sự kiện click nút tìm kiếm thú cưng
findBtn.addEventListener("click", function (e) {
  //Nếu k có dữ liệu nhập vào sẽ hiển thị toàn bộ danh sách thú cưng
  //Kết hợp nhiều dữ liệu để tìm kiếm
  let petArrFind = petArr;
  //Nếu nhập vào id thì tìm kiếm theo id
  if (idInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  }
  //Nếu nhập vào name thì tìm kiếm theo name
  if (nameInput.value) {
    petArrFind = petArrFind.filter((pet) => pet.name.includes(nameInput.value));
  }
  //Nếu chọn type thì tìm kiếm theo type
  if (typeInput.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  }
  //Nếu chọn vào breed thì tìm kiếm theo breed
  if (breedInput.value !== "Select Breed") {
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  }
  //Nếu tích chọn vaccinated thì tìm theo
  if (vaccinatedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  //Nếu tích chọn dewormed thì tìm theo
  if (dewormedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  //Nếu tích chọn sterlized thì tìm theo
  if (sterilizedInput.checked === true) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }
  //Hiển thị bảng sau khi tìm kiếm
  renderTableData(petArrFind);
});

//Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  //Xóa nội dung của bảng
  tableBody.innerHTML = "";
  //Tạo 1 thẻ tr để hiển thị thú cưng
  petArr.forEach(function (pet) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <th scope="row">${pet.id}</th>
      <td>${pet.name}</td>
      <td>${pet.age}</td>
      <td>${pet.type}</td>
      <td>${pet.weight} kg</td>
      <td>${pet.length} cm</td>
      <td>${pet.breed}</td>
      <td>
      <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
      </td>
      <td><i class="bi ${
        pet.vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
      }"></i></td>
    <td><i class="bi ${
      pet.dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      pet.sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td>${displayTime(pet.date)}</td>
    `;
    tableBody.appendChild(row);
  });
}

//Hàm hiển thị thời gian
function displayTime(date) {
  let dateNow = new Date();
  let year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  let day = dateNow.getDate();

  return `${day}/${month}/${year}`;
}

//Hiển thị bảng loại giống
renderBreed();

//Hàm hiển thị loại giống
function renderBreed() {
  breedArr.forEach(function (breedItem) {
    const option = document.createElement("option");
    option.innerHTML = `${breedItem.breed}`;
    breedInput.appendChild(option);
  });
}
