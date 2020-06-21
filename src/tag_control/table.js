const rowCountContainer = document.getElementById("row-count-container");
const columnCountContainer = document.getElementById("column-count-container");

rowCountContainer.addEventListener("change", () => {
  const rowCount = rowCountContainer.options[rowCountContainer.selectedIndex].value;

  for(let i = 0; i < rowCount; i++) {
    createTableColumn();
  }
})

columnCountContainer.addEventListener("change", () => {
  const columnCount = columnCountContainer.options[columnCountContainer.selectedIndex].value;

  const nowColumnCount = document.getElementById("csv-header").firstElementChild.childElementCount;

  for (let i = 0; i < (nowColumnCount - columnCount); i++) {
    deleteTableColumn();
  }

  for(let i = nowColumnCount; i < columnCount; i++) {
    createTableRow();
  }
});

const createTableRow = () => {
  const tableHeaderContainer = document.getElementById("csv-header");

  const th = document.createElement("th");
  th.setAttribute("scope", "col");
  
  const headerInput = document.createElement("input");
  headerInput.setAttribute("type", "text");
  headerInput.setAttribute("value", "");

  th.appendChild(headerInput);

  tableHeaderContainer.firstElementChild.appendChild(th);

  const tableValueContainer = document.getElementById("csv-value");

  const rowCount = tableValueContainer.children.length;

  for (let i = 0; i < rowCount; i++) {
    const td = document.createElement("td");
    td.setAttribute("scope", "col");
  
    const rowInput = document.createElement("input");
    rowInput.setAttribute("type", "text");
    rowInput.setAttribute("value", "");
  
    td.appendChild(rowInput);
  
    tableValueContainer.children[i].appendChild(td);
  }
}

const createTableColumn = () => {
  const tableValueContainer = document.getElementById("csv-value");

  tableValueContainer.appendChild(tableValueContainer.firstElementChild.cloneNode(true));
}

const deleteTableColumn = () => {
  const tableHeaderContainer = document.getElementById("csv-header");

  tableHeaderContainer.firstElementChild.lastElementChild.remove();

  const tableValueContainer = document.getElementById("csv-value");

  const rowCount = tableValueContainer.children.length;

  for (let i = 0; i < rowCount; i++) {
    console.log(tableValueContainer.lastElementChild.lastElementChild.remove());
  }
}