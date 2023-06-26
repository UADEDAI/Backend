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
INSERT INTO `cinemas` (`user_id`, `name`, `street`, `street_num`, `state`, `country`, `city`, `neighbourhood`, `latitude`, `longitude`, `price`, `enabled`)
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
VALUES ('The Batman', 'The film sees Batman, who has been fighting crime in Gotham City for two years, uncover corruption while pursuing the Riddler (Dano), a serial killer who targets Gothams corrupt elite.', 120, '2022-03-04', 'Action', 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, Colin Farrell', 8, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg', 'showing'),
       ('Dune', 'Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.', 155, '2021-09-15', 'Adventure, Drama, Sci-Fi', 'Denis Villeneuve', 'Timothée Chalamet, Rebecca Ferguson, Zendaya, Oscar Isaac', 8, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg', 'coming_soon'),
       ('Black Widow', 'Natasha Romanoff, aka Black Widow, confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Pursued by a force that will stop at nothing to bring her down, Natasha must deal with her history as a spy and the broken relationships left in her wake.', 134, '2021-07-09', 'Action, Adventure, Sci-Fi', 'Cate Shortland', 'Scarlett Johansson, Florence Pugh, David Harbour', 7, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BZGRlNTY3NGYtM2YzZS00N2YyLTg0ZDYtNmY2ZDg2NDM3N2JlXkEyXkFqcGdeQXVyNTI4MzE4MDU@._V1_SX300.jpg', 'coming_soon'),
       ('Inception', 'A skilled thief, Cobb, who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a seemingly impossible task: "Inception."', 148, '2010-07-16', 'Action, Adventure, Sci-Fi', 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy, Ken Watanabe, Cillian Murphy, Marion Cotillard', 9, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg', 'showing'),
       ('Avengers: Endgame', 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to undo Thanos actions and restore order to the universe.', 181, '2019-04-26', 'Action, Adventure, Drama', 'Anthony Russo, Joe Russo', 'Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson, Jeremy Renner, Don Cheadle', 9, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg', 'showing'),
       ('Interstellar', 'In a future where Earth is becoming uninhabitable, a group of explorers undertakes a mission through a wormhole to find a new home for humanity. They face numerous challenges and must confront the limits of human existence.', 169, '2014-11-07', 'Adventure, Drama, Sci-Fi', 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine', 9, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg', 'showing'),
       ('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 142, '1994-09-23', 'Drama', 'Frank Darabont', 'Tim Robbins, Morgan Freeman, Bob Gunton', 9, 'R', 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg', 'showing'),
       ('The Dark Knight', 'Batman, aided by his allies and Commissioner Gordon, takes on a new menace wreaking havoc on Gotham City. The Joker, a psychopathic criminal mastermind, unleashes chaos and forces Batman to confront his own moral code.', 152, '2008-07-18', 'Action, Crime, Drama', 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine, Gary Oldman, Maggie Gyllenhaal', 9, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg', 'showing'),
       ('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster, and his wife intertwine in four tales of violence and redemption.', 154, '1994-10-14', 'Crime, Drama', 'Quentin Tarantino', 'John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis', 8, 'R', 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 'showing'),
       ('The Matrix', 'A computer hacker learns about the true nature of his reality and his role in the war against the controllers of a simulated reality.', 136, '1999-03-31', 'Action, Sci-Fi', 'Lana Wachowski, Lilly Wachowski', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving', 8, 'R', 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 'showing'),
       ('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 175, '1972-03-24', 'Crime, Drama', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan, Robert Duvall', 9, 'R', 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 'showing'),
       ('Fight Club', 'An insomniac office worker and a soap salesman form an underground fight club that evolves into something much, much more.', 139, '1999-10-15', 'Drama', 'David Fincher', 'Brad Pitt, Edward Norton, Helena Bonham Carter', 8, 'R', 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jp', 'showing');


/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

# =======================================================
# screenings
# =======================================================
LOCK TABLES `screenings` WRITE;
/*!40000 ALTER TABLE `screenings` DISABLE KEYS */;
INSERT INTO screenings (`room_id`, `movie_id`, `format`, `start_at`, `end_at`)
VALUES (1, 1, 'subs', '2023-06-17 18:00:00', '2023-06-17 20:00:00');
