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
const healthyBtn = document.getElementById("healthy-btn");

let btnDelete = document.getElementById(".btn.btn-danger");

//Hiển thị danh sách thú cưng
renderTableData(petArr);

//Khi chọn type để hiển thị loại giống theo đúng loại
typeInput.addEventListener("click", function renderTableBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  //Kiểm tra type là DOg
  if (typeInput.value === "Dog") {
    //Tạo mảng chứa type trong mảng breedArr có thuộc tính là Dog
    const breedDogs = breedArr.filter((breedItem) => breedItem.type === "Dog");
    breedDogs.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
    //Kiểm tra type là Cat
  } else if (typeInput.value === "Cat") {
    //Tạo mảng chứa type trong mảng breedArr có thuộc tính là Cat
    const breedCats = breedArr.filter((breedItem) => breedItem.type === "Cat");
    breedCats.forEach(function (breedItem) {
      const option = document.createElement("option");
      option.innerHTML = `${breedItem.breed}`;
      breedInput.appendChild(option);
    });
  }
});

//Bắt sự kiện khi click vào nút submit
submitBtn.addEventListener("click", function () {
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
    date: new Date().toISOString(),
  };
  //Validate dữ liệu
  const validate = validateData(data);

  if (validate) {
    //Thêm thú cưng vào mảng
    petArr.push(data);
    //Lưu dữ liệu lại
    saveToStorage("petArr", petArr);
    //Hiển thị danh sách thú cưng
    renderTableData(petArr);

    clearInput();
  }
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
    <td><button class="btn btn-danger" 
    onclick="deletePet('${pet.id}')">Delete</button>
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

//Hàm xóa thú cưng với id
function deletePet(petId) {
  const isDelete = confirm("Are you sure? ");
  if (isDelete) {
    //Duyệt mảng tìm id muốn xóa
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        //Xóa khỏi mảng
        petArr.splice(i, 1);
        //Cập nhật dữ liệu
        saveToStorage("petArr", petArr);
        //Hiển thị lại dữ liệu sau khi xóa
        renderTableData(petArr);
        break;
      }
    }
  }
}

//Hàm xóa dữ liệu trên form input
function clearInput() {
  (idInput.value = ""),
    (nameInput.value = ""),
    (ageInput.value = ""),
    (typeInput.value = "Select Type"),
    (weightInput.value = ""),
    (lengthInput.value = ""),
    (colorInput.value = "#000000"),
    (breedInput.value = "Select Breed"),
    (vaccinatedInput.checked = false),
    (dewormedInput.checked = false),
    (sterilizedInput.checked = false);
}
//Hàm kiểm tra dữ liệu nhập thiếu
function validateData(data) {
  //Khai báo biến cờ hiệu
  let isValidate = true;
  //Kiểm tra xem ID này đã tồn tại trong mảng chưa
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must unique!");
      isValidate = false;
      break;
    }
  }
  if (data.id.trim() === "") {
    alert("ID must be unique!");
    isValidate = false;
  } else if (data.name.trim() === "") {
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
//Khai báo biến cờ hiệu
let healthyCheck = false;

//Sự kiện hiển thị thú cưng khỏe mạnh
healthyBtn.addEventListener("click", function (e) {
  if (healthyCheck === true) {
    //Khai báo mảng chứa thú cưng khỏe mạnh
    const healthyPetArr = [];
    //Duyệt mảng tìm thú cưng khỏe mạnh
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        //Thêm thú cưng khỏe mạnh vào mảng healthyPetArr
        healthyPetArr.push(petArr[i]);
      }
    }
    //Hiển thị danh sách thú cưng khỏe mạnh
    renderTableData(healthyPetArr);
    //Đổi tên nút thành "Show All Pet"
    healthyBtn.textContent = "Show All Pet";
    //Thay đổi giá trị biến
    healthyCheck = false;
  } else {
    //Hiển thị toàn bộ thú cưng
    renderTableData(petArr);
    //Đổi tên nút thành "Show Healthy Pet"
    healthyBtn.textContent = "Show Healthy Pet";
    //Thay đổi giá trị biến
    healthyCheck = true;
  }
});
