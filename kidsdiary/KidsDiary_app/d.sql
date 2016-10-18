-- MySQL dump 10.13  Distrib 5.6.27, for osx10.11 (x86_64)
--
-- Host: localhost    Database: kids_diary
-- ------------------------------------------------------
-- Server version	5.6.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album` (
  `ALBUM_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `TITLE` varchar(100) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ALBUM_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `album_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,8160425284333155477,'2016-03-13','2016-03-13 06:33:50','2016-03-13 06:33:50'),(2,8163975572841908370,'2016-03-13','2016-03-13 06:33:50','2016-03-13 06:33:50');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `album_detail_view`
--

DROP TABLE IF EXISTS `album_detail_view`;
/*!50001 DROP VIEW IF EXISTS `album_detail_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `album_detail_view` AS SELECT 
 1 AS `USER_ID`,
 1 AS `ALBUM_ID`,
 1 AS `FILE_NAME`,
 1 AS `FILE_PATH`,
 1 AS `CAPTION`,
 1 AS `CREATE_AT`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `album_photo_link`
--

DROP TABLE IF EXISTS `album_photo_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album_photo_link` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ALBUM_ID` bigint(20) NOT NULL,
  `PHOTO_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_ALBUM_ID` (`ALBUM_ID`),
  KEY `FK_PHOTO_ID` (`PHOTO_ID`),
  CONSTRAINT `FK_ALBUM_ID` FOREIGN KEY (`ALBUM_ID`) REFERENCES `album` (`ALBUM_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_PHOTO_ID` FOREIGN KEY (`PHOTO_ID`) REFERENCES `photo` (`PHOTO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_photo_link`
--

LOCK TABLES `album_photo_link` WRITE;
/*!40000 ALTER TABLE `album_photo_link` DISABLE KEYS */;
INSERT INTO `album_photo_link` VALUES (1,1,1),(2,2,1);
/*!40000 ALTER TABLE `album_photo_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `album_view`
--

DROP TABLE IF EXISTS `album_view`;
/*!50001 DROP VIEW IF EXISTS `album_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `album_view` AS SELECT 
 1 AS `USER_ID`,
 1 AS `ALBUM_ID`,
 1 AS `TITLE`,
 1 AS `CREATE_AT`,
 1 AS `FILE_PATH`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `child`
--

DROP TABLE IF EXISTS `child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child` (
  `CHILD_ID` int(11) NOT NULL AUTO_INCREMENT,
  `GUARDIAN_ID` int(11) NOT NULL COMMENT '保護者一人を表す。\n父母等の区別は属性で行う。\n決めつけにならないような柔軟性を持った名前にする。\n',
  `SCHOOL_ID` int(11) DEFAULT NULL,
  `ROOM_ID` int(11) DEFAULT NULL,
  `PHOTO_ID` bigint(20) DEFAULT NULL,
  `BIRTH_DATE` date NOT NULL,
  `NICK_NAME` varchar(50) DEFAULT NULL,
  `FAMILY_NAME` varchar(50) NOT NULL,
  `GIVEN_NAME` varchar(50) NOT NULL,
  `GENDER` varchar(2) NOT NULL COMMENT '"F" or "M"',
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CHILD_ID`),
  KEY `PHOTO_ID` (`PHOTO_ID`),
  KEY `guardian_idx` (`GUARDIAN_ID`),
  KEY `school_idx` (`SCHOOL_ID`),
  KEY `room_idx` (`ROOM_ID`),
  CONSTRAINT `child_ibfk_1` FOREIGN KEY (`GUARDIAN_ID`) REFERENCES `guardian` (`GUARDIAN_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `child_ibfk_2` FOREIGN KEY (`PHOTO_ID`) REFERENCES `photo` (`PHOTO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `child_ibfk_3` FOREIGN KEY (`ROOM_ID`) REFERENCES `room` (`ROOM_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `child_ibfk_4` FOREIGN KEY (`SCHOOL_ID`) REFERENCES `school` (`SCHOOL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child`
--

LOCK TABLES `child` WRITE;
/*!40000 ALTER TABLE `child` DISABLE KEYS */;
INSERT INTO `child` VALUES (1,1,1,1,NULL,'2016-01-20','すずちゃん','御坂','鈴葉','F','2016-03-13 02:32:17','2016-03-13 02:32:17');
/*!40000 ALTER TABLE `child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `child_request`
--

DROP TABLE IF EXISTS `child_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `child_request` (
  `CHILD_ID` int(11) NOT NULL,
  `SCHOOL_ID` int(11) NOT NULL,
  `REQUEST_TYPE` varchar(20) NOT NULL,
  `REQUEST_STATUS` varchar(20) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `CHILD_ID` (`CHILD_ID`,`SCHOOL_ID`,`REQUEST_TYPE`),
  KEY `SCHOOL_ID` (`SCHOOL_ID`),
  CONSTRAINT `child_request_ibfk_1` FOREIGN KEY (`CHILD_ID`) REFERENCES `child` (`CHILD_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `child_request_ibfk_2` FOREIGN KEY (`SCHOOL_ID`) REFERENCES `school` (`SCHOOL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `child_request`
--

LOCK TABLES `child_request` WRITE;
/*!40000 ALTER TABLE `child_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `child_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary` (
  `DIARY_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CHILD_ID` int(11) NOT NULL,
  `DIARY_DATE` datetime NOT NULL,
  PRIMARY KEY (`DIARY_ID`),
  KEY `CHILD_ID` (`CHILD_ID`),
  CONSTRAINT `diary_ibfk_1` FOREIGN KEY (`CHILD_ID`) REFERENCES `child` (`CHILD_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `diary` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `diary` VALUES (1,1,'2016-02-11 21:00:00');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_basic`
--

DROP TABLE IF EXISTS `diary_basic`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_basic` (
  `DIARY_BASIC_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_ID` bigint(20) NOT NULL,
  `USER_ID` bigint(20) NOT NULL,
  `NOTIFY_COUNT` int(11) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`DIARY_BASIC_ID`),
  KEY `DIARY_ID` (`DIARY_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `diary_basic_ibfk_1` FOREIGN KEY (`DIARY_ID`) REFERENCES `diary` (`DIARY_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diary_basic_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_basic`
--

LOCK TABLES `diary_basic` WRITE;
/*!40000 ALTER TABLE `diary_basic` DISABLE KEYS */;
INSERT INTO `diary_basic` VALUES (1,1,8160425284333155477,1,'2016-03-13 02:32:17','2016-03-13 02:32:17'),(2,1,8163975572841908370,1,'2016-03-13 12:05:44','2016-03-13 12:05:44');
/*!40000 ALTER TABLE `diary_basic` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_body`
--

DROP TABLE IF EXISTS `diary_body`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_body` (
  `DIARY_BODY_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `HEIGHT` float(4,1) DEFAULT NULL,
  `WEIGHT` float(4,1) DEFAULT NULL,
  PRIMARY KEY (`DIARY_BODY_ID`),
  UNIQUE KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  CONSTRAINT `diary_body_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_body`
--

LOCK TABLES `diary_body` WRITE;
/*!40000 ALTER TABLE `diary_body` DISABLE KEYS */;
INSERT INTO `diary_body` VALUES (1,1,100.0,35.0),(2,2,100.0,35.0);
/*!40000 ALTER TABLE `diary_body` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_food`
--

DROP TABLE IF EXISTS `diary_food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_food` (
  `DIARY_FOOD_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `TIME_AT` datetime NOT NULL,
  `FOOD` varchar(4000) DEFAULT NULL,
  PRIMARY KEY (`DIARY_FOOD_ID`),
  UNIQUE KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`,`TIME_AT`),
  CONSTRAINT `diary_food_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_food`
--

LOCK TABLES `diary_food` WRITE;
/*!40000 ALTER TABLE `diary_food` DISABLE KEYS */;
INSERT INTO `diary_food` VALUES (1,1,'2016-02-11 21:00:00','あんぱん'),(2,1,'2016-02-13 03:33:20','しいたけ'),(3,2,'2016-02-11 21:00:00','あんぱん'),(4,2,'2016-02-13 03:33:20','しいたけ');
/*!40000 ALTER TABLE `diary_food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_food_photo_link`
--

DROP TABLE IF EXISTS `diary_food_photo_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_food_photo_link` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_FOOD_ID` bigint(20) NOT NULL,
  `PHOTO_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DIARY_FOOD_ID` (`DIARY_FOOD_ID`),
  KEY `PHOTO_ID` (`PHOTO_ID`),
  CONSTRAINT `diary_food_photo_link_ibfk_1` FOREIGN KEY (`DIARY_FOOD_ID`) REFERENCES `diary_food` (`DIARY_FOOD_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diary_food_photo_link_ibfk_2` FOREIGN KEY (`PHOTO_ID`) REFERENCES `photo` (`PHOTO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_food_photo_link`
--

LOCK TABLES `diary_food_photo_link` WRITE;
/*!40000 ALTER TABLE `diary_food_photo_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `diary_food_photo_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_health`
--

DROP TABLE IF EXISTS `diary_health`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_health` (
  `DIARY_HEALTH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `HEALTH_STATUS` varchar(50) NOT NULL,
  `TEMPERATURE` float(3,1) NOT NULL,
  `TIME_AT` datetime NOT NULL,
  PRIMARY KEY (`DIARY_HEALTH_ID`),
  KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  CONSTRAINT `diary_health_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_health`
--

LOCK TABLES `diary_health` WRITE;
/*!40000 ALTER TABLE `diary_health` DISABLE KEYS */;
INSERT INTO `diary_health` VALUES (1,1,'健康',36.5,'2016-03-13 11:32:17'),(2,2,'健康',36.5,'2016-03-13 11:32:17'),(3,2,'健康',36.5,'2016-03-13 20:16:40'),(4,2,'健康',36.5,'2016-03-13 21:05:44');
/*!40000 ALTER TABLE `diary_health` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_injury`
--

DROP TABLE IF EXISTS `diary_injury`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_injury` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `PHOTO_ID` bigint(20) NOT NULL,
  `REMARK` varchar(190) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  KEY `PHOTO_ID` (`PHOTO_ID`),
  CONSTRAINT `diary_injury_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diary_injury_ibfk_2` FOREIGN KEY (`PHOTO_ID`) REFERENCES `photo` (`PHOTO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_injury`
--

LOCK TABLES `diary_injury` WRITE;
/*!40000 ALTER TABLE `diary_injury` DISABLE KEYS */;
/*!40000 ALTER TABLE `diary_injury` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `diary_list_view`
--

DROP TABLE IF EXISTS `diary_list_view`;
/*!50001 DROP VIEW IF EXISTS `diary_list_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `diary_list_view` AS SELECT 
 1 AS `DIARY_ID`,
 1 AS `CHILD_ID`,
 1 AS `DIARY_DATE`,
 1 AS `TEXT_CONTENTS`,
 1 AS `PHOTO`,
 1 AS `GUARDIAN`,
 1 AS `TEACHER`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `diary_lunch`
--

DROP TABLE IF EXISTS `diary_lunch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_lunch` (
  `DIARY_LUNCH_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `LUNCH_TEXT` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`DIARY_LUNCH_ID`),
  KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  CONSTRAINT `diary_lunch_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_lunch`
--

LOCK TABLES `diary_lunch` WRITE;
/*!40000 ALTER TABLE `diary_lunch` DISABLE KEYS */;
INSERT INTO `diary_lunch` VALUES (1,2,'持参');
/*!40000 ALTER TABLE `diary_lunch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_notify`
--

DROP TABLE IF EXISTS `diary_notify`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_notify` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `STATUS` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `diary_notify_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diary_notify_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_notify`
--

LOCK TABLES `diary_notify` WRITE;
/*!40000 ALTER TABLE `diary_notify` DISABLE KEYS */;
INSERT INTO `diary_notify` VALUES (2,8160425284333155477,2,'UPDATED'),(3,8160425284333155477,2,'UPDATED'),(4,8160425284333155477,2,'UPDATED');
/*!40000 ALTER TABLE `diary_notify` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `diary_photo_date_group_view`
--

DROP TABLE IF EXISTS `diary_photo_date_group_view`;
/*!50001 DROP VIEW IF EXISTS `diary_photo_date_group_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `diary_photo_date_group_view` AS SELECT 
 1 AS `DATE`,
 1 AS `CHILD_ID`,
 1 AS `FILE_NAME`,
 1 AS `FILE_PATH`,
 1 AS `CAPTION`,
 1 AS `CREATE_AT`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `diary_photo_date_view`
--

DROP TABLE IF EXISTS `diary_photo_date_view`;
/*!50001 DROP VIEW IF EXISTS `diary_photo_date_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `diary_photo_date_view` AS SELECT 
 1 AS `DATE`,
 1 AS `CHILD_ID`,
 1 AS `FILE_NAME`,
 1 AS `FILE_PATH`,
 1 AS `CAPTION`,
 1 AS `CREATE_AT`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `diary_pick_up`
--

DROP TABLE IF EXISTS `diary_pick_up`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_pick_up` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `PICK_UP_PERSON` varchar(255) NOT NULL,
  `PICK_UP_TIME` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  CONSTRAINT `diary_pick_up_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_pick_up`
--

LOCK TABLES `diary_pick_up` WRITE;
/*!40000 ALTER TABLE `diary_pick_up` DISABLE KEYS */;
INSERT INTO `diary_pick_up` VALUES (1,1,'母','2016-02-11 21:00:00'),(2,2,'母','2016-02-11 21:00:00'),(3,2,'母','2016-02-11 21:00:00'),(4,2,'母','2016-02-11 21:00:00');
/*!40000 ALTER TABLE `diary_pick_up` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_poop`
--

DROP TABLE IF EXISTS `diary_poop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_poop` (
  `DIARY_POOP_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `POOP_STATUS` varchar(100) NOT NULL,
  `POOP_TIME` datetime NOT NULL,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`DIARY_POOP_ID`),
  KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`),
  CONSTRAINT `diary_poop_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_poop`
--

LOCK TABLES `diary_poop` WRITE;
/*!40000 ALTER TABLE `diary_poop` DISABLE KEYS */;
INSERT INTO `diary_poop` VALUES (1,'普通','1970-01-02 19:17:24',1),(2,'柔らかい','1970-01-01 09:03:42',1),(3,'普通','1970-01-02 19:17:24',2),(4,'柔らかい','1970-01-01 09:03:42',2);
/*!40000 ALTER TABLE `diary_poop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_sleep`
--

DROP TABLE IF EXISTS `diary_sleep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_sleep` (
  `DIARY_SLEEP_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_BASIC_ID` bigint(20) NOT NULL,
  `SLEEP_TIME` datetime NOT NULL,
  `AWAKE_TIME` datetime NOT NULL,
  PRIMARY KEY (`DIARY_SLEEP_ID`),
  UNIQUE KEY `DIARY_BASIC_ID` (`DIARY_BASIC_ID`,`SLEEP_TIME`),
  CONSTRAINT `diary_sleep_ibfk_1` FOREIGN KEY (`DIARY_BASIC_ID`) REFERENCES `diary_basic` (`DIARY_BASIC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_sleep`
--

LOCK TABLES `diary_sleep` WRITE;
/*!40000 ALTER TABLE `diary_sleep` DISABLE KEYS */;
INSERT INTO `diary_sleep` VALUES (1,1,'2016-02-11 21:00:00','2016-02-11 22:00:00'),(2,1,'2016-02-13 03:33:20','2016-02-13 04:33:20'),(3,2,'2016-02-11 21:00:00','2016-02-11 22:00:00'),(4,2,'2016-02-13 03:33:20','2016-02-13 04:33:20');
/*!40000 ALTER TABLE `diary_sleep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_text`
--

DROP TABLE IF EXISTS `diary_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_text` (
  `DIARY_TEXT_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_ID` bigint(20) NOT NULL,
  `USER_ID` bigint(20) NOT NULL,
  `TEXT_CONTENTS` varchar(20000) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`DIARY_TEXT_ID`),
  KEY `DIARY_ID` (`DIARY_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `diary_text_ibfk_1` FOREIGN KEY (`DIARY_ID`) REFERENCES `diary` (`DIARY_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diary_text_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_text`
--

LOCK TABLES `diary_text` WRITE;
/*!40000 ALTER TABLE `diary_text` DISABLE KEYS */;
INSERT INTO `diary_text` VALUES (1,1,8160425284333155477,'今日はとても良い天気','2016-03-13 02:32:17','2016-03-13 02:32:17'),(2,1,8163975572841908370,'今日はとても良い天気','2016-03-13 02:32:17','2016-03-13 02:32:17'),(3,1,8163975572841908370,'今日はとても良い天気','2016-03-13 11:16:40','2016-03-13 11:16:40'),(4,1,8163975572841908370,'今日はとても良い天気','2016-03-13 12:05:44','2016-03-13 12:05:44');
/*!40000 ALTER TABLE `diary_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diary_text_photo_link`
--

DROP TABLE IF EXISTS `diary_text_photo_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diary_text_photo_link` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `DIARY_TEXT_ID` bigint(20) NOT NULL,
  `PHOTO_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `DIARY_TEXT_ID` (`DIARY_TEXT_ID`),
  KEY `PHOTO_ID` (`PHOTO_ID`),
  CONSTRAINT `diary_text_photo_link_ibfk_1` FOREIGN KEY (`DIARY_TEXT_ID`) REFERENCES `diary_text` (`DIARY_TEXT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `diary_text_photo_link_ibfk_2` FOREIGN KEY (`PHOTO_ID`) REFERENCES `photo` (`PHOTO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diary_text_photo_link`
--

LOCK TABLES `diary_text_photo_link` WRITE;
/*!40000 ALTER TABLE `diary_text_photo_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `diary_text_photo_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guardian`
--

DROP TABLE IF EXISTS `guardian`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guardian` (
  `GUARDIAN_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '保護者一人を表す。\n父母等の区別は属性で行う。\n決めつけにならないような柔軟性を持った名前にする。\n',
  `USER_ID` bigint(20) NOT NULL,
  `GUARDIAN_TYPE` varchar(20) DEFAULT NULL COMMENT 'とりあえず未実装',
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`GUARDIAN_ID`),
  UNIQUE KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `guardian_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guardian`
--

LOCK TABLES `guardian` WRITE;
/*!40000 ALTER TABLE `guardian` DISABLE KEYS */;
INSERT INTO `guardian` VALUES (1,8163975572841908370,NULL,'2016-03-13 02:32:17','2016-03-13 02:32:17');
/*!40000 ALTER TABLE `guardian` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `guardian_view`
--

DROP TABLE IF EXISTS `guardian_view`;
/*!50001 DROP VIEW IF EXISTS `guardian_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `guardian_view` AS SELECT 
 1 AS `USER_ID`,
 1 AS `USER_TOKEN`,
 1 AS `DEVICE_TOKEN`,
 1 AS `USER_TYPE`,
 1 AS `USER_NAME`,
 1 AS `LOGIN_NAME`,
 1 AS `EMAIL`,
 1 AS `PHONE`,
 1 AS `PASSWORD_HASH`,
 1 AS `AVATAR_PHOTO_ID`,
 1 AS `CREATE_AT`,
 1 AS `UPDATE_AT`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `PHOTO_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `FILE_NAME` varchar(255) NOT NULL,
  `FILE_PATH` varchar(255) NOT NULL COMMENT 'かなぁ',
  `CAPTION` varchar(255) DEFAULT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`PHOTO_ID`),
  UNIQUE KEY `FILE_PATH` (`FILE_PATH`),
  UNIQUE KEY `IDX_PHOTO_FILE_PATH` (`FILE_PATH`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `photo_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,8160425284333155477,'teacher.jpg','2016/zk/_3t8YbWrtY_RUrBGCVYd','記念の写真','2016-03-13 06:33:50','2016-03-13 06:33:50');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `play_evolutions`
--

DROP TABLE IF EXISTS `play_evolutions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `play_evolutions` (
  `id` int(11) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `applied_at` timestamp NOT NULL,
  `apply_script` mediumtext,
  `revert_script` mediumtext,
  `state` varchar(255) DEFAULT NULL,
  `last_problem` mediumtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `play_evolutions`
--

LOCK TABLES `play_evolutions` WRITE;
/*!40000 ALTER TABLE `play_evolutions` DISABLE KEYS */;
INSERT INTO `play_evolutions` VALUES (1,'bc89bdca3ec58631191f7180ac99592f33fc25dc','2016-03-12 15:00:00','create table album (\nALBUM_ID                  varchar(255) not null,\nCREATE_AT                 datetime(6),\ntitle                     varchar(255),\nUPDATE_AT                 datetime(6),\nUSER_ID                   varchar(255),\nconstraint pk_album primary key (ALBUM_ID))\n;\n\ncreate table album_detail_view (\nALBUM_ID                  bigint,\ncaption                   varchar(255),\nCREATE_AT                 datetime(6),\nFILE_NAME                 varchar(255),\nFILE_PATH                 varchar(255),\nUSER_ID                   bigint)\n;\n\ncreate table album_photo_link (\nid                        varchar(255) not null,\nALBUM_ID                  varchar(255),\nPHOTO_ID                  varchar(255),\nconstraint pk_album_photo_link primary key (id))\n;\n\ncreate table album_view (\nALBUM_ID                  bigint,\nCREATE_AT                 datetime(6),\nFILE_PATH                 varchar(255),\ntitle                     varchar(255),\nUSER_ID                   bigint)\n;\n\ncreate table child (\nCHILD_ID                  integer auto_increment not null,\nBIRTH_DATE                datetime(6),\nCREATE_AT                 datetime(6),\nFAMILY_NAME               varchar(255),\ngender                    varchar(255),\nGIVEN_NAME                varchar(255),\nNICK_NAME                 varchar(255),\nUPDATE_AT                 datetime(6),\nGUARDIAN_ID               integer,\nPHOTO_ID                  varchar(255),\nROOM_ID                   integer,\nSCHOOL_ID                 integer,\nconstraint pk_child primary key (CHILD_ID))\n;\n\ncreate table child_request (\nCREATE_AT                 datetime(6),\nREQUEST_STATUS            varchar(255),\nREQUEST_TYPE              varchar(255),\nUPDATE_AT                 datetime(6),\nCHILD_ID                  integer,\nSCHOOL_ID                 integer)\n;\n\ncreate table diary (\nDIARY_ID                  varchar(255) not null,\nDIARY_DATE                datetime(6),\nCHILD_ID                  integer,\nconstraint pk_diary primary key (DIARY_ID))\n;\n\ncreate table diary_basic (\nDIARY_BASIC_ID            varchar(255) not null,\nCREATE_AT                 datetime(6),\nHEALTH_STATUS             varchar(255),\ntemperature               float,\nUPDATE_AT                 datetime(6),\nDIARY_ID                  varchar(255),\nUSER_ID                   varchar(255),\nconstraint pk_diary_basic primary key (DIARY_BASIC_ID))\n;\n\ncreate table diary_body (\nDIARY_BODY_ID             varchar(255) not null,\nheight                    float,\nweight                    float,\nDIARY_BASIC_ID            varchar(255),\nconstraint pk_diary_body primary key (DIARY_BODY_ID))\n;\n\ncreate table diary_food (\nDIARY_FOOD_ID             varchar(255) not null,\nfood                      varchar(255),\nTIME_AT                   datetime(6),\nDIARY_BASIC_ID            varchar(255),\nconstraint pk_diary_food primary key (DIARY_FOOD_ID))\n;\n\ncreate table diary_food_photo_link (\nid                        varchar(255) not null,\nDIARY_FOOD_ID             varchar(255),\nPHOTO_ID                  varchar(255),\nconstraint pk_diary_food_photo_link primary key (id))\n;\n\ncreate table diary_injury (\nid                        varchar(255) not null,\nremark                    varchar(255),\nDIARY_BASIC_ID            varchar(255),\nPHOTO_ID                  varchar(255),\nconstraint pk_diary_injury primary key (id))\n;\n\ncreate table diary_list_view (\nCHILD_ID                  integer,\nDIARY_DATE                datetime(6),\nDIARY_ID                  bigint,\nguardian                  bigint,\nphoto                     varchar(255),\nteacher                   bigint,\nTEXT_CONTENTS             varchar(255))\n;\n\ncreate table diary_pick_up (\nid                        varchar(255) not null,\nPICK_UP_PERSON            varchar(255),\nPICK_UP_TIME              datetime(6),\nDIARY_BASIC_ID            varchar(255),\nconstraint pk_diary_pick_up primary key (id))\n;\n\ncreate table diary_sleep (\nDIARY_SLEEP_ID            varchar(255) not null,\nAWAKE_TIME                datetime(6),\nSLEEP_TIME                datetime(6),\nDIARY_BASIC_ID            varchar(255),\nconstraint pk_diary_sleep primary key (DIARY_SLEEP_ID))\n;\n\ncreate table diary_text (\nDIARY_TEXT_ID             varchar(255) not null,\nCREATE_AT                 datetime(6),\nTEXT_CONTENTS             varchar(255),\nUPDATE_AT                 datetime(6),\nDIARY_ID                  varchar(255),\nUSER_ID                   varchar(255),\nconstraint pk_diary_text primary key (DIARY_TEXT_ID))\n;\n\ncreate table diary_text_photo_link (\nid                        varchar(255) not null,\nDIARY_TEXT_ID             varchar(255),\nPHOTO_ID                  varchar(255),\nconstraint pk_diary_text_photo_link primary key (id))\n;\n\ncreate table diary_update_notify (\nid                        varchar(255) not null,\nstatus                    varchar(255),\nDIARY_ID                  varchar(255),\nUSER_ID                   varchar(255),\nconstraint pk_diary_update_notify primary key (id))\n;\n\ncreate table guardian (\nGUARDIAN_ID               integer auto_increment not null,\nCREATE_AT                 datetime(6),\nGUARDIAN_TYPE             varchar(255),\nUPDATE_AT                 datetime(6),\nUSER_ID                   varchar(255),\nconstraint pk_guardian primary key (GUARDIAN_ID))\n;\n\ncreate table guardian_view (\nAVATAR_PHOTO_ID           bigint,\nCREATE_AT                 datetime(6),\nDEVICE_TOKEN              varchar(255),\nemail                     varchar(255),\nLOGIN_NAME                varchar(255),\nPASSWORD_HASH             varchar(255),\nphone                     varchar(255),\nUPDATE_AT                 datetime(6),\nUSER_ID                   bigint,\nUSER_NAME                 varchar(255),\nUSER_TOKEN                varchar(255),\nUSER_TYPE                 varchar(255))\n;\n\ncreate table photo (\nPHOTO_ID                  varchar(255) not null,\ncaption                   varchar(255),\nCREATE_AT                 datetime(6),\nFILE_NAME                 varchar(255),\nFILE_PATH                 varchar(255),\nUPDATE_AT                 datetime(6),\nUSER_ID                   varchar(255),\nconstraint pk_photo primary key (PHOTO_ID))\n;\n\ncreate table receive_message (\nRECEIVE_MESSAGE_ID        varchar(255) not null,\nCREATE_AT                 datetime(6),\nMESSAGE_STATUS            varchar(255),\ntext                      varchar(255),\nTHREAD_ID                 bigint,\nUPDATE_AT                 datetime(6),\nSENDER_USER_ID            varchar(255),\nUSER_ID                   varchar(255),\nconstraint pk_receive_message primary key (RECEIVE_MESSAGE_ID))\n;\n\ncreate table room (\nROOM_ID                   integer auto_increment not null,\nCREATE_AT                 datetime(6),\nROOM_NAME                 varchar(255),\nUPDATE_AT                 datetime(6),\nSCHOOL_ID                 integer,\nconstraint pk_room primary key (ROOM_ID))\n;\n\ncreate table school (\nSCHOOL_ID                 integer auto_increment not null,\nCREATE_AT                 datetime(6),\nSCHOOL_NAME               varchar(255),\nUPDATE_AT                 datetime(6),\nconstraint pk_school primary key (SCHOOL_ID))\n;\n\ncreate table send_message (\nSEND_MESSAGE_ID           varchar(255) not null,\nCREATE_AT                 datetime(6),\nSEND_TO                   varchar(255),\ntext                      varchar(255),\nTHREAD_ID                 bigint,\nUPDATE_AT                 datetime(6),\nUSER_ID                   varchar(255),\nconstraint pk_send_message primary key (SEND_MESSAGE_ID))\n;\n\ncreate table teacher (\nTEACHER_ID                integer auto_increment not null,\nCREATE_AT                 datetime(6),\nUPDATE_AT                 datetime(6),\nROOM_ID                   integer,\nSCHOOL_ID                 integer,\nUSER_ID                   varchar(255),\nconstraint pk_teacher primary key (TEACHER_ID))\n;\n\ncreate table teacher_permission (\nTEACHER_PERMISSION_ID     integer auto_increment not null,\nTEACHER_PERMISSION_NAME   varchar(255),\nTEACHER_PERMISSION_REMARK varchar(255),\nconstraint pk_teacher_permission primary key (TEACHER_PERMISSION_ID))\n;\n\ncreate table teacher_permission_link (\nid                        integer auto_increment not null,\nCREATE_AT                 datetime(6),\nUPDATE_AT                 datetime(6),\nTEACHER_ID                integer,\nTEACHER_PERMISSION_ID     integer,\nconstraint pk_teacher_permission_link primary key (id))\n;\n\ncreate table teacher_request (\nTEACHER_REQUEST_ID        varchar(255) not null,\nCREATE_AT                 datetime(6),\nREQUEST_STATUS            varchar(255),\nREQUEST_TYPE              varchar(255),\nUPDATE_AT                 datetime(6),\nSCHOOL_ID                 integer,\nTEACHER_ID                integer,\nconstraint pk_teacher_request primary key (TEACHER_REQUEST_ID))\n;\n\ncreate table teacher_request_view (\nemail                     varchar(255),\nREQUEST_STATUS            varchar(255),\nSCHOOL_ID                 integer,\nTEACHER_ID                integer,\nTEACHER_REQUEST_ID        bigint,\nUSER_NAME                 varchar(255))\n;\n\ncreate table teacher_room_view (\nCHILD_ID                  integer,\nNICK_NAME                 varchar(255),\nROOM_NAME                 varchar(255),\nTEACHER_ID                integer)\n;\n\ncreate table teacher_view (\nAVATAR_PHOTO_ID           bigint,\nCREATE_AT                 datetime(6),\nDEVICE_TOKEN              varchar(255),\nemail                     varchar(255),\nLOGIN_NAME                varchar(255),\nPASSWORD_HASH             varchar(255),\nphone                     varchar(255),\nROOM_ID                   integer,\nSCHOOL_ID                 integer,\nUPDATE_AT                 datetime(6),\nUSER_ID                   bigint,\nUSER_NAME                 varchar(255),\nUSER_TOKEN                varchar(255),\nUSER_TYPE                 varchar(255))\n;\n\ncreate table user (\nUSER_ID                   varchar(255) not null,\nAVATAR_PHOTO_ID           bigint,\nCREATE_AT                 datetime(6),\nDEVICE_TOKEN              varchar(255),\nemail                     varchar(255),\nLOGIN_NAME                varchar(255),\nPASSWORD_HASH             varchar(255),\nphone                     varchar(255),\nUPDATE_AT                 datetime(6),\nUSER_NAME                 varchar(255),\nUSER_TOKEN                varchar(255),\nUSER_TYPE                 varchar(255),\nconstraint pk_user primary key (USER_ID))\n;\n\nalter table album add constraint fk_album_user_1 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_album_user_1 on album (USER_ID);\nalter table album_photo_link add constraint fk_album_photo_link_album_2 foreign key (ALBUM_ID) references album (ALBUM_ID) on delete restrict on update restrict;\ncreate index ix_album_photo_link_album_2 on album_photo_link (ALBUM_ID);\nalter table album_photo_link add constraint fk_album_photo_link_photo_3 foreign key (PHOTO_ID) references photo (PHOTO_ID) on delete restrict on update restrict;\ncreate index ix_album_photo_link_photo_3 on album_photo_link (PHOTO_ID);\nalter table child add constraint fk_child_guardian_4 foreign key (GUARDIAN_ID) references guardian (GUARDIAN_ID) on delete restrict on update restrict;\ncreate index ix_child_guardian_4 on child (GUARDIAN_ID);\nalter table child add constraint fk_child_photo_5 foreign key (PHOTO_ID) references photo (PHOTO_ID) on delete restrict on update restrict;\ncreate index ix_child_photo_5 on child (PHOTO_ID);\nalter table child add constraint fk_child_room_6 foreign key (ROOM_ID) references room (ROOM_ID) on delete restrict on update restrict;\ncreate index ix_child_room_6 on child (ROOM_ID);\nalter table child add constraint fk_child_school_7 foreign key (SCHOOL_ID) references school (SCHOOL_ID) on delete restrict on update restrict;\ncreate index ix_child_school_7 on child (SCHOOL_ID);\nalter table child_request add constraint fk_child_request_child_8 foreign key (CHILD_ID) references child (CHILD_ID) on delete restrict on update restrict;\ncreate index ix_child_request_child_8 on child_request (CHILD_ID);\nalter table child_request add constraint fk_child_request_school_9 foreign key (SCHOOL_ID) references school (SCHOOL_ID) on delete restrict on update restrict;\ncreate index ix_child_request_school_9 on child_request (SCHOOL_ID);\nalter table diary add constraint fk_diary_child_10 foreign key (CHILD_ID) references child (CHILD_ID) on delete restrict on update restrict;\ncreate index ix_diary_child_10 on diary (CHILD_ID);\nalter table diary_basic add constraint fk_diary_basic_diary_11 foreign key (DIARY_ID) references diary (DIARY_ID) on delete restrict on update restrict;\ncreate index ix_diary_basic_diary_11 on diary_basic (DIARY_ID);\nalter table diary_basic add constraint fk_diary_basic_user_12 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_diary_basic_user_12 on diary_basic (USER_ID);\nalter table diary_body add constraint fk_diary_body_diaryBasic_13 foreign key (DIARY_BASIC_ID) references diary_basic (DIARY_BASIC_ID) on delete restrict on update restrict;\ncreate index ix_diary_body_diaryBasic_13 on diary_body (DIARY_BASIC_ID);\nalter table diary_food add constraint fk_diary_food_diaryBasic_14 foreign key (DIARY_BASIC_ID) references diary_basic (DIARY_BASIC_ID) on delete restrict on update restrict;\ncreate index ix_diary_food_diaryBasic_14 on diary_food (DIARY_BASIC_ID);\nalter table diary_food_photo_link add constraint fk_diary_food_photo_link_diaryFood_15 foreign key (DIARY_FOOD_ID) references diary_food (DIARY_FOOD_ID) on delete restrict on update restrict;\ncreate index ix_diary_food_photo_link_diaryFood_15 on diary_food_photo_link (DIARY_FOOD_ID);\nalter table diary_food_photo_link add constraint fk_diary_food_photo_link_photo_16 foreign key (PHOTO_ID) references photo (PHOTO_ID) on delete restrict on update restrict;\ncreate index ix_diary_food_photo_link_photo_16 on diary_food_photo_link (PHOTO_ID);\nalter table diary_injury add constraint fk_diary_injury_diaryBasic_17 foreign key (DIARY_BASIC_ID) references diary_basic (DIARY_BASIC_ID) on delete restrict on update restrict;\ncreate index ix_diary_injury_diaryBasic_17 on diary_injury (DIARY_BASIC_ID);\nalter table diary_injury add constraint fk_diary_injury_photo_18 foreign key (PHOTO_ID) references photo (PHOTO_ID) on delete restrict on update restrict;\ncreate index ix_diary_injury_photo_18 on diary_injury (PHOTO_ID);\nalter table diary_pick_up add constraint fk_diary_pick_up_diaryBasic_19 foreign key (DIARY_BASIC_ID) references diary_basic (DIARY_BASIC_ID) on delete restrict on update restrict;\ncreate index ix_diary_pick_up_diaryBasic_19 on diary_pick_up (DIARY_BASIC_ID);\nalter table diary_sleep add constraint fk_diary_sleep_diaryBasic_20 foreign key (DIARY_BASIC_ID) references diary_basic (DIARY_BASIC_ID) on delete restrict on update restrict;\ncreate index ix_diary_sleep_diaryBasic_20 on diary_sleep (DIARY_BASIC_ID);\nalter table diary_text add constraint fk_diary_text_diary_21 foreign key (DIARY_ID) references diary (DIARY_ID) on delete restrict on update restrict;\ncreate index ix_diary_text_diary_21 on diary_text (DIARY_ID);\nalter table diary_text add constraint fk_diary_text_user_22 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_diary_text_user_22 on diary_text (USER_ID);\nalter table diary_text_photo_link add constraint fk_diary_text_photo_link_diaryText_23 foreign key (DIARY_TEXT_ID) references diary_text (DIARY_TEXT_ID) on delete restrict on update restrict;\ncreate index ix_diary_text_photo_link_diaryText_23 on diary_text_photo_link (DIARY_TEXT_ID);\nalter table diary_text_photo_link add constraint fk_diary_text_photo_link_photo_24 foreign key (PHOTO_ID) references photo (PHOTO_ID) on delete restrict on update restrict;\ncreate index ix_diary_text_photo_link_photo_24 on diary_text_photo_link (PHOTO_ID);\nalter table diary_update_notify add constraint fk_diary_update_notify_diary_25 foreign key (DIARY_ID) references diary (DIARY_ID) on delete restrict on update restrict;\ncreate index ix_diary_update_notify_diary_25 on diary_update_notify (DIARY_ID);\nalter table diary_update_notify add constraint fk_diary_update_notify_user_26 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_diary_update_notify_user_26 on diary_update_notify (USER_ID);\nalter table guardian add constraint fk_guardian_user_27 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_guardian_user_27 on guardian (USER_ID);\nalter table photo add constraint fk_photo_user_28 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_photo_user_28 on photo (USER_ID);\nalter table receive_message add constraint fk_receive_message_user1_29 foreign key (SENDER_USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_receive_message_user1_29 on receive_message (SENDER_USER_ID);\nalter table receive_message add constraint fk_receive_message_user2_30 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_receive_message_user2_30 on receive_message (USER_ID);\nalter table room add constraint fk_room_school_31 foreign key (SCHOOL_ID) references school (SCHOOL_ID) on delete restrict on update restrict;\ncreate index ix_room_school_31 on room (SCHOOL_ID);\nalter table send_message add constraint fk_send_message_user_32 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_send_message_user_32 on send_message (USER_ID);\nalter table teacher add constraint fk_teacher_room_33 foreign key (ROOM_ID) references room (ROOM_ID) on delete restrict on update restrict;\ncreate index ix_teacher_room_33 on teacher (ROOM_ID);\nalter table teacher add constraint fk_teacher_school_34 foreign key (SCHOOL_ID) references school (SCHOOL_ID) on delete restrict on update restrict;\ncreate index ix_teacher_school_34 on teacher (SCHOOL_ID);\nalter table teacher add constraint fk_teacher_user_35 foreign key (USER_ID) references user (USER_ID) on delete restrict on update restrict;\ncreate index ix_teacher_user_35 on teacher (USER_ID);\nalter table teacher_permission_link add constraint fk_teacher_permission_link_teacher_36 foreign key (TEACHER_ID) references teacher (TEACHER_ID) on delete restrict on update restrict;\ncreate index ix_teacher_permission_link_teacher_36 on teacher_permission_link (TEACHER_ID);\nalter table teacher_permission_link add constraint fk_teacher_permission_link_teacherPermission_37 foreign key (TEACHER_PERMISSION_ID) references teacher_permission (TEACHER_PERMISSION_ID) on delete restrict on update restrict;\ncreate index ix_teacher_permission_link_teacherPermission_37 on teacher_permission_link (TEACHER_PERMISSION_ID);\nalter table teacher_request add constraint fk_teacher_request_school_38 foreign key (SCHOOL_ID) references school (SCHOOL_ID) on delete restrict on update restrict;\ncreate index ix_teacher_request_school_38 on teacher_request (SCHOOL_ID);\nalter table teacher_request add constraint fk_teacher_request_teacher_39 foreign key (TEACHER_ID) references teacher (TEACHER_ID) on delete restrict on update restrict;\ncreate index ix_teacher_request_teacher_39 on teacher_request (TEACHER_ID);','SET FOREIGN_KEY_CHECKS=0;\n\ndrop table album;\n\ndrop table album_detail_view;\n\ndrop table album_photo_link;\n\ndrop table album_view;\n\ndrop table child;\n\ndrop table child_request;\n\ndrop table diary;\n\ndrop table diary_basic;\n\ndrop table diary_body;\n\ndrop table diary_food;\n\ndrop table diary_food_photo_link;\n\ndrop table diary_injury;\n\ndrop table diary_list_view;\n\ndrop table diary_pick_up;\n\ndrop table diary_sleep;\n\ndrop table diary_text;\n\ndrop table diary_text_photo_link;\n\ndrop table diary_update_notify;\n\ndrop table guardian;\n\ndrop table guardian_view;\n\ndrop table photo;\n\ndrop table receive_message;\n\ndrop table room;\n\ndrop table school;\n\ndrop table send_message;\n\ndrop table teacher;\n\ndrop table teacher_permission;\n\ndrop table teacher_permission_link;\n\ndrop table teacher_request;\n\ndrop table teacher_request_view;\n\ndrop table teacher_room_view;\n\ndrop table teacher_view;\n\ndrop table user;\n\nSET FOREIGN_KEY_CHECKS=1;','applied','Table \'album\' already exists [ERROR:1050, SQLSTATE:42S01]'),(2,'d362e0e73b795dee3cde775bef6be67e3b151ee3','2016-03-12 15:00:00','SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;\nSET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;\nSET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=\'TRADITIONAL\';\n\nCREATE TABLE IF NOT EXISTS `kids_diary`.`diary_health` (\n`DIARY_HEALTH_ID` BIGINT(20) NOT NULL AUTO_INCREMENT,\n`DIARY_BASIC_ID` BIGINT(20) NOT NULL,\n`HEALTH_STATUS` VARCHAR(50) NOT NULL,\n`TEMPERATURE` FLOAT(3,1) NOT NULL,\n`TIME_AT` DATETIME NOT NULL,\nPRIMARY KEY (`DIARY_HEALTH_ID`),\nINDEX `DIARY_BASIC_ID` (`DIARY_BASIC_ID` ASC),\nCONSTRAINT `diary_health_ibfk_1`\nFOREIGN KEY (`DIARY_BASIC_ID`)\nREFERENCES `kids_diary`.`diary_basic` (`DIARY_BASIC_ID`)\nON DELETE NO ACTION\nON UPDATE NO ACTION)\nENGINE = InnoDB\nAUTO_INCREMENT = 2\nDEFAULT CHARACTER SET = utf8;\n\n-- データ移行\nINSERT INTO `DIARY_HEALTH` (\n`DIARY_BASIC_ID`, `HEALTH_STATUS`, `TEMPERATURE`, `TIME_AT`\n) SELECT\n`DIARY_BASIC_ID`, `HEALTH_STATUS`, `TEMPERATURE`, `CREATE_AT` AS TIME_AT\nFROM\n`DIARY_BASIC`;\n\nALTER TABLE `kids_diary`.`diary_basic`\nDROP COLUMN `TEMPERATURE`,\nDROP COLUMN `HEALTH_STATUS`,\nADD COLUMN `NOTIFY_COUNT` INT(11) NOT NULL AFTER `USER_ID`;\n\nCREATE TABLE IF NOT EXISTS `kids_diary`.`diary_lunch` (\n`DIARY_LUNCH_ID` BIGINT(20) NOT NULL AUTO_INCREMENT,\n`DIARY_BASIC_ID` BIGINT(20) NOT NULL,\n`LUNCH_TEXT` VARCHAR(150) NULL DEFAULT NULL,\nPRIMARY KEY (`DIARY_LUNCH_ID`),\nINDEX `DIARY_BASIC_ID` (`DIARY_BASIC_ID` ASC),\nCONSTRAINT `diary_lunch_ibfk_1`\nFOREIGN KEY (`DIARY_BASIC_ID`)\nREFERENCES `kids_diary`.`diary_basic` (`DIARY_BASIC_ID`)\nON DELETE NO ACTION\nON UPDATE NO ACTION)\nENGINE = InnoDB\nDEFAULT CHARACTER SET = utf8;\n\nCREATE TABLE IF NOT EXISTS `kids_diary`.`diary_notify` (\n`ID` BIGINT(20) NOT NULL AUTO_INCREMENT,\n`USER_ID` BIGINT(20) NOT NULL,\n`DIARY_BASIC_ID` BIGINT(20) NOT NULL,\n`STATUS` VARCHAR(50) NOT NULL,\nPRIMARY KEY (`ID`),\nINDEX `DIARY_BASIC_ID` (`DIARY_BASIC_ID` ASC),\nINDEX `USER_ID` (`USER_ID` ASC),\nCONSTRAINT `diary_notify_ibfk_1`\nFOREIGN KEY (`DIARY_BASIC_ID`)\nREFERENCES `kids_diary`.`diary_basic` (`DIARY_BASIC_ID`)\nON DELETE NO ACTION\nON UPDATE NO ACTION,\nCONSTRAINT `diary_notify_ibfk_2`\nFOREIGN KEY (`USER_ID`)\nREFERENCES `kids_diary`.`user` (`USER_ID`)\nON DELETE NO ACTION\nON UPDATE NO ACTION)\nENGINE = InnoDB\nAUTO_INCREMENT = 2\nDEFAULT CHARACTER SET = utf8;\n\nCREATE TABLE IF NOT EXISTS `kids_diary`.`diary_poop` (\n`DIARY_POOP_ID` BIGINT(20) NOT NULL AUTO_INCREMENT,\n`POOP_STATUS` VARCHAR(100) NOT NULL,\n`POOP_TIME` DATETIME NOT NULL,\n`DIARY_BASIC_ID` BIGINT(20) NOT NULL,\nPRIMARY KEY (`DIARY_POOP_ID`),\nINDEX `DIARY_BASIC_ID` (`DIARY_BASIC_ID` ASC),\nCONSTRAINT `diary_poop_ibfk_1`\nFOREIGN KEY (`DIARY_BASIC_ID`)\nREFERENCES `kids_diary`.`diary_basic` (`DIARY_BASIC_ID`)\nON DELETE NO ACTION\nON UPDATE NO ACTION)\nENGINE = InnoDB\nDEFAULT CHARACTER SET = utf8;\n\nDROP TABLE IF EXISTS `kids_diary`.`diary_update_notify` ;\n\n\nSET SQL_MODE=@OLD_SQL_MODE;\nSET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;\nSET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;','DROP TABLE IF EXISTS `kids_diary`.`diary_poop` ;\nDROP TABLE IF EXISTS `kids_diary`.`diary_notify` ;\nDROP TABLE IF EXISTS `kids_diary`.`diary_lunch` ;\nDROP TABLE IF EXISTS `kids_diary`.`diary_health` ;','applied','Unknown column \'HEALTH_STATUS\' in \'field list\' [ERROR:1054, SQLSTATE:42S22]');
/*!40000 ALTER TABLE `play_evolutions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receive_message`
--

DROP TABLE IF EXISTS `receive_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receive_message` (
  `RECEIVE_MESSAGE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `SENDER_USER_ID` bigint(20) NOT NULL,
  `MESSAGE_STATUS` varchar(50) NOT NULL COMMENT '既読\n未読',
  `TEXT` varchar(20000) NOT NULL,
  `THREAD_ID` bigint(20) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`RECEIVE_MESSAGE_ID`),
  KEY `SENDER_USER_ID` (`SENDER_USER_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `receive_message_ibfk_1` FOREIGN KEY (`SENDER_USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `receive_message_ibfk_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receive_message`
--

LOCK TABLES `receive_message` WRITE;
/*!40000 ALTER TABLE `receive_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `receive_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `room` (
  `ROOM_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SCHOOL_ID` int(11) NOT NULL,
  `ROOM_NAME` varchar(100) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ROOM_ID`),
  KEY `SCHOOL_ID` (`SCHOOL_ID`),
  KEY `id_index` (`ROOM_ID`),
  KEY `school_room_idx` (`ROOM_ID`,`SCHOOL_ID`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`SCHOOL_ID`) REFERENCES `school` (`SCHOOL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,1,'','2016-03-13 02:32:17','2016-03-13 02:32:17');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `school` (
  `SCHOOL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SCHOOL_NAME` varchar(100) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SCHOOL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'桜園','2016-03-13 02:32:17','2016-03-13 02:32:17');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `send_message`
--

DROP TABLE IF EXISTS `send_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `send_message` (
  `SEND_MESSAGE_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `SEND_TO` varchar(190) NOT NULL COMMENT 'メーラーのようにアプリケーションで解釈するカンマ区切りのテキスト。',
  `TEXT` varchar(20000) NOT NULL,
  `THREAD_ID` bigint(20) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`SEND_MESSAGE_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `send_message_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `send_message`
--

LOCK TABLES `send_message` WRITE;
/*!40000 ALTER TABLE `send_message` DISABLE KEYS */;
/*!40000 ALTER TABLE `send_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher` (
  `TEACHER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` bigint(20) NOT NULL,
  `SCHOOL_ID` int(11) DEFAULT NULL,
  `ROOM_ID` int(11) DEFAULT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TEACHER_ID`),
  UNIQUE KEY `USER_ID` (`USER_ID`),
  KEY `id_key` (`TEACHER_ID`),
  KEY `school_idx` (`SCHOOL_ID`),
  KEY `room_idx` (`ROOM_ID`),
  CONSTRAINT `teacher_ibfk_1` FOREIGN KEY (`ROOM_ID`) REFERENCES `room` (`ROOM_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teacher_ibfk_2` FOREIGN KEY (`SCHOOL_ID`) REFERENCES `school` (`SCHOOL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teacher_ibfk_3` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES (1,8160425284333155477,1,1,'2016-03-13 02:32:17','2016-03-13 02:32:17');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_permission`
--

DROP TABLE IF EXISTS `teacher_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_permission` (
  `TEACHER_PERMISSION_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEACHER_PERMISSION_NAME` varchar(50) NOT NULL COMMENT '園長先生\nチーフ先生\n先生',
  `TEACHER_PERMISSION_REMARK` varchar(255) NOT NULL,
  PRIMARY KEY (`TEACHER_PERMISSION_ID`),
  KEY `teacher_permission_idx` (`TEACHER_PERMISSION_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_permission`
--

LOCK TABLES `teacher_permission` WRITE;
/*!40000 ALTER TABLE `teacher_permission` DISABLE KEYS */;
INSERT INTO `teacher_permission` VALUES (1,'UPDATE_SCHOOL','学校の情報を変更'),(2,'CREATE_ROOM',' '),(3,'ADD_TEACHER',' ');
/*!40000 ALTER TABLE `teacher_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_permission_link`
--

DROP TABLE IF EXISTS `teacher_permission_link`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_permission_link` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEACHER_ID` int(11) NOT NULL,
  `TEACHER_PERMISSION_ID` int(11) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `TEACHER_ID` (`TEACHER_ID`,`TEACHER_PERMISSION_ID`),
  KEY `teacher_id_idx` (`TEACHER_ID`),
  KEY `teacher_permission_idx` (`TEACHER_PERMISSION_ID`),
  CONSTRAINT `teacher_permission_link_ibfk_1` FOREIGN KEY (`TEACHER_ID`) REFERENCES `teacher` (`TEACHER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teacher_permission_link_ibfk_2` FOREIGN KEY (`TEACHER_PERMISSION_ID`) REFERENCES `teacher_permission` (`TEACHER_PERMISSION_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_permission_link`
--

LOCK TABLES `teacher_permission_link` WRITE;
/*!40000 ALTER TABLE `teacher_permission_link` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_permission_link` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_request`
--

DROP TABLE IF EXISTS `teacher_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teacher_request` (
  `TEACHER_REQUEST_ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `SCHOOL_ID` int(11) NOT NULL,
  `TEACHER_ID` int(11) NOT NULL,
  `REQUEST_TYPE` varchar(20) NOT NULL,
  `REQUEST_STATUS` varchar(20) NOT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TEACHER_REQUEST_ID`),
  UNIQUE KEY `SCHOOL_ID` (`SCHOOL_ID`,`TEACHER_ID`,`REQUEST_TYPE`),
  KEY `TEACHER_ID` (`TEACHER_ID`),
  KEY `school_teacher_type_idx` (`SCHOOL_ID`,`REQUEST_TYPE`),
  CONSTRAINT `teacher_request_ibfk_1` FOREIGN KEY (`SCHOOL_ID`) REFERENCES `school` (`SCHOOL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `teacher_request_ibfk_2` FOREIGN KEY (`TEACHER_ID`) REFERENCES `teacher` (`TEACHER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_request`
--

LOCK TABLES `teacher_request` WRITE;
/*!40000 ALTER TABLE `teacher_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `teacher_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `teacher_request_view`
--

DROP TABLE IF EXISTS `teacher_request_view`;
/*!50001 DROP VIEW IF EXISTS `teacher_request_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `teacher_request_view` AS SELECT 
 1 AS `SCHOOL_ID`,
 1 AS `TEACHER_REQUEST_ID`,
 1 AS `REQUEST_STATUS`,
 1 AS `TEACHER_ID`,
 1 AS `USER_NAME`,
 1 AS `EMAIL`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `teacher_room_view`
--

DROP TABLE IF EXISTS `teacher_room_view`;
/*!50001 DROP VIEW IF EXISTS `teacher_room_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `teacher_room_view` AS SELECT 
 1 AS `TEACHER_ID`,
 1 AS `ROOM_NAME`,
 1 AS `CHILD_ID`,
 1 AS `NICK_NAME`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `teacher_view`
--

DROP TABLE IF EXISTS `teacher_view`;
/*!50001 DROP VIEW IF EXISTS `teacher_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `teacher_view` AS SELECT 
 1 AS `USER_ID`,
 1 AS `USER_TOKEN`,
 1 AS `DEVICE_TOKEN`,
 1 AS `USER_TYPE`,
 1 AS `USER_NAME`,
 1 AS `LOGIN_NAME`,
 1 AS `EMAIL`,
 1 AS `PHONE`,
 1 AS `PASSWORD_HASH`,
 1 AS `AVATAR_PHOTO_ID`,
 1 AS `CREATE_AT`,
 1 AS `UPDATE_AT`,
 1 AS `SCHOOL_ID`,
 1 AS `ROOM_ID`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `USER_ID` bigint(20) NOT NULL,
  `USER_TOKEN` varchar(255) NOT NULL,
  `DEVICE_TOKEN` varchar(255) DEFAULT NULL,
  `USER_TYPE` varchar(20) NOT NULL COMMENT '''TEACHER''\n''GUARDIAN''\n''DIRECTOR''\n',
  `USER_NAME` varchar(100) NOT NULL,
  `LOGIN_NAME` varchar(50) NOT NULL COMMENT '半角英数[-,_,.]のみ使用可能',
  `EMAIL` varchar(255) NOT NULL,
  `PHONE` varchar(20) NOT NULL COMMENT 'データはともかく\n表示時はハイフン表示',
  `PASSWORD_HASH` varchar(100) NOT NULL,
  `AVATAR_PHOTO_ID` bigint(20) DEFAULT NULL,
  `CREATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UPDATE_AT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`USER_ID`),
  UNIQUE KEY `USER_TOKEN` (`USER_TOKEN`),
  UNIQUE KEY `LOGIN_NAME` (`LOGIN_NAME`),
  UNIQUE KEY `USER_TOKEN_IDX` (`USER_TOKEN`),
  UNIQUE KEY `LOGIN_NAME_IDX` (`LOGIN_NAME`),
  UNIQUE KEY `MAIL_IDX` (`EMAIL`),
  UNIQUE KEY `DEVICE_TOKEN` (`DEVICE_TOKEN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (8160425284333155477,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MTYwNDI1Mjg0MzMzMTU1NDc3In0.e5_Qk6Ug86ejlKLevxWqJHWzr2lz_uiO71GUw2eQYY80xVUzHfCsoVmSeOJxQMcFPvhdLqFgQUwIhPgJ1KZL1A',NULL,'TEACHER','月宮 詩織','tt','teacher@example.com','090-1111-2222','563A038E5FC9C2D94DA16F27DBC137F6A777613A',NULL,'2016-03-13 02:32:17','2016-03-13 02:32:17'),(8163975572841908370,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MTYzOTc1NTcyODQxOTA4MzcwIn0.za3Crefw6xJZPj4YHw1gYLJQkbikvwl1M5T87I8pLy2fppPc8vPOFNrRQYFVp3-MoUWmNUuhQmkI83Fc_aiiDg',NULL,'GUARDIAN','御坂 瑠花','gg','testuser@example.com','090-1234-5678','96466D4A2C8290B9B35ABC309463A5F0D77C2564',NULL,'2016-03-13 02:32:17','2016-03-13 02:32:17');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `album_detail_view`
--

/*!50001 DROP VIEW IF EXISTS `album_detail_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `album_detail_view` AS select `user`.`USER_ID` AS `USER_ID`,`album`.`ALBUM_ID` AS `ALBUM_ID`,`photo`.`FILE_NAME` AS `FILE_NAME`,`photo`.`FILE_PATH` AS `FILE_PATH`,`photo`.`CAPTION` AS `CAPTION`,`photo`.`CREATE_AT` AS `CREATE_AT` from (((`user` join `album` on((`user`.`USER_ID` = `album`.`USER_ID`))) join `album_photo_link` on((`album`.`ALBUM_ID` = `album_photo_link`.`ALBUM_ID`))) join `photo` on((`album_photo_link`.`PHOTO_ID` = `photo`.`PHOTO_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `album_view`
--

/*!50001 DROP VIEW IF EXISTS `album_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `album_view` AS select `user`.`USER_ID` AS `USER_ID`,`album`.`ALBUM_ID` AS `ALBUM_ID`,`album`.`TITLE` AS `TITLE`,`album`.`CREATE_AT` AS `CREATE_AT`,`photo`.`FILE_PATH` AS `FILE_PATH` from (((`user` join `album` on((`user`.`USER_ID` = `album`.`USER_ID`))) join `album_photo_link` on((`album`.`ALBUM_ID` = `album_photo_link`.`ALBUM_ID`))) join `photo` on((`album_photo_link`.`PHOTO_ID` = `photo`.`PHOTO_ID`))) group by `album`.`ALBUM_ID` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `diary_list_view`
--

/*!50001 DROP VIEW IF EXISTS `diary_list_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `diary_list_view` AS select `items`.`DIARY_ID` AS `DIARY_ID`,`items`.`CHILD_ID` AS `CHILD_ID`,`items`.`DIARY_DATE` AS `DIARY_DATE`,max(`diary_text`.`TEXT_CONTENTS`) AS `TEXT_CONTENTS`,max(`photo`.`FILE_PATH`) AS `PHOTO`,max((case when (`user`.`USER_TYPE` = 'GUARDIAN') then 1 else 0 end)) AS `GUARDIAN`,max((case when (`user`.`USER_TYPE` = 'TEACHER') then 1 else 0 end)) AS `TEACHER` from (((((`items` join `diary_basic` on((`diary_basic`.`DIARY_ID` = `items`.`DIARY_ID`))) join `user` on((`diary_basic`.`USER_ID` = `user`.`USER_ID`))) left join `diary_text` on((`items`.`DIARY_ID` = `diary_text`.`DIARY_ID`))) left join `diary_text_photo_link` on((`diary_text_photo_link`.`DIARY_TEXT_ID` = `diary_text`.`DIARY_TEXT_ID`))) left join `photo` on((`diary_text_photo_link`.`PHOTO_ID` = `photo`.`PHOTO_ID`))) group by `items`.`CHILD_ID`,`items`.`DIARY_DATE` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `diary_photo_date_group_view`
--

/*!50001 DROP VIEW IF EXISTS `diary_photo_date_group_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `diary_photo_date_group_view` AS select cast(`items`.`DIARY_DATE` as date) AS `DATE`,`items`.`CHILD_ID` AS `CHILD_ID`,`photo`.`FILE_NAME` AS `FILE_NAME`,`photo`.`FILE_PATH` AS `FILE_PATH`,`photo`.`CAPTION` AS `CAPTION`,`photo`.`CREATE_AT` AS `CREATE_AT` from (((`items` join `diary_text` on((`items`.`DIARY_ID` = `diary_text`.`DIARY_ID`))) join `diary_text_photo_link` on((`diary_text`.`DIARY_TEXT_ID` = `diary_text_photo_link`.`DIARY_TEXT_ID`))) join `photo` on((`diary_text_photo_link`.`PHOTO_ID` = `photo`.`PHOTO_ID`))) group by `DATE` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `diary_photo_date_view`
--

/*!50001 DROP VIEW IF EXISTS `diary_photo_date_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `diary_photo_date_view` AS select cast(`items`.`DIARY_DATE` as date) AS `DATE`,`items`.`CHILD_ID` AS `CHILD_ID`,`photo`.`FILE_NAME` AS `FILE_NAME`,`photo`.`FILE_PATH` AS `FILE_PATH`,`photo`.`CAPTION` AS `CAPTION`,`photo`.`CREATE_AT` AS `CREATE_AT` from (((`items` join `diary_text` on((`items`.`DIARY_ID` = `diary_text`.`DIARY_ID`))) join `diary_text_photo_link` on((`diary_text`.`DIARY_TEXT_ID` = `diary_text_photo_link`.`DIARY_TEXT_ID`))) join `photo` on((`diary_text_photo_link`.`PHOTO_ID` = `photo`.`PHOTO_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `guardian_view`
--

/*!50001 DROP VIEW IF EXISTS `guardian_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `guardian_view` AS select `user`.`USER_ID` AS `USER_ID`,`user`.`USER_TOKEN` AS `USER_TOKEN`,`user`.`DEVICE_TOKEN` AS `DEVICE_TOKEN`,`user`.`USER_TYPE` AS `USER_TYPE`,`user`.`USER_NAME` AS `USER_NAME`,`user`.`LOGIN_NAME` AS `LOGIN_NAME`,`user`.`EMAIL` AS `EMAIL`,`user`.`PHONE` AS `PHONE`,`user`.`PASSWORD_HASH` AS `PASSWORD_HASH`,`user`.`AVATAR_PHOTO_ID` AS `AVATAR_PHOTO_ID`,`user`.`CREATE_AT` AS `CREATE_AT`,`user`.`UPDATE_AT` AS `UPDATE_AT` from (`user` join `guardian` on((`user`.`USER_ID` = `guardian`.`USER_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `teacher_request_view`
--

/*!50001 DROP VIEW IF EXISTS `teacher_request_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `teacher_request_view` AS select `school`.`SCHOOL_ID` AS `SCHOOL_ID`,`teacher_request`.`TEACHER_REQUEST_ID` AS `TEACHER_REQUEST_ID`,`teacher_request`.`REQUEST_STATUS` AS `REQUEST_STATUS`,`teacher`.`TEACHER_ID` AS `TEACHER_ID`,`user`.`USER_NAME` AS `USER_NAME`,`user`.`EMAIL` AS `EMAIL` from (((`school` join `teacher_request` on((`school`.`SCHOOL_ID` = `teacher_request`.`SCHOOL_ID`))) join `teacher` on((`teacher_request`.`TEACHER_ID` = `teacher`.`TEACHER_ID`))) join `user` on((`teacher`.`USER_ID` = `user`.`USER_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `teacher_room_view`
--

/*!50001 DROP VIEW IF EXISTS `teacher_room_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `teacher_room_view` AS select `teacher`.`TEACHER_ID` AS `TEACHER_ID`,`room`.`ROOM_NAME` AS `ROOM_NAME`,`child`.`CHILD_ID` AS `CHILD_ID`,`child`.`NICK_NAME` AS `NICK_NAME` from ((`teacher` join `room` on((`teacher`.`ROOM_ID` = `room`.`ROOM_ID`))) join `child` on((`room`.`ROOM_ID` = `child`.`ROOM_ID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `teacher_view`
--

/*!50001 DROP VIEW IF EXISTS `teacher_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `teacher_view` AS select `user`.`USER_ID` AS `USER_ID`,`user`.`USER_TOKEN` AS `USER_TOKEN`,`user`.`DEVICE_TOKEN` AS `DEVICE_TOKEN`,`user`.`USER_TYPE` AS `USER_TYPE`,`user`.`USER_NAME` AS `USER_NAME`,`user`.`LOGIN_NAME` AS `LOGIN_NAME`,`user`.`EMAIL` AS `EMAIL`,`user`.`PHONE` AS `PHONE`,`user`.`PASSWORD_HASH` AS `PASSWORD_HASH`,`user`.`AVATAR_PHOTO_ID` AS `AVATAR_PHOTO_ID`,`user`.`CREATE_AT` AS `CREATE_AT`,`user`.`UPDATE_AT` AS `UPDATE_AT`,`teacher`.`SCHOOL_ID` AS `SCHOOL_ID`,`teacher`.`ROOM_ID` AS `ROOM_ID` from (`user` join `teacher` on((`user`.`USER_ID` = `teacher`.`USER_ID`))) */;
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
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-16  0:14:30
