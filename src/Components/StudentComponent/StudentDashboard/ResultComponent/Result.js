

   import axios from "axios";
   import React, {useState , useEffect} from "react"; 

   
   import style from "../StudentDashboard.module.css";

   import baseUrl from "../../../baseUrl";


function Result() {

    const [results , setResults] = useState([]);

     useEffect(()=>{    
        async function getAllResults(){
            let value = await axios.get(`${baseUrl}/user/${sessionStorage.getItem("user")}/result`);
            var val = value.data.filter((f)=>f.email.email == sessionStorage.getItem("user"))
            setResults(val);
           console.log('test',value.data,sessionStorage.getItem("user"));
        }
            getAllResults();
     },[]);
     function calculatePercentage(part, whole) {
        return (part / whole) * 100;
    }

    return (
        <>
            <div id={style.displayHeadingBox}>
                <h2>Student Exam List</h2>
            </div>
            <div id={style.tableBox}>
                <table >
                    <thead>
                        <tr>
                             <th id={style.center}>User Email</th>
                             <th id={style.center}>Exam Name</th>
                             <th id={style.center}>Exam Date</th>
                             <th id={style.center}>Result Status</th>
                             <th id={style.center}>Your Score</th>  
                             <th id={style.center}>Total Marks</th>
                             <th id={style.center}>Percentage</th>
                             <th id={style.center}>Total Question</th>  
                        </tr>
                    </thead>
                    <tbody >
                    { results.length ==0 ?
                        <tr >
                            <td colSpan={7} style={{textAlign:'center'}}>No data found</td> 
                        </tr>
                    : results.map((data , i) => {
                                    return(
                                          <tr key={i}>
                                              <td>{data.email.email}</td>
                                              <td>{data.sname.name}</td>
                                              <td>{data.edate}</td>
                                              <td>{data.status}</td>
                                              <td>{data.score}</td>
                                              <td>{data.totalMarks}</td>
                                              <td>{calculatePercentage(data.score,data.totalMarks)}%</td>
                                              <td>{data.totalQuestion}</td>
                                          </tr>
                                    );

                                })
                            }

                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Result;