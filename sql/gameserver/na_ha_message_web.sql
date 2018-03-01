/*
Navicat MySQL Data Transfer

Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : gameserver

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2017-12-21 09:50:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for na_ha_message_web
-- ----------------------------
DROP TABLE IF EXISTS `na_ha_message_web`;
CREATE TABLE `na_ha_message_web` (
  `szSign` varchar(255) NOT NULL,
  `n32IsSuccess` int(11) NOT NULL,
  `n32ProtocolID` int(11) NOT NULL,
  `n32GameID` int(11) NOT NULL,
  `n32GameType` int(11) NOT NULL,
  `tTimeStamp` bigint(20) NOT NULL,
  `szRecords` varchar(2048) DEFAULT '',
  `szRecords_c` varchar(2048) DEFAULT '',
  `n32Exit` int(11) NOT NULL,
  `n32UserID` int(11) NOT NULL,
  `n32RoundID` int(11) NOT NULL,
  `n32Zlib` int(11) NOT NULL,
  `szJson` varchar(2048) NOT NULL,
  PRIMARY KEY (`szSign`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of na_ha_message_web
-- ----------------------------