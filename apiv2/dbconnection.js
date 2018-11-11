const mysql = require('mysql');

const dbconfig = {
  host: 'easylearn.cfvh1qszjgl1.us-east-2.rds.amazonaws.com',
  user: 'easylearnwolf8',
  password: 'qFqp7wAAkB02',
  port: 3306,
  database: 'easylearn'
}

let conn = mysql.createPool(dbconfig);
// ESTABLECER NUEVA CONEXIÓN
conn.getConnection(function(err){
  if(err){
    console.log("\n No es posible establecer conexión con la BD \n");
    //SI FALLA VUELVE A INTENTAR
    let veces = 0;
    conn = reconnect(conn, veces);
    
  }else{
    console.log('Connected ❤️')
  }
});

function reconnect(conn, veces){
  // REINTENTA LA CONEXIÓN EN CASO DE QUE FALLE. Y SIGUE INTENTANDO CADA 2 SEGUNDOS
  console.log('Reintentado conexión ↩️');
  conn = mysql.createPool(dbconfig);
  
  conn.getConnection(function(err){
    if(err){
      veces +1;
      console.log("Oops. Reconectando cada 2 segundos. Intento #"+veces);
      setTimeout(reconnect(conn), 2000);
      //SI FALLA VUELVE A INTENTAR
      conn = reconnect(conn);
    }else{
      console.log('Conectado después de:  ️'+veces+' intentos.');
      veces = 0;
      return conn;
    }
  });
}

conn.on('error', function(err) {
  // ERROR LISTENER
  //-
  if(err.code === "PROTOCOL_CONNECTION_LOST"){
  //- En caso de que el servidor cierre la conexión
    console.log("/!\\ No podemos establecer conexión con la BD. /!\\ ("+err.code+")");
    return reconnect(conn);
  }
  
  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_QUIT"){
    console.log("/!\\ No podemos establecer conexión con la BD. /!\\ ("+err.code+")");
    return reconnect(conn);
  }
  
  else if(err.code === "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR"){
    console.log("/!\\ No podemos establecer conexión con la BD. /!\\ ("+err.code+")");
    return reconnect(conn);
  }
  
  else if(err.code === "PROTOCOL_ENQUEUE_HANDSHAKE_TWICE"){
    console.log("/!\\ No podemos establecer conexión con la BD. /!\\ ("+err.code+")");
  }
  
  else{
    console.log("/!\\ No podemos establecer conexión con la BD. /!\\ ("+err.code+")");
    return reconnect(conn);
  }
  
});

module.exports = conn;