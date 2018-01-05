/*
Navicat MySQL Data Transfer

Source Server         : Rotta
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : na_40_forestsprite

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-01-05 16:09:50
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of na_user_change_web
-- ----------------------------
INSERT INTO `na_user_change_web` VALUES ('47', '50002', '582770', '-192.000000', '0', '0', '0.000000', '0', '0', '-96.000000', '0', '0');
INSERT INTO `na_user_change_web` VALUES ('48', '50002', '623312', '2176.000000', '0', '0', '0.000000', '0', '0', '-96.000000', '0', '0');
INSERT INTO `na_user_change_web` VALUES ('49', '50002', '841678', '-87.000000', '0', '0', '0.000000', '0', '0', '-22.000000', '0', '0');
INSERT INTO `na_user_change_web` VALUES ('51', '50002', '693236', '-235.000000', '0', '0', '11524.000000', '0', '0', '21.000000', '0', '0');
