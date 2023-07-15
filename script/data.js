"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

btnExport.addEventListener("click", function () {
  const isExport = confirm("Do you want Export ?");
  if (isExport) {
    saveToFile();
  }
});
function saveToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });
  saveAs(blob, "petData.json");
}

btnImport.addEventListener("click", function () {
  if (!fileInput.value) {
    alert("Please choose file !");
  } else {
    const isImport = confirm("Do you want Import ?");
    if (isImport) {
      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            saveToStorage("petArr", JSON.parse(reader.result));
            alert("Import success !");
          }
        },
        false
      );
      if (file) {
        reader.readAsText(file);
      }
      fileInput.value = "";
    }
  }
});

function checkFile(data) {
  if (!(data instanceof Array)) {
    alert("File không hợp lệ: dữ liệu không phải mảng chứa các Object !");
    return false;
  }
  if (!isPetObject(data)) {
    return false;
  }
  if (!isValidate(data)) {
    return false;
  }
  return true;
}

function isPetObject(data) {
  if (!data.every((item) => item instanceof Object)) {
    alert("File không hợp lệ: dữ liệu không phải mảng chứa các Object !");
    return false;
  }
  const isOk = data.every((item) => {
    return Object.keys(
      item.length === 12 &&
        item.hasOwnProperty("id") &&
        item.hasOwnProperty("name") &&
        item.hasOwnProperty("age") &&
        item.hasOwnProperty("type") &&
        item.hasOwnProperty("weight") &&
        item.hasOwnProperty("length") &&
        item.hasOwnProperty("color") &&
        item.hasOwnProperty("breed") &&
        item.hasOwnProperty("vaccinated") &&
        item.hasOwnProperty("dewormed") &&
        item.hasOwnProperty("sterilized") &&
        item.hasOwnProperty("date")
    );
  });
  if (!isOk) {
    alert("File không hợp lệ: dữ liệu không phải mảng chứa các Object !");
    return false;
  }
  return true;
}

function isValidate(data) {
  return data.every(function (pet) {
    if (pet.id.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính id không hợp lệ!");
      return false;
    }
    if (pet.name.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính name không hợp lệ!");
      return false;
    }
    pet.age = parseInt(pet.age);
    if (isNaN(pet.age) || pet.age < 1 || pet.age > 15) {
      alert("File không hợp lệ: file có thuộc tính age không hợp lệ!");
      return false;
    }
    pet.weight = parseInt(pet.weight);
    if (isNaN(pet.weight) || pet.weight < 1 || pet.weight > 15) {
      alert("File không hợp lệ: file có thuộc tính weight không hợp lệ!");
      return false;
    }
    pet.length = parseInt(pet.length);
    if (isNaN(pet.length) || pet.length < 1 || pet.length > 15) {
      alert("File không hợp lệ: file có thuộc tính length không hợp lệ!");
      return false;
    }
    if (pet.type.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính type không hợp lệ!");
      return false;
    }
    if (pet.color.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính color không hợp lệ!");
      return false;
    }
    if (pet.breed.trim().length === 0) {
      alert("File không hợp lệ: file có thuộc tính breed không hợp lệ!");
      return false;
    }
    if (typeof pet.vaccinated !== "boolean") {
      alert("File không hợp lệ: file có thuộc tính vaccinated không hợp lệ!");
      return false;
    }
    if (typeof pet.dewormed !== "boolean") {
      alert("File không hợp lệ: file có thuộc tính dewormed không hợp lệ!");
      return false;
    }
    if (typeof pet.sterilized !== "boolean") {
      alert("File không hợp lệ: file có thuộc tính sterilized không hợp lệ!");
      return false;
    }
    let count = 1;
    for (let item of data) {
      if (pet.id === item.id) {
        if (count > 1) {
          alert("File không hợp lệ: Id không được trùng nhau!");
          return false;
        }
        count++;
      }
    }
    return true;
  });
}
