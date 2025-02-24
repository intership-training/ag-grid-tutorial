import React, { useState } from "react";
import "./App.css";
import { Space } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// import "ag-grid-enterprise";
import AssignmentTable from "./AssignmentTable";
import CRUDForm from "./CRUDForm";
import { Info } from "./type";
import { rawData } from "./data";

function App() {
  const [data, setData] = useState(rawData)
  const [selectRow, setSelectedRow] = useState<Info>();
  const [rowIndex, setRowIndex] = useState<number>();

  const addData = (newData: Info) => {
    setData([...data, newData]); // Add new data to the existing data
  }

  const updateData = (newData: Info) => {
    if (rowIndex !== undefined) {
        data[rowIndex]= newData
        setData([...data])
        console.log("data:", data)
        console.log("newData:", newData)
      }
  }

  const deleteData = () =>{
    if (rowIndex !== undefined) {
      data.splice(rowIndex, 1)
      setData([...data])
    }
  }

  return (
    <div className="centered">
      <Space direction="vertical">
        <CRUDForm addData={addData} selectData={selectRow} setData={updateData} delData={deleteData}/>

        <AssignmentTable data={data} onRowSelection={setSelectedRow} setRowIndex={setRowIndex}/>
      </Space>
    </div>
  );
}

export default App;
