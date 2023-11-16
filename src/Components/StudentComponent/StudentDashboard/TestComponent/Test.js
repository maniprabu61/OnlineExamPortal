

import axios from "axios";

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import style from "../StudentDashboard.module.css";

import baseUrl from "../../../baseUrl";

function Test() {

    // ---------------------------------------------------------
    let { id } = useParams();
    let { category } = useParams();

    const [allQuestions , setAllQuestions] = useState([]);
    const [examdetails , setExamdetails] = useState({});



    useEffect(() => {
        async function getAllQuestions(){
            let value = await axios.get(`${baseUrl}/exam/${id}/question`);
            var val = value.data.filter((f)=>f.ename.id==id);
            console.log('tcomponent',value.data,val);
            setAllQuestions(val);

            let value_ = await axios.get(`${baseUrl}/exam?id=${id}`);
            console.log('value_',value_.data);
            setExamdetails(value_.data[0]);
            
        }
        getAllQuestions();
    },[id]);

    // ---------------------------------------------------------
    
    // const [userAnswer , setUserAnswer] = useState({
    //     answer1:"",
    //     answer2:"",
    //     answer3:"",
    // });

    const [answer , setAnswer] = useState({});


    let  correctAnswer  = [] ;
    
    function onRadioButtonChange(e){
       setAnswer({
            ...answer, 
            [e.target.name] : e.target.value
    });
      
       
    }

    let count = 0;

    


    async function submitTest()
    {
        for(let i=0; i<allQuestions.length ;i++)
        {
             correctAnswer.push(allQuestions[i].answer);
        }


        console.log('answer',answer);
        console.log('correctAnswer',correctAnswer);

        let score = 0;
        let status = "";

        for(let i=0; i<correctAnswer.length ;i++)
        {
            console.log('for',correctAnswer[i],answer[`answer${i+1}`]);
            if(correctAnswer[i] == answer[`answer${i+1}`]) score++; 
        }
        // console.log(score);
  
         if(score >= examdetails.passMarks) status="Pass";
         else status = "Fail";

        


        var date = new Date();
        var d =  date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() ;
        var t =  date.getHours() + ":" + date.getMinutes() +  ":" + date.getSeconds() ;
   
       let data={
         "status": status,
         "score": score,
         "email":{"email":sessionStorage.getItem("user")},    // email
         "edate": d+" "+t,
         "sname": {"name":category},   // --  subject name
         "totalMarks": examdetails.marks,
         "examId": {"id":id},         // exam id
         "totalQuestion": examdetails.totalQuestion
       };

    //    console.log('data',data);
 
       await axios.post(`${baseUrl}/result` , data);
        history.push("/StudentDashboard/Result");
    }

     let history = useHistory();

    return (
        <>
            <div id={style.displayBoxQuestionHeadingBox}>
                <h1>Answer all the questions</h1>
            </div>
            {
                 
                allQuestions.map((data , i) => {
                        count++;
                    return (
                        <div id={style.displayBoxQuestionBox} key={i}>
                        <div id={style.divQuestion}> <span>{data.qname}</span> </div>
        
                        <div>
                            <input onChange={(e) => onRadioButtonChange(e)} value={data.optionOne}
                            id={style.option1} name={"answer"+count}   type="radio" />  
                            <label htmlFor="option1">{data.optionOne}</label>
                        </div>
        
                        <div>
                            <input onChange={(e) => onRadioButtonChange(e)} value={data.optionTwo}
                            id={style.option2} name={"answer"+count} type="radio" /> 
                            <label htmlFor="option2">{data.optionTwo}</label>
                        </div>
        
                        <div>
                            <input onChange={(e) => onRadioButtonChange(e)} value={data.optionThree}
                            id={style.option3} name={"answer"+count}  type="radio" /> 
                            <label htmlFor="option3">{data.optionThree}</label>
                        </div>
        
                        <div>
                            <input onChange={(e) => onRadioButtonChange(e)} value={data.optionFour}
                            id={style.option4} name={"answer"+count}  type="radio" /> 
                            <label htmlFor="option4">{data.optionFour}</label>
                        </div>
                    </div>
                    );
                  
                })
            }
            <div id={style.submitExam}><button onClick={submitTest}>Submit Exam</button></div>
        </>
    );
}

export default Test