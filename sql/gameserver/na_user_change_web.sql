/*
Navicat MySQL Data Transfer

Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : gameserver

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-01-08 18:41:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for na_user_change_web
-- ----------------------------
DROP TABLE IF EXISTS `na_user_change_web`;
CREATE TABLE `na_user_change_web` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `un32GameId` int(11) NOT NULL,
  `un32UserId` int(11) NOT NULL,
  `dGold` double(20,6) NOT NULL DEFAULT '0.000000',
  `n64Score` bigint(20) NOT NULL DEFAULT '0',
  `n32Diamond` int(11) NOT NULL DEFAULT '0',
  `dGoldHist` double(20,6) NOT NULL DEFAULT '0.000000',
  `n64ScoreHist` bigint(20) NOT NULL DEFAULT '0',
  `n32DiamondHist` int(11) NOT NULL DEFAULT '0',
  `dGoldLast` double(20,6) NOT NULL DEFAULT '0.000000',
  `n64ScoreLast` bigint(20) NOT NULL DEFAULT '0',
  `n32DiamondLast` int(11) NOT NULL DEFAULT '0',
  `tTime` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;
