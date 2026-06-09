/**
 * Servidor Backend - Express + MySQL
 * Conecta Angular con la Base de Datos
 */

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Log de variables de entorno
console.log('\n📋 Variables cargadas:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('PORT:', process.env.PORT);

// Configuración de Pool de Conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'pablo123',
  database: process.env.DB_NAME || 'verdura_tienda_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar conexión a la BD
pool.getConnection()
  .then(connection => {
    console.log('\n✅ Conexión a MySQL exitosa');
    connection.release();
  })
  .catch(err => {
    console.error('\n❌ Error al conectar a MySQL:', err.message);
  });

// ============================================================
// RUTAS - PRODUCTOS
// ============================================================

// GET todos los productos
app.get('/api/productos', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [productos] = await connection.query('SELECT * FROM productos');
    connection.release();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET producto por ID
app.get('/api/productos/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [productos] = await connection.query(
      'SELECT * FROM productos WHERE id_producto = ?',
      [req.params.id]
    );
    connection.release();
    res.json(productos[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST crear producto
app.post('/api/productos', async (req, res) => {
  try {
    const { nombre, descripcion, precio_unitario, stock, id_categoria, imagen_url, estado } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO productos (nombre, descripcion, precio_unitario, stock, id_categoria, imagen_url, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio_unitario, stock, id_categoria, imagen_url, estado]
    );
    connection.release();
    res.json({ id_producto: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT actualizar producto
app.put('/api/productos/:id', async (req, res) => {
  try {
    const { nombre, descripcion, precio_unitario, stock, id_categoria, imagen_url, estado } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE productos SET nombre=?, descripcion=?, precio_unitario=?, stock=?, id_categoria=?, imagen_url=?, estado=? WHERE id_producto=?',
      [nombre, descripcion, precio_unitario, stock, id_categoria, imagen_url, estado, req.params.id]
    );
    connection.release();
    res.json({ id_producto: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE producto
app.delete('/api/productos/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM productos WHERE id_producto = ?', [req.params.id]);
    connection.release();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// RUTAS - CATEGORIAS
// ============================================================

app.get('/api/categorias', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [categorias] = await connection.query('SELECT * FROM categorias');
    connection.release();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/categorias', async (req, res) => {
  try {
    const { nombre, descripcion, estado } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO categorias (nombre, descripcion, estado) VALUES (?, ?, ?)',
      [nombre, descripcion, estado]
    );
    connection.release();
    res.json({ id_categoria: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// RUTAS - CLIENTES
// ============================================================

app.get('/api/clientes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [clientes] = await connection.query('SELECT * FROM clientes');
    connection.release();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, ciudad, estado } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO clientes (nombre, apellido, email, telefono, direccion, ciudad, estado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, telefono, direccion, ciudad, estado]
    );
    connection.release();
    res.json({ id_cliente: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// RUTAS - ORDENES
// ============================================================

app.get('/api/ordenes', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [ordenes] = await connection.query('SELECT * FROM ordenes');
    connection.release();
    res.json(ordenes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/ordenes/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [orden] = await connection.query(
      'SELECT * FROM ordenes WHERE id_orden = ?',
      [req.params.id]
    );
    connection.release();
    res.json(orden[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/ordenes', async (req, res) => {
  try {
    const { id_cliente, numero_orden, total, estado, observaciones } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO ordenes (id_cliente, numero_orden, total, estado, observaciones) VALUES (?, ?, ?, ?, ?)',
      [id_cliente, numero_orden, total, estado, observaciones]
    );
    connection.release();
    res.json({ id_orden: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/ordenes/:id', async (req, res) => {
  try {
    const { estado } = req.body;
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE ordenes SET estado = ? WHERE id_orden = ?',
      [estado, req.params.id]
    );
    connection.release();
    res.json({ id_orden: req.params.id, estado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// RUTAS - DETALLES ORDEN
// ============================================================

app.get('/api/detalles-orden/:id_orden', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [detalles] = await connection.query(
      'SELECT * FROM detalles_orden WHERE id_orden = ?',
      [req.params.id_orden]
    );
    connection.release();
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/detalles-orden', async (req, res) => {
  try {
    const { id_orden, id_producto, cantidad, precio_unitario, subtotal } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO detalles_orden (id_orden, id_producto, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [id_orden, id_producto, cantidad, precio_unitario, subtotal]
    );
    connection.release();
    res.json({ id_detalle: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// RUTAS - REPORTES
// ============================================================

app.get('/api/reportes/productos-mas-vendidos', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [productos] = await connection.query(`
      SELECT 
        p.id_producto,
        p.nombre,
        SUM(do.cantidad) as total_vendido,
        SUM(do.subtotal) as ingresos_totales
      FROM detalles_orden do
      JOIN productos p ON do.id_producto = p.id_producto
      GROUP BY p.id_producto, p.nombre
      ORDER BY total_vendido DESC
    `);
    connection.release();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// RUTA DE PRUEBA
// ============================================================

app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Backend conectado correctamente' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
  console.log(`👤 Usuario: ${process.env.DB_USER}`);
  console.log(`\n✅ Backend listo para recibir solicitudes`);
});
