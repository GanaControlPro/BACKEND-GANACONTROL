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
-- Current Database: `ganacontrol`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `ganacontrol` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;

USE `ganacontrol`;

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
  `finca_id` int(11) NOT NULL,
  `ganado_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `tipo_animal` enum('Vaca','Toro','Ternero','Novillo') NOT NULL,
  `nombre_alimento` varchar(150) NOT NULL,
  `tipo_alimento` enum('Pasto','Concentrado','Suplemento_Mineral','Ensilaje','Heno','Sal','Melaza','Otro') NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` decimal(8,2) NOT NULL,
  `frecuencia` enum('Diaria','Dos_veces_al_dia','Semanal','Quincenal','Mensual') NOT NULL,
  `observacion` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ganado_id` (`ganado_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `alimentacion_ibfk_1` FOREIGN KEY (`ganado_id`) REFERENCES `ganado` (`id`),
  CONSTRAINT `alimentacion_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`),
  CONSTRAINT `fk_alimentacion_ganado` FOREIGN KEY (`ganado_id`) REFERENCES `ganado` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_alimentacion_producto` FOREIGN KEY (`producto_id`) REFERENCES `producto` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alimentacion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `alimentacion` WRITE;
/*!40000 ALTER TABLE `alimentacion` DISABLE KEYS */;
INSERT INTO `alimentacion` VALUES
(1,1,20,NULL,'Vaca','Concentrado para levante','Concentrado','2026-03-26',1.00,'Dos_veces_al_dia','Fijarse en que si se coma su concentrado'),
(2,1,21,NULL,'Toro','Heno','Heno','2026-04-07',5.00,'Semanal',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_venta_ganado`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `detalle_venta_ganado` WRITE;
/*!40000 ALTER TABLE `detalle_venta_ganado` DISABLE KEYS */;
INSERT INTO `detalle_venta_ganado` VALUES
(21,17,20,5000000.00),
(22,17,21,9000000.00),
(26,21,21,10000000.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento_sanitario`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `evento_sanitario` WRITE;
/*!40000 ALTER TABLE `evento_sanitario` DISABLE KEYS */;
INSERT INTO `evento_sanitario` VALUES
(5,21,1,'Vacunacion',NULL,'Seguimiento y revisar que todo est├® en perfectas condiciones ','5 ml','Intramuscular ','2026-04-06',30000.00,'2026-04-27'),
(6,20,4,'Revision',NULL,'Revisi├│n de parto ',NULL,NULL,'2026-04-06',120000.00,NULL);
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
(1,'La Ceiva','Pandi','Cundinamarca','Propietario Principal','FV',9);
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
  `foto_url` varchar(255) DEFAULT NULL,
  `estado_general` enum('Activo','Inactivo') DEFAULT 'Activo',
  `estado_biologico` enum('Vivo','Muerto') DEFAULT 'Vivo',
  `estado_comercial` enum('Disponible','Vendido','Descartado') DEFAULT 'Disponible',
  `estado_salud` enum('Sano','En observacion','Enfermo','En tratamiento','Recuperacion') DEFAULT 'Sano',
  `estado_reproductivo` enum('No aplica','Vacia','Servida','Pre├▒ada','Proxima al parto','Lactando','Seca') DEFAULT 'No aplica',
  `fecha_ultimo_parto` date DEFAULT NULL,
  `fecha_probable_parto` date DEFAULT NULL,
  `numero_partos` int(11) DEFAULT 0,
  `potrero_id` int(11) DEFAULT NULL,
  `madre_id` int(11) DEFAULT NULL,
  `padre_id` int(11) DEFAULT NULL,
  `origen` enum('Nacimiento en finca','Compra','Traslado','Otro') DEFAULT 'Nacimiento en finca',
  `fecha_ingreso` date DEFAULT NULL,
  `estado_productivo` enum('Cria','Levante','Ceba','Lechero','Reproduccion','Descarte') DEFAULT NULL,
  `es_reproductor` tinyint(1) DEFAULT 0,
  `observaciones` text DEFAULT NULL,
  `creado_en` datetime DEFAULT current_timestamp(),
  `actualizado_en` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`),
  KEY `finca_id` (`finca_id`),
  KEY `potrero_id` (`potrero_id`),
  KEY `madre_id` (`madre_id`),
  KEY `padre_id` (`padre_id`),
  KEY `idx_estado` (`estado_general`,`estado_comercial`),
  KEY `idx_salud` (`estado_salud`),
  KEY `idx_reproductivo` (`estado_reproductivo`),
  CONSTRAINT `ganado_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ganado_ibfk_2` FOREIGN KEY (`potrero_id`) REFERENCES `potrero` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ganado_ibfk_3` FOREIGN KEY (`madre_id`) REFERENCES `ganado` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ganado_ibfk_4` FOREIGN KEY (`padre_id`) REFERENCES `ganado` (`id`) ON DELETE SET NULL,
  CONSTRAINT `chk_ganado_estado_reproductivo` CHECK (`sexo` <> 'Macho' or `estado_reproductivo` not in ('Pre├▒ada','Lactando'))
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ganado`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `ganado` WRITE;
/*!40000 ALTER TABLE `ganado` DISABLE KEYS */;
INSERT INTO `ganado` VALUES
(20,1,'001','Blanca','Hembra','Vaca','Brahman','2021-02-03',500.00,'/uploads/ganado/ganado-1774319063928-814073550.jpeg','Activo','Vivo','Disponible','Sano','Proxima al parto','2025-01-09',NULL,2,NULL,NULL,NULL,'Compra','2026-03-23','Reproduccion',1,'Ninguna','2026-03-23 21:24:23','2026-04-06 17:13:27'),
(21,1,'002','Simon','Macho','Toro','Brahman','2019-03-04',900.00,'/uploads/ganado/ganado-1774322544304-670937946.jpeg','Activo','Vivo','Disponible','En observacion','No aplica',NULL,NULL,0,NULL,NULL,NULL,'Compra',NULL,'Reproduccion',1,'Excelentes condiciones ','2026-03-23 22:22:24','2026-03-23 23:29:03');
/*!40000 ALTER TABLE `ganado` ENABLE KEYS */;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_proximo_parto
BEFORE UPDATE ON ganado
FOR EACH ROW
BEGIN
    IF NEW.fecha_probable_parto IS NOT NULL THEN
        IF DATEDIFF(NEW.fecha_probable_parto, CURDATE()) <= 15 THEN
            SET NEW.estado_reproductivo = 'Proxima al parto';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log_actividad`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `log_actividad` WRITE;
/*!40000 ALTER TABLE `log_actividad` DISABLE KEYS */;
INSERT INTO `log_actividad` VALUES
(1,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-11 16:02:48'),
(2,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperaci??n de contrase??a para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-11 16:10:12'),
(3,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperaci??n de contrase??a para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-11 16:18:42'),
(4,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperaci??n de contrase??a para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-11 17:22:05'),
(5,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-12 16:34:08'),
(6,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-12 16:43:20'),
(7,1,'AUTH','FORGOT_PASSWORD','Solicitud de recuperaci??n de contrase??a para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/forgot-password','2026-03-12 16:46:56'),
(8,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-15 20:17:24'),
(9,3,'AUTH','LOGIN','Inicio de sesi??n exitoso para nicolasgomezz373@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-15 20:32:36'),
(10,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 13:40:41'),
(11,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 13:56:45'),
(12,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 14:13:34'),
(13,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 14:14:55'),
(14,3,'AUTH','LOGIN','Inicio de sesi??n exitoso para nicolasgomezz373@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 14:32:47'),
(15,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 15:42:57'),
(16,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-16 16:00:44'),
(17,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.30.95.51','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 12:52:53'),
(18,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 13:12:09'),
(19,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 13:51:43'),
(20,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 14:59:25'),
(21,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 15:03:48'),
(22,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 16:46:55'),
(23,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 17:08:36'),
(24,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.155.9.232','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 17:25:34'),
(25,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 22:42:51'),
(26,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-17 23:06:51'),
(27,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-17 23:08:06'),
(28,5,'AUTH','LOGIN','Inicio de sesi??n exitoso para michaell01gomez63@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-17 23:11:41'),
(29,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.84.20.156','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-17 23:41:26'),
(30,1,'AUTH','LOGIN','Inicio de sesi??n exitoso para jair.qek@gmail.com','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 00:29:03'),
(31,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-18 14:53:09'),
(32,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 14:54:09'),
(33,3,'AUTH','LOGIN','Inicio de sesi├│n exitoso para nicolasgomezz373@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 14:56:06'),
(34,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 14:56:48'),
(35,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 15:09:38'),
(36,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 15:10:21'),
(37,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 15:11:19'),
(38,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 16:24:19'),
(39,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-18 16:34:29'),
(40,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-18 17:28:49'),
(41,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 16:53:52'),
(42,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 16:54:50'),
(43,3,'AUTH','LOGIN','Inicio de sesi├│n exitoso para nicolasgomezz373@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 17:09:13'),
(44,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 17:12:18'),
(45,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 17:12:37'),
(46,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 17:36:29'),
(47,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-19 18:17:33'),
(48,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-21 20:47:35'),
(49,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-21 21:47:03'),
(50,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-21 21:56:42'),
(51,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-22 21:29:09'),
(52,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-22 22:04:23'),
(53,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-22 22:40:58'),
(54,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-22 22:49:51'),
(55,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-22 23:21:23'),
(56,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-22 23:46:39'),
(57,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 09:48:34'),
(58,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 10:05:45'),
(59,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 10:28:06'),
(60,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 11:02:34'),
(61,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-23 16:34:39'),
(62,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 16:41:34'),
(63,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 20:39:09'),
(64,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 20:39:52'),
(65,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 20:49:58'),
(66,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 21:11:43'),
(67,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 21:17:49'),
(68,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-23 21:27:37'),
(69,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 21:36:10'),
(70,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 21:44:43'),
(71,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 22:05:52'),
(72,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 22:07:06'),
(73,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 22:16:03'),
(74,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 22:37:40'),
(75,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 23:27:12'),
(76,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-23 23:35:17'),
(77,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 12:48:03'),
(78,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 12:55:25'),
(79,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 12:55:38'),
(80,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 15:31:24'),
(81,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 17:03:33'),
(82,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 17:20:45'),
(83,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 20:10:01'),
(84,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 20:49:26'),
(85,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-24 22:02:44'),
(86,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 11:13:00'),
(87,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 11:34:00'),
(88,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 11:58:20'),
(89,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 12:27:39'),
(90,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 12:45:08'),
(91,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 13:14:15'),
(92,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 13:14:48'),
(93,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 13:17:24'),
(94,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 13:21:02'),
(95,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 15:41:19'),
(96,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 16:10:52'),
(97,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 16:12:03'),
(98,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-25 16:17:00'),
(99,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 05:19:41'),
(100,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 05:22:14'),
(101,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 05:26:15'),
(102,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 07:02:34'),
(103,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 07:07:41'),
(104,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-26 07:49:09'),
(105,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-26 07:49:59'),
(106,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-26 08:13:32'),
(107,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 08:40:31'),
(108,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 08:48:48'),
(109,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:04:34'),
(110,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:05:18'),
(111,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:05:34'),
(112,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:05:56'),
(113,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:23:19'),
(114,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:24:01'),
(115,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:29:32'),
(116,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:32:58'),
(117,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 09:40:32'),
(118,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 12:42:56'),
(119,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 12:45:40'),
(120,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 12:52:51'),
(121,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 12:58:30'),
(122,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:00:37'),
(123,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:00:59'),
(124,3,'AUTH','LOGIN','Inicio de sesi├│n exitoso para nicolasgomezz373@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:02:32'),
(125,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:14:28'),
(126,5,'AUTH','LOGIN','Inicio de sesi├│n exitoso para michaell01gomez63@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:15:05'),
(127,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:15:46'),
(128,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:16:59'),
(129,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:29:42'),
(130,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:30:13'),
(131,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:47:18'),
(132,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 13:49:48'),
(133,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 14:04:55'),
(134,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 14:58:37'),
(135,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 15:05:44'),
(136,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 15:19:27'),
(137,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 15:20:20'),
(138,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 15:38:35'),
(139,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-26 15:39:19'),
(140,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 05:05:09'),
(141,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 05:08:51'),
(142,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 06:06:50'),
(143,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 06:25:34'),
(144,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 07:03:41'),
(145,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 07:16:04'),
(146,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 07:18:13'),
(147,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-27 07:54:26'),
(148,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-28 18:40:02'),
(149,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 07:34:21'),
(150,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 07:41:55'),
(151,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 08:26:33'),
(152,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 15:47:43'),
(153,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-29 16:37:39'),
(154,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 16:41:41'),
(155,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 17:06:25'),
(156,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 17:26:28'),
(157,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 18:31:36'),
(158,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 18:32:03'),
(159,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.27.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 19:27:43'),
(160,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.28.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 19:40:24'),
(161,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.29.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 19:55:39'),
(162,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 20:07:05'),
(163,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 20:22:55'),
(164,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 20:32:51'),
(165,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 21:06:05'),
(166,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 21:43:50'),
(167,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.16.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 22:01:16'),
(168,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.16.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 22:11:26'),
(169,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.16.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 22:15:12'),
(170,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.32.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 22:48:21'),
(171,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.32.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 22:50:58'),
(172,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.32.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-29 22:56:57'),
(173,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.32.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-29 23:35:48'),
(174,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.32.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-29 23:37:03'),
(175,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.48.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 23:41:26'),
(176,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.48.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-29 23:45:04'),
(177,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.48.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-29 23:53:43'),
(178,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.128.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 00:16:39'),
(179,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.128.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 08:32:12'),
(180,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.128.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 08:34:52'),
(181,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.144.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 08:57:19'),
(182,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.208.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 09:25:49'),
(183,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.224.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 09:36:06'),
(184,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.240.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 09:46:20'),
(185,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.240.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-30 09:49:13'),
(186,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','192.168.240.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-03-30 10:04:41'),
(187,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 10:44:19'),
(188,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 12:21:25'),
(189,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 12:37:19'),
(190,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 12:52:24'),
(191,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-03-30 13:18:51'),
(192,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-01 22:28:29'),
(193,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-01 23:00:10'),
(194,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 11:50:42'),
(195,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 12:08:35'),
(196,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 12:51:15'),
(197,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 12:58:50'),
(198,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-04-06 13:03:21'),
(199,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:12:11'),
(200,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-04-06 13:20:23'),
(201,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:22:08'),
(202,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:34:01'),
(203,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:39:07'),
(204,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:49:32'),
(205,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:53:41'),
(206,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:54:07'),
(207,4,'AUTH','LOGIN','Inicio de sesi├│n exitoso para davidx.lopezj11@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:54:34'),
(208,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 13:56:50'),
(209,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 14:53:50'),
(210,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 15:14:25'),
(211,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 15:25:36'),
(212,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 15:44:51'),
(213,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 17:12:22'),
(214,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 18:20:56'),
(215,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-06 23:14:30'),
(216,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 07:02:59'),
(217,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 07:50:21'),
(218,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 08:10:56'),
(219,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 08:16:59'),
(220,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 08:31:08'),
(221,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 09:14:56'),
(222,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 09:32:48'),
(223,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 09:37:32'),
(224,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 09:44:15'),
(225,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 09:59:34'),
(226,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 10:00:54'),
(227,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 11:58:48'),
(228,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 12:34:38'),
(229,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.24.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-04-07 12:59:47'),
(230,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','PostmanRuntime/7.51.1','POST','/api/auth/login','2026-04-07 13:20:11'),
(231,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 13:22:00'),
(232,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 13:50:26'),
(233,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 14:03:42'),
(234,1,'AUTH','LOGIN','Inicio de sesi├│n exitoso para jair.qek@gmail.com','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','POST','/api/auth/login','2026-04-07 14:16:26');
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
(1,'logs.ver','Ver logs','Permite consultar logs de auditor??a'),
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
(18,'dashboard.ver','Ver dashboard','Permite consultar m??tricas y resumen del sistema');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `potrero`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `potrero` WRITE;
/*!40000 ALTER TABLE `potrero` DISABLE KEYS */;
INSERT INTO `potrero` VALUES
(1,1,'Campo Hermoso',20.00,'Guinea',20,'Mantenimiento'),
(2,1,'La Meseta',15.00,'Guinea',30,'Disponible');
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
  `proveedor` varchar(150) DEFAULT NULL,
  `unidad` varchar(30) DEFAULT NULL,
  `ubicacion` varchar(120) DEFAULT NULL,
  `precio_unitario` decimal(12,2) DEFAULT NULL,
  `notas` text DEFAULT NULL,
  `fecha_registro` date DEFAULT NULL,
  `cantidad_actual` decimal(12,2) DEFAULT 0.00,
  `cantidad_min` decimal(12,2) DEFAULT 0.00,
  `estado` enum('Operativo','En_Reparacion','Da??ado','Baja') DEFAULT 'Operativo',
  `activo` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_producto_nombre_finca` (`nombre`,`finca_id`),
  KEY `finca_id` (`finca_id`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES
(19,1,'Medicamento','Ivermectina',NULL,'Sin proveedor','ml','Finca principal',NULL,NULL,NULL,90.00,10.00,'Operativo',1),
(20,1,'Alimento','Pasto',NULL,'Sin proveedor','kg','Finca principal',NULL,NULL,NULL,10.00,30.00,'Operativo',1),
(21,1,'Alimento','Heno',NULL,'Sin proveedor','kg','Finca principal',200000.00,NULL,NULL,20.00,40.00,'Operativo',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reproduccion`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `reproduccion` WRITE;
/*!40000 ALTER TABLE `reproduccion` DISABLE KEYS */;
INSERT INTO `reproduccion` VALUES
(9,20,'Monta_Natural',21,NULL,'2026-03-23','2026-12-31',NULL,'Pendiente',NULL);
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
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_estado_prenada
AFTER UPDATE ON reproduccion
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Gestante' AND OLD.estado <> 'Gestante' THEN
        UPDATE ganado
        SET estado_reproductivo = 'Pre├▒ada',
            fecha_probable_parto = NEW.fecha_probable_parto
        WHERE id = NEW.vaca_id;
    END IF;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`ganacontrol`@`%`*/ /*!50003 TRIGGER trg_parto_ganado
AFTER UPDATE ON reproduccion
FOR EACH ROW
BEGIN
    IF NEW.estado = 'Parto' AND OLD.estado <> 'Parto' THEN
        
        -- actualizar la vaca
        UPDATE ganado
        SET estado_reproductivo = 'Lactando',
            fecha_ultimo_parto = NEW.fecha_parto,
            numero_partos = numero_partos + 1
        WHERE id = NEW.vaca_id;

        -- crear la cr├¡a autom├íticamente
        IF NEW.cria_codigo IS NOT NULL THEN
            INSERT INTO ganado (
                finca_id,
                codigo,
                sexo,
                categoria,
                fecha_nacimiento,
                madre_id,
                padre_id,
                peso_actual,
                estado_general,
                estado_biologico
            )
            SELECT 
                finca_id,
                NEW.cria_codigo,
                'Hembra',
                'Ternero',
                NEW.fecha_parto,
                NEW.vaca_id,
                NEW.toro_id,
                30,
                'Activo',
                'Vivo'
            FROM ganado
            WHERE id = NEW.vaca_id;
        END IF;

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
(4,'Contador','Gesti??n financiera y ventas');
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
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
(29,1,14),
(30,1,15),
(31,1,16),
(32,1,17),
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
) ENGINE=InnoDB AUTO_INCREMENT=235 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
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
(30,1,'fb6c9236136ea74c58cf489629560103715b7a8ec914aa480757d70ad60d88f3','186.84.20.156','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 00:29:03','2026-03-25 00:29:03',0,'2026-03-18 00:29:03'),
(31,1,'8786a7db77f3dcf263c9efbf63c3624650d73cc427f02912739cc8491767a22a','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-18 14:53:09','2026-03-25 14:53:09',0,'2026-03-18 14:53:09'),
(32,1,'a4656416f2bb33317a1f2e092fd7a1ba0c70678af784f5b5c092009aa72f9b10','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 14:54:09','2026-03-25 14:54:09',0,'2026-03-18 14:54:09'),
(33,3,'f1b3acaaec93f8427652fb60f5577aa5677f388e29e089ccef15dbc6ce0b4b15','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 14:56:06','2026-03-25 14:56:06',0,'2026-03-18 14:56:06'),
(34,1,'2ad42dc836870794c07d13b1487e620acd81953131fd8cc4025022ba0d8e0c50','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 14:56:48','2026-03-25 14:56:48',0,'2026-03-18 14:56:48'),
(35,1,'02b8546aa6138daf052a45b44fc97d94279a2cbed5d2c85b7a904fa03ceb4305','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 15:09:38','2026-03-25 15:09:38',0,'2026-03-18 15:09:38'),
(36,1,'3bec17953562055371331699b572344617f5ac27fd280c7173370de59f50758b','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 15:10:21','2026-03-25 15:10:21',0,'2026-03-18 15:10:21'),
(37,4,'40dab5829e6376390038375abcce3d137e8dd2ca5fcb6b3d0472c1443abc4062','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 15:11:19','2026-03-25 15:11:19',0,'2026-03-18 15:11:19'),
(38,1,'11646e90c3bd80cbe6926c32616384d01733c242fb55d738729d1b7ca36c625e','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 16:24:19','2026-03-25 16:24:19',0,'2026-03-18 16:24:19'),
(39,1,'a9a789d51003cf4d58987d27b5acb8aae586e7a6eb9683c41136d3d7051d3a93','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-18 16:34:29','2026-03-25 16:34:29',0,'2026-03-18 16:34:29'),
(40,1,'a41b1e36ec32f90a1ff69f70a3beda0123b1003ba2391e7bf7b080a3878cdfea','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-18 17:28:49','2026-03-25 17:28:49',0,'2026-03-18 17:28:49'),
(41,1,'01e468dcb1e72ee057f143e5f0decaf279f77cfbfd4a5c2985f5f3a576b4550a','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 16:53:52','2026-03-26 16:53:52',0,'2026-03-19 16:53:52'),
(42,4,'0b85ab220fc633c5306dcdf9ef88d5907c73f318f74ac49104927c2709275ca9','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 16:54:50','2026-03-26 16:54:50',0,'2026-03-19 16:54:50'),
(43,3,'6d6f14ec6b5451fe13f56fe3454fe2c45fa75457cae600a6fa0bae569f8274d9','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 17:09:13','2026-03-26 17:09:13',0,'2026-03-19 17:09:13'),
(44,1,'5499d0fa532a16b0d8f9d758dec95a1b4115de62fd35adbec31348388d326faf','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 17:12:18','2026-03-26 17:12:18',0,'2026-03-19 17:12:18'),
(45,4,'9106b1c0a8d5e1accd0118d00b59d41076f1e403206e45a9d02cee55803cd9dc','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 17:12:37','2026-03-26 17:12:37',0,'2026-03-19 17:12:37'),
(46,1,'2b7f6dcc4e79eb78284a2da8c25a3c357aa1a277edf52f945f98b6c2bbe75684','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 17:36:29','2026-03-26 17:36:29',0,'2026-03-19 17:36:29'),
(47,1,'dcdee2a62083aa58c8dfc5b7e6021adea3135f0b3732e74200148c64f8a07f20','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-19 18:17:33','2026-03-26 18:17:33',0,'2026-03-19 18:17:33'),
(48,1,'7379d1c65e1ca676bbbd627459d4761d71d4c695f013a1ad302d9cf716dd30bd','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-21 20:47:35','2026-03-28 20:47:35',0,'2026-03-21 20:47:35'),
(49,1,'6d4f9cdbe862923217f813422ee6b7452490cf99649c4b33c394c04b7ea61d83','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-21 21:47:03','2026-03-28 21:47:03',0,'2026-03-21 21:47:03'),
(50,1,'4bcb3815cb68b99a0184ad5a63500d653db90765168ed5b82303f116c4957f69','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-21 21:56:42','2026-03-28 21:56:42',0,'2026-03-21 21:56:42'),
(51,1,'dbb36b09f92d0dca59998a56dc1b2d453c3615df4b2b2b6b1b6068db0889fe59','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-22 21:29:09','2026-03-29 21:29:09',0,'2026-03-22 21:29:09'),
(52,1,'801286240555798e9f2d3c79960f8f6d871bebf8930292a044c586f3f7382e36','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-22 22:04:23','2026-03-29 22:04:23',0,'2026-03-22 22:04:23'),
(53,1,'432c2238c99aa45f842b6644df84008ea70fb4ef6a9ebeec8a16efae5d770d78','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-22 22:40:58','2026-03-29 22:40:58',0,'2026-03-22 22:40:58'),
(54,1,'f9eff6712f0ff986734e81f1d4ec328bc2cb7e9da56666bda5e2e728926223b0','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-22 22:49:51','2026-03-29 22:49:51',0,'2026-03-22 22:49:51'),
(55,1,'c9c5d26a44710229ed9f0bd3dc695dab8e8597c04e63053fe6d4c2ea6e35f1d3','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-22 23:21:23','2026-03-29 23:21:23',0,'2026-03-22 23:21:23'),
(56,1,'b877460edd0edd1e7e0d73d932597cee2b21a2ff6546b03de94b20ded7f1bf9a','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-22 23:46:39','2026-03-29 23:46:39',0,'2026-03-22 23:46:39'),
(57,1,'b5b4ab9c2447d995a44851b1b19591543fde5c212e55aeae7ffad76ac3073089','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 09:48:34','2026-03-30 09:48:34',0,'2026-03-23 09:48:34'),
(58,1,'ac510404ea0ad6c2939193b9cbfd4d559550cb84e0c93772d4d25dba0f793d18','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 10:05:45','2026-03-30 10:05:45',0,'2026-03-23 10:05:45'),
(59,1,'575c6b5517a453d0a93e3caa22799b8b61732ca4991c162633011a0b104a7380','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 10:28:06','2026-03-30 10:28:06',0,'2026-03-23 10:28:06'),
(60,1,'71302d320fde724ae17780f43ce541057b0786617b08857b7274f190e369495b','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 11:02:34','2026-03-30 11:02:34',0,'2026-03-23 11:02:34'),
(61,1,'b0111edd1822e236f4ad4e3ded60ab2c46071a5c25d74f3449169f3bd740e95a','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-23 16:34:39','2026-03-30 16:34:39',0,'2026-03-23 16:34:39'),
(62,1,'090a7df5571b0bdbf59e0c8842d23fe3306fdb1099c58925bbd1d2bc290e2693','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 16:41:34','2026-03-30 16:41:34',0,'2026-03-23 16:41:34'),
(63,1,'75aefc6f22f2dc5e97aa3afd9360dcef1c910c100659f27950163e03f37894a2','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 20:39:09','2026-03-30 20:39:09',0,'2026-03-23 20:39:09'),
(64,1,'390208b1a11d05f2d0c17e199e898d2d6a6b907a6099ce8e9e90469fca03b5b4','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 20:39:52','2026-03-30 20:39:52',0,'2026-03-23 20:39:52'),
(65,1,'35918a3dc5b5c70940735658f690d45d87518110fd4909dbd6cfa11f120733c7','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 20:49:58','2026-03-30 20:49:58',0,'2026-03-23 20:49:58'),
(66,1,'5c2e859f7d5464c8261cb6c51bf2ed577aac4f2f6d2e5512b7363146891a8466','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 21:11:43','2026-03-30 21:11:43',0,'2026-03-23 21:11:43'),
(67,1,'b7cf951fc330758555035a67b29ae066035c7b2158a1bec8ca0f9edce96bcc63','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 21:17:49','2026-03-30 21:17:49',0,'2026-03-23 21:17:49'),
(68,1,'fa232e52fcbf2a5505e55c31f82f9b3d762ff9dd0f9e178b8fe229acf0d9a747','172.23.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-23 21:27:37','2026-03-30 21:27:37',0,'2026-03-23 21:27:37'),
(69,1,'bb80143410b8c8bc57397357945e15a9b666425ffbd60e442eab4e55bd7920ba','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 21:36:10','2026-03-30 21:36:10',0,'2026-03-23 21:36:10'),
(70,1,'5a8cc1d63424b26acb52a8627235fff5a951cde573d54f2ba70135d3687887e8','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 21:44:43','2026-03-30 21:44:43',0,'2026-03-23 21:44:43'),
(71,1,'e8de5d2a1350cfaae0f953c4fa7d9249d7b6d8ea78a944da89a5a8dd147471cf','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 22:05:52','2026-03-30 22:05:52',0,'2026-03-23 22:05:52'),
(72,1,'7e35444e589a7a247ff6ad0fc76a64825af90ca175c89b14bda1ef661ed07077','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 22:07:06','2026-03-30 22:07:06',0,'2026-03-23 22:07:06'),
(73,1,'bd97a168d4b4f8c681eb28c22ffbe38bd53de939188ec2cce9753c4451474b5c','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 22:16:03','2026-03-30 22:16:03',0,'2026-03-23 22:16:03'),
(74,1,'b32c4979c0fd38a59f2ba1bac2e520ea8dcbdc034429895093494cc0bbbe4914','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 22:37:40','2026-03-30 22:37:40',0,'2026-03-23 22:37:40'),
(75,1,'6061a1712bd20b23a4259b0daa0d142399469bc73f4bbd4f0fe7be4e12d9f37c','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 23:27:12','2026-03-30 23:27:12',0,'2026-03-23 23:27:12'),
(76,1,'16470b96da24a9cda4ec83fab6883d5dbc0ab5867eda93949fdeeef48431b206','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-23 23:35:17','2026-03-30 23:35:17',0,'2026-03-23 23:35:17'),
(77,1,'29f8a706696b8384cac4aaef8f3002c14618291f303ba8a4d105d84686589e04','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 12:48:03','2026-03-31 12:48:03',0,'2026-03-24 12:48:03'),
(78,1,'edfe184b1aa194da76f683b506b541942e91514bec5f12f19cd89dbd1c69748c','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 12:55:25','2026-03-31 12:55:25',0,'2026-03-24 12:55:25'),
(79,1,'d7b6f66e575089abeed1385a8cc019d42f578d5eff4943c10cabf77c630f4b41','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 12:55:38','2026-03-31 12:55:38',0,'2026-03-24 12:55:38'),
(80,1,'a579f238f3f29244a3f253c636ecc4e9e219b8a27e9192c28c22d536d026e08d','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 15:31:24','2026-03-31 15:31:24',0,'2026-03-24 15:31:24'),
(81,1,'820e452efe58baf20a400106135084282de8d99aaf332767a20371b163897f80','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 17:03:33','2026-03-31 17:03:33',0,'2026-03-24 17:03:33'),
(82,1,'451e6d5d2c210c82093272d0c8a7ee5fd244db5d967e3713f25ec07063d6222c','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 17:20:45','2026-03-31 17:20:45',0,'2026-03-24 17:20:45'),
(83,1,'856b3879641aff6a42d8e5d246467e28e5c09acd14652ae9ed2cb306832d1dde','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 20:10:01','2026-03-31 20:10:01',0,'2026-03-24 20:10:01'),
(84,1,'dc8080ed070a824c9b1a787d8b95d4dc0f7c50d4e187e5708c84e88dfd520c4c','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 20:49:26','2026-03-31 20:49:26',0,'2026-03-24 20:49:26'),
(85,1,'db8e81a55a70b9f2bb48a3b0c016637a4a997492846339384fd72909a577889d','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-24 22:02:44','2026-03-31 22:02:44',0,'2026-03-24 22:02:44'),
(86,1,'f3eeac0daae84e5ed76cc7fd70d5badcaeca0bbff3814f7e052f778f27547d0b','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 11:12:59','2026-04-01 11:12:59',0,'2026-03-25 11:12:59'),
(87,1,'4b3df8f1ef663ea6d10cef139a8d8bd2da4eb25680f973153e11acccb5018b47','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 11:34:00','2026-04-01 11:34:00',0,'2026-03-25 11:34:00'),
(88,1,'e8f008c8314e70cc155ee2dd671c0c88276b9c9bb1f0773d56f5e5bc99870631','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 11:58:20','2026-04-01 11:58:20',0,'2026-03-25 11:58:20'),
(89,1,'c2f7f4cae4bd0f868127b9c74e4b92251426c66635a4483b75f08bd9722fabbf','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 12:27:39','2026-04-01 12:27:39',0,'2026-03-25 12:27:39'),
(90,1,'bf452aa26cdacc5b3803aa4c18d7012be24dbf943853e870da9f9906c633ea74','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 12:45:08','2026-04-01 12:45:08',0,'2026-03-25 12:45:08'),
(91,1,'7b8c458b76396a93c6866f749cbf15ea075f40fd208c7397814e1847c5571d86','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 13:14:15','2026-04-01 13:14:15',0,'2026-03-25 13:14:15'),
(92,1,'b574e7dae771b54e655cf4cd15015c4280430bf0730764736f64c023eae3a07e','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 13:14:48','2026-04-01 13:14:48',0,'2026-03-25 13:14:48'),
(93,1,'1247add8b5a3adbe13207da0fa7e70abb1652f44db7957c6840cecb5d3a31041','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 13:17:24','2026-04-01 13:17:24',0,'2026-03-25 13:17:24'),
(94,1,'56730ae9eff0b8df8f7c92ccfe6c0530dc338c25d204eec44438f92bec1c6653','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 13:21:02','2026-04-01 13:21:02',0,'2026-03-25 13:21:02'),
(95,1,'6fe488d569f15548c778265235ff70480575eb79120bfb204b6249b9efd1e3c9','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 15:41:19','2026-04-01 15:41:19',0,'2026-03-25 15:41:19'),
(96,1,'703a183829814999ea884f0621888c7643f42065935d297d6e02c5eed9e612c8','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 16:10:52','2026-04-01 16:10:52',0,'2026-03-25 16:10:52'),
(97,1,'7f39c270580fdd57e3d322a86966d0c5bf5351638e8d1d4b973d94e8c28a89a6','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 16:12:03','2026-04-01 16:12:03',0,'2026-03-25 16:12:03'),
(98,1,'5a310079a1ba543c6d946dd40e655ab67d4fa41547dbaeac2efbe2c98516dd09','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-25 16:17:00','2026-04-01 16:17:00',0,'2026-03-25 16:17:00'),
(99,1,'06d6244d6db97388a06103d6276af34cbe3fa6f8d4a068048f340302fbe3dcd3','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 05:19:41','2026-04-02 05:19:41',0,'2026-03-26 05:19:41'),
(100,1,'8298da0c1ca548b0d9585c2bb688a320e06cb8e41a0fd4ed7e1d6926d08cd026','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 05:22:14','2026-04-02 05:22:14',0,'2026-03-26 05:22:13'),
(101,1,'39a239f1feb4c7599ab0e10344e488d86c634a6ceec8aff49c0fe33cfcc3a2e2','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 05:26:15','2026-04-02 05:26:15',0,'2026-03-26 05:26:15'),
(102,1,'582ae32d6e5e88aa1f6ee01617a843c6c4d562f494c1960324f9665e3143b5fe','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 07:02:34','2026-04-02 07:02:34',0,'2026-03-26 07:02:34'),
(103,1,'86edfe970b1e4e7c556258463b5b2b7a2f5023b0c27bff87a8c46bffc3e87137','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 07:07:41','2026-04-02 07:07:41',0,'2026-03-26 07:07:41'),
(104,1,'48dca5fac5cb82509dc1031a8f8c712ed663f4d74706c373631514e4586d8ae6','172.22.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-26 07:49:09','2026-04-02 07:49:09',0,'2026-03-26 07:49:09'),
(105,1,'6c9a24d75135b74594325f55932e018cfc3a44d0b8b78e94e0f2d0f923872883','172.22.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-26 07:49:59','2026-04-02 07:49:59',0,'2026-03-26 07:49:59'),
(106,1,'ca6c5ecc44e2386b1147e5430dece97a9cd497f0c42053fa21ae5e3ff87e6900','172.22.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-26 08:13:32','2026-04-02 08:13:32',0,'2026-03-26 08:13:32'),
(107,1,'7c7177da06a5b13c19213023e41981e3c90b15815b821be7682de996efd1568a','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 08:40:31','2026-04-02 08:40:31',0,'2026-03-26 08:40:31'),
(108,1,'dd39c3d287ed783aaecf9acc80c8b712aca3f35b43caa8e92754613cdc71eb77','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 08:48:48','2026-04-02 08:48:48',0,'2026-03-26 08:48:48'),
(109,1,'88e4f32a6fec20f5a56008ed539f1624a84c43e2469644ef0702f18cd045cc5a','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:04:34','2026-04-02 09:04:34',0,'2026-03-26 09:04:34'),
(110,1,'2cfd0b98b4b46f75c0d954c0bd89f4d60686744d4b34861e9a327e9cf882ff39','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:05:18','2026-04-02 09:05:18',0,'2026-03-26 09:05:18'),
(111,4,'f02f4cebdb4776fad316e299e6dcdf988b26fe029c4344bf97a1a81bc32722d8','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:05:34','2026-04-02 09:05:34',0,'2026-03-26 09:05:34'),
(112,1,'d577354fc1b29511513b0235325f3d37f9d3d251e49ffa602e426cbb6f4801b7','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:05:56','2026-04-02 09:05:56',0,'2026-03-26 09:05:56'),
(113,1,'67990274bc39110cbf295e6924b9436de0dcd432742ef49aa9c326ad8b1142c9','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:23:19','2026-04-02 09:23:19',0,'2026-03-26 09:23:19'),
(114,4,'597d58a4a4338b64ef0dfbb13a1496d7c59aababb63106b7847068e7f9fdb662','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:24:01','2026-04-02 09:24:01',0,'2026-03-26 09:24:01'),
(115,1,'0798601d277cd45d19b06a6b39900eb218120fee2002f7b26309e7ff3d8247fb','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:29:32','2026-04-02 09:29:32',0,'2026-03-26 09:29:32'),
(116,1,'f6eb9a0e82ea57f6c42083fb4d30962f983a245e5943983e28721350519dc4de','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:32:58','2026-04-02 09:32:58',0,'2026-03-26 09:32:58'),
(117,1,'8a5968aa771edb05b8b6332c1131a8401fa0cb3e64f73f02ac5faaed0e34cb74','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 09:40:32','2026-04-02 09:40:32',0,'2026-03-26 09:40:32'),
(118,1,'b2db94788513ca2ef29ac79a6e4a81c6fc7c4a4b1aaae12fe7e6fec5c31fa583','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 12:42:56','2026-04-02 12:42:56',0,'2026-03-26 12:42:56'),
(119,1,'2559fd0ab57f1073946fe4000ddf6565513a6fe96837ac19d9dfb19215d9b45e','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 12:45:40','2026-04-02 12:45:40',0,'2026-03-26 12:45:40'),
(120,1,'59ced04314545e4783ace8ddf040342976648630b04a859371bdf43e9c8660cd','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 12:52:51','2026-04-02 12:52:51',0,'2026-03-26 12:52:51'),
(121,1,'878e1f07975be060f2d6d621d14577a4887695ab54787b6745dc67d9bce2a9d3','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 12:58:30','2026-04-02 12:58:30',0,'2026-03-26 12:58:30'),
(122,1,'12ad964f8617c1dd6d86f9dd83178ef8babe23656ee4d2e8ed96ece32d2ad1cc','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:00:37','2026-04-02 13:00:37',0,'2026-03-26 13:00:37'),
(123,4,'18c28ced782fbe474d9ad48a1ef1ac5ae494091db28aa38fb501d3c93aba9026','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:00:59','2026-04-02 13:00:59',0,'2026-03-26 13:00:59'),
(124,3,'dd5729cf4879aafc7bc0f2fbbaf6c6da10bb48feecbceb06b3e78956e884b577','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:02:32','2026-04-02 13:02:32',0,'2026-03-26 13:02:32'),
(125,1,'580bf8bfc2266d69bb45c305cb1ff5719a4ae75a0fdd485bd2e29733660879d0','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:14:28','2026-04-02 13:14:28',0,'2026-03-26 13:14:28'),
(126,5,'0ad40031dfba848a7562e96a7771068a28c7c86437a40cdad59932be4cc2cf92','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:15:05','2026-04-02 13:15:05',0,'2026-03-26 13:15:05'),
(127,1,'80e49e667e2a5dd28531c55f0048cc16aa8bc76d5a160ea2c6722a900eefca04','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:15:46','2026-04-02 13:15:46',0,'2026-03-26 13:15:46'),
(128,4,'70850e652f97418b609c06f39114336437efadf926a46c84fb014f82c841eaee','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:16:59','2026-04-02 13:16:59',0,'2026-03-26 13:16:59'),
(129,4,'9cac7dff97ad3f2533e779e0eabdb391fbf9d1520fe7586d9218e82f802b132e','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:29:42','2026-04-02 13:29:42',0,'2026-03-26 13:29:42'),
(130,1,'383e9dcf36154a5b155360f146aab1711eaba5157c88f7a5dd1b01d3794e9f9f','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:30:13','2026-04-02 13:30:13',0,'2026-03-26 13:30:13'),
(131,1,'5840bd534cc4a971c6d1982299b966524404bb498dfc828344ebd673d3b94ca3','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:47:18','2026-04-02 13:47:18',0,'2026-03-26 13:47:18'),
(132,1,'2c759f690394f5aa78080cf2aa714879e967145565a2cd6df9f04b0ba3c94b52','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 13:49:48','2026-04-02 13:49:48',0,'2026-03-26 13:49:48'),
(133,1,'b9d9f30c351ba3a0e538e92e1b2834385f98f2288f664323fc5cff774c871250','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 14:04:55','2026-04-02 14:04:55',0,'2026-03-26 14:04:55'),
(134,1,'8164d952952991a069f5d188fbb10846c8a61c87b5c24ad852d183dfcede74cb','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 14:58:37','2026-04-02 14:58:37',0,'2026-03-26 14:58:37'),
(135,4,'cb4aee5a4cd8ea970edc20954de982ba0eecac4ff953f47e8f9d152905db962e','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 15:05:44','2026-04-02 15:05:44',0,'2026-03-26 15:05:44'),
(136,1,'35c35c3f54c44fd92112663a4497703b8204ced3c79bb1e5dd54506cb9707e25','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 15:19:27','2026-04-02 15:19:27',0,'2026-03-26 15:19:27'),
(137,1,'2d3150aca64dff4c645313f79bfd5aadfbb805478ba5ffbf69c4a16ca6706a0b','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 15:20:20','2026-04-02 15:20:20',0,'2026-03-26 15:20:20'),
(138,4,'b66931c29c1c89c4443ae33927f5887aa854541df3d5a03463467b009743cd69','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 15:38:35','2026-04-02 15:38:35',0,'2026-03-26 15:38:35'),
(139,1,'12a16f56d1ef71a44471c2bacb13289404cec07ae728737717f601dbe5776cc2','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-26 15:39:19','2026-04-02 15:39:19',0,'2026-03-26 15:39:19'),
(140,1,'2c49a69a1e3923387b6c3315bd36bd5fbd95209fd6c8b9f520e1481a6d2be401','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 05:05:09','2026-04-03 05:05:09',0,'2026-03-27 05:05:09'),
(141,1,'c7d9806f1aff15502f68f061f2913aea1c9a24ee029a41131d294b2f1d99a62e','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 05:08:51','2026-04-03 05:08:51',0,'2026-03-27 05:08:51'),
(142,1,'eaf1ce7261a1ad10bb423a81d742e0c0a31e9236de475b7a5992911e125746c1','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 06:06:50','2026-04-03 06:06:50',0,'2026-03-27 06:06:50'),
(143,1,'0470e9c61c7dffa5821761d9d90be676e3f63961105c0dade8ddc60660cd358c','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 06:25:34','2026-04-03 06:25:34',0,'2026-03-27 06:25:34'),
(144,1,'829529a3e2e5c2d8052fe62cde2aca74332ae955408ab71c187323ed4a8d07c2','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 07:03:41','2026-04-03 07:03:41',0,'2026-03-27 07:03:41'),
(145,1,'662f73a51a2b2f464af18a034680f46a334f19f10c71db65036e76db27e65605','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 07:16:04','2026-04-03 07:16:04',0,'2026-03-27 07:16:04'),
(146,1,'3e7690d40b4ab3222fb121fb8c30599ca610f2a3d12654bb86f11581c6389851','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 07:18:13','2026-04-03 07:18:13',0,'2026-03-27 07:18:13'),
(147,1,'e1638825ead6652b22997bc219bab92dc57d119ce6b1e97c0ea765dbfbaa6767','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-27 07:54:26','2026-04-03 07:54:26',0,'2026-03-27 07:54:26'),
(148,1,'fb4226fcc84be2079d1e3b86e6f8377c7c1f45f19c9b0745b26c0071c500cbf4','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-28 18:40:02','2026-04-04 18:40:02',0,'2026-03-28 18:40:02'),
(149,1,'08a3f719bf8879adc253fcaf739ccb82cf2ec5813d67e017f534c94f86b43905','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 07:34:21','2026-04-05 07:34:21',0,'2026-03-29 07:34:21'),
(150,1,'d68c4cf69cc15024c495e124648a1d9211acabc107b88a881e329c2c84f15c4a','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 07:41:55','2026-04-05 07:41:55',0,'2026-03-29 07:41:55'),
(151,1,'0d92b2b044fcf337d7fedd6f0ffe63146caa6abb5eb4f5c5130f533f1f037eb2','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 08:26:33','2026-04-05 08:26:33',0,'2026-03-29 08:26:33'),
(152,1,'92945a34457cd81712583c95ae0b68f8bce224666f455d8e39fa170d30b5ef05','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 15:47:43','2026-04-05 15:47:43',0,'2026-03-29 15:47:43'),
(153,1,'7a2d6af5cec301f24420ff6d402c8d69da1715d7b0ec3f7f2f6721c6bcccf9ed','172.20.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-29 16:37:38','2026-04-05 16:37:38',0,'2026-03-29 16:37:38'),
(154,1,'567702cda515248ffdf5d32e69de19c4e0b11499944db6a10b2535bde839fd96','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 16:41:41','2026-04-05 16:41:41',0,'2026-03-29 16:41:41'),
(155,1,'dda9f11d25f0813403d308b696d6e4b07297cf64392f515e2683a49fa6c5b143','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 17:06:25','2026-04-05 17:06:25',0,'2026-03-29 17:06:25'),
(156,1,'93d138c6ea98cd8b844bdfc682ac03ceebf17a199c018753f6601a63a0f91805','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 17:26:28','2026-04-05 17:26:28',0,'2026-03-29 17:26:28'),
(157,1,'516df62624270e9331ab52c58bcf7851142f2a6a87894cdd75c090a2356ab583','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 18:31:36','2026-04-05 18:31:36',0,'2026-03-29 18:31:36'),
(158,1,'c997cd52d116a03a2adfb193704affe3def70b387c1fc3517dd5a93c7b0ae027','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 18:32:03','2026-04-05 18:32:03',0,'2026-03-29 18:32:03'),
(159,1,'b046af8d1fa2ca58310069537eeb5d54b3cbd1c00a0bd1cf39b90f6cf7bfce56','172.27.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 19:27:43','2026-04-05 19:27:43',0,'2026-03-29 19:27:43'),
(160,1,'73dee327668a6c0a8d4f7de3ad44f46ec4c5ba702cb2d72abeb0082ac641ba5c','172.28.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 19:40:24','2026-04-05 19:40:24',0,'2026-03-29 19:40:24'),
(161,1,'f131be2ef6ab3abe53e4bedc740beb37cdfeb7f04a900e4d392e49193eef7766','172.29.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 19:55:39','2026-04-05 19:55:39',0,'2026-03-29 19:55:39'),
(162,1,'c9c63cd25df4716c07369c79032da437ecd9cef64f4039388fe84612b3df598a','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 20:07:05','2026-04-05 20:07:05',0,'2026-03-29 20:07:05'),
(163,1,'a11a254174eaf6da990d8a48834cb752bd6a54ee4b6e58eddbbc32a66be233c2','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 20:22:55','2026-04-05 20:22:55',0,'2026-03-29 20:22:55'),
(164,1,'e9397d07d9d2e94226da19b8628009428bee90e6dfae296d20202f2755cb0442','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 20:32:51','2026-04-05 20:32:51',0,'2026-03-29 20:32:51'),
(165,1,'de8300d08c3f874c95dec65cc5432d56dea7c4ae8537d776b9090011fc4e4519','172.30.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 21:06:05','2026-04-05 21:06:05',0,'2026-03-29 21:06:05'),
(166,1,'e5833334268d753d0e7a7f4e11a240a4403cbe8a91caf6516c347bab46e224f8','192.168.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 21:43:50','2026-04-05 21:43:50',0,'2026-03-29 21:43:50'),
(167,1,'f149f6d393992e2d4c4c7d7e7ac8f0a697e2c98680a3e0eec49a4048ac9f76ec','192.168.16.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 22:01:16','2026-04-05 22:01:16',0,'2026-03-29 22:01:16'),
(168,1,'1ae688d747cc99e8371b885bf1730fff8db2c760829210832c7e4c4b70db34db','192.168.16.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 22:11:26','2026-04-05 22:11:26',0,'2026-03-29 22:11:26'),
(169,1,'e7de7c223de57a90f126fa5577c0b81fb4724e2d8aaed7854cd3eb483db070cb','192.168.16.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 22:15:12','2026-04-05 22:15:12',0,'2026-03-29 22:15:12'),
(170,1,'3174330634262d77eecb37f4fe71a95acfa43aa3d5380eb841107f3773be1afa','192.168.32.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 22:48:21','2026-04-05 22:48:21',0,'2026-03-29 22:48:21'),
(171,1,'345b1f50152217064c0fcc7b418f0c42ca02f6236f237597ca9ad90805775115','192.168.32.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 22:50:58','2026-04-05 22:50:58',0,'2026-03-29 22:50:58'),
(172,1,'5ebc86bc7b0e0ebe2a46cfc6528a7305193ee218b6d8f48d7d1bdcf06d168246','192.168.32.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-29 22:56:57','2026-04-05 22:56:57',0,'2026-03-29 22:56:57'),
(173,1,'812fa7e1cc9410a2169cd19071aa264c3e8ee63dfd57a7d6b29bd04ba96d82de','192.168.32.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-29 23:35:48','2026-04-05 23:35:48',0,'2026-03-29 23:35:48'),
(174,1,'d055e5cfd2084a52769cc1531ab04da0a558059f57d5b8a81fc2debcf8a14a09','192.168.32.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-29 23:37:03','2026-04-05 23:37:03',0,'2026-03-29 23:37:03'),
(175,1,'1379d4434ee7a82270e9eb026d692d034a830eb30b3a9a8c0cdbb47d89ee26b6','192.168.48.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 23:41:26','2026-04-05 23:41:26',0,'2026-03-29 23:41:26'),
(176,1,'8009277a859192d58e8a1b80a6793c20ba3e17b4ca38b3bd6c70d96d459db672','192.168.48.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-29 23:45:04','2026-04-05 23:45:04',0,'2026-03-29 23:45:04'),
(177,1,'795bfd3a573246603a72241b9d0b8bbcadb64bbc8a82071e2be7201db1812ce8','192.168.48.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-29 23:53:43','2026-04-05 23:53:43',0,'2026-03-29 23:53:43'),
(178,1,'c5381b05586c9d65b19155df774dfd747a8be5ddf0c02ac06fd8f03cddb48ee4','192.168.128.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 00:16:39','2026-04-06 00:16:39',0,'2026-03-30 00:16:39'),
(179,1,'b6546b67a701d8ddbd1de92d99ff40fbcd997c49516122e4050b854026f4462f','192.168.128.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 08:32:12','2026-04-06 08:32:12',0,'2026-03-30 08:32:12'),
(180,1,'5849d7d21953c75e333f646e6ef5c8f4d81b637ec364f3ae0ae54632dd0b92ab','192.168.128.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 08:34:52','2026-04-06 08:34:52',0,'2026-03-30 08:34:52'),
(181,1,'805c461042fa126cc3934bd102d64a8f4c361277f6a365ace7c8edb82638c254','192.168.144.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 08:57:19','2026-04-06 08:57:19',0,'2026-03-30 08:57:19'),
(182,1,'1ea67aeaab8b4c9106a9c298ff42ded71d90055c454b3724f65f3b300a03196c','192.168.208.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 09:25:49','2026-04-06 09:25:49',0,'2026-03-30 09:25:49'),
(183,1,'88917ff38a74277911c33ca751d50cedd1213bb1320aa640954b28167a75d693','192.168.224.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 09:36:06','2026-04-06 09:36:06',0,'2026-03-30 09:36:06'),
(184,1,'9916da7980188954f1767e038bd4539630071d915656664409eecc70e4a1bcb1','192.168.240.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 09:46:20','2026-04-06 09:46:20',0,'2026-03-30 09:46:20'),
(185,1,'cfe45a7ff6edc32e1d620474de8ef2c46726602139a6885f9c332f484c59af51','192.168.240.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-30 09:49:13','2026-04-06 09:49:13',0,'2026-03-30 09:49:13'),
(186,1,'a1d5b16d3627c68b12462973374dea55c1b3d77f89369655abc51838fd9586c4','192.168.240.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-03-30 10:04:41','2026-04-06 10:04:41',0,'2026-03-30 10:04:41'),
(187,1,'a2f27aff073f065a530efdb4628dd5551fc84f83d00c549167c3b2347fefe1b3','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 10:44:19','2026-04-06 10:44:19',0,'2026-03-30 10:44:19'),
(188,1,'4453ad35935e69bbb8f5988fa55b363397cbc30317aa2e99826e611ea157ec52','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 12:21:25','2026-04-06 12:21:25',0,'2026-03-30 12:21:25'),
(189,1,'eec879bd457ab186631e0da5e9b5d0baa62d85f50bb5a7bf528169159cc6efd0','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 12:37:19','2026-04-06 12:37:19',0,'2026-03-30 12:37:19'),
(190,1,'131169b943ee02e9c796bdd58b69d6f94e8905f97812342a04503737d21756a4','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 12:52:24','2026-04-06 12:52:24',0,'2026-03-30 12:52:24'),
(191,1,'136134f69d9e4e38b80661e593e04cfd5b7d0eca416e849fd951d79632425ab0','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-03-30 13:18:51','2026-04-06 13:18:51',0,'2026-03-30 13:18:51'),
(192,1,'2589beead1388677357295a4db6a3fd6ac48efb998d43ff65b6a32d0eee7a2d6','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-01 22:28:29','2026-04-08 22:28:29',0,'2026-04-01 22:28:29'),
(193,1,'e0ae71e07d9f2ae15830ed819f19bdabb172bf606101a4c8a947d9a13ed016b7','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-01 23:00:10','2026-04-08 23:00:10',0,'2026-04-01 23:00:10'),
(194,1,'9fa8fbe90ab9b885750dd7987befded45506026afcf000c6dce102c4112b3443','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 11:50:42','2026-04-13 11:50:42',0,'2026-04-06 11:50:42'),
(195,1,'b05af528060dc8a1098e55614941083b5daea99ef0ee1601490f0a06bf7ad49b','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 12:08:35','2026-04-13 12:08:35',0,'2026-04-06 12:08:35'),
(196,1,'c9649795609454247ac7f997e91c14bebab288a712d1dd6052fb6eca283b3642','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 12:51:15','2026-04-13 12:51:15',0,'2026-04-06 12:51:15'),
(197,1,'b2e853d47605310f3dc82ec303df35f81b33a6ae081b1b18942e0150b9f0b81e','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 12:58:50','2026-04-13 12:58:50',0,'2026-04-06 12:58:50'),
(198,1,'9bb30897223e7c481b75f6dbf7d1f6b0723da05a22420c33dae4eaf22f113aa2','172.20.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-04-06 13:03:21','2026-04-13 13:03:21',0,'2026-04-06 13:03:21'),
(199,1,'6f646c32d3f23ca47cc74621455ee50102a718bed74b3bc23cc997d30fd8e7e1','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:12:11','2026-04-13 13:12:11',0,'2026-04-06 13:12:11'),
(200,1,'7f1928dab7371ae911727b5d25a297d7e7bdeae05c0b972493f09fd79c13d51d','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-04-06 13:20:23','2026-04-13 13:20:23',0,'2026-04-06 13:20:23'),
(201,1,'5609839377c96ff1d7d4616bc7bcc80ec1ecc10a621eae8a0d3046123a1a910a','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:22:08','2026-04-13 13:22:08',0,'2026-04-06 13:22:08'),
(202,1,'25fa4c8e6a564bafc474aae8d4a0a2aea29045861b3b552cb195a05fd5a5100b','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:34:01','2026-04-13 13:34:01',0,'2026-04-06 13:34:01'),
(203,1,'f037c7210ec4fb662a3aa4e974a9fe7caf296e174609a454e181640674c936a7','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:39:07','2026-04-13 13:39:07',0,'2026-04-06 13:39:07'),
(204,1,'c59887c3cd67939fcb8d3fbbe9838cbc8c49f17cb27673279283a031e2d1db85','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:49:32','2026-04-13 13:49:32',0,'2026-04-06 13:49:32'),
(205,4,'51ae19e4f22f1754a1af0dabefeff724614aa06d9776f50e923cd9f0527c7e55','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:53:41','2026-04-13 13:53:41',0,'2026-04-06 13:53:41'),
(206,1,'e6f66652a8eefad758e940746622d483df83cb194fbf42549bc77f431aba2aed','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:54:07','2026-04-13 13:54:07',0,'2026-04-06 13:54:07'),
(207,4,'4cfb6b89de7e065ceaee2d057c02ed13c04fe72777f381668a09ae5cebf662f4','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:54:34','2026-04-13 13:54:34',0,'2026-04-06 13:54:34'),
(208,1,'5bbdad225e8c0f5f54fcc35607b56b8f4546880d0e1ccc8c5ea0d11488430b07','172.25.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 13:56:50','2026-04-13 13:56:50',0,'2026-04-06 13:56:50'),
(209,1,'beeed078894e32085370a888ed6331483e355f9c5ea45cf41df486dd9d5bab25','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 14:53:50','2026-04-13 14:53:50',0,'2026-04-06 14:53:50'),
(210,1,'ed28b9bcf92dec6e1fd6f3743d5223e3060f2592312c2e184436adab2b9efb5f','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 15:14:25','2026-04-13 15:14:25',0,'2026-04-06 15:14:25'),
(211,1,'92b1cec8b0adc6f36f6fdcefbad7b6ac17cae67fcefea47b743b19d261534ceb','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 15:25:36','2026-04-13 15:25:36',0,'2026-04-06 15:25:36'),
(212,1,'5169d3df44b57ba12df4f8999720e13529f9141e293da82b54b7f2096db47ac5','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 15:44:51','2026-04-13 15:44:51',0,'2026-04-06 15:44:51'),
(213,1,'48d75cfc10e5042933a968841c9672eceb76cb1fb4100fbcf679304a0298508c','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 17:12:22','2026-04-13 17:12:22',0,'2026-04-06 17:12:22'),
(214,1,'fe6121c9f5d4df24872bae19ba90c94a1173b4177be83fe43d9d63b59b83b29a','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 18:20:56','2026-04-13 18:20:56',0,'2026-04-06 18:20:56'),
(215,1,'69747e0ab729931c49cb0db3aede4bdb51175791d7e022e249654d4f5d72a1c1','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-06 23:14:30','2026-04-13 23:14:30',0,'2026-04-06 23:14:30'),
(216,1,'e01c227f3b1ce52a6299bbb6233c78005fffbc5c68394c6ca569084c24ee22b5','172.20.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 07:02:59','2026-04-14 07:02:59',0,'2026-04-07 07:02:59'),
(217,1,'17214147121bba4841e3bcf305d22bac8fe80f4dbb5d27f911dec4cbd620d174','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 07:50:21','2026-04-14 07:50:21',0,'2026-04-07 07:50:21'),
(218,1,'eae6cbe5d0fffa5d4acd72a101f11e9a0ef2ed493a75fafcbc96f480303d53bb','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 08:10:56','2026-04-14 08:10:56',0,'2026-04-07 08:10:56'),
(219,1,'e1bf863498a0b05007daefa4491c43b3758241a22d60aacb6c5622b1d87cfb08','172.22.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 08:16:59','2026-04-14 08:16:59',0,'2026-04-07 08:16:59'),
(220,1,'42dd4e162d51987e05ffeb824443e1f8972fd875aba548edf7e3e9c3b7322f52','172.23.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 08:31:08','2026-04-14 08:31:08',0,'2026-04-07 08:31:08'),
(221,1,'422135166bf4386530b3c7da0c67378877821202dce1899e4626220923102589','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 09:14:56','2026-04-14 09:14:56',0,'2026-04-07 09:14:56'),
(222,1,'37ccd3cddd8eef5f7e7113c05bb221357594028c87b3bc10bf75b36587025650','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 09:32:48','2026-04-14 09:32:48',0,'2026-04-07 09:32:48'),
(223,1,'4f41587315ba885fd512e90b2562141ce04d194fc25f955f582caebee4639e73','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 09:37:32','2026-04-14 09:37:32',0,'2026-04-07 09:37:32'),
(224,1,'17b304defc1ca5aea63584b211eb03118e08d18577ed2d3c10e48acacb0065a3','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 09:44:15','2026-04-14 09:44:15',0,'2026-04-07 09:44:15'),
(225,1,'270a68bfe645919ecc70bad51151e793e14660c11e25ff7f50ddf1ab9d2fd13c','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 09:59:34','2026-04-14 09:59:34',0,'2026-04-07 09:59:34'),
(226,1,'3d71a038dc55334a627dc112f73481cd679fad12c6801b1a6e8028928d493008','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 10:00:54','2026-04-14 10:00:54',0,'2026-04-07 10:00:54'),
(227,1,'3edf8bc49ebb282f94dd30a3b9a8b16a61b9fbc3c8f92084394114378e86ec96','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 11:58:48','2026-04-14 11:58:48',0,'2026-04-07 11:58:48'),
(228,1,'e1021e4116ec8737ab91b9690c95ad57515976d1a97eceec919a0cd5ff610b7b','172.24.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 12:34:38','2026-04-14 12:34:38',0,'2026-04-07 12:34:38'),
(229,1,'60754ef8603d40f9f0de80eab6eceb3e38c6865ae86ef12461512f9a837003bd','172.24.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-04-07 12:59:47','2026-04-14 12:59:47',0,'2026-04-07 12:59:47'),
(230,1,'bbe4d8778ea84f4dcdf016393045e411e16eeb272fc936ffccc9477de0194c1c','172.26.0.1','PostmanRuntime/7.51.1','PostmanRuntime/7.51.1','2026-04-07 13:20:11','2026-04-14 13:20:11',0,'2026-04-07 13:20:11'),
(231,1,'5bd80c3df675a0d972d6793dc080be308c1bb480e82b2befad94d2a6945eca3b','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 13:22:00','2026-04-14 13:22:00',0,'2026-04-07 13:22:00'),
(232,1,'e558019f8a09dab3e881d35f2001227e8933d7cd37b718918b4a717f8c0a3f45','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 13:50:26','2026-04-14 13:50:26',0,'2026-04-07 13:50:26'),
(233,1,'be57a146f009b4322a13c187ffa0ced3479542765591d6cb8f2d4a89a303033a','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 14:03:42','2026-04-14 14:03:42',0,'2026-04-07 14:03:42'),
(234,1,'b74687c1a13dbc01f4af512948faf040a5b7e726f741ace88ea203ab0a92a47f','172.26.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36 Edg/146.0.0.0','2026-04-07 14:16:26','2026-04-14 14:16:26',0,'2026-04-07 14:16:26');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES
(1,1,1,'Jair Alfonso','Arias Cueca','jair.qek@gmail.com','$2b$10$Ltii6t2FFU0Q.Obf8/nZju9o7ObgRIBnR6fN8SSIyftJCSJluuzya',1,'2026-03-09 22:13:00',NULL,'local',0,NULL,'2026-04-07 14:16:26','5040956d7a2c7b139fb212c042e4854d0801bcddf407eb1800354f87d0c3150e','2026-03-12 17:16:55'),
(3,1,3,'Nicolas David','Pe??a Gomez','nicolasgomezz373@gmail.com','$2b$10$cl1.Yhnxf5t.IFEuoIXzmeYDbDdswA4mzTt5ecKTUBs836QewIWti',1,'2026-03-15 20:28:38',NULL,'local',0,NULL,'2026-03-26 13:02:32',NULL,NULL),
(4,1,2,'Kevin David Lopez','Delgado','davidx.lopezj11@gmail.com','$2b$10$m4mh4fYm5fDyjUe6NAFxlu6b3Fg1JCgdiyDobo6PNUIiMYXIEqm.i',1,'2026-03-17 14:00:20',NULL,'local',0,NULL,'2026-04-06 13:54:34',NULL,NULL),
(5,1,4,'Michaell Steven','Gomez Leguizamo','michaell01gomez63@gmail.com','$2b$10$Nn3tFY.vZzZ6N315VUm/quOD26CCCSKF.T3TE7tupnnpqothzTe.y',1,'2026-03-17 14:01:33',NULL,'local',0,NULL,'2026-03-26 13:15:05',NULL,NULL);
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
  `estado` enum('Pendiente','Completado') NOT NULL DEFAULT 'Pendiente',
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero_factura` (`numero_factura`),
  KEY `finca_id` (`finca_id`),
  CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`finca_id`) REFERENCES `finca` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `venta`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `venta` WRITE;
/*!40000 ALTER TABLE `venta` DISABLE KEYS */;
INSERT INTO `venta` VALUES
(17,1,'Los Cubillos','FV-2026-00005','2026-03-30',14000000.00,'Completado'),
(21,1,'Los Pachones','FV-2026-00008','2026-04-02',10000000.00,'Completado');
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
-- Dumping routines for database 'ganacontrol'
--

--
-- Current Database: `ganacontrol`
--

USE `ganacontrol`;

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

-- Dump completed on 2026-04-07 19:23:22
