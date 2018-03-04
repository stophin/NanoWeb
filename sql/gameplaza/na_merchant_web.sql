/*
Navicat MySQL Data Transfer

Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : gameplaza

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2017-12-28 11:29:07
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for na_merchant_web
-- ----------------------------
DROP TABLE IF EXISTS `na_merchant_web`;
CREATE TABLE `na_merchant_web` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mid` varchar(50) COLLATE utf8_bin NOT NULL,
  `msn` int(11) NOT NULL DEFAULT '0' COMMENT '线路号',
  `role` int(11) NOT NULL DEFAULT '0' COMMENT '10线路商100商户',
  `username` varchar(30) COLLATE utf8_bin NOT NULL,
  `nickname` varchar(30) COLLATE utf8_bin NOT NULL,
  `headPic` varchar(255) COLLATE utf8_bin NOT NULL,
  `parentId` varchar(50) COLLATE utf8_bin NOT NULL,
  `bIfHaveChess` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否拥有棋牌游戏',
  `bIfHaveSlot` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否拥有电子游戏',
  `bIfHaveLive` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否拥有真人游戏',
  `levelIndex` varchar(1800) COLLATE utf8_bin NOT NULL COMMENT 'suoyin',
  `suffix` varchar(10) COLLATE utf8_bin NOT NULL,
  `isAccess` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of na_merchant_web
-- ----------------------------
INSERT INTO `na_merchant_web` VALUES ('156', '156', '156', '100', 'CZSY_dfdfdf', 'CZSY', '', '01', '1', '1', '1', '01', 'CZSY', '0');
INSERT INTO `na_merchant_web` VALUES ('555', '555', '555', '100', 'CZSY_dfdfdf', 'CZSY', '', '01', '1', '1', '1', '01', 'CZSY', '0');
