import React from 'react'
import { useState,useEffect } from 'react';
import './Form.css';

 const Form = () => {
    const [formdata,setformdata]=useState({pt:"",hours:"",date:""});
    const [paychange,setpaychange]=useState(10);
    const onchange=(event)=>{
        const {name,value}=event.target;
    setformdata({...formdata,[name]:value});
    }
    const formsubmissions1=()=>{
        const errordata={};
        if(!formdata.pt){
            errordata.pt="enter pt";
        }
        if(!formdata.hours){
            errordata.hours="enter hours";
        }
        else if(formdata.hours<0){
            errordata.hours="hours cannot be negative";}
        if(!formdata.date){
            errordata.date="enter date";
        }
        return errordata;

    }
    const [errors,seterrors]=useState({});
    const [sucess,setsuccess]=useState(false);
    const [arraydata,setarraydata]=useState([])
    const [loading,setloading]=useState(false);
    const [paychange1,setpaychange1]=useState(10);
     const handleSubmit=(event)=>{
        event.preventDefault();
        const error=formsubmissions1();
        seterrors(error);

        if(Object.keys(error).length===0){
            setformdata({pt:"",hours:"",date:""});
            setTimeout(() => {
                setsuccess(false);
                
            }, 2000)
         const exits = arraydata.some(item => item.date === formdata.date && item.pt === formdata.pt);
        if(exits){
            const newarray1=arraydata.map((item)=>{
                if(item.date===formdata.date && item.pt===formdata.pt){
                    return {...item,hours:parseInt(item.hours)+parseInt(formdata.hours)};
                }
                return item;

            }

            )
            setarraydata(newarray1);}

        else{
            
            setarraydata([...arraydata,formdata]);
            

        }
        setsuccess(true);
            setformdata({pt:"",hours:"",date:""});
  
        }
     }
     const [noofhours,setnoofhours]=useState(0);
     const [totalamount,settotalamount]=useState(0);
     useEffect(()=>{
       const saveddata=JSON.parse(localStorage.getItem('formdata')||'[]') 
         setarraydata(saveddata);
         setloading(true);
     },[]);
     useEffect(() => {
        if(loading){
        localStorage.setItem('formdata', JSON.stringify(arraydata));}
    const total = arraydata.reduce((a, b) => a + parseFloat(b.hours || 0), 0);
    setnoofhours(total);
    const totalamount= arraydata.reduce((a, b) => a + parseInt(b.hours*paychange||0), 0);
    settotalamount(totalamount);
  }, [arraydata, loading, paychange]);
  const deleterow=(index)=>{
    const newdata=arraydata.filter((item,idx)=>idx!==index);
    setarraydata(newdata);
    

  }
   
    
  return (<>
   {arraydata.length>0 && (<>
      <p className="text-center fw-bold fs-5 mt-3">Total Hours: {noofhours}</p>
            <p className="text-center fw-bold fs-5 mt-3">Total Amount: {totalamount}$</p>
            <div className='text-center fw-bold fs-5'>
              Change Pay: <span><input type="number" className='border border-dark border-2 rounded-2' value={paychange} onChange={(e)=>setpaychange(e.target.value)} style={{width:"45px"}} />

 </span> </div> </>)}

    <div className='d-flex justify-content-center'>
        <form>
            <div className='d-flex gap-2 mt-5 justify-content-center'>
                <h4>PT:</h4>
           <input type="text" name='pt' className='form-control' placeholder='Enter PT' value={formdata.pt} onChange={onchange} />

            </div>
            {errors.pt && <div className='text-danger'>{errors.pt}</div>}
            <div className='d-flex gap-2 mt-5'>
                <h4>Hours:</h4>
           <input type="number" name='hours' className='form-control' placeholder='No of Hours' value={formdata.hours} onChange={onchange}/>

            </div>
                        {errors.hours && <div className='text-danger'>{errors.hours}</div>}

             <div className='d-flex gap-2 mt-5'>
                <h4>Date:</h4>
           <input type="date" className='form-control' name='date' placeholder='Date'onChange={onchange} value={formdata.date} />

            </div>
                        {errors.date && <div className='text-danger'>{errors.date}</div>}

            <div className='text-center mt-5'> <button type='submit' className='rounded-2' onClick={handleSubmit}>Submit</button>
</div>
          
           
           
        </form>

    </div>
                    {sucess && <div className='text-center text-success mt-3'>Data Added</div>}
                    <div className='box d-flex flex-column  mt-5 '>
                        {arraydata.map((item,index)=>(
                            <div className=' border border-1 row'key={index}> 
                            <div className='col-4  text-center'>{item.pt}</div>
                            <div className='col-3  col-md-4 text-center'>{item.hours}</div>
                            <div className='col-5  col-md-4'>{item.date}<button className='ms-2 ms-md-5' onClick={()=>deleterow(index)}>❌</button></div></div>
                        ))}
                    </div>
                   
</>

  )
}
export default Form;