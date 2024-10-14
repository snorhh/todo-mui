import './App.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

import { useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";

function TodoList() {

/*
Toteuta todolist sovellus materiaalin mukaisesti siten, että taulukossa käytetään ag-grid komponenttia.

Tutustu ag-grid komponentin dokumentaatioon ja kytke seuraavat kaksi ominaisuutta päälle:

    floating filter - Suodatus kentät on pysyvästi näkyvissä taulukon yläosassa
    row animation - Kun järjestät taulukon rivejä, ne siirtyvät oikeille paikoille animoidusti. 
    Tämä vaatii useampia rivejä, jotta sen vaikutus näkyy.

*/

const [columnDefs, setColumnDefs] = useState([
  {field: 'desc', sortable: false, filter: true, floatingFilter: true},
  {field: 'priority', filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} 
  },
  {field: 'date', filter: true, floatingFilter: true}
]);

const [info, setInfo] =useState({desc:"", date: ""});
const [todos, setTodos] = useState([]);
const gridRef = useRef();


const addTodo = () => {

  if (!info.desc || !info.date){
      alert("Write a description and a date")
  }

  else {
    setTodos([...todos, {...info}]);
    setInfo({desc:"", priority:"", date: ""});
   }

};

const handleDelete = () => {
  if (gridRef.current.getSelectedNodes().length > 0) {
    setTodos(todos.filter((todo, index) => 
      index != gridRef.current.getSelectedNodes()[0].id))
  }
  else {
    alert('Select a row first!');
  }
};


    return(
        
        <>
         
          <input 
      placeholder="Description" 
      onChange={e => setInfo({...info, desc: e.target.value })} 
      value={info.desc} />
    <input 
      placeholder="Priority" 
      onChange={e => setInfo({...info, priority: e.target.value })} 
      value={info.priority} /> 
    <input 
      placeholder="Date" type="date"
      onChange={e => setInfo({...info, date: e.target.value })} 
      value={info.date} />
    <button onClick={addTodo}>Add</button>  
    <button onClick={handleDelete}>Delete</button> 


    <div className="ag-theme-material" style={{width: 700, height: 500}}>
      <AgGridReact 
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowData={todos}
        columnDefs={columnDefs}
        rowSelection="single"
      />
    </div> 

      </>

    )

}
  
export default TodoList;
