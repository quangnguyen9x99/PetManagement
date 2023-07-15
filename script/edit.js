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

const submitBtn = document.getElementById("submit-btn");
const tableBody = document.getElementById("tbody");
const form = document.getElementById("container-form");

//Hiển thị danh sách thú cưng
renderTableData(petArr);

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
    <td>
    <button type="button" class="btn btn-danger" onclick="editPet('${
      pet.id
    }')"> Edit </button>
    </td>
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

//Hàm edit thông tin
function editPet(id) {
  //Hiển thị form nhập dữ liệu
  form.classList.remove("hide");
  //Tìm đến dữ liệu thú cưng cần edit theo id
  const pet = petArr.find((petItem) => petItem.id === id);
  //Hiển thị thông tin thú cưng lên form nhập
  idInput.value = pet.id;
  nameInput.value = pet.name;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.value = pet.vaccinated;
  dewormedInput.value = pet.dewormed;
  sterilizedInput.value = pet.sterilized;
  //Hiển thị các loại giống cho từng loại Dog - Cat
  renderBreed();
  //Hiển thị dữ liệu loại giống thú cưng trước khi edit
  breedInput.value = `${pet.breed}`;
}
//Sự kiện click vào typeInput - gọi hàm hiện thị loại giống đúng với từng loại Dog-Cat
typeInput.addEventListener("click", renderBreed);

//Hàm hiển thị thông tin breed lên bảng
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";

  const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
  const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");

  if (typeInput.value === "Dog") {
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  } else if (typeInput.value === "Cat") {
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
}

//Bắt sự kiện khi click vào nút submit
submitBtn.addEventListener("click", function (e) {
  //Lấy dữ liệu từ các form input
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
  };
  //Validate dữ liệu
  const validate = validateData(data);

  if (validate) {
    const index = petArr.findIndex((pet) => pet.id === data.id);
    //Không thay đổi ngày thêm thú cưng
    data.date = petArr[index].date;
    //Cập nhật dữ liệu thú cưng
    petArr[index] = data;
    //Lưu dữ liệu
    saveToStorage("petArr", petArr);
    //Ẩn form
    form.classList.add("hide");
    //Hiển thị danh sách thú cưng
    renderTableData(petArr);
  }
});

//Hàm kiểm tra dữ liệu nhập thiếu
function validateData(data) {
  //Khai báo biến cờ hiệu
  let isValidate = true;
  if (nameInput.value.trim().length === "") {
    alert("Name must be unique!");
    isValidate = false;
  } else if (isNaN(data.age)) {
    alert("Age must be unique!");
    isValidate = false;
  } else if (isNaN(data.weight)) {
    alert("Weight must be unique!");
    isValidate = false;
  } else if (isNaN(data.length)) {
    alert("Length must be unique!");
    isValidate = false;
  } else if (data.name < 1 || data.name > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Age must be between 1 and 15!");
    isValidate = false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Age must be between 1 and 100!");
    isValidate = false;
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidate = false;
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidate = false;
  }
  return isValidate;
}
