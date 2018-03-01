/*
Navicat MySQL Data Transfer

Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : gameplaza

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2017-12-21 09:50:05
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `locked` int(4) DEFAULT NULL,
  `email` varchar(25) DEFAULT NULL,
  `identification` varchar(45) DEFAULT NULL,
  `telephone` varchar(25) DEFAULT NULL,
  `qq` varchar(45) DEFAULT NULL,
  `question` varchar(45) DEFAULT NULL,
  `answer` varchar(45) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `post` varchar(25) DEFAULT NULL,
  `registed` varchar(45) DEFAULT NULL,
  `truename` varchar(45) DEFAULT NULL,
  `passwordback` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_users_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'stophin', 'stophin', null, null, null, null, null, null, null, null, null, null, null, null);
