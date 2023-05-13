const express=require("express");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");

const path=require("path")
const app=express()

const dbPath=path.join(__dirname,'index.db')
app.use(express.json());

let db;

const initializeDbServer= async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        app.listen(5500,()=>{
            console.log("Server is running")
        })
    }catch(error){
        console.log(error)
    }
}

initializeDbServer()


app.post('/save_data',async(req,res)=>{

    try{
        const {input1,input2}=req.body;
    const insertQuery=`
    INSERT INTO contacts (input1,input2) VALUES ('${input1}','${input2}')`;
    await db.run(insertQuery)
    res.send("Data saved successfully")
    }catch(error){
        console.log("Error saving data",error)

    }
    

})


app.get("/getData/",async(req,res)=>{
    const getDataa=`
    select * from contacts`;

    const c=await db.all(getDataa)
    res.send(c)

})