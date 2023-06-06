# =======================================================
# Database Cinemapp
# =======================================================

USE `Cinemapp`;

# =======================================================
# users
# =======================================================

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`name`, `email`, `password`, `company`, `role`)
VALUES ('john_doe', 'johndoe@example.com', 'password123', 'ABC Company', 'owner');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

# =======================================================
# cinemas
# =======================================================

LOCK TABLES `cinemas` WRITE;
/*!40000 ALTER TABLE `cinemas` DISABLE KEYS */;
INSERT INTO `cinemas` (`user_id`, `name`, `street`, `street_num`, `state`, `country`, `city`, `neighborhood`, `latitude`, `longitude`, `price`, `enabled`)
VALUES (1, 'Cinema 1', 'Street 1', '123', 'State 1', 'Country 1', 'City 1', 'Neighborhood 1', 1.111111, 1.111111, 10.00, true),
       (1, 'Cinema 2', 'Street 2', '456', 'State 2', 'Country 2', 'City 2', 'Neighborhood 2', 2.222222, 2.222222, 20.00, true),
       (1, 'Cinema 3', 'Street 3', '789', 'State 3', 'Country 3', 'City 3', 'Neighborhood 3', 3.333333, 3.333333, 30.00, true);
/*!40000 ALTER TABLE `cinemas` ENABLE KEYS */;
UNLOCK TABLES;

# =======================================================
# rooms
# =======================================================

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` (`cinema_id`, `name`, `seats`, `num_rows`)
VALUES (1, 'Room 1', 100, 8),
       (1, 'Room 2', 200, 8),
       (1, 'Room 3', 300, 8),
       (2, 'Room 1', 100, 11),
       (2, 'Room 2', 200, 12),
       (2, 'Room 3', 300, 12),
       (3, 'Room 1', 100, 13),
       (3, 'Room 2', 200, 6),
       (3, 'Room 3', 300, 9);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

# =======================================================
# movies
# =======================================================
LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` (`title`, `description`, `duration`, `releaseDate`, `genre`, `director`, `cast`, `score`, `certificate`, `imageUrl`)
VALUES ('The Batman', 'The film sees Batman, who has been fighting crime in Gotham City for two years, uncover corruption while pursuing the Riddler (Dano), a serial killer who targets Gothams corrupt elite.', 120, '2022-03-04', 'Action', 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, Colin Farrell', 8, 'PG-13', 'unsplash.com/example');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
