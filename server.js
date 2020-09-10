const express=require('express');
const cors=require('cors');

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