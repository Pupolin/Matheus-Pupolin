const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
});

exports.listaHistorico = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    return await conn.query("SELECT u.nome as usuario, h.formula, h.resultado FROM historico h JOIN usuario u ON u.ID = h.UsuarioID ORDER BY h.ID ASC");

  } catch (erro) {
    console.log(erro);
    throw err;

  } finally {
    if (conn) conn.end();
  }
}

exports.inserirUsuario = async (usuario) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query("INSERT INTO usuario (nome) value (?)", usuario.nome);

    return {
      nome: usuario.nome,
      id: res.insertId.toString()
    };

  } catch (erro) {
    console.log(erro);
    throw err;

  } finally {
    if (conn) { conn.end(); }
  }
}

exports.inserirHistorico = async (operacao) => {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("INSERT INTO historico (UsuarioID, Formula, Resultado) value (?, ?, ?)", [operacao.usuario.id, operacao.formula, operacao.resultado]);

    return {
      usuario: operacao.usuario.nome,
      formula: operacao.formula,
      resultado: operacao.resultado
    };

  } catch (erro) {
    console.log(erro);
    throw err;

  } finally {
    if (conn) { conn.end(); }
  }
}