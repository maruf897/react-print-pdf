import React,{useState ,useEffect,useRef} from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf';

export default function EmployeeTable() {
    const [employees, setEmployees] = useState()
    const selectedRef = useRef([])
    const [isChecked, setIsChecked] = useState([]);
    useEffect(()=>{
        console.log("acti")
      setEmployees([ 
        {
            name:"Maruf",
            age:16,
            gender:"M"
        },
        {
            name:"Maruf2",
            age:15,
            gender:"M"
        },
        {
            name:"Maruf3",
            age:20,
            gender:"M"
        }, {
            name:"Maruf4",
            age:20,
            gender:"M"
        }])
      
       
        
    },[])
    useEffect(()=>{
        setup()
    },[employees])
   
    const setup = ()=>{
        let temp =[]
        if(employees){
        employees.forEach((employee,i)=>{
            console.log(employee)
            temp.push({name:`print${i}`,checked:false})
        })
    }
        setIsChecked(temp)
    }
 
    const handleAllSelect = (e)=>{
        let temp = isChecked
        temp =temp.map((item)=>{
            return {name:item.name,checked:e.target.checked}
        })
        setIsChecked(temp)
    }
    const handleChange2 =(e)=>{
        const {name, checked} = e.target
        setIsChecked(isChecked.map((item)=>{
            if(item.name===name){
                item.checked = checked
            }
            return item
        }))
    }

        const printDocument= async()=> {
            console.log("object")
            let inputs = []
            isChecked.forEach(({name,checked})=>{
                if(checked){
                let tr = document.getElementById(`${name}`)
                inputs.push(tr)
            }
                
            })
            //const inputs = document.querySelectorAll("#print");
           console.log(inputs)
            let input_snap = null
            let pdf = new jsPDF()
            let imgData = []
            for(let i=0;i<inputs.length;i++){
             
                input_snap = await html2canvas(inputs[i])
                imgData.push(await input_snap.toDataURL('image/png'));
                
            }

              imgData.map((img)=>{
              console.log(img)
              pdf.addImage(img, 'JPEG', 0, 0);
              pdf.addPage()
            })
            pdf.deletePage(imgData.length+1)
           //pdf.autoPrint();
            //pdf.save("download.pdf");
            pdf.output('dataurlnewwindow');
        
          }
    return (
        <div >
            <table id='table'>
                <thead>
                   
                    <tr>
                    <th>Select</th>
                   
                    {employees?Object.keys(employees[0]).map((head_key)=>{
                        
                        return( <th>{head_key}</th>)
                       
                    }):null}
                    </tr>
                </thead>
                <tbody>
                    {employees?employees.map((employee,i)=>{
                       // console.log(isChecked[i].checked)

                        return(
                        <>
                            <tr  id={`print${i}`} key={i}>
                                <th scope='rows'><input type='checkbox' checked={isChecked[i]?isChecked[i].checked:false} key={i}  name={`print${i}`}  onChange={handleChange2}/></th>
                                <td>{employee.name}</td>
                                <td>{employee.age}</td>
                                <td>{employee.gender}</td>
                                
                            </tr>
                            
                        </>)
                    }):null}
                </tbody>
                
                <input type='checkbox' onChange={handleAllSelect}/>
            </table>
            <button onClick={printDocument}>Save</button>
        </div>
    
    )
}
