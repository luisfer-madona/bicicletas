const sqlite3 = require('sqlite3');
const express = require('express');
const cors = require('cors');

var bodyParser = require('body-parser');

var app = express();
app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log('Server is listening on port ' + HTTP_PORT);
});

process.on('SIGINT', function () {
    console.log('Do not shut down the app on user log-off');
    server.close();
});

const db = new sqlite3.Database('./bicicletas.db', (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        // Llaves foráneas
        db.run('PRAGMA foreign_keys = ON;', (err) => {
            if (err) {
                console.error('Error al habilitar las claves foráneas: ', err.message);
            } else {
                console.log('Claves foráneas habilitadas correctamente.');
            }
        });

        // PRODUCTOS
        db.run('CREATE TABLE productos( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            nombre NVARCHAR(50) NOT NULL,\
            marca NVARCHAR(50) NOT NULL,\
            modelo NVARCHAR(50) NOT NULL,\
            color NVARCHAR(20) NOT NULL,\
            descripcion NVARCHAR(200) NOT NULL,\
            sku NVARCHAR(20) NOT NULL,\
            material NVARCHAR(25) NOT NULL,\
            cantidad INTEGER NOT NULL,\
            precio FLOAT NOT NULL\
        )', (err) => {
            if (err) {
                console.log(`La tabla 'productos' ya existe.`);
                return;
            }
            let insert = 'INSERT INTO productos (nombre, marca, modelo, color, descripcion, sku, material, cantidad, precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(insert, ['Casco de Ciclismo', 'SafeRide', 'Helmet Pro', 'Rojo', 'Casco de alto rendimiento para ciclismo con diseño aerodinámico', 'CASCO-SAF-ROJ-67', 'Poliuretano', 50, 75.99]);
            db.run(insert, ['Luces LED para Bicicleta', 'LightWheel', 'LED Lightset', 'Verde', 'Juego de luces LED recargables para mayor visibilidad nocturna', 'LUCE-LIG-VER-82', 'Plástico', 150, 24.99]);
            db.run(insert, ['Porta Botella de Agua', 'BikeGear', 'HydroHolder', 'Azul', 'Soporte ajustable para botellas de agua, fácil instalación', 'PORTA-BIK-AZU-11', 'Aluminio', 100, 12.49]);
            db.run(insert, ['Timbre para Bicicleta', 'RingRing', 'DingDong', 'Plateado', 'Timbre clásico con sonido nítido, ideal para alertar a peatones', 'TIMBR-RIN-PLA-77', 'Metal', 80, 9.99]);
            db.run(insert, ['Guardabarros Delantero', 'MudStop', 'FrontFender', 'Negro', 'Protege de salpicaduras de agua y barro, fácil de instalar', 'GUARD-MUD-NEG-52', 'Plástico', 120, 14.99]);
            db.run(insert, ['Candado de Seguridad', 'LockPro', 'SteelGuard', 'Gris', 'Candado resistente con cable de acero, clave numérica de seguridad', 'CANDA-STE-GRI-15', 'Acero', 70, 19.99]);
            db.run(insert, ['Sillín Acolchado', 'ComfortRide', 'SoftSeat', 'Marrón', 'Diseño ergonómico para mayor comodidad en largos paseos en bicicleta', 'SILLI-COM-MAR-36', 'Espuma', 90, 29.99]);
            db.run(insert, ['Bombilla de Aire', 'PumpMaster', 'AirBulb', 'Blanco', 'Herramienta portátil para inflar neumáticos de bicicleta de forma rápida y sencilla', 'BOMBI-PUM-BLA-71', 'Plástico', 60, 7.99]);
            db.run(insert, ['Bolsa de Sillín', 'RidePouch', 'SaddleBag', 'Negro', 'Bolsa impermeable para guardar herramientas y accesorios durante el viaje', 'BOLSA-RID-NEG-19', 'Nylon', 110, 17.99]);
            db.run(insert, ['Manillar de Fibra de Carbono', 'CarbonRide', 'CarbonHandlebar', 'Negro', 'Manillar ligero y resistente fabricado en fibra de carbono', 'MANIL-CAR-NEG-62', 'Fibra de Carbono', 30, 89.99]);
            db.run(insert, ['Pedales de Aluminio', 'AlloyRide', 'AluPedals', 'Plateado', 'Pedales duraderos y livianos, fácil instalación', 'PEDAL-ALU-PLA-95', 'Aluminio', 85, 24.99]);
            db.run(insert, ['Kit de Reparación de Neumáticos', 'FixIt', 'TireKit', 'Verde', 'Herramientas esenciales para reparar pinchazos de neumáticos', 'KIT-RIP-VER-45', 'Metal', 40, 9.99]);
            db.run(insert, ['Reflectores Adhesivos', 'ReflectSafe', 'AdhesiveReflectors', 'Amarillo', 'Reflectores adhesivos para mayor visibilidad en condiciones de poca luz', 'REFLE-ADI-AMA-27', 'Vinilo', 130, 4.99]);
            db.run(insert, ['Guardabarros Trasero', 'RearGuard', 'MudShield', 'Gris', 'Protege de salpicaduras de agua y barro en la parte trasera de la bicicleta', 'GUARD-REA-GRI-88', 'Plástico', 75, 11.99]);
            db.run(insert, ['Soporte para Teléfono', 'PhoneMount', 'HandlebarHolder', 'Negro', 'Soporte ajustable para montar teléfonos inteligentes en el manillar de la bicicleta', 'SUPOR-PHO-NEG-32', 'Plástico', 95, 8.99]);
            db.run(insert, ['Cable de Freno', 'BrakeTech', 'BrakeCable', 'Plateado', 'Cable de freno de alta resistencia para bicicletas de montaña y carretera', 'CABLE-BRA-PLA-09', 'Acero', 55, 5.99]);
            db.run(insert, ['Bocina Electrónica', 'ElecHorn', 'DigitalHorn', 'Rojo', 'Bocina con múltiples sonidos, fácil instalación con batería recargable', 'BOCIN-ELE-ROJ-74', 'Plástico', 65, 12.99]);
            db.run(insert, ['Kit de Herramientas para Bicicleta', 'ToolPro', 'BikeToolKit', 'Negro', 'Juego completo de herramientas para el mantenimiento y reparación de bicicletas', 'KIT-HER-NEG-28', 'Acero', 25, 49.99]);
            db.run(insert, ['Espejo Retrovisor', 'RearView', 'MirrorMax', 'Negro', 'Espejo de gran angular para mayor visibilidad y seguridad al pedalear', 'ESPEJ-REA-NEG-61', 'Plástico', 150, 9.99]);
            db.run(insert, ['Porta Bidón de Fibra de Carbono', 'CarbonHolder', 'BottleCage', 'Negro', 'Porta bidón ultraligero y resistente, diseño minimalista', 'PORTA-CAR-NEG-36', 'Fibra de Carbono', 120, 19.99]);
        });

        db.run(
            'CREATE TABLE clientes(\
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
                nombre NVARCHAR(50) NOT NULL,\
                apellidoPaterno NVARCHAR(50) NOT NULL,\
                apellidoMaterno NVARCHAR(50),\
                calle NVARCHAR(50) NOT NULL,\
                numeroExterior NVARCHAR(10) NOT NULL,\
                numeroInterior NVARCHAR(10),\
                codigoPostal NVARCHAR(10) NOT NULL,\
                colonia NVARCHAR(50) NOT NULL,\
                municipio NVARCHAR(50) NOT NULL,\
                estado NVARCHAR(50) NOT NULL,\
                rfc NVARCHAR(13),\
                correo NVARCHAR(50) NOT NULL,\
                telefono NVARCHAR(20) NOT NULL\
            )', (err) => {
            if (err) {
                console.log(`La tabla 'clientes' ya existe.`);
                return;
            }

            const clientesEjemplo = [
                ['Juan', 'Pérez', 'García', 'Calle Principal', '123', '4', '12345', 'Colonia Residencial', 'Ciudad Juárez', 'Chihuahua', 'ABC123456XYZ', 'juan.perez@example.com', '5551234567'],
                ['María', 'López', 'Martínez', 'Avenida Central', '456', '8', '54321', 'Colonia Centro', 'Guadalajara', 'Jalisco', 'DEF789012ABC', 'maria.lopez@example.com', '5559876543'],
                ['Carlos', 'Gómez', 'Hernández', 'Calle de la Rosa', '789', '12', '67890', 'Colonia Flores', 'Monterrey', 'Nuevo León', 'GHI345678XYZ', 'carlos.gomez@example.com', '5552345678'],
                ['Ana', 'Rodríguez', 'Fernández', 'Calle del Sol', '101', '22', '54321', 'Colonia Primavera', 'Puebla', 'Puebla', 'JKL901234ABC', 'ana.rodriguez@example.com', '5558765432'],
                ['José', 'Martínez', 'Sánchez', 'Avenida de la Luna', '222', '15', '67890', 'Colonia Estrella', 'Tijuana', 'Baja California', 'MNO567890XYZ', 'jose.martinez@example.com', '5553456789'],
                ['Laura', 'Hernández', 'Gómez', 'Calle de la Montaña', '333', '9', '98765', 'Colonia Nubes', 'Cancún', 'Quintana Roo', 'PQR234567ABC', 'laura.hernandez@example.com', '5556543210'],
                ['Alejandro', 'Gutiérrez', 'Díaz', 'Avenida del Mar', '444', '18', '12345', 'Colonia Playa', 'Mazatlán', 'Sinaloa', 'STU678901XYZ', 'alejandro.gutierrez@example.com', '5554321098'],
                ['Sofía', 'Pérez', 'López', 'Calle de las Flores', '555', '27', '87654', 'Colonia Jardín', 'Acapulco', 'Guerrero', 'VWX123456ABC', 'sofia.perez@example.com', '5552109876'],
                ['Miguel', 'Fernández', 'Gómez', 'Avenida de las Palmeras', '666', '14', '34567', 'Colonia Oasis', 'Merida', 'Yucatán', 'YZA789012XYZ', 'miguel.fernandez@example.com', '5557890123'],
                ['Isabel', 'Díaz', 'Ramírez', 'Calle de la Playa', '777', '10', '76543', 'Colonia Arena', 'Puerto Vallarta', 'Jalisco', 'BCD234567ABC', 'isabel.diaz@example.com', '5553210987']
            ];

            const insertCliente =
                'INSERT INTO clientes (nombre, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, codigoPostal, colonia, municipio, estado, rfc, correo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            clientesEjemplo.forEach((cliente) => {
                db.run(insertCliente, cliente);
            });
        }
        );

        // ORDENES
        db.run(
            'CREATE TABLE ordenes(\
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
                precio FLOAT,\
                cantidad INTEGER,\
                id_producto INTEGER,\
                id_venta INTEGER,\
                FOREIGN KEY (id_producto) REFERENCES productos(id),\
                FOREIGN KEY (id_venta) REFERENCES ventas(id)\
        )', (err) => {
            if (err) {
                console.log(`La tabla 'ordenes' ya existe.`);
                return;
            }
        });

        // VENTAS
        db.run(
            'CREATE TABLE ventas(\
                id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
                fecha DATETIME NOT NULL,\
                id_cliente INTEGER,\
                subtotal FLOAT,\
                descuento INTEGER,\
                total FLOAT,\
                FOREIGN KEY (id_cliente) REFERENCES clientes(id)\
        )', (err) => {
            if (err) {
                console.log(`La tabla 'ventas' ya existe.`);
                return;
            }
        });

        // TRIGGERS
        /*db.run(
            'CREATE TRIGGER orden_insertar AFTER INSERT ON ordenes FOR EACH ROW\
            BEGIN\
                UPDATE productos\
                SET productos.cantidad = productos.cantidad - NEW.cantidad\
                WHERE productos.id = NEW.id_producto\
            END\
        ', (err) => {
            if (err) {
                console.log(`El trigger 'orden_insertar' ya existe. ${err}`);
                return;
            }
        });*/
    }
});



/**
 * Productos
 */

// GET (Productos)
app.get('/productos/', (req, res, next) => {
    if (req.query && req.query.nombre) {
        busqueda = '%' + req.query.nombre + '%';
    } else {
        busqueda = '%';
    }
    db.all(
        'SELECT * FROM productos where nombre like ?',
        [busqueda],
        (err, rows) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ error: 'sql error' });
                return;
            }
            res.status(200).json(rows);
        }
    );
});

// GET by id (Productos)
app.get('/productos/:id', (req, res, next) => {
    db.get(
        'SELECT * FROM productos where id = ?',
        [req.params.id],
        (err, row) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.status(200).json(row);
        }
    );
});

// POST (Productos)
app.post('/productos/', (req, res, next) => {
    var reqBody = req.body;
    db.run('INSERT INTO productos (nombre, marca, modelo, color, descripcion, sku, material, cantidad, precio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [reqBody.nombre, reqBody.marca, reqBody.modelo, reqBody.color, reqBody.descripcion, reqBody.sku, reqBody.material, reqBody.cantidad, reqBody.precio],
        function (err, result) {
            if (err) {
                res.status(400).json({ 'error': err.message })
                return;
            }
            res.status(201).json({
                'id: ': this.lastID, 'nombre': reqBody.nombre
            })
        });
});

// PUT (Productos)
app.put('/productos/', (req, res, next) => {
    var reqBody = req.body;
    db.run(`UPDATE productos set nombre = ?, marca = ?, modelo = ?, color = ?, descripcion = ?, sku = ?, material = ?, cantidad = ?, precio = ? WHERE id = ?`,
        [reqBody.nombre, reqBody.marca, reqBody.modelo, reqBody.color, reqBody.descripcion, reqBody.sku, reqBody.material, reqBody.cantidad, reqBody.precio, reqBody.id],
        function (err, result) {
            if (err) {
                res.status(400).json({ 'error': res.message })
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        });
});

// DELETE (Productos)
app.delete('/productos/:id', (req, res, next) => {
    db.run(
        `DELETE FROM productos WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.status(200).json({ deletedID: this.changes });
        }
    );
});



/**
 * Clientes
 */

// GET (Clientes)
app.get('/clientes/', (req, res, next) => {
    if (req.query && req.query.nombre) {
        busqueda = '%' + req.query.nombre + '%';
    } else {
        busqueda = '%';
    }
    db.all(
        'SELECT * FROM clientes where nombre like ?',
        [busqueda],
        (err, rows) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ error: 'sql error' });
                return;
            }
            res.status(200).json(rows);
        }
    );
});

// GET by id (Clientes)
app.get('/clientes/:id', (req, res, next) => {
    db.get('SELECT * FROM clientes where id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(row);
    });
});

// POST (Clientes)
app.post('/clientes/', (req, res, next) => {
    var reqBody = req.body;
    db.run(
        'INSERT INTO clientes (nombre, apellidoPaterno, apellidoMaterno, calle, numeroExterior, numeroInterior, codigoPostal, colonia, municipio, estado, rfc, correo, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            reqBody.nombre,
            reqBody.apellidoPaterno,
            reqBody.apellidoMaterno,
            reqBody.calle,
            reqBody.numeroExterior,
            reqBody.numeroInterior,
            reqBody.codigoPostal,
            reqBody.colonia,
            reqBody.municipio,
            reqBody.estado,
            reqBody.rfc,
            reqBody.correo,
            reqBody.telefono,
        ],
        function (err, result) {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.status(201).json({
                'id: ': this.lastID,
                nombre: reqBody.nombre,
            });
        }
    );
});

// PUT (Clientes)
app.put('/clientes/', (req, res, next) => {
    var reqBody = req.body;
    db.run(
        `UPDATE clientes set nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, calle = ?, numeroExterior = ?, numeroInterior = ?, codigoPostal = ?, colonia = ?, municipio = ?, estado = ?, rfc = ?, correo = ?, telefono = ? WHERE id = ?`,
        [
            reqBody.nombre,
            reqBody.apellidoPaterno,
            reqBody.apellidoMaterno,
            reqBody.calle,
            reqBody.numeroExterior,
            reqBody.numeroInterior,
            reqBody.codigoPostal,
            reqBody.colonia,
            reqBody.municipio,
            reqBody.estado,
            reqBody.rfc,
            reqBody.correo,
            reqBody.telefono,
            reqBody.id,
        ],
        function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.status(200).json({ updatedID: this.changes });
        }
    );
});

// DELETE (Clientes)
app.delete('/clientes/:id', (req, res, next) => {
    db.run(
        `DELETE FROM clientes WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({ error: res.message });
                return;
            }
            res.status(200).json({ deletedID: this.changes });
        }
    );
});



/**
 * VENTAS
 */

// GET (Ventas)
app.get('/ventas/', (req, res, next) => {
    if (req.query && req.query.cliente) {
        busqueda = '%' + req.query.cliente + '%';
    } else {
        busqueda = '%';
    }
    db.all(
        `SELECT ventas.id, fecha, id_cliente, subtotal, descuento, total, c.nombre || ' ' || c.apellidoPaterno || ' ' || c.apellidoMaterno AS cliente\
        FROM ventas\
        LEFT JOIN clientes c ON c.id = ventas.id_cliente\
        WHERE fecha like ?`,
        [busqueda],
        (err, rows) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ error: 'sql error' });
                return;
            }
            res.status(200).json(rows);
        }
    );
});

// POST (Ventas)
app.post('/ventas/', (req, res, next) => {
    var reqBody = req.body;

    db.run('INSERT INTO ventas (fecha, id_cliente, subtotal, descuento, total) VALUES (?, ?, ?, ?, ?)',
        [reqBody.fecha, reqBody.id_cliente, reqBody.subtotal, reqBody.descuento, reqBody.total],
        function (err, result) {
            if (err) {
                res.status(400).json({ 'error': err.message })
                return;
            }

            let id = this.lastID;
            reqBody.ordenes.forEach(o => {
                let orden = {
                    'precio': o.precio,
                    'cantidad': o.cantidad,
                    'id_producto': o.id_producto,
                    'id_venta': id,
                };

                db.run('INSERT INTO ordenes (precio, cantidad, id_producto, id_venta) VALUES (?, ?, ?, ?)',
                    [orden.precio, orden.cantidad, orden.id_producto, orden.id_venta],
                    function (err1, result1) { });
            });

            res.status(201).json({
                'id: ': this.lastID
            })
        });
});

app.delete('/ventas/:id', (req, res, next) => {
    db.run(
        `DELETE FROM ordenes WHERE id_venta = ?`,
        req.params.id,
        function (err, result) {
            db.run(
                `DELETE FROM ventas WHERE id = ?`,
                req.params.id,
                function (err, result) {
                    if (err) {
                        res.status(400).json({ error: res.message });
                        return;
                    }
                    res.status(200).json({ deletedID: this.changes });
                }
            );
        }
    );
});



/**
 * ORDENES
 */

// GET (Ordenes)
app.get('/ordenes/:id', (req, res, next) => {
    db.all(
        'SELECT o.id, o.precio, o.cantidad, o.id_producto, o.id_venta, p.nombre as producto\
        FROM ordenes o\
        LEFT JOIN productos p ON p.id = o.id_producto\
        WHERE id_venta = ?',
        [req.params.id],
        (err, rows) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({ error: 'sql error' });
                return;
            }
            res.status(200).json(rows);
        }
    );
});