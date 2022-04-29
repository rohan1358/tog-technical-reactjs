const focusElement = (id) => {
  return document.getElementById(id).focus();
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    let data = localStorage.getItem("data");
    if (data) {
      resolve(JSON.parse(data));
    } else {
      resolve([]);
    }
  });
};

const setData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await localStorage.setItem("data", JSON.stringify(data));
      resolve(true);
    } catch (err) {}
  });
};

const updateData = (data) => {
  return new Promise(async (resolve, reject) => {
    getAllData()
      .then((res) => {
        const findIndex = res.findIndex((cb) => cb.id === data.id);
        let newRes = res;
        res[findIndex] = data;
        const stringify = JSON.stringify(newRes);
        localStorage.setItem("data", stringify);
        resolve(true);
      })
      .catch((err) => {});
  });
};

const createData = (data) => {
  return new Promise(async (resolve, reject) => {
    getAllData()
      .then((res) => {
        const stringify = JSON.stringify([
          ...res,
          { ...data, id: Math.random() },
        ]);
        localStorage.setItem("data", stringify);
        resolve(true);
      })
      .catch((err) => {});
  });
};

const closeModal = (id) => {
  window.$(`#${id}`).modal("hide");
};

const openModal = (id) => {
  window.$(`#${id}`).modal("show");
};

function convertToCSV(objArray) {
  var array = typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
  var str = "";

  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line !== "") line += ",";

      line += array[i][index];
    }

    str += line + "\r\n";
  }

  return str;
}

const exportCSVFile = (headers, items, fileTitle) => {
  if (headers) {
    items.unshift(headers);
  }

  // Convert Object to JSON
  var jsonObject = JSON.stringify(items);

  var csv = convertToCSV(jsonObject);

  var exportedFilenmae = fileTitle + ".csv" || "export.csv";

  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilenmae);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

const download = async (data) => {
  var headers = data
    ? {
        code: "Fee Type Code".replace(/,/g, ""), // remove commas to avoid errors
        name: "Fee Type Name".replace(/,/g, ""),
        description: "Description",
        status: "Status",
      }
    : {
        model: "Fee Type Code".replace(/,/g, ""), // remove commas to avoid errors
        chargers: "Fee Type Name".replace(/,/g, ""),
        cases: "Description",
        earphones: "Status",
      };

  const itemsNotFormatted = data
    ? data
    : [
        {
          model: "Samsung S7",
          chargers: "55",
          cases: "56",
          earphones: "57",
          scratched: "2",
        },
        {
          model: "Pixel XL",
          chargers: "77",
          cases: "78",
          earphones: "79",
          scratched: "4",
        },
        {
          model: "iPhone 7",
          chargers: "88",
          cases: "89",
          earphones: "90",
          scratched: "6",
        },
      ];

  var itemsFormatted = [];

  // format the data
  itemsNotFormatted.forEach((item) => {
    itemsFormatted.push(
      data
        ? {
            code: item.code.replace(/,/g, ""), // remove commas to avoid errors,
            name: item.name.replace(/,/g, ""),
            description: item.description,
            status: item.status,
          }
        : {
            model: item.model.replace(/,/g, ""), // remove commas to avoid errors,
            chargers: item.chargers,
            cases: item.cases,
            earphones: item.earphones,
          }
    );
  });

  var fileTitle = "fee_type"; // or 'my-unique-title'

  exportCSVFile(headers, itemsFormatted, fileTitle); // call the exportCSVFile() function to process the JSON and trigger the download
};

function printData() {
  var divToPrint = document.getElementById("fee_type");
  let newWin = window.open("");
  newWin.document.write(divToPrint.outerHTML);
  newWin.print();
  newWin.close();
}

export {
  openModal,
  focusElement,
  getAllData,
  createData,
  setData,
  updateData,
  closeModal,
  download,
  printData,
};
