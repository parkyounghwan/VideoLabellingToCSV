const createCSVButton = document.getElementById("create-csv-button");

createCSVButton.onclick = () => {
  let headerList = [];

  const csvHeader = document.getElementById("csv-header");
  const csvHeaderRowCells = csvHeader.rows.item(0).cells;
  const csvHeaderRowCellsCount = csvHeader.rows.item(0).cells.length;

  for (let i = 0; i < csvHeaderRowCellsCount; i++) {
    const cellValue = csvHeaderRowCells[i].firstChild.value;

    headerList.push(cellValue);
  }

  let valueMap = [];

  const csvValue = document.getElementById("csv-value");
  const csvValueRowCount = csvValue.rows.length;

  for (let i = 0; i < csvValueRowCount; i++) {
    const csvValueRowCells = csvValue.rows.item(i).cells;
    const csvValueRowCellsCount = csvValue.rows.item(i).cells.length;

    const rowValues = [];

    for (let j = 0; j < csvValueRowCellsCount; j++) {
      const cellValue = csvValueRowCells[j].firstChild.value;

      csvValueRowCells[j].firstChild.value = "";

      rowValues.push(cellValue);
    }

    valueMap.push(rowValues);
  };

  createCSVFile(headerList, valueMap);
}

const createCSVFile = (header, valueMap) => {
  console.log("valueMap: ", valueMap);
  let csvContent = "data:text/csv;charset=UTF-8,";

  csvContent += header.join(",") + "\r\n";

  Array.prototype.forEach.call(valueMap, (valueList) => {
    let row = valueList.join(",");
    csvContent += row + "\r\n";
  })

  const encodedURI = encodeURI(csvContent);
  window.open(encodedURI);
}