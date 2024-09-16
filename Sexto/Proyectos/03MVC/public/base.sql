-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 08-09-2024 a las 13:01:15
-- Versión del servidor: 5.7.24
-- Versión de PHP: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sexto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idClientes` int(11) NOT NULL,
  `Nombres` text NOT NULL,
  `Direccion` text NOT NULL,
  `Telefono` varchar(45) NOT NULL,
  `Cedula` varchar(13) NOT NULL,
  `Correo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idClientes`, `Nombres`, `Direccion`, `Telefono`, `Cedula`, `Correo`) VALUES
(1, 'Jose David Gangotena', 'La Salle', '0992515404', '1716499304', 'josega04@uniandes.edu.ec'),
(2, 'Fernanda Heredia', 'Conocoto', '0982628301', '1724275621', 'fernanda@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura`
--

CREATE TABLE `detalle_factura` (
  `idDetalle_Factura` int(11) NOT NULL,
  `Cantidad` varchar(45) NOT NULL,
  `Factura_idFactura` int(11) NOT NULL,
  `Kardex_idKardex` int(11) NOT NULL,
  `Precio_Unitario` decimal(10,0) NOT NULL,
  `Sub_Total_item` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idFactura` int(11) NOT NULL,
  `Fecha` datetime NOT NULL,
  `Sub_total` decimal(10,0) NOT NULL,
  `Sub_total_iva` decimal(10,0) NOT NULL,
  `Valor_IVA` decimal(10,0) NOT NULL,
  `Clientes_idClientes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idFactura`, `Fecha`, `Sub_total`, `Sub_total_iva`, `Valor_IVA`, `Clientes_idClientes`) VALUES
(1, '2024-08-01 00:00:00', '10', '2', '0', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iva`
--

CREATE TABLE `iva` (
  `idIVA` int(11) NOT NULL,
  `Detalle` varchar(45) NOT NULL COMMENT '8%\n12%\n15%',
  `Estado` int(11) NOT NULL COMMENT '1 = activo\n0 = inactivo',
  `Valor` int(11) DEFAULT NULL COMMENT 'Campo para almacenar el valor en entero para realizar calculos'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `iva`
--

INSERT INTO `iva` (`idIVA`, `Detalle`, `Estado`, `Valor`) VALUES
(1, '15%', 1, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kardex`
--

CREATE TABLE `kardex` (
  `idKardex` int(11) NOT NULL,
  `Estado` int(11) NOT NULL COMMENT 'Campo para almacenar el estado del kardex\n1 = activo\n0 = inactivo',
  `Fecha_Transaccion` datetime NOT NULL,
  `Cantidad` varchar(45) NOT NULL,
  `Valor_Compra` decimal(10,0) NOT NULL,
  `Valor_Venta` decimal(10,0) NOT NULL,
  `Unidad_Medida_idUnidad_Medida` int(11) NOT NULL,
  `Unidad_Medida_idUnidad_Medida1` int(11) NOT NULL,
  `Unidad_Medida_idUnidad_Medida2` int(11) NOT NULL,
  `Valor_Ganacia` decimal(10,0) DEFAULT NULL,
  `IVA` int(11) NOT NULL,
  `IVA_idIVA` int(11) NOT NULL,
  `Proveedores_idProveedores` int(11) NOT NULL,
  `Productos_idProductos` int(11) NOT NULL,
  `Tipo_Transaccion` int(11) NOT NULL COMMENT '1= entrada Ej: Compra\n0 = salida  Ej: Venta'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `kardex`
--

INSERT INTO `kardex` (`idKardex`, `Estado`, `Fecha_Transaccion`, `Cantidad`, `Valor_Compra`, `Valor_Venta`, `Unidad_Medida_idUnidad_Medida`, `Unidad_Medida_idUnidad_Medida1`, `Unidad_Medida_idUnidad_Medida2`, `Valor_Ganacia`, `IVA`, `IVA_idIVA`, `Proveedores_idProveedores`, `Productos_idProductos`, `Tipo_Transaccion`) VALUES
(1, 1, '2024-09-07 22:26:43', '2', '1', '2', 2, 2, 2, NULL, 1, 1, 2, 1, 1),
(2, 0, '2024-09-07 22:42:57', '5', '2', '3', 2, 2, 2, NULL, 1, 1, 2, 2, 1),
(3, 1, '2024-09-07 22:45:13', '20', '1', '2', 2, 2, 2, NULL, 1, 1, 2, 3, 1),
(4, 1, '2024-09-07 22:46:05', '15', '2', '3', 3, 3, 3, NULL, 1, 1, 3, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idProductos` int(11) NOT NULL,
  `Codigo_Barras` text,
  `Nombre_Producto` text NOT NULL,
  `Graba_IVA` int(11) NOT NULL COMMENT 'Campo para almacenar si el producto graba IVA o no\n1 = Graba IVA\n0 = No posee IVA'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idProductos`, `Codigo_Barras`, `Nombre_Producto`, `Graba_IVA`) VALUES
(1, '2132131541321', 'Papas', 1),
(2, '2132131541321', 'Papas', 1),
(3, '2132131541566', 'Yuca', 0),
(4, '21321315418789', 'Verde', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `idProveedores` int(11) NOT NULL,
  `Nombre_Empresa` varchar(45) NOT NULL,
  `Direccion` text,
  `Telefono` varchar(17) NOT NULL,
  `Contacto_Empresa` varchar(45) NOT NULL COMMENT 'Campo para almacenar el nombre del empleado de la empresa para contactarse',
  `Teleofno_Contacto` varchar(17) NOT NULL COMMENT 'Campo para almacenar el numero de telefono del coantacto de la emprsa'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`idProveedores`, `Nombre_Empresa`, `Direccion`, `Telefono`, `Contacto_Empresa`, `Teleofno_Contacto`) VALUES
(2, 'La Favorita', 'ventas@lafavorita.com', '021234567', 'Pedro Chavez', '09123456789'),
(3, 'El Rosado', 'ventas@elrosado.com', '021234567', 'Carlos Galarza', '09234567890');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `idRoles` int(11) NOT NULL,
  `Detalle` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`idRoles`, `Detalle`) VALUES
(1, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `idUnidad_Medida` int(11) NOT NULL,
  `Detalle` text,
  `Tipo` int(11) DEFAULT NULL COMMENT '1 = Unidad de Medida Ej: Gramos, Litros, Kilos\n0 = Presentacion Ej: Caja, Unidad, Docena, Sixpack\n2 = Factor de Conversion Ej: Kilos a libras'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`idUnidad_Medida`, `Detalle`, `Tipo`) VALUES
(2, 'Kilo', 1),
(3, 'Gramo', 1),
(4, 'Litro', 0),
(6, 'Libra', 1),
(8, 'Onza', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `Nombre_Usuario` varchar(45) NOT NULL,
  `Contrasenia` varchar(45) NOT NULL,
  `Estado` int(11) NOT NULL,
  `Usuarioscol` varchar(45) DEFAULT NULL,
  `Roles_idRoles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuarios`, `Nombre_Usuario`, `Contrasenia`, `Estado`, `Usuarioscol`, `Roles_idRoles`) VALUES
(1, 'jdgangotena@gmail.com', 'e10adc3949ba59abbe56e057f20f883e', 1, '1', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idClientes`);

--
-- Indices de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD PRIMARY KEY (`idDetalle_Factura`),
  ADD KEY `fk_Detalle_Factura_Factura1_idx` (`Factura_idFactura`),
  ADD KEY `fk_Detalle_Factura_Kardex1_idx` (`Kardex_idKardex`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idFactura`),
  ADD KEY `fk_Factura_Clientes1_idx` (`Clientes_idClientes`);

--
-- Indices de la tabla `iva`
--
ALTER TABLE `iva`
  ADD PRIMARY KEY (`idIVA`);

--
-- Indices de la tabla `kardex`
--
ALTER TABLE `kardex`
  ADD PRIMARY KEY (`idKardex`),
  ADD KEY `fk_Kardex_Unidad_Medida_idx` (`Unidad_Medida_idUnidad_Medida`),
  ADD KEY `fk_Kardex_Unidad_Medida1_idx` (`Unidad_Medida_idUnidad_Medida1`),
  ADD KEY `fk_Kardex_Unidad_Medida2_idx` (`Unidad_Medida_idUnidad_Medida2`),
  ADD KEY `fk_Kardex_IVA1_idx` (`IVA_idIVA`),
  ADD KEY `fk_Kardex_Proveedores1_idx` (`Proveedores_idProveedores`),
  ADD KEY `fk_Kardex_Productos1_idx` (`Productos_idProductos`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idProductos`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`idProveedores`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`idRoles`);

--
-- Indices de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`idUnidad_Medida`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuarios`),
  ADD KEY `fk_Usuarios_Roles_idx` (`Roles_idRoles`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idClientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  MODIFY `idDetalle_Factura` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idFactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `iva`
--
ALTER TABLE `iva`
  MODIFY `idIVA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `kardex`
--
ALTER TABLE `kardex`
  MODIFY `idKardex` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idProductos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `idProveedores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `idRoles` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  MODIFY `idUnidad_Medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuarios` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD CONSTRAINT `fk_Detalle_Factura_Factura1` FOREIGN KEY (`Factura_idFactura`) REFERENCES `factura` (`idFactura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Detalle_Factura_Kardex1` FOREIGN KEY (`Kardex_idKardex`) REFERENCES `kardex` (`idKardex`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_Factura_Clientes1` FOREIGN KEY (`Clientes_idClientes`) REFERENCES `clientes` (`idClientes`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `kardex`
--
ALTER TABLE `kardex`
  ADD CONSTRAINT `fk_Kardex_IVA1` FOREIGN KEY (`IVA_idIVA`) REFERENCES `iva` (`idIVA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Kardex_Productos1` FOREIGN KEY (`Productos_idProductos`) REFERENCES `productos` (`idProductos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Kardex_Proveedores1` FOREIGN KEY (`Proveedores_idProveedores`) REFERENCES `proveedores` (`idProveedores`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Kardex_Unidad_Medida` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida`) REFERENCES `unidad_medida` (`idUnidad_Medida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Kardex_Unidad_Medida1` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida1`) REFERENCES `unidad_medida` (`idUnidad_Medida`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Kardex_Unidad_Medida2` FOREIGN KEY (`Unidad_Medida_idUnidad_Medida2`) REFERENCES `unidad_medida` (`idUnidad_Medida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_Usuarios_Roles` FOREIGN KEY (`Roles_idRoles`) REFERENCES `roles` (`idRoles`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
