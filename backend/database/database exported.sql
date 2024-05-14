-- MySQL dump 10.13  Distrib 8.0.33, for macos13.3 (arm64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `AddressID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `AddressLine1` varchar(255) NOT NULL,
  `City` varchar(255) NOT NULL,
  `State` varchar(255) NOT NULL,
  `PostalCode` varchar(255) NOT NULL,
  `Country` varchar(255) NOT NULL,
  PRIMARY KEY (`AddressID`),
  KEY `address_ibfk_1` (`UserID`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (5,45,'321 New St','Newtown','NewState','54321','NewCountry'),(6,45,'world','world','world','world','world'),(9,45,'london','world','world','world','world'),(14,46,'khbjikb','jkbkj','hbjhvb','kjbkjh','khvkjhv'),(25,46,'123 Main St','Townsville','State','12345','Country'),(26,46,'123 Main St','Townsville','State','12345','Country'),(27,46,'123 Main St','Townsville','State','12345','Country'),(28,46,'123 Main St','Townsville','State','12345','Country'),(29,46,'123 Main St','Townsville','State','12345','Country'),(30,46,'123 Main St','Townsville','State','12345','Country'),(31,46,'123 Main St','Townsville','State','12345','Country'),(32,46,'123 Main St','Townsville','State','12345','Country'),(33,46,'123 Main St','Townsville','State','12345','Country'),(34,46,'123 Main St','Townsville','State','12345','Country'),(35,46,'123 Main St','Townsville','State','12345','Country'),(36,46,'123 Main St','Townsville','State','12345','Country'),(37,46,'123 Main St','Townsville','State','12345','Country'),(38,46,'123 Main St','Townsville','State','12345','Country'),(39,46,'123 Main St','Townsville','State','12345','Country'),(40,46,'123 Main St','Townsville','State','12345','Country'),(41,46,'123 Main St','Townsville','State','12345','Country'),(42,46,'123 Main St','Townsville','State','12345','Country'),(43,46,'123 Main St','Townsville','State','12345','Country'),(44,46,'123 Main St','Townsville','State','12345','Country'),(45,46,'123 Main St','Townsville','State','12345','Country'),(46,46,'123 Main St','Townsville','State','12345','Country'),(47,46,'123 Main St','Townsville','State','12345','Country'),(48,46,'123 Main St','Townsville','State','12345','Country'),(49,46,'123 Main St','Townsville','State','12345','Country'),(50,46,'123 Main St','Townsville','State','12345','Country'),(51,46,'123 Main St','Townsville','State','12345','Country'),(52,46,'123 Main St','Townsville','State','12345','Country'),(53,46,'123 Main St','Townsville','State','12345','Country'),(54,46,'123 Main St','Townsville','State','12345','Country'),(55,46,'123 Main St','Townsville','State','12345','Country'),(56,46,'123 Main St','Townsville','State','12345','Country'),(57,46,'123 Main St','Townsville','State','12345','Country'),(58,46,'123 Main St','Townsville','State','12345','Country'),(59,46,'123 Main St','Townsville','State','12345','Country'),(60,46,'123 Main St','Townsville','State','12345','Country'),(61,46,'123 Main St','Townsville','State','12345','Country'),(62,46,'123 Main St','Townsville','State','12345','Country'),(63,46,'123 Main St','Townsville','State','12345','Country'),(64,46,'123 Main St','Townsville','State','12345','Country'),(65,46,'123 Main St','Townsville','State','12345','Country'),(66,46,'123 Main St','Townsville','State','12345','Country'),(67,46,'123 Main St','Townsville','State','12345','Country'),(68,46,'123 Main St','Townsville','State','12345','Country'),(69,46,'123 Main St','Townsville','State','12345','Country'),(70,46,'123 Main St','Townsville','State','12345','Country'),(71,46,'123 Main St','Townsville','State','12345','Country'),(72,46,'123 Main St','Townsville','State','12345','Country'),(73,46,'123 Main St','Townsville','State','12345','Country'),(74,46,'123 Main St','Townsville','State','12345','Country'),(75,46,'123 Main St','Townsville','State','12345','Country'),(76,46,'123 Main St','Townsville','State','12345','Country'),(77,46,'123 Main St','Townsville','State','12345','Country'),(78,46,'123 Main St','Townsville','State','12345','Country'),(79,46,'123 Main St','Townsville','State','12345','Country'),(80,46,'123 Main St','Townsville','State','12345','Country'),(81,46,'123 Main St','Townsville','State','12345','Country'),(82,46,'123 Main St','Townsville','State','12345','Country'),(83,46,'123 Main St','Townsville','State','12345','Country'),(84,46,'123 Main St','Townsville','State','12345','Country'),(85,46,'123 Main St','Townsville','State','12345','Country'),(86,46,'123 Main St','Townsville','State','12345','Country'),(87,46,'123 Main St','Townsville','State','12345','Country'),(88,46,'123 Main St','Townsville','State','12345','Country'),(89,46,'123 Main St','Townsville','State','12345','Country'),(90,46,'123 Main St','Townsville','State','12345','Country'),(91,46,'123 Main St','Townsville','State','12345','Country'),(92,46,'123 Main St','Townsville','State','12345','Country'),(93,46,'123 Main St','Townsville','State','12345','Country');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `CartID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `CreationDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`CartID`),
  UNIQUE KEY `UC_User` (`UserID`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (113,55,'2024-03-15 16:40:31');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cart_Item`
--

DROP TABLE IF EXISTS `Cart_Item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cart_Item` (
  `CartItemID` int NOT NULL AUTO_INCREMENT,
  `CartID` int NOT NULL,
  `ProductID` int NOT NULL,
  `Quantity` int NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`CartItemID`),
  KEY `cart_item_ibfk_1` (`CartID`),
  KEY `cart_item_ibfk_2` (`ProductID`),
  CONSTRAINT `cart_item_ibfk_1` FOREIGN KEY (`CartID`) REFERENCES `cart` (`CartID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cart_item_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `Product` (`ProductID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=207 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cart_Item`
--

LOCK TABLES `Cart_Item` WRITE;
/*!40000 ALTER TABLE `Cart_Item` DISABLE KEYS */;
INSERT INTO `Cart_Item` VALUES (101,113,7,3,54.88),(103,113,10,2,99.45);
/*!40000 ALTER TABLE `Cart_Item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Order`
--

DROP TABLE IF EXISTS `Order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Order` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `CartID` int DEFAULT NULL,
  `UserID` int NOT NULL,
  `OrderDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `OrderStatus` varchar(255) NOT NULL,
  `TotalAmount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`OrderID`),
  UNIQUE KEY `CartID` (`CartID`),
  KEY `order_ibfk_2` (`UserID`),
  CONSTRAINT `fk_order_cart` FOREIGN KEY (`CartID`) REFERENCES `cart` (`CartID`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `order_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Order`
--

LOCK TABLES `Order` WRITE;
/*!40000 ALTER TABLE `Order` DISABLE KEYS */;
INSERT INTO `Order` VALUES (76,NULL,46,'2024-03-16 23:12:30','Processing',3.98),(77,NULL,46,'2024-03-16 23:18:28','Processing',3.98),(78,NULL,46,'2024-03-16 23:18:48','Processing',109.76),(82,NULL,46,'2024-03-16 23:23:23','Processing',109.76),(83,NULL,46,'2024-03-16 23:23:46','Processing',284.35),(84,NULL,46,'2024-03-17 23:44:55','Processing',1.99),(85,NULL,46,'2024-03-19 17:45:47','Processing',9.76),(98,NULL,46,'2024-03-19 18:27:01','Processing',14.64),(99,NULL,46,'2024-03-19 18:27:10','Processing',14.64),(100,NULL,46,'2024-03-19 18:27:22','Processing',14.64),(109,NULL,46,'2024-03-19 20:27:14','Processing',9.76),(110,NULL,46,'2024-03-19 20:27:46','Processing',14.64),(111,NULL,46,'2024-03-20 02:15:10','Processing',27.30),(112,NULL,46,'2024-03-21 16:29:07','Processing',14.64),(113,NULL,46,'2024-03-22 00:57:21','Processing',109.99),(115,NULL,46,'2024-03-22 00:59:29','Processing',109.99),(116,NULL,46,'2024-03-22 01:01:22','Processing',109.99);
/*!40000 ALTER TABLE `Order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Payment`
--

DROP TABLE IF EXISTS `Payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Payment` (
  `PaymentID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int NOT NULL,
  `PaymentDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `PaymentMethod` varchar(255) NOT NULL,
  `PaymentStatus` varchar(255) NOT NULL,
  `PaymentAmount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`PaymentID`),
  UNIQUE KEY `OrderID` (`OrderID`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Payment`
--

LOCK TABLES `Payment` WRITE;
/*!40000 ALTER TABLE `Payment` DISABLE KEYS */;
INSERT INTO `Payment` VALUES (14,109,'2024-03-19 20:27:14','Card','Processing',9.76),(15,110,'2024-03-19 20:27:46','Card','Paid',14.64),(16,111,'2024-03-20 02:15:10','Card','Paid',27.30),(17,112,'2024-03-21 16:29:07','Card','Paid',14.64);
/*!40000 ALTER TABLE `Payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Description` text,
  `Price` decimal(10,2) NOT NULL,
  `StockQuantity` int NOT NULL,
  PRIMARY KEY (`ProductID`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (7,'Product 47','banana',4.88,100),(10,'Updated Product Name','Updated Description',109.99,150),(11,'Product 56','Description 8',73.69,429),(12,'Product 93','Description 40',18.90,743),(13,'Product 14','Description 51',12.49,81),(17,'Product 69','Description 36',74.24,610),(18,'Product 82','Description 29',1.72,188),(19,'Product 89','Description 88',77.03,186),(20,'Product 61','Description 53',83.13,543),(21,'Product 22','Description 47',72.29,182),(23,'Product 90','Description 88',72.85,974),(24,'dollar','green dollar',5.99,200),(25,'Product Name 1','Description 1',19.99,100),(26,'Product Name 2','Description 2',29.99,150),(27,'Product Name 1','Description 1',19.99,100),(28,'Product Name 2','Description 2',29.99,150),(29,'Product Name 1','Description 1',19.99,100),(30,'Product Name 2','Description 2',29.99,150),(31,'Product Name 1','Description 1',19.99,100),(32,'Product Name 2','Description 2',29.99,150),(33,'Product Name 1','Description 1',19.99,100),(35,'Product Name 1','Description 1',19.99,100),(36,'Product Name 2','Description 2',29.99,150),(37,'Product Name 1','Description 1',19.99,100),(38,'Product Name 2','Description 2',29.99,150),(39,'Product Name 1','Description 1',19.99,100),(40,'Product Name 2','Description 2',29.99,150),(41,'Product Name 1','Description 1',19.99,100),(42,'Product Name 2','Description 2',29.99,150),(43,'Product Name 1','Description 1',19.99,100),(44,'Product Name 2','Description 2',29.99,150),(45,'Product Name 1','Description 1',19.99,100),(46,'Product Name 2','Description 2',29.99,150),(47,'Product Name 1','Description 1',19.99,100),(48,'Product Name 2','Description 2',29.99,150),(49,'pen','best pen ',0.99,100),(50,'rubber','rubber',8.99,120),(51,'New Product','Product Description',99.99,100),(52,'New Product','Product Description',99.99,100),(53,'New Product','Product Description',99.99,100),(54,'New Product','Product Description',99.99,100),(55,'New Product','Product Description',99.99,100),(56,'New Product','Product Description',99.99,100),(57,'New Product','Product Description',99.99,100),(58,'New Product','Product Description',99.99,100),(59,'New Product','Product Description',99.99,100),(60,'New Product','Product Description',99.99,100),(61,'New Product','Product Description',99.99,100),(62,'New Product','Product Description',99.99,100),(63,'New Product','Product Description',99.99,100),(64,'New Product','Product Description',99.99,100),(65,'New Product','Product Description',99.99,100),(66,'New Product','Product Description',99.99,100),(67,'New Product','Product Description',99.99,100),(68,'New Product','Product Description',99.99,100),(69,'New Product','Product Description',99.99,100),(70,'New Product','Product Description',99.99,100),(71,'New Product','Product Description',99.99,100),(72,'New Product','Product Description',99.99,100),(73,'New Product','Product Description',99.99,100),(74,'New Product','Product Description',99.99,100),(75,'New Product','Product Description',99.99,100),(76,'New Product','Product Description',99.99,100),(77,'New Product','Product Description',99.99,100),(78,'New Product','Product Description',99.99,100),(79,'New Product','Product Description',99.99,100),(80,'New Product','Product Description',99.99,100),(81,'New Product','Product Description',99.99,100),(82,'New Product','Product Description',99.99,100),(83,'New Product','Product Description',99.99,100),(84,'New Product','Product Description',99.99,100),(85,'New Product','Product Description',99.99,100),(86,'New Product','Product Description',99.99,100),(87,'New Product','Product Description',99.99,100),(88,'New Product','Product Description',99.99,100),(89,'New Product','Product Description',99.99,100),(90,'New Product','Product Description',99.99,100),(91,'New Product','Product Description',99.99,100),(92,'New Product','Product Description',99.99,100),(93,'New Product','Product Description',99.99,100),(94,'New Product','Product Description',99.99,100),(95,'New Product','Product Description',99.99,100),(96,'New Product','Product Description',99.99,100),(97,'New Product','Product Description',99.99,100),(98,'New Product','Product Description',99.99,100),(99,'New Product','Product Description',99.99,100),(100,'New Product','Product Description',99.99,100),(101,'New Product','Product Description',99.99,100),(102,'New Product','Product Description',99.99,100),(103,'New Product','Product Description',99.99,100),(104,'New Product','Product Description',99.99,100),(105,'New Product','Product Description',99.99,100),(106,'New Product','Product Description',99.99,100),(107,'New Product','Product Description',99.99,100),(108,'New Product','Product Description',99.99,100),(109,'New Product','Product Description',99.99,100),(110,'New Product','Product Description',99.99,100),(111,'New Product','Product Description',99.99,100),(112,'New Product','Product Description',99.99,100),(113,'New Product','Product Description',99.99,100);
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `name` varchar(16) NOT NULL,
  `description` text,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `name_2` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES ('admin','Admin role '),('user','User role');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ShippingInformation`
--

DROP TABLE IF EXISTS `ShippingInformation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ShippingInformation` (
  `ShippingID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int NOT NULL,
  `ShippingStatus` varchar(255) NOT NULL,
  `TrackingNumber` varchar(255) DEFAULT NULL,
  `AddressID` int NOT NULL,
  PRIMARY KEY (`ShippingID`),
  UNIQUE KEY `OrderID` (`OrderID`),
  KEY `shippinginformation_ibfk_2` (`AddressID`),
  CONSTRAINT `shippinginformation_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `Order` (`OrderID`) ON UPDATE CASCADE,
  CONSTRAINT `shippinginformation_ibfk_2` FOREIGN KEY (`AddressID`) REFERENCES `address` (`AddressID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ShippingInformation`
--

LOCK TABLES `ShippingInformation` WRITE;
/*!40000 ALTER TABLE `ShippingInformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `ShippingInformation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` varchar(16) NOT NULL DEFAULT 'user',
  `firstName` varchar(32) DEFAULT NULL,
  `lastName` varchar(32) DEFAULT NULL,
  `about` text,
  `dateRegistered` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `avatarURL` varchar(64) DEFAULT NULL,
  `modified` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `user_ibfk_1` (`role`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (15,'testUser12315','testUser12315@example.com','$2b$10$jFu5bLY5BlObIy2BuXX6FO/6JdkJyduzzuDTRbvOR.GzZSSbegcBC','user','Test','User','A short bio or description about Test User.','2024-02-18 23:44:41','http://example.com/avatar/testUser.png','2024-02-18 23:44:41'),(17,'testUser123165','testUser123156@example.com','$2b$10$4PurJ9s8FI1ZKDZJIOdd2.1ub2KCalFWfwLDOhhVMKFM/gA8PLRkC','user','Test','User','A short bio or description about Test User.','2024-02-18 23:46:29','http://example.com/avatar/testUser.png','2024-02-18 23:46:29'),(18,'testU5ser12315','testUse5r123156@example.com','$2b$10$1Rmg4QVzXW7IfrNIhxV33OaAIKhQAsWTahpCZmmPkoHGanw2UfWPS','user','Test','User','A short bio or description about Test User.','2024-02-18 23:48:36','http://example.com/avatar/testUser.png','2024-02-18 23:48:36'),(19,'tedstU5ser12315','testdUse5r123156@example.com','$2b$10$Uzf9R0rYlctMwxqdqxS9Meku5DR3THX.HPP0d9Fp3sCmZ97uo7wW.','user','Test','User','A short bio or description about Test User.','2024-02-18 23:51:14','http://example.com/avatar/testUser.png','2024-02-18 23:51:14'),(20,'tedsstU5ser12315','testdUsse5r123156@example.com','$2b$10$h3ObWICa/aYrYfTXrx9fVeMqzSPfAGiThuVFlLYw5m6VfXKE5dL8G','user','Test','User','A short bio or description about Test User.','2024-02-18 23:52:17','http://example.com/avatar/testUser.png','2024-02-18 23:52:17'),(21,'tedks315','tesktdUsse5r123156@example.com','$2b$10$kt4gtcUt5dHmV.2b5k.RGeTm5hTusGzfLMc.bGAPpJGJRClZhv8u2','user','Test','User','A short bio or description about Test User.','2024-02-18 23:54:03','http://example.com/avatar/testUser.png','2024-02-18 23:54:03'),(29,'admin','admin@example.com','SecurePassword123','admin','Test','User','A short bio or description about Test User.','2024-02-20 01:51:57','http://example.com/avatar/testUser.png','2024-02-20 01:51:57'),(30,'andlr6e','andrel6@example.com','$2b$10$HNB9fr00u7xWaAUGRvnJlO6BJJ6Rt3hMHSx9pVz47igYewk9qHEg6','user','Test','User','A short bio or description about Test User.','2024-02-20 02:01:52','http://example.com/avatar/testUser.png','2024-02-20 02:01:52'),(34,'adminadmin','adminadmin@example.com','$2b$10$3/OULxg0VLTitchpQ/NMcOdlMNH3CtxJoSu2eBRW/g5gC1umIoq2e','admin','Test','User','A short bio or description about Test User.','2024-02-20 02:03:39','http://example.com/avatar/testUser.png','2024-02-20 02:03:39'),(35,'adkminadmin','adminakdmin@example.com','$2b$10$p/mNEuaRbRSmMSYZzFJ5GulwkabopKNBA.eNUd0G/8aYlS8F8kNQi','user','Test','User','A short bio or description about Test User.','2024-02-20 02:31:30','http://example.com/avatar/testUser.png','2024-02-20 02:31:30'),(44,'topgui','topgui@gmail.com','$2b$10$1E6BpZUBvFeLDVZmaxjaX.pjd6lv1uMEU1QNfdHSwJLvcVA37tbZq','user','top','gui',NULL,'2024-02-24 00:57:15',NULL,'2024-02-24 00:57:15'),(45,'topguic','topguichc@gmail.com','$2b$10$5f4YSnxMZMR3jE22Z9.rt.VDpvOclOcA2xz96TXx9FqXy0VgX9jQ2','user',NULL,NULL,NULL,'2024-02-24 01:41:11',NULL,'2024-02-24 03:10:55'),(46,'guigui','guigui@gmail.com','$2b$10$32kbGb4/QVASNk8I23gkKeMe5DwyIvJXUqOyQswohVyNLyF9XjbHa','user','UpdatedName',NULL,NULL,'2024-02-25 21:09:35',NULL,'2024-03-21 17:11:32'),(47,'joaojoao','j@gmail.com','$2b$10$V8bnx2CD1W2sCNYM1u1nE.QmaPDAzJMnAI6KmRsI./cur8IQD2bUK','user','joao ','ao',NULL,'2024-03-07 14:59:15',NULL,'2024-03-07 14:59:15'),(51,'sousagoncj','sousagoncj@gmail.com','$2b$10$mtiVdNykZ1VMba/HsmaORuNOO1j54ZTeKJcE8.S.KgJ.KcXy4U47W','user','sousagoncj','sousagoncj',NULL,'2024-03-07 15:00:46',NULL,'2024-03-07 15:00:46'),(52,'manel','manel@gmail.com','$2b$10$.iQL9bVR6W.OQrBu.1bXxOqQ.lMl8efXoYs0Ky8H4lG76XNrAPCvq','user','manel','manel',NULL,'2024-03-07 15:07:38',NULL,'2024-03-07 15:07:38'),(54,'sousagoncj1','sousagoncj1@gmail.com','$2b$10$0K9w1ZNkqy7PYGolk1AFCOzVaZ5a/wSbDX49wcpdntX4Hlm2XqTYa','user','sousagoncj1','sousagoncj1',NULL,'2024-03-07 16:12:57',NULL,'2024-03-07 16:12:57'),(55,'guipestana','guipestana@gmail.com','$2b$10$tiGTMgeMCb/UTsCGNWSw/OA11sLjn.wpBatQdzwGCnOSFyXP5Z//2','user','guipestana','guipestana',NULL,'2024-03-07 17:28:00',NULL,'2024-03-07 17:28:00'),(56,'zozimazozima','zozima@gmail.com','$2b$10$Kc5SM6G3oa8.ocJ5JAnJ0./yYJqN.6IUnWB3ALTpm0hnTMukpExLW','user','zozimazozima','zozimazozima',NULL,'2024-03-07 17:38:26',NULL,'2024-03-07 17:38:26'),(58,'sousagoncj123123','logout-button@gmail.com','$2b$10$MNwZz.eiCrRcjY00N0dIu.icHvKxdnoJ0dRURozi.YW1JJWCgqfD.','user','logout-button','logout-button',NULL,'2024-03-07 19:02:54',NULL,'2024-03-07 19:02:54'),(62,'sousagoncjasda','logout-button1asdasd@gmail.com','$2b$10$s6mZoa/N4oGr07Ymver2teB2969tN3U2Wb3BBDB/yj25jhmnBHoHC','user','sousagoncj','sousagoncj',NULL,'2024-03-07 19:09:59',NULL,'2024-03-07 19:09:59'),(72,'sousagoncj234234','sousagoncj234234@uni.coventry.ac.uk','$2b$10$rij./yp.ohhG4VySxnvRmeIyO1zivJ//aJbASzlEpAbK4P0r3sY6G','user','asdasd','asdasd',NULL,'2024-03-07 22:00:09',NULL,'2024-03-07 22:00:09'),(73,'topguitopgui','topguitopgui@gmail.com','$2b$10$PQISR4EpcrPt9q.YmsRYNudLLPWuKehNUDumYCjP8.yOJ0QpMrWCC','user','topguitopgui','topguitopgui',NULL,'2024-03-07 22:01:02',NULL,'2024-03-07 22:01:02'),(74,'inesldantas ','inesldantas@gmail.com','$2b$10$7vQAJ3VKpuEBru1hG5gwyuiztR9hlvVs6I9n5a3qPCtYXqGZha/jq','user','Ines ','Dantas ',NULL,'2024-03-08 23:13:52',NULL,'2024-03-08 23:13:52'),(76,'inesldantas123','inesldantas123@gmail.com','$2b$10$QnrJcIYZO.MP2d2ui0AfAORisOaV.xN9Oo3ZQB4snZdW97Oc/2miO','user','inesldantas','inesldantas',NULL,'2024-03-08 23:15:16',NULL,'2024-03-08 23:15:16'),(77,'zdszsd','zdszsd@gmail.com','$2b$10$oWByTYjuevYpYj.CyNx3uOJY.XqMWEPJg/SsgST3EhZ2w4W/iOxU2','user','zdszsd','zdszsd',NULL,'2024-03-08 23:35:19',NULL,'2024-03-08 23:35:19'),(78,'andrejardim ','andrejardim@gmail.com','$2b$10$tIDOmY2sKJ6j4UP/zbo.1O17ZG0EBPbVcFayc1Rdk8DCYaS099nIm','user','andrejardim','andrejardim',NULL,'2024-03-09 18:19:01',NULL,'2024-03-09 18:19:01'),(79,'andrejardim1','andrejardim1@gmail.com','$2b$10$W7SE6xnAPhbaaHnCnqOio.cA7eKXbFj8sUa7/QRE2PiV6K1I2j4Eu','user','andrejardim1','andrejardim1',NULL,'2024-03-09 18:19:26',NULL,'2024-03-09 18:19:26');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-22 15:19:54
