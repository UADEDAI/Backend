# =======================================================
# Database Cinemapp
# =======================================================

# =======================================================
# DB
# =======================================================

DROP DATABASE IF EXISTS `Cinemapp`;

CREATE DATABASE `Cinemapp` CHARACTER SET utf8 COLLATE utf8_general_ci;

# =======================================================

USE `Cinemapp`;

# =======================================================
# users
# =======================================================
DROP USER IF EXISTS 'cinemapp'@'localhost';

CREATE USER 'cinemapp'@'localhost' IDENTIFIED BY 'cinemappassword';
GRANT ALL PRIVILEGES ON Cinemapp.* TO 'cinemapp'@'localhost';
