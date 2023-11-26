const sqlite3 = require('sqlite3');
const express = require("express");
const cors = require('cors');
 
var bodyParser = require('body-parser');
 
var app = express();
app.use(cors())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
 
 
const HTTP_PORT = 8000
app.listen(HTTP_PORT, () => {
    console.log("Server is listening on port " + HTTP_PORT);
});

process.on('SIGINT', function() {
    console.log('Do not shut down the app on user log-off');
    //server.close();
  });
 
const db = new sqlite3.Database('./bicicletas.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        db.run('CREATE TABLE productos( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            nombre NVARCHAR(50) NOT NULL,\
            marca NVARCHAR(50) NOT NULL,\
            modelo NVARCHAR(50) NOT NULL,\
            color NVARCHAR(20) NOT NULL,\
            descripcion NVARCHAR(200) NOT NULL,\
            sku NVARCHAR(20) NOT NULL,\
            material NVARCHAR(25) NOT NULL,\
            cantidad int NOT NULL\
        )', (err) => {
            if (err) {
                console.log("Table already exists.");
                return;
            }
            let insert = 'INSERT INTO productos (nombre, marca, modelo, color, descripcion, sku, material, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.run(insert, ['Casco de Ciclismo', 'SafeRide', 'Helmet Pro', 'Rojo', 'Casco de alto rendimiento para ciclismo con diseño aerodinámico', 'CASCO-SAF-ROJ-67', 'Poliuretano', 50]);
            db.run(insert, ['Luces LED para Bicicleta', 'LightWheel', 'LED Lightset', 'Verde', 'Juego de luces LED recargables para mayor visibilidad nocturna', 'LUCE-LIG-VER-82', 'Plástico', 150]);
            db.run(insert, ['Porta Botella de Agua', 'BikeGear', 'HydroHolder', 'Azul', 'Soporte ajustable para botellas de agua, fácil instalación', 'PORTA-BIK-AZU-11', 'Aluminio', 100]);
            db.run(insert, ['Timbre para Bicicleta', 'RingRing', 'DingDong', 'Plateado', 'Timbre clásico con sonido nítido, ideal para alertar a peatones', 'TIMBR-RIN-PLA-77', 'Metal', 80]);
            db.run(insert, ['Guardabarros Delantero', 'MudStop', 'FrontFender', 'Negro', 'Protege de salpicaduras de agua y barro, fácil de instalar', 'GUARD-MUD-NEG-52', 'Plástico', 120]);
            db.run(insert, ['Candado de Seguridad', 'LockPro', 'SteelGuard', 'Gris', 'Candado resistente con cable de acero, clave numérica de seguridad', 'CANDA-STE-GRI-15', 'Acero', 70]);
            db.run(insert, ['Sillín Acolchado', 'ComfortRide', 'SoftSeat', 'Marrón', 'Diseño ergonómico para mayor comodidad en largos paseos en bicicleta', 'SILLI-COM-MAR-36', 'Espuma', 90]);
            db.run(insert, ['Bombilla de Aire', 'PumpMaster', 'AirBulb', 'Blanco', 'Herramienta portátil para inflar neumáticos de bicicleta de forma rápida y sencilla', 'BOMBI-PUM-BLA-71', 'Plástico', 60]);
            db.run(insert, ['Bolsa de Sillín', 'RidePouch', 'SaddleBag', 'Negro', 'Bolsa impermeable para guardar herramientas y accesorios durante el viaje', 'BOLSA-RID-NEG-19', 'Nylon', 110]);
            db.run(insert, ['Manillar de Fibra de Carbono', 'CarbonRide', 'CarbonHandlebar', 'Negro', 'Manillar ligero y resistente fabricado en fibra de carbono', 'MANIL-CAR-NEG-62', 'Fibra de Carbono', 30]);
            db.run(insert, ['Pedales de Aluminio', 'AlloyRide', 'AluPedals', 'Plateado', 'Pedales duraderos y livianos, fácil instalación', 'PEDAL-ALU-PLA-95', 'Aluminio', 85]);
            db.run(insert, ['Kit de Reparación de Neumáticos', 'FixIt', 'TireKit', 'Verde', 'Herramientas esenciales para reparar pinchazos de neumáticos', 'KIT-RIP-VER-45', 'Metal', 40]);
            db.run(insert, ['Reflectores Adhesivos', 'ReflectSafe', 'AdhesiveReflectors', 'Amarillo', 'Reflectores adhesivos para mayor visibilidad en condiciones de poca luz', 'REFLE-ADI-AMA-27', 'Vinilo', 130]);
            db.run(insert, ['Guardabarros Trasero', 'RearGuard', 'MudShield', 'Gris', 'Protege de salpicaduras de agua y barro en la parte trasera de la bicicleta', 'GUARD-REA-GRI-88', 'Plástico', 75]);
            db.run(insert, ['Soporte para Teléfono', 'PhoneMount', 'HandlebarHolder', 'Negro', 'Soporte ajustable para montar teléfonos inteligentes en el manillar de la bicicleta', 'SUPOR-PHO-NEG-32', 'Plástico', 95]);
            db.run(insert, ['Cable de Freno', 'BrakeTech', 'BrakeCable', 'Plateado', 'Cable de freno de alta resistencia para bicicletas de montaña y carretera', 'CABLE-BRA-PLA-09', 'Acero', 55]);
            db.run(insert, ['Bocina Electrónica', 'ElecHorn', 'DigitalHorn', 'Rojo', 'Bocina con múltiples sonidos, fácil instalación con batería recargable', 'BOCIN-ELE-ROJ-74', 'Plástico', 65]);
            db.run(insert, ['Kit de Herramientas para Bicicleta', 'ToolPro', 'BikeToolKit', 'Negro', 'Juego completo de herramientas para el mantenimiento y reparación de bicicletas', 'KIT-HER-NEG-28', 'Acero', 25]);
            db.run(insert, ['Espejo Retrovisor', 'RearView', 'MirrorMax', 'Negro', 'Espejo de gran angular para mayor visibilidad y seguridad al pedalear', 'ESPEJ-REA-NEG-61', 'Plástico', 150]);
            db.run(insert, ['Porta Bidón de Fibra de Carbono', 'CarbonHolder', 'BottleCage', 'Negro', 'Porta bidón ultraligero y resistente, diseño minimalista', 'PORTA-CAR-NEG-36', 'Fibra de Carbono', 120]);
        });
    }
});

app.get("/productos/", (req, res, next) => {
    console.log('get params',req.query);
    if (req.query && req.query.nombre) {
        busqueda = '%' + req.query.nombre + '%';
    } else {
        busqueda = '%';
    }
    db.all("SELECT * FROM productos where nombre like ?", [busqueda], (err, rows) => {
        if (err) {
            console.log(err.message);
            res.status(400).json({ "error": "sql error" });
            return;
        }
        res.status(200).json(rows);
    });
});