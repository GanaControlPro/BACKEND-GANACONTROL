/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: ganacontrol
-- ------------------------------------------------------
-- Server version	11.8.6-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES
('20260303_000001_init_ganacontrol.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `alimentacion`
--

DROP TABLE IF EXISTS `alimentacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `alimentacion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ganado_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` decimal(8,2) NOT NULL,
  `observacion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ganado_id` (`ganado_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `alimentacion_ibfk_1` FOREIGN KEY (`ganado_id`) REFERENCES `ganado` (`id`),
  CONSTRAINT `alimentacion_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentacion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `alimentacion` WRITE;
/*!40000 ALTER TABLE `alimentacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `alimentacion` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `detalle_venta_ganado`
--

DROP TABLE IF EXISTS `detalle_venta_ganado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta_ganado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `ganado_id` int(11) NOT NULL,
  `precio` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_detalle_venta_ganado` (`venta_id`,`ganado_id`),
  KEY `ganado_id` (`ganado_id`),
  CONSTRAINT `detalle_venta_ganado_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `detalle_venta_ganado_ibfk_2` FOREIGN KEY (`ganado_id`) REFERENCES `ganado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta_ganado`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `detalle_venta_ganado` WRITE;
/*!40000 ALTER TABLE `detalle_venta_ganado` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_venta_ganado` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `detalle_venta_producto`
--

DROP TABLE IF EXISTS `detalle_venta_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_venta_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `venta_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `produccion_id` int(11) DEFAULT NULL,
  `cantidad` decimal(12,2) DEFAULT NULL,
  `precio_unitario` decimal(12,2) DEFAULT NULL,
  `subtotal` decimal(14,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `venta_id` (`venta_id`),
  KEY `producto_id` (`producto_id`),
  KEY `produccion_id` (`produccion_id`),
  CONSTRAINT `detalle_venta_producto_ibfk_1` FOREIGN KEY (`venta_id`) REFERENCES `venta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `detalle_venta_producto_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`),
  CONSTRAINT `detalle_venta_producto_ibfk_3` FOREIGN KEY (`produccion_id`) REFERENCES `produccion` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta_producto`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `detalle_venta_producto` WRITE;
/*!40000 ALTER TABLE `detalle_venta_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_venta_producto` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `evento_sanitario`
--

DROP TABLE IF EXISTS `evento_sanitario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento_sanitario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ganado_id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `tipo` enum('Vacunacion','Tratamiento','Cirugia','Diagnostico','Revision','Desparasitacion') NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `dosis` varchar(100) DEFAULT NULL,
  `via_administracion` varchar(100) DEFAULT NULL,
  `fecha` date NOT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `proxima_fecha` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ganado_id` (`ganado_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `evento_sanitario_ibfk_1` FOREIGN KEY (`ganado_id`) REFERENCES `ganado` (`id`),
  CONSTRAINT `evento_sanitario_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `evento_sanitario_ibfk_3` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento_sanitario`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `evento_sanitario` WRITE;
/*!40000 ALTER TABLE `evento_sanitario` DISABLE KEYS */;
/*!40000 ALTER TABLE `evento_sanitario` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `finca`
--

DROP TABLE IF EXISTS `finca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `finca` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `municipio` varchar(100) DEFAULT NULL,
  `departamento` varchar(100) DEFAULT NULL,
  `propietario` varchar(150) DEFAULT NULL,
  `prefijo_factura` varchar(10) NOT NULL DEFAULT 'FV',
  `consecutivo_factura` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finca`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `finca` WRITE;
/*!40000 ALTER TABLE `finca` DISABLE KEYS */;
INSERT INTO `finca` VALUES
(1,'La Ceiva','Pandi','Cundinamarca','Propietario Principal','FV',1);
/*!40000 ALTER TABLE `finca` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `ganado`
--

DROP TABLE IF EXISTS `ganado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ganado` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finca_id` tinyint(4) NOT NULL,
  `codigo` varchar(50) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `sexo` enum('Macho','Hembra') NOT NULL,
  `categoria` enum('Ternero','Novillo','Vaca','Toro','Otro') NOT NULL,
  `raza` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `peso_actual` decimal(6,2) DEFAULT NULL,
  `estado_general` enum('Activo','Inactivo') DEFAULT 'Activo',
  `estado_biologico` enum('Vivo','Muerto') DEFAULT 'Vivo',
  `estado_comercial` enum('Disponible','Vendido','Descartado') DEFAULT 'Disponible',
  `potrero_id` int(11) DEFAULT NULL,
  `madre_id` int(11) DEFAULT NULL,
  `padre_id` int(11) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `creado_en` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `finca_id` (`finca_id`),
  KEY `potrero_id` (`potrero_id`),
  KEY `madre_id` (`madre_id`),
  KEY `padre_id` (`padre_id`),
  CONSTRAINT `ganado_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ganado_ibfk_2` FOREIGN KEY (`potrero_id`) REFERENCES `potrero` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ganado_ibfk_3` FOREIGN KEY (`madre_id`) REFERENCES `ganado` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ganado_ibfk_4` FOREIGN KEY (`padre_id`) REFERENCES `ganado` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ganado`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ganado` WRITE;
/*!40000 ALTER TABLE `ganado` DISABLE KEYS */;
/*!40000 ALTER TABLE `ganado` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `log_actividad`
--

DROP TABLE IF EXISTS `log_actividad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `log_actividad` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) DEFAULT NULL,
  `modulo` varchar(100) NOT NULL,
  `accion` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `metodo_http` varchar(10) DEFAULT NULL,
  `ruta` varchar(255) DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `log_actividad_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_actividad`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `log_actividad` WRITE;
/*!40000 ALTER TABLE `log_actividad` DISABLE KEYS */;
INSERT INTO `log_actividad` VALUES
(1,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-11 16:02:48'),
(2,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperación de contraseña para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-11 16:10:12'),
(3,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperación de contraseña para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-11 16:18:42'),
(4,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperación de contraseña para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-11 17:22:05'),
(5,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-12 16:34:08'),
(6,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-12 16:43:20'),
(7,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperación de contraseña para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-12 16:46:56'),
(8,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-15 20:17:24'),
(9,3,'AUTH','LOGIN','Inicio de sesión exitoso para nicolasgomezz373@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-15 20:32:36'),
(10,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 13:40:41'),
(11,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 13:56:45'),
(12,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 14:13:34'),
(13,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 14:14:55'),
(14,3,'AUTH','LOGIN','Inicio de sesión exitoso para nicolasgomezz373@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 14:32:47'),
(15,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 15:42:57'),
(16,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 16:00:44'),
(17,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.30.95.51','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 12:52:53'),
(18,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 13:12:09'),
(19,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 13:51:43'),
(20,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 14:59:25'),
(21,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 15:03:48'),
(22,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 16:46:55'),
(23,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 17:08:36'),
(24,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 17:25:34'),
(25,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 22:42:51'),
(26,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-17 23:06:51'),
(27,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-17 23:08:06'),
(28,5,'AUTH','LOGIN','Inicio de sesión exitoso para michaell01gomez63@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-17 23:11:41'),
(29,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 23:41:26'),
(30,1,'AUTH','LOGIN','Inicio de sesión exitoso para jair.qek@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 00:29:03');
/*!40000 ALTER TABLE `log_actividad` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `movimiento_producto`
--

DROP TABLE IF EXISTS `movimiento_producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento_producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `producto_id` int(11) NOT NULL,
  `tipo` enum('ENTRADA','SALIDA','AJUSTE') NOT NULL,
  `cantidad` decimal(12,2) NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `movimiento_producto_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento_producto`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `movimiento_producto` WRITE;
/*!40000 ALTER TABLE `movimiento_producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimiento_producto` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_movimiento_producto
      AFTER INSERT ON movimiento_producto
      FOR EACH ROW
      BEGIN
        IF NEW.tipo='ENTRADA' THEN
          UPDATE producto
          SET cantidad_actual = cantidad_actual + NEW.cantidad
          WHERE id = NEW.producto_id;
        ELSEIF NEW.tipo='SALIDA' THEN
          UPDATE producto
          SET cantidad_actual = GREATEST(0, cantidad_actual - NEW.cantidad)
          WHERE id = NEW.producto_id;
        END IF;
      END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `permiso`
--

DROP TABLE IF EXISTS `permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(100) NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permiso`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `permiso` WRITE;
/*!40000 ALTER TABLE `permiso` DISABLE KEYS */;
INSERT INTO `permiso` VALUES
(1,'logs.ver','Ver logs','Permite consultar logs de auditoría'),
(2,'usuarios.ver','Ver usuarios','Permite listar usuarios'),
(3,'usuarios.crear','Crear usuarios','Permite registrar usuarios'),
(4,'usuarios.editar','Editar usuarios','Permite modificar usuarios'),
(5,'usuarios.eliminar','Eliminar usuarios','Permite desactivar usuarios'),
(6,'ganado.ver','Ver ganado','Permite consultar ganado'),
(7,'ganado.crear','Crear ganado','Permite registrar ganado'),
(8,'ganado.editar','Editar ganado','Permite modificar ganado'),
(9,'ganado.eliminar','Eliminar ganado','Permite eliminar ganado'),
(10,'ventas.ver','Ver ventas','Permite consultar ventas'),
(11,'ventas.crear','Crear ventas','Permite registrar ventas'),
(12,'productos.ver','Ver productos','Permite consultar productos'),
(13,'productos.crear','Crear productos','Permite registrar productos'),
(14,'productos.editar','Editar productos','Permite modificar productos'),
(15,'productos.eliminar','Eliminar productos','Permite eliminar productos'),
(16,'ventas.editar','Editar ventas','Permite modificar ventas'),
(17,'ventas.eliminar','Eliminar ventas','Permite eliminar ventas'),
(18,'dashboard.ver','Ver dashboard','Permite consultar métricas y resumen del sistema');
/*!40000 ALTER TABLE `permiso` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `potrero`
--

DROP TABLE IF EXISTS `potrero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `potrero` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finca_id` tinyint(4) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `hectareas` decimal(6,2) DEFAULT NULL,
  `tipo_pasto` varchar(100) DEFAULT NULL,
  `capacidad_animales` int(11) DEFAULT NULL,
  `estado` enum('Disponible','Ocupado','Mantenimiento','Descanso') DEFAULT 'Disponible',
  PRIMARY KEY (`id`),
  KEY `finca_id` (`finca_id`),
  CONSTRAINT `potrero_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `potrero`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `potrero` WRITE;
/*!40000 ALTER TABLE `potrero` DISABLE KEYS */;
/*!40000 ALTER TABLE `potrero` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `produccion`
--

DROP TABLE IF EXISTS `produccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `produccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ganado_id` int(11) DEFAULT NULL,
  `tipo` enum('Leche','Carne') NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` decimal(10,2) NOT NULL,
  `unidad` varchar(20) NOT NULL,
  `disponible` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `ganado_id` (`ganado_id`),
  CONSTRAINT `produccion_ibfk_1` FOREIGN KEY (`ganado_id`) REFERENCES `ganado` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `produccion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `produccion` WRITE;
/*!40000 ALTER TABLE `produccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `produccion` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finca_id` tinyint(4) NOT NULL,
  `tipo` enum('Alimento','Medicamento','Insumo','Herramienta','Equipo','Otro') NOT NULL,
  `nombre` varchar(150) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `unidad` varchar(30) DEFAULT NULL,
  `cantidad_actual` decimal(12,2) DEFAULT 0.00,
  `cantidad_min` decimal(12,2) DEFAULT 0.00,
  `estado` enum('Operativo','En_Reparacion','Dañado','Baja') DEFAULT 'Operativo',
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_producto_nombre_finca` (`nombre`,`finca_id`),
  KEY `finca_id` (`finca_id`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `reproduccion`
--

DROP TABLE IF EXISTS `reproduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reproduccion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vaca_id` int(11) NOT NULL,
  `tipo_servicio` enum('Monta_Natural','Inseminacion') NOT NULL,
  `toro_id` int(11) DEFAULT NULL,
  `proveedor_genetico` varchar(150) DEFAULT NULL,
  `fecha_servicio` date NOT NULL,
  `fecha_probable_parto` date DEFAULT NULL,
  `fecha_parto` date DEFAULT NULL,
  `estado` enum('Pendiente','Gestante','Fallida','Parto','Aborto') DEFAULT 'Pendiente',
  `cria_codigo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `vaca_id` (`vaca_id`),
  KEY `toro_id` (`toro_id`),
  CONSTRAINT `reproduccion_ibfk_1` FOREIGN KEY (`vaca_id`) REFERENCES `ganado` (`id`),
  CONSTRAINT `reproduccion_ibfk_2` FOREIGN KEY (`toro_id`) REFERENCES `ganado` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reproduccion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `reproduccion` WRITE;
/*!40000 ALTER TABLE `reproduccion` DISABLE KEYS */;
/*!40000 ALTER TABLE `reproduccion` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_fecha_parto
      BEFORE INSERT ON reproduccion
      FOR EACH ROW
      BEGIN
        SET NEW.fecha_probable_parto =
          DATE_ADD(NEW.fecha_servicio, INTERVAL 283 DAY);
      END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_crear_cria
      AFTER UPDATE ON reproduccion
      FOR EACH ROW
      BEGIN
        IF NEW.estado='Parto'
          AND NEW.cria_codigo IS NOT NULL THEN

          INSERT INTO ganado (
            finca_id, codigo, sexo, categoria, fecha_nacimiento,
            madre_id, padre_id, peso_actual
          )
          SELECT finca_id,
                 NEW.cria_codigo,
                 'Hembra',
                 'Ternero',
                 NEW.fecha_parto,
                 NEW.vaca_id,
                 NEW.toro_id,
                 30
          FROM ganado
          WHERE id = NEW.vaca_id;
        END IF;
      END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `descripcion` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES
(1,'Administrador','Acceso completo al sistema'),
(2,'Veterinario','Control sanitario del ganado'),
(3,'Operario','Registro de actividades de campo'),
(4,'Contador','Gestión financiera y ventas');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `rol_permiso`
--

DROP TABLE IF EXISTS `rol_permiso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_permiso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_id` tinyint(4) NOT NULL,
  `permiso_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_rol_permiso` (`rol_id`,`permiso_id`),
  KEY `permiso_id` (`permiso_id`),
  CONSTRAINT `rol_permiso_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`) ON DELETE CASCADE,
  CONSTRAINT `rol_permiso_ibfk_2` FOREIGN KEY (`permiso_id`) REFERENCES `permiso` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_permiso`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `rol_permiso` WRITE;
/*!40000 ALTER TABLE `rol_permiso` DISABLE KEYS */;
INSERT INTO `rol_permiso` VALUES
(5,1,1),
(11,1,2),
(8,1,3),
(9,1,4),
(10,1,5),
(4,1,6),
(1,1,7),
(2,1,8),
(3,1,9),
(13,1,10),
(12,1,11),
(7,1,12),
(6,1,13),
(27,1,18),
(17,2,6),
(16,2,8),
(20,3,6),
(19,3,7),
(26,3,8),
(21,3,12),
(25,4,10),
(24,4,11),
(23,4,12),
(28,4,18);
/*!40000 ALTER TABLE `rol_permiso` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `sesion`
--

DROP TABLE IF EXISTS `sesion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sesion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `refresh_token_hash` varchar(255) NOT NULL,
  `ip` varchar(100) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `dispositivo` varchar(150) DEFAULT NULL,
  `ultimo_uso` datetime NOT NULL DEFAULT current_timestamp(),
  `expira_en` datetime NOT NULL,
  `revocada` tinyint(1) NOT NULL DEFAULT 0,
  `creado_en` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `sesion_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sesion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `sesion` WRITE;
/*!40000 ALTER TABLE `sesion` DISABLE KEYS */;
INSERT INTO `sesion` VALUES
(1,1,'70a071ca55186a383dcef692dde89752e1ca24ac35d250f0b22aa18607a043fb','172.18.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-11 00:48:20','2026-03-18 00:37:29',1,'2026-03-11 00:37:29'),
(2,1,'e82367f79808a27371b669f9efe895e8302cdf92e34fe49fc811a0e463eb6233','172.18.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-11 00:48:20','2026-03-18 00:40:23',1,'2026-03-11 00:40:23'),
(3,1,'f8d56a6b27ecf8a7be6096d7b0302ed0ec88c826c560f6ba32d6cabca54ed480','172.18.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-11 00:47:47','2026-03-18 00:47:13',1,'2026-03-11 00:45:14'),
(4,1,'baeac7f4d95ef8eb9cadd59aff84451713d071ca36de847e6cd44d97f34c66c9','172.18.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-11 09:50:01','2026-03-18 09:50:01',0,'2026-03-11 09:50:01'),
(5,1,'c3b2cf15892530036f9e4547e09e183e407f7d452c9b895a0858633c371e55e3','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-11 16:02:48','2026-03-18 16:02:48',0,'2026-03-11 16:02:48'),
(6,1,'fc8f97a5daccac7901cdfcee213367eb95bebdc2209f2e70972f5f3a89a43251','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-12 16:34:08','2026-03-19 16:34:08',0,'2026-03-12 16:34:08'),
(7,1,'82e2a79d533a5ada4f7e074ea147c486346e5432d0f233590768c037462d71d9','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-12 16:43:20','2026-03-19 16:43:20',0,'2026-03-12 16:43:20'),
(8,1,'c347939b838c3a4b1ac94992f2e76227fde5f4552342ec7905328545fc39cb12','186.84.20.156','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-15 20:17:24','2026-03-22 20:17:24',0,'2026-03-15 20:17:24'),
(9,3,'7c28094e094030cadd5b5c4ef9e788634994a8ad40ebbd2d4d2eb70317602e05','186.84.20.156','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-15 20:32:36','2026-03-22 20:32:36',0,'2026-03-15 20:32:36'),
(10,1,'e21433f9782587400e0509cc18284d43997ac523ce7a418518a6bd9948e168ef','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 13:40:41','2026-03-23 13:40:41',0,'2026-03-16 13:40:41'),
(11,1,'1711a99edeb58ba9a040ef0e21560327f7334dff33ad4fcb358b03048979bcc1','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 13:56:45','2026-03-23 13:56:45',0,'2026-03-16 13:56:45'),
(12,1,'98266546391a99716a6144868a713aa99f01f8034977f7e6c3c6fb2c3318c3f3','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 14:13:34','2026-03-23 14:13:34',0,'2026-03-16 14:13:34'),
(13,1,'22bc1d93a7ee7b561c4e315dd8a07a2546b62b24fda8c428d101d4605e74e192','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 14:14:55','2026-03-23 14:14:55',0,'2026-03-16 14:14:55'),
(14,3,'eefbc89627d7edee8f2c44c192de93b3b30d6fee0e1df6b64c38e49f9dde1923','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 14:32:47','2026-03-23 14:32:47',0,'2026-03-16 14:32:47'),
(15,1,'e5ba9ec383b40540c12d5459ff0a1f0901c72b3b68fc1c7734db38fe676836ba','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 15:42:57','2026-03-23 15:42:57',0,'2026-03-16 15:42:57'),
(16,1,'0c9d5576ff6ba9a9f77a12dafa42729c863fc891ad07e37c81f0e2c5ea6daeef','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-16 16:00:44','2026-03-23 16:00:44',0,'2026-03-16 16:00:44'),
(17,1,'085eab48c0f96e8bb0048546f7a3662b6a9d55a6b2b616e371a63eb5bcf5278f','186.30.95.51','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 12:52:53','2026-03-24 12:52:53',0,'2026-03-17 12:52:53'),
(18,1,'7fc91f939bfa988f338124f971e75cb3092e5dec90f303883b950bcce0f7aa6f','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 13:12:09','2026-03-24 13:12:09',0,'2026-03-17 13:12:09'),
(19,1,'01426413f97127be5e36bd63aa4db3c8e275baa59fc24e071f4403ab6502795d','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 13:51:43','2026-03-24 13:51:43',0,'2026-03-17 13:51:43'),
(20,1,'39ec4c33916f233a64ad0962b9fecc250d31503873cdf405b7ba341248177c57','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 14:59:25','2026-03-24 14:59:25',0,'2026-03-17 14:59:25'),
(21,1,'6517f35ca58b795a17ecfc302de768f0f85ed67bf79041a6190e9abd0faf5a35','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 15:03:48','2026-03-24 15:03:48',0,'2026-03-17 15:03:48'),
(22,1,'28e0b49bbbaa8e264d09df47b782566a37523898e7fe5b58db3cb6afbc293de8','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 16:46:55','2026-03-24 16:46:55',0,'2026-03-17 16:46:55'),
(23,1,'b30728679ca3e2558b56158c94a7103fa31aa58459bf9538c80dd8210e37197e','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 17:08:36','2026-03-24 17:08:36',0,'2026-03-17 17:08:36'),
(24,1,'4904a63a0400661e3ca03afcfd8e88a5d793a3e359babc26c00b325a73fcb6dd','186.155.9.232','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 17:25:34','2026-03-24 17:25:34',0,'2026-03-17 17:25:34'),
(25,1,'d2c679e338b2a184b4967c90a1cd2ea764f280a35397ee3a533d380fbcdba319','186.84.20.156','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 22:42:51','2026-03-24 22:42:51',0,'2026-03-17 22:42:51'),
(26,1,'e4d6ce23f99aaec17dca7911618d330959cc9b868732d7924a30aa811494edc4','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-17 23:06:51','2026-03-24 23:06:51',0,'2026-03-17 23:06:51'),
(27,1,'c0bbdc9cf6f89bcb7b5ed091027feddae83b1c1d3b6aa6e4f8f340125e1c3a5f','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-17 23:08:06','2026-03-24 23:08:06',0,'2026-03-17 23:08:06'),
(28,5,'64adde4f3caa3c6c302b1e7c76f19a9212dbdd5789c5b098d8e6dd63622081a8','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-17 23:11:41','2026-03-24 23:11:41',0,'2026-03-17 23:11:41'),
(29,1,'8205883de7c550ff738dc580bd04e89b7999df68e87c17c4e577e75d54a59e87','186.84.20.156','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-17 23:41:26','2026-03-24 23:41:26',0,'2026-03-17 23:41:26'),
(30,1,'fb6c9236136ea74c58cf489629560103715b7a8ec914aa480757d70ad60d88f3','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 00:29:03','2026-03-25 00:29:03',0,'2026-03-18 00:29:03');
/*!40000 ALTER TABLE `sesion` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finca_id` tinyint(4) NOT NULL,
  `rol_id` tinyint(4) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) DEFAULT NULL,
  `correo` varchar(150) DEFAULT NULL,
  `contrasena` varchar(255) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `creado_en` datetime DEFAULT current_timestamp(),
  `google_id` varchar(100) DEFAULT NULL,
  `proveedor_auth` enum('local','google','local_google') NOT NULL DEFAULT 'local',
  `email_verificado` tinyint(1) NOT NULL DEFAULT 0,
  `foto_url` varchar(255) DEFAULT NULL,
  `ultimo_login` datetime DEFAULT NULL,
  `token_recuperacion_hash` varchar(255) DEFAULT NULL,
  `token_recuperacion_expira` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `google_id` (`google_id`),
  KEY `finca_id` (`finca_id`),
  KEY `rol_id` (`rol_id`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`) ON DELETE CASCADE,
  CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(1,1,1,'Jair Alfonso','Arias Cueca','jair.qek@gmail.com','$2b$10$Ltii6t2FFU0Q.Obf8/nZju9o7ObgRIBnR6fN8SSIyftJCSJluuzya',1,'2026-03-09 22:13:00',NULL,'local',0,NULL,'2026-03-18 00:29:03','5040956d7a2c7b139fb212c042e4854d0801bcddf407eb1800354f87d0c3150e','2026-03-12 17:16:55'),
(3,1,3,'Nicolas David','Peña Gomez','nicolasgomezz373@gmail.com','$2b$10$cl1.Yhnxf5t.IFEuoIXzmeYDbDdswA4mzTt5ecKTUBs836QewIWti',1,'2026-03-15 20:28:38',NULL,'local',0,NULL,'2026-03-16 14:32:47',NULL,NULL),
(4,1,2,'Kevin David ','Lopez Delgado','davidx.lopezj11@gmail.com','$2b$10$NaBVJn81deGqW/mGW5jwVuDE7cDgULpzG45WYJUNZJE5M1wF4IAQy',1,'2026-03-17 14:00:20',NULL,'local',0,NULL,NULL,NULL,NULL),
(5,1,4,'Michaell Steven','Gomez Leguizamo','michaell01gomez63@gmail.com','$2b$10$Nn3tFY.vZzZ6N315VUm/quOD26CCCSKF.T3TE7tupnnpqothzTe.y',1,'2026-03-17 14:01:33',NULL,'local',0,NULL,'2026-03-17 23:11:41',NULL,NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Temporary table structure for view `v_ganado_activo`
--

DROP TABLE IF EXISTS `v_ganado_activo`;
/*!50001 DROP VIEW IF EXISTS `v_ganado_activo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_ganado_activo` AS SELECT
 1 AS `codigo`,
  1 AS `categoria`,
  1 AS `peso_actual` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_ingresos_totales`
--

DROP TABLE IF EXISTS `v_ingresos_totales`;
/*!50001 DROP VIEW IF EXISTS `v_ingresos_totales`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_ingresos_totales` AS SELECT
 1 AS `ingresos_totales` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_stock_bajo`
--

DROP TABLE IF EXISTS `v_stock_bajo`;
/*!50001 DROP VIEW IF EXISTS `v_stock_bajo`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_stock_bajo` AS SELECT
 1 AS `nombre`,
  1 AS `cantidad_actual`,
  1 AS `cantidad_min` */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `venta`
--

DROP TABLE IF EXISTS `venta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `venta` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `finca_id` tinyint(4) NOT NULL,
  `cliente` varchar(150) NOT NULL,
  `numero_factura` varchar(30) DEFAULT NULL,
  `fecha` date NOT NULL,
  `total` decimal(14,2) DEFAULT 0.00,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_factura` (`numero_factura`),
  KEY `finca_id` (`finca_id`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
/*!40000 ALTER TABLE `venta` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_numero_factura
      BEFORE INSERT ON venta
      FOR EACH ROW
      BEGIN
        DECLARE pref VARCHAR(10);
        DECLARE cons INT;

        SELECT prefijo_factura, consecutivo_factura
        INTO pref, cons
        FROM finca
        WHERE id = NEW.finca_id;

        SET NEW.numero_factura =
          CONCAT(pref,'-',YEAR(CURDATE()),'-',LPAD(cons,5,'0'));

        UPDATE finca
        SET consecutivo_factura = consecutivo_factura + 1
        WHERE id = NEW.finca_id;
      END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `v_ganado_activo`
--

/*!50001 DROP VIEW IF EXISTS `v_ganado_activo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`ganacontrol`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ganado_activo` AS select `ganado`.`codigo` AS `codigo`,`ganado`.`categoria` AS `categoria`,`ganado`.`peso_actual` AS `peso_actual` from `ganado` where `ganado`.`estado_general` = 'Activo' */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_ingresos_totales`
--

/*!50001 DROP VIEW IF EXISTS `v_ingresos_totales`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`ganacontrol`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_ingresos_totales` AS select sum(`venta`.`total`) AS `ingresos_totales` from `venta` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_stock_bajo`
--

/*!50001 DROP VIEW IF EXISTS `v_stock_bajo`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_unicode_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`ganacontrol`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `v_stock_bajo` AS select `producto`.`nombre` AS `nombre`,`producto`.`cantidad_actual` AS `cantidad_actual`,`producto`.`cantidad_min` AS `cantidad_min` from `producto` where `producto`.`cantidad_actual` <= `producto`.`cantidad_min` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-03-18 18:58:22
