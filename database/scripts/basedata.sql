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
INSERT INTO `movies` (`title`, `description`, `duration`, `release_date`, `genre`, `director`, `cast`, `score`, `certificate`, `image_url`, `status`)
VALUES ('The Batman', 'The film sees Batman, who has been fighting crime in Gotham City for two years, uncover corruption while pursuing the Riddler (Dano), a serial killer who targets Gothams corrupt elite.', 120, '2022-03-04', 'Action', 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, Colin Farrell', 8, 'PG-13', 'unsplash.com/example', 'showing'),
       ('Dune', 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.', 155, '2021-09-15', 'Adventure, Drama, Sci-Fi', 'Denis Villeneuve', 'Timothée Chalamet, Rebecca Ferguson, Zendaya, Oscar Isaac', 8, 'PG-13', 'https://www.example.com/dune.jpg', 'coming_soon'),
       ('Black Widow', 'Natasha Romanoff, aka Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake.', 134, '2021-07-09', 'Action, Adventure, Sci-Fi', 'Cate Shortland', 'Scarlett Johansson, Florence Pugh, David Harbour', 7, 'PG-13', 'https://www.example.com/black_widow.jpg', 'coming_soon');

/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
