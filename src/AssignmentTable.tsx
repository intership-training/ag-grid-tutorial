import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-enterprise";
import React, {useMemo, FC} from "react"
import { Info } from "./type";
import { ColDef } from 'ag-grid-community';
// import { rawData } from "./data";

interface TableProps{
    data: Info[]
    onRowSelection:React.Dispatch<React.SetStateAction<Info | undefined>>
    setRowIndex: React.Dispatch<React.SetStateAction<number | undefined>>
}

const AssignmentTable :FC<TableProps> = ({data, onRowSelection, setRowIndex}) => {
  const colDefs: ColDef[] = [
    // {field: "firstName", hide: true},
    // {field: "lastName", hide: true},
    {
      field: "name",
      filter: "agTextColumnFilter",
      // rowDrag: true,
      valueGetter: params => {
        // if (params.node && params.node.group) {
        //   return null // return the group key for group rows
        // }
        return params.data?.firstName + ' ' + params.data?.lastName;
      },
      comparator: (valueA, valueB) => {
        return valueA.localeCompare(valueB);
      }
    },
    { field: "gender", filter: "agSetColumnFilter", enableRowGroup: true},
    { field: "country", filter: "agMultiColumnFilter", enableRowGroup: true},
    { field: "age" , filter: "agNumberColumnFilter",  aggFunc: "max"},
    // { field: "salary",
    //   filter: "agNumberColumnFilter", aggFunc: "avg" ,
    //   valueFormatter: params => {
    //     if (params.node && params.node.group) {
    //       return null // return the aggregated value for group rows
    //     }
    //     return params.data.salary.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
    // }
    {
      field: 'salary',
      filter: "agNumberColumnFilter",
      aggFunc: 'avg',
      valueFormatter: params => {
        return parseFloat(params.value).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    },
  ];
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      filter: "agTextColumnFilter",
      menuTabs: ["filterMenuTab"],
    };
  }, []);

  const onRowClicked = (event: any) => {
    setRowIndex(event.rowIndex)
    onRowSelection(event.data);
  };
  return (
    <div className="ag-theme-quartz-dark" style={{ height: 450, width: 1000 }}>
      <AgGridReact<Info>
        
        columnDefs={colDefs}
        rowData={data}
        defaultColDef={defaultColDef}
        // rowDragManaged={true}
        // suppressMoveWhenRowDragging={true}
        onRowClicked={onRowClicked}
        rowGroupPanelShow={"always"}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 50, 100]}
        
        />
    </div>
  );
};

export default AssignmentTable;
