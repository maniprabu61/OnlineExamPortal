
  
  import style from "../../SubjectComponent/Subject.module.css";

  import {useParams , useHistory} from "react-router-dom";
  import React, {useState , useEffect} from "react";
  import axios from "axios";
  import baseUrl from "../../../../baseUrl";

     function Student(){

         const {id} = useParams();
        //  console.log('id',id);

         const [email , setEmail] = useState();

         const[result , setResult] = useState([]);

         useEffect(() => {
             async function getStudentEmail(){
                 //user whose result we have to fetch
                let value = await axios.get(`${baseUrl}/user?email=${id}`);
                 setEmail(value.data[0  ].email);

                // console.log('ema',value.data[0].email);
                 
             }
             getStudentEmail();
         })


         useEffect(() => {   
             async function getAllResult(){
                let value = await axios.get(`${baseUrl}/result`);
                var val = value.data.filter(e=>e.email.email == id);
                setResult(val);
            //    console.log(value.data);
             }
             getAllResult();
        },[])
 
         const history = useHistory();

        function handleGoBack(){ 
            history.push("/AdminDashboard/StudentList");
        }
        function calculatePercentage(part, whole) {
            return (part / whole) * 100;
        }

         return (
              <>
               <div id={style.displayHeadingBox}> 
                   <h2>Student Exam List</h2>     
                </div>

                <div id={style.tableBox}>
                    <table>
                       <thead>
                          <tr>
                             <th id={style.center}>User Email</th>
                              <th id={style.center}>Exam Name</th>
                              <th id={style.center}>Exam Date</th>
                              <th id={style.center}>Result Status</th>
                              <th id={style.center}>Total Marks</th>
                              <th id={style.center}>Percentage</th>
                              <th id={style.center}>Result Score</th>  
                           </tr>
                        </thead>
                        <tbody>
                        {
                                result.map((data , i) => {
                                    if(data.email.email === email)
                                    return(
                                          <tr key={i}>
                                              <td>{data.email.email}</td>
                                              <td>{data.sname.name}</td>
                                              <td>{data.edate}</td>
                                              <td>{data.status}</td>
                                              <td>{data.score}</td>
                                              <td>{calculatePercentage(data.score,data.totalMarks)}%</td>
                                              <td>{data.totalMarks}</td>
                                          </tr>
                                    );

                                    return <React.Fragment key={i}></React.Fragment>;
                                })
                            }
                               
                        </tbody>
                     </table>
                </div>

                 <div id={style.addSubjectBox}>
                       <button onClick={handleGoBack}>Go Back</button>
                 </div>
              </>
         );
     }

     export default Student;