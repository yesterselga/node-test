
function getMessages(con, room, callback) {
     con.query("SELECT * FROM chat", (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
     });
}

function sendMessage(con, data, callback) {
     var sql = "INSERT INTO chat (user, message, room) VALUES ('" + data.user + "', '" + data.message + "', '" + data.room + "')";
     con.query(sql, function (err, result) {
          if (err) throw err;
          callback("1 record inserted");
     });
}

function getRequests(con, room, callback) {
     con.query("SELECT * FROM requests WHERE table_id = '" + room + "'", (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
     });
}

function addRequest(con, data, callback) {
     var sql = "INSERT INTO requests (branch_id, table_id, employee_id, type, description) VALUES ('" + data.user + "', '" + data.message + "', '" + data.room + "')";
     con.query(sql, function (err, result) {
          if (err) throw err;
          callback("1 record inserted");
     });
}

module.exports = {
     getMessages,
     sendMessage
};