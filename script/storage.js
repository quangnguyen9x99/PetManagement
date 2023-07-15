"use strict";

//Thêm animation khi click vào sidebar
const navElement = document.getElementById("sidebar");
navElement.addEventListener("click", function () {
  this.classList.toggle("active");
});

//Nhập 2 phần tử thú cưng vào mảng
const data1 = {
  id: "Pet01",
  name: "Micky",
  age: 3,
  type: "Dog",
  weight: 5,
  length: 35,
  color: "White",
  breed: "Mixed Breed",
  vaccinated: true,
  dewormed: true,
  sterilized: true,
  // date: new Date(),
};
const data2 = {
  id: "Pet02",
  name: "Mun",
  age: 5,
  type: "Cat",
  weight: 3,
  length: 25,
  color: "Gray",
  breed: "Mixed Breed",
  vaccinated: false,
  dewormed: true,
  sterilized: false,
  // date: new Date(),
};
//Nhập 3 phần tử breed
const breed1 = {
  breed: "Mixed Breed",
  type: "Dog",
};
const breed2 = {
  breed: "Tabby",
  type: "Cat",
};
const breed3 = {
  breed: "Mèo Tam Thể",
  type: "Cat",
};

// Lấy dữ liệu petArr
if (!getFromStorage("petArr")) {
  //Gán dữ liệu
  saveToStorage("petArr", [data1, data2]);
}
const petArr = getFromStorage("petArr");

//Lấy dữ liệu breedArr
if (!getFromStorage("breedArr")) {
  //Gán dữ liệu
  saveToStorage("breedArr", [breed1, breed2, breed3]);
}
const breedArr = getFromStorage("breedArr");

//Hàm lấy dữ liệu
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

//Hàm lưu dữ liệu
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
