const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const { response } = require('express');

const app = express();

app.use(cors());

mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'ID362979_Etentje.db.webhosting.be',
  user: 'ID362979_Etentje',
  password: 'Sp15021!',
  database: 'ID362979_Etentje'
})

/*GET THE ORDER*/

app.get('/BarOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.Family_ID, O.Table_ID, P.Description, D.Quantity FROM Orders O JOIN OrderDetails D ON O.ID=D.OrderID JOIN Products P ON D.ProductID = P.ID WHERE P.Category = "Drank" AND O.ID IN ( SELECT MIN(ID) FROM Orders WHERE BarPrint="0" )',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/KeukenOrder', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('SELECT O.Family_ID, O.Table_ID, P.Description, D.Quantity FROM Orders O JOIN OrderDetails D ON O.ID=D.OrderID JOIN Products P ON D.ProductID = P.ID WHERE P.Category = "Voorgerecht" || P.Category = "Hoofdgerecht" || P.Category = "Dessert" AND O.ID IN ( SELECT MIN(ID) FROM Orders WHERE KeukenPrint="0" )',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

/*Change ORDER PRINT STATE*/

app.get('/BarOrderPrinted', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET BarPrint= "1" WHERE ID = ""',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});

app.get('/KeukenOrderPrinted', function(req, res){ //GET method to access DB and return results in JSON
  connection.query('UPDATE Orders SET KeukenPrint= "1" WHERE ID = ""',
  function(err, rows, fields){
    if(err) throw err;
    var data = [];
    for(i=0;i<rows.length;i++){
      data.push(rows[i]);
    }
    console.log(JSON.stringify(data));
    res.end(JSON.stringify(data));
  });
});