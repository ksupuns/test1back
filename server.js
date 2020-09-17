const express=require('express');//to support sql
const cors=require('cors');//resourse sharing

const bodyParser=require('body-parser');

const app=express();
var http=require('http').Server(app);

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

const PORT =4000;

var db_config={
    user          : "CICL",
    password      : "cicl",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "CICCO-SCAN/ceyt",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

var ordb=require('oracledb');
const {autoCommit}=require('oracledb');
const {Console}=require('console');
const OracleDB = require('oracledb');
const { request } = require('http');

var oraconnection = OracleDB.getConnection(db_config);

app.all('/*', function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(cors());

app.listen(PORT,()=>{
    console.log("server has started");
});

app.get('/',(req,res)=>{
    res.send(`you are in default port`);
});
/*
app.post('/add',(req,res)=>{
    var id,name,nic,tp;

    console.log(req);
    id=req.body.pid;
    name=req.body.pname;
    nic=req.body.pnic;
    tp=req.body.ptp;


    //console.log(id);
    //console.log(name);
    //console.log(nic);
    //console.log(tp);
});
*/

//Data Inserting
app.post('/add', function(req,res){
    var id,name,nic,tp;

    console.log(req);
    id=req.body.pid;
    name=req.body.pname;
    nic=req.body.pnic;
    tp=req.body.ptp;

    const InsertQuery = "insert into tbl_react values ('"+id+"','"+name+"','"+nic+"','"+tp+"')";
    OracleDB.autoCommit=true,//only in insert,update,delete
    OracleDB.getConnection({
            user          : 'CICL',
            password      : 'cicl',
            connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "CICCO-SCAN/ceyt",
          },


          function(err, connection)
          {
            if (err) { console.error(err); return; }
            connection.execute(InsertQuery , function(err, result)
            {
              if (err)
              {
                console.error(err);
                return;
              }
              else
              {
                console.log("Success : Data Inserted");
              }
            });
          });
        });


// data retrive        
app.get('/view', function(req,res){
    const selectQuery = "select * from  tbl_react";
    OracleDB.getConnection({
        user          : 'CICL',
        password      : 'cicl',
        connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "CICCO-SCAN/ceyt",
      },


      function(err, connection)
      {
        if (err) { console.error(err); return; }
        connection.execute(selectQuery , function(err, result)
        {
          if (err)
          {
            console.error(err);
            return;
          }
          else
          {
            //console.log("Success : Data Inserted");
            return res.json({
                result
            });
          }
        });
      });
});
// after this check browser
//url -> localhost:4000/view
// front end

