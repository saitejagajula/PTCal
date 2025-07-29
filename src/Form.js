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
            const [showpay,setshowpay]=useState(false);

    const [errors,seterrors]=useState({});
    const [noofhourssep,setnoofhourssep]=useState(0);
    const [totalamountsep,settotalamountsep]=useState(0);

    const [sucess,setsuccess]=useState(false);
    const [arraydata,setarraydata]=useState([])
    const [loading,setloading]=useState(false);
    const [paychange1,setpaychange1]=useState(10);
    const [name27,setname27]=useState("");
        const [originalData,setoriginalData]=useState([]);

     const handleSubmit=(event)=>{
        event.preventDefault();
        const error=formsubmissions1();
        seterrors(error);

        if(Object.keys(error).length===0){
            setformdata({pt:"",hours:"",date:""});
            setTimeout(() => {
                setsuccess(false);
                
            }, 2000)
         const exits = arraydata.some(item => item.date === formdata.date && item.pt.toLowerCase() === formdata.pt.toLowerCase());
        if(exits){
            var newarray1=arraydata.map((item)=>{
                if(item.date===formdata.date && item.pt.toLowerCase()===formdata.pt.toLowerCase()){
                    return {...item,hours:parseInt(item.hours)+parseInt(formdata.hours)};
                }
                return item;})
        }

        else{ 
            var newarray1=[...arraydata,formdata];
        }
        setarraydata(newarray1);
        setsuccess(true);
            setformdata({pt:"",hours:"",date:""});
  
        }
     }
     const [noofhours,setnoofhours]=useState(0);
     const [totalamount,settotalamount]=useState(0);
         const [ptname,setptname]=useState("");

     useEffect(()=>{
       const saveddata=JSON.parse(localStorage.getItem('formdata')||'[]') 
         setarraydata(saveddata);
    setloading(true);
     },[]);
     useEffect(() => {
        if(loading){
        localStorage.setItem('formdata', JSON.stringify(arraydata));
        setoriginalData(arraydata);
        }
    const total = arraydata.reduce((a, b) => a + parseFloat(b.hours || 0), 0);
    setnoofhours(total);
    const totalamount= arraydata.reduce((a, b) => a + parseInt(b.hours*paychange||0), 0);
    settotalamount(totalamount);


  }, [arraydata, loading, paychange]);

     
  const deleterow=(index)=>{
    const newdata=arraydata.filter((item,idx)=>idx!==index);
    setarraydata(newdata);
 }
 const searchvalue=(e)=>{const number27=e.target.value;
              setptname( number27);
              if(number27===""){
                    setoriginalData(arraydata);
                const noofhoursarray=arraydata.reduce((a, b) => a + parseFloat(b.hours || 0), 0);
                const totalamountarray= arraydata.reduce((a, b) => a + parseInt(b.hours*paychange||0), 0);
                setnoofhours(noofhoursarray);
                settotalamount(totalamountarray);
                setname27("");
                setshowpay(false);
              }
              else{

                  const filterdata=originalData.filter((item)=>item.pt.toLowerCase().includes(ptname.toLowerCase()));
                if (filterdata.length > 0) {
  setname27(filterdata[0].pt);
}
                const noofhours1=filterdata.reduce((a, b) => a + parseFloat(b.hours || 0), 0);
                const totalamount1= filterdata.reduce((a, b) => a + parseInt(b.hours*paychange||0), 0);
                setnoofhourssep(noofhours1);
                settotalamountsep(totalamount1);
        setoriginalData(filterdata);
        setshowpay(true);
    }
              }
 
  return (<>
   {arraydata.length>0 && (<>
    <p className="text-center fw-bold fs-5 mt-3">Total Hours: {noofhours}</p>
            <p className="text-center fw-bold fs-5 mt-3">Total Amount: {totalamount}$</p>

     
            <div className='text-center fw-bold fs-5'>
              Change Pay: <span><input type="number" className='border border-dark border-2 rounded-2' value={paychange} onChange={(e)=>setpaychange(e.target.value)} style={{width:"45px"}} /> </span>
              </div>
              <div className='text-center fw-bold fs-5'>
              PT filter: <span><input type="text" className='border border-dark border-2 rounded-2 mt-3' value={ptname} onChange={searchvalue} style={{width:"100px"}} /> </span>
              </div> </>)}

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
                  {showpay && <>
                  <div className='d-flex justify-content-center'> <p className='fw-bold fs-5 ms-5  text-danger'>{name27}</p> <p className=" ms-5 fw-bold fs-5 ">Total Hours: {noofhourssep}</p>
            <p className=" fw-bold fs-5 ms-5">Total Amount: {totalamountsep}$</p>
                     </div></>}
                    <div className='box d-flex flex-column  mt-0 '>

                        {originalData.map((item,index)=>(

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