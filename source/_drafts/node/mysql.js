const mysql = require('mysql');
const mysqlConfig = {
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'discuz'
}
let connection = mysql.createConnection({...mysqlConfig})
connection.connect()
const sql = "SELECT SUM('extcredits1'),SUM('extcredits2'),SUM('extcredits3'),SUM('extcredits4'),SUM('extcredits5'),SUM('extcredits6'),SUM('extcredits7'),SUM('extcredits8') FROM pre_common_member_count"
connection.query(sql,function(err, result){
  if (err) {
    console.log('err - ',err.message);
    return;
  }
  console.log('积分统计',result)
})
connection.end();