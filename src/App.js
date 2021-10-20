import logo from './logo.svg';
import './App.css';
import EmployeeTable from './Components/EmployeeTable';
import Test from './Components/test';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';

function App() {
 
 
  
  return (
    <div className="App">
      <EmployeeTable/>
      <Test/>
    
    </div>
  );
}

export default App;
