/*
Navicat MySQL Data Transfer

Source Server         : RAMS
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : na_gameplaza

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-03-04 15:25:14
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for na_gameuser
-- ----------------------------
DROP TABLE IF EXISTS `na_gameuser`;
CREATE TABLE `na_gameuser` (
  `un32UserID` int(11) unsigned NOT NULL COMMENT '用户ID',
  `eUserCate` int(11) unsigned zerofill NOT NULL DEFAULT '00000000001' COMMENT '0:无;1:普通玩家',
  `szUserName` char(30) COLLATE utf8_unicode_ci NOT NULL COMMENT '用户名',
  `password` char(32) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '登录密码',
  `szNickName` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '昵称',
  `n64Score` bigint(20) NOT NULL DEFAULT '0' COMMENT '积分',
  `n32Diamond` int(11) NOT NULL DEFAULT '0' COMMENT '钻石数量',
  `dGold` double(20,6) NOT NULL DEFAULT '0.000000' COMMENT '金币',
  `n64RoomCardNum` bigint(20) NOT NULL DEFAULT '0' COMMENT '房卡数量',
  `tRegisteUTCMilsec` bigint(20) NOT NULL DEFAULT '0' COMMENT '注册时间',
  `tLastLoginUTCMilsec` bigint(20) NOT NULL DEFAULT '0' COMMENT '最后一次登录时间',
  `bSex` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别',
  `status` tinyint(1) DEFAULT '1' COMMENT '1为正常0为禁用',
  `islogin` tinyint(1) DEFAULT '0' COMMENT '0为未在线1为在线',
  `userPicture` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '头像图片url',
  `userAge` int(11) DEFAULT NULL COMMENT '用户年龄',
  `userPhone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户电话号码',
  `userQQ` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户QQ号',
  `userWeiXin` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '用户微信号',
  `szHeaderIconURL` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `un32HeaderIcon` tinyint(1) NOT NULL DEFAULT '0' COMMENT '头像编号',
  `merchantId` int(3) NOT NULL DEFAULT '0',
  `un32Level` int(11) NOT NULL DEFAULT '1',
  `un32Charm` int(11) NOT NULL DEFAULT '0',
  `parentId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `un32CurGSID` int(11) NOT NULL DEFAULT '0',
  `un64CurRoomID` bigint(20) NOT NULL DEFAULT '0',
  UNIQUE KEY `szUserName` (`szUserName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;

-- ----------------------------
-- Records of na_gameuser
-- ----------------------------
INSERT INTO `na_gameuser` VALUES ('882197', '00000000000', 'gang005', '111111', 'gang005', '0', '173', '99729.000000', '0', '0', '1499331287', '0', '1', '0', null, null, null, null, null, '', '32', '156', '168', '11', '156', '0', '0');
INSERT INTO `na_gameuser` VALUES ('889738', '00000000000', 'szs001', '111111', '1001', '0', '174', '40767.000000', '27414', '0', '1519827429', '2', '1', '0', null, null, null, null, null, '14', '14', '156', '156', '12', '156', '0', '0');
INSERT INTO `na_gameuser` VALUES ('471683', '00000000000', 'szs002', '111111', '1002', '0', '169', '95331.000000', '42882', '0', '1518785065', '1', '1', '0', null, null, null, null, null, '48', '48', '156', '156', '7', '156', '10', '0');
INSERT INTO `na_gameuser` VALUES ('471689', '00000000000', 'szs003', '111111', '1003', '0', '170', '19768.000000', '1000', '0', '1519752829', '1', '1', '0', null, null, null, null, null, '35', '35', '156', '156', '8', '156', '10', '0');
INSERT INTO `na_gameuser` VALUES ('471690', '00000000000', 'szs004', '111111', '1004', '0', '171', '99977.000000', '92', '0', '1519750656', '1', '1', '0', '', null, '', '', '', '1', '1', '156', '156', '9', '156', '0', '0');
INSERT INTO `na_gameuser` VALUES ('528917', '00000000000', 'szs005', '111111', 'szs005', '0', '172', '98440.000000', '15528', '0', '1510355217', '1', '1', '0', null, null, null, null, null, '', '1', '156', '156', '10', '156', '0', '0');
INSERT INTO `na_gameuser` VALUES ('100001', '00000000000', 'test01', '111111', 'test0001', '0', '165', '16735.000000', '27546', '0', '1513867108', '1', '1', '0', null, null, null, null, null, '', '10', '555', '156', '3', '555', '0', '0');
INSERT INTO `na_gameuser` VALUES ('100002', '00000000000', 'test02', '111111', 'test02', '0', '166', '16735.000000', '27676', '0', '1501125686', '0', '1', '0', null, null, null, null, null, '', '12', '555', '156', '4', '555', '0', '0');
INSERT INTO `na_gameuser` VALUES ('100003', '00000000000', 'test03', '111111', 'test03', '0', '167', '16735.000000', '27730', '0', '1500606045', '0', '1', '0', null, null, null, null, null, '', '5', '555', '156', '5', '555', '0', '0');
INSERT INTO `na_gameuser` VALUES ('100004', '00000000000', 'test04', '111111', 'test04', '0', '168', '16735.000000', '27748', '0', '1500606079', '0', '1', '0', null, null, null, null, null, '', '12', '555', '156', '6', '555', '0', '0');
