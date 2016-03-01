/*
Navicat MySQL Data Transfer

Source Server         : XAMPP
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : db_fbapp

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2016-02-26 18:18:33
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `categories`
-- ----------------------------

CREATE TABLE `categories` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` int(1) NOT NULL DEFAULT '2' COMMENT '2 is department, 3 is agency',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO categories VALUES ('0', 'Anonymous', '0');
INSERT INTO categories VALUES ('1', 'Department 01', '2');
INSERT INTO categories VALUES ('2', 'Department 02', '2');
INSERT INTO categories VALUES ('3', 'Department 03', '2');
INSERT INTO categories VALUES ('4', 'Agency 01', '3');
INSERT INTO categories VALUES ('5', 'Agency 02', '3');
INSERT INTO categories VALUES ('6', 'Agency 03', '3');

-- ----------------------------
-- Table structure for `fbcomment`
-- ----------------------------

CREATE TABLE `fbcomment` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `fid` bigint(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `comment` text,
  `create_date` varchar(255) DEFAULT NULL,
  `is_approve` int(1) DEFAULT '0',
  `usr_approve` int(11) DEFAULT '0',
  `approve_date` varchar(255) DEFAULT NULL,
  `usr_like` int(11) DEFAULT '0',
  `usr_dislike` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of fbcomment
-- ----------------------------
INSERT INTO fbcomment VALUES ('35', '79', 'Yuli', 'Comment from yuyiiadsd Comment from yuyiiadsd  Comment from yuyiiadsd  Comment from yuyiiadsd  Comment from yuyiiadsd  Comment from yuyiiadsd Comment from yuyiiadsd Comment from yuyiiadsd Comment from yuyiiadsd', '2016-02-26 10:15:46', '1', '187', '2016-02-26 10:15:46', '2', '2');
INSERT INTO fbcomment VALUES ('33', '78', 'Donald Cody', 'New comment', '2016-02-24 11:25:41', '1', '187', '2016-02-24 11:25:41', '2', '0');
INSERT INTO fbcomment VALUES ('34', '78', 'Carlos', 'Here is comment from carlos', '2016-02-26 10:14:52', '1', '187', '2016-02-26 10:14:52', '0', '0');
INSERT INTO fbcomment VALUES ('36', '82', 'Tai Suu', 'For agency global For agency global For agency global For agency global For agency global For agency global For agency global', '2016-02-26 10:23:37', '1', '187', '2016-02-26 10:23:37', '1', '1');
INSERT INTO fbcomment VALUES ('37', '79', 'Hello', 'TEsseteet', '2016-02-26 11:15:19', '1', '187', '2016-02-26 11:15:19', '1', '1');
INSERT INTO fbcomment VALUES ('38', '79', 'Aaaa', 'Test more', '2016-02-26 11:15:24', '1', '187', '2016-02-26 11:15:24', '1', '1');
INSERT INTO fbcomment VALUES ('39', '78', 'John Hard', 'Admin add new comments', '2016-02-26 11:34:49', '1', '195', '2016-02-26 11:34:49', '0', '0');

-- ----------------------------
-- Table structure for `feedbacks`
-- ----------------------------

CREATE TABLE `feedbacks` (
  `id` bigint(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `content` text,
  `attach` varchar(255) DEFAULT NULL,
  `create_date` varchar(255) DEFAULT NULL,
  `cat_id` int(10) DEFAULT '0',
  `department` varchar(255) DEFAULT NULL,
  `agency` varchar(255) DEFAULT NULL,
  `is_public` int(1) DEFAULT '0',
  `allow_comment` int(1) DEFAULT '0',
  `type` int(4) NOT NULL DEFAULT '1',
  `usr_like` int(11) DEFAULT '0',
  `usr_dislike` int(11) DEFAULT '0',
  `usr_ncomment` int(11) DEFAULT '0',
  `is_approve` int(1) DEFAULT '0',
  `usr_approve` int(11) DEFAULT '0',
  `approve_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=83 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of feedbacks
-- ----------------------------
INSERT INTO feedbacks VALUES ('77', 'Donald', 'Tesst Agency', 'Gatengyaddd', 'a:1:{i:0;s:34:\"BM.CV.02 - Ke hoach tuan 4 T9.docx\";}', '2016-02-18 11:37:16', '4', null, '4', '1', '0', '3', '2', '2', '0', '0', '187', '2016-02-24 10:08:56');
INSERT INTO feedbacks VALUES ('78', 'Donald Cidy', 'Test department', 'Test department', 'a:1:{i:0;s:19:\"kuro-kogata.avi.mp4\";}', '2016-02-18 11:38:02', '3', '2', null, '1', '0', '2', '5', '5', '1', '1', '187', '2016-02-24 11:25:43');
INSERT INTO feedbacks VALUES ('79', 'Hello Ablos', 'NEw subject', 'test categ', 'a:0:{}', '2016-02-18 11:53:30', '2', null, null, '0', '0', '2', '9', '4', '0', '1', '187', '2016-02-18 11:53:30');
INSERT INTO feedbacks VALUES ('80', null, 'Fuyck you', 'adadÃ¢dsad', 'a:0:{}', '2016-02-18 11:54:24', '0', null, null, '0', '0', '1', '1', '1', '0', '1', '187', '2016-02-18 11:53:30');
INSERT INTO feedbacks VALUES ('81', 'Rohit', 'New for department 2', 'Hello everybody', 'a:0:{}', '2016-02-19 10:21:39', '2', null, null, '1', '0', '2', '0', '0', '0', '0', '187', '2016-02-24 11:21:50');
INSERT INTO feedbacks VALUES ('82', 'Van VAn', 'For agency global', 'For agency global For agency global For agency global For agency global For agency global For agency global For agency global', 'a:2:{i:0;s:14:\"Next Task.docx\";i:1;s:9:\"Node.docx\";}', '2016-02-26 10:22:31', '5', null, null, '1', '1', '3', '3', '0', '0', '1', '187', '2016-02-26 10:22:54');

-- ----------------------------
-- Table structure for `settings`
-- ----------------------------

CREATE TABLE `settings` (
  `meta_key` varchar(255) NOT NULL DEFAULT '',
  `meta_value` longtext,
  PRIMARY KEY (`meta_key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of settings
-- ----------------------------
INSERT INTO settings VALUES ('anonymous_text', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac porta orci. Curabitur vel iaculis sapien, eu rutrum risus. Nunc sit amet turpis tincidunt, scelerisque elit nec, lacinia lorem. Nunc ultricies neque quis purus aliquam commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>\r\n            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac porta orci. Curabitur vel iaculis sapien, eu rutrum risus. Nunc sit amet turpis tincidunt, scelerisque elit nec, lacinia lorem. Nunc ultricies neque quis purus aliquam commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>');

-- ----------------------------
-- Table structure for `users`
-- ----------------------------

CREATE TABLE `users` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `password` varchar(200) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login` varchar(255) DEFAULT NULL,
  `role` int(1) DEFAULT '1' COMMENT '1->admin, 0 Manager',
  `group_id` int(11) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO users VALUES ('187', 'Donald Cody', 'donald@gmail.com', '122222', '$2a$10$9391b95c529ac1f132fe0u8fQXNQDQw3G3FRMOegGEvYEpfWw2ySu', '111212', '2016-02-13 14:39:08', '2016-02-13 14:39:08', '1', '0', null);
INSERT INTO users VALUES ('190', 'Borl Son', 'bonrson@gmail.com', '092223445434', '$2a$10$6b2fe662286fa831e7636uBdvLyoNgUqRdvChWJOJjJycb9C8f2sy', 'Do Xuan Toan', '2016-02-25 15:58:23', '2016-02-25 09:58:22', '1', '0', null);
INSERT INTO users VALUES ('191', 'Hello Abllo', 'hello@gmail.com', '2323233232323', '$2a$10$349790d927f3d5f2ecf1euxMFoSo30/lvWsk71XihO0z32sF03rgS', 'Title here', '2016-02-25 16:00:22', '2016-02-25 10:00:22', '1', '0', null);
INSERT INTO users VALUES ('192', 'Do Toan', 'toandxxx@gmail.com', '1221212', '$2a$10$104883d7096c927fe2d72ubMmFJlzXCA0STfd0vIBBbnYnEg7egyC', 'Do Toan', '2016-02-25 16:38:51', '2016-02-25 10:38:51', '0', '2', null);
INSERT INTO users VALUES ('193', 'New User', 'newusser@gmail.com', '12232', '$2a$10$a98542d45ea77851c7d51ufmi16eoG/GvUodpnGu958l9cohdms/G', 'NeÆ°eÆ°eww12', '2016-02-25 17:14:46', '2016-02-25 11:14:46', '1', '4', '2016-2.png');
INSERT INTO users VALUES ('194', 'Neww', 'tesss22222t@gmail.com', '122221211', '$2a$10$cad6433fa712b7ccc64a8u2DcUYTbKnOvPlmyl3CkXp4d6/THw1RK', 'w21222', '2016-02-25 17:15:21', '2016-02-25 11:15:21', '1', '0', '');
INSERT INTO users VALUES ('195', 'John Hard', 'johnhard@gmail.com', '123456789', '$2a$10$a553a583a9bf6a5c7de28OpkYvthpN5LqtkxFWVQICtXqqr/0joUC', 'John Hard', '2016-02-26 17:20:44', '2016-02-26 11:20:44', '0', '0', '');
INSERT INTO users VALUES ('196', 'Do Xuan Toan', 'donaldcody90@gmail.com', '123333', '$2a$10$c56828c324e9748611210uRjpFweOf5z1.eYyuc.8nDGdbGFEslVe', 'Do Xuan Toan', '2016-02-26 18:09:53', '2016-02-26 12:09:53', '0', '0', '');
