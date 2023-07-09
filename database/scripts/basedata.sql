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
VALUES  ('The Batman', 'The film sees Batman, who has been fighting crime in Gotham City for two years, uncover corruption while pursuing the Riddler (Dano), a serial killer who targets Gothams corrupt elite.', 120, '2022-03-04', 'Action', 'Matt Reeves', 'Robert Pattinson, Zoë Kravitz, Paul Dano, Jeffrey Wright, John Turturro, Peter Sarsgaard, Barry Keoghan, Jayme Lawson, Andy Serkis, Colin Farrell', 8, 'PG-13', 'https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_SX300.jpg', 'showing'),
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
        ('Fight Club', 'An insomniac office worker and a soap salesman form an underground fight club that evolves into something much, much more.', 139, '1999-10-15', 'Drama', 'David Fincher', 'Brad Pitt, Edward Norton, Helena Bonham Carter', 8, 'R', 'https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jp', 'showing'),
        ('Superbad', 'Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.', 113, '2007-08-17', 'Comedy', 'Greg Mottola', 'Jonah Hill, Michael Cera, Christopher Mintz-Plasse', 7.6, 'R', 'https://m.media-amazon.com/images/M/MV5BY2VkMDg4ZTYtN2M3Yy00NWZiLWE2ODEtZjU5MjZkYWNkNGIzXkEyXkFqcGdeQXVyODY5Njk4Njc@._V1_SX300.jpg', 'showing'),
        ('Zombieland', 'A shy student trying to reach his family in Ohio, a gun-toting tough guy trying to find the last Twinkie, and a pair of sisters trying to get to an amusement park join forces to travel across a zombie-filled America.', 88, '2009-10-02', 'Comedy, Horror', 'Ruben Fleischer', 'Jesse Eisenberg, Woody Harrelson, Emma Stone', 7.6, 'R', 'https://m.media-amazon.com/images/M/MV5BMTU5MDg0NTQ1N15BMl5BanBnXkFtZTcwMjA4Mjg3Mg@@._V1_SX300.jpg', 'showing'),
        ('Shaun of the Dead', 'A man decides to turn his moribund life around by winning back his ex-girlfriend, reconciling his relationship with his mother, and dealing with an entire community that has returned from the dead to eat the living.', 99, '2004-09-24', 'Comedy, Horror', 'Edgar Wright', 'Simon Pegg, Nick Frost, Kate Ashfield', 7.9, 'R', 'https://m.media-amazon.com/images/M/MV5BMTg5Mjk2NDMtZTk0Ny00YTQ0LWIzYWEtMWI5MGQ0Mjg1OTNkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 'showing'),
        ('The Hangover', 'Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.', 100, '2009-06-05', 'Comedy', 'Todd Phillips', 'Bradley Cooper, Ed Helms, Zach Galifianakis', 7.7, 'R', 'https://m.media-amazon.com/images/M/MV5BNGQwZjg5YmYtY2VkNC00NzliLTljYTctNzI5NmU3MjE2ODQzXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', 'showing'),
        ('Scary Movie', 'A year after disposing of the body of a man they accidentally killed, a group of dumb teenagers are stalked by a bumbling serial killer.', 88, '2000-07-07', 'Comedy, Horror', 'Keenen Ivory Wayans', 'Anna Faris, Jon Abrahams, Marlon Wayans', 6.2, 'R', 'https://m.media-amazon.com/images/M/MV5BMGEzZjdjMGQtZmYzZC00N2I4LThiY2QtNWY5ZmQ3M2ExZmM4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg', 'showing'),
        ('Ghostbusters', 'Three former parapsychology professors set up shop as a unique ghost removal service.', 105, '1984-06-08', 'Comedy, Fantasy', 'Ivan Reitman', 'Bill Murray, Dan Aykroyd, Sigourney Weaver', 7.8, 'PG', 'https://m.media-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_SX300.jpg', 'showing'),
        ('The Cabin in the Woods', 'Five friends go for a break at a remote cabin, where they get more than they bargained for, discovering the truth behind the cabin in the woods.', 95, '2012-04-13', 'Horror, Mystery', 'Drew Goddard', 'Kristen Connolly, Chris Hemsworth, Anna Hutchison', 7, 'R', 'https://m.media-amazon.com/images/M/MV5BNTUxNzYyMjg2N15BMl5BanBnXkFtZTcwMTExNzExNw@@._V1_SX300.jpg', 'showing'),
        ('Get Out', 'A young African-American visits his white girlfriends parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.', 104, '2017-02-24', 'Horror, Mystery, Thriller', 'Jordan Peele', 'Daniel Kaluuya, Allison Williams, Bradley Whitford', 7.7, 'R', 'https://www.example.com/get_out.jpg', 'showing'),
        ('What About Bob?', 'A successful psychiatrist loses his mind after one of his most dependent patients, an obsessive-compulsive neurotic, tracks him down during his family vacation.', 99, '1991-05-17', 'Comedy', 'Frank Oz', 'Bill Murray, Richard Dreyfuss, Julie Hagerty', 7, 'PG', 'https://m.media-amazon.com/images/M/MV5BNmI0MjM0NDAtOGEzNS00NTVmLWJhNTQtNTA4NTc2ZjJjN2M2XkEyXkFqcGdeQXVyNTM2OTg5NzQ@._V1_SX300.jpg', 'showing'),
        ('Groundhog Day', 'A weatherman finds himself inexplicably living the same day over and over again.', 101, '1993-02-12', 'Comedy, Fantasy, Romance', 'Harold Ramis', 'Bill Murray, Andie MacDowell, Chris Elliott', 8, 'PG', 'https://m.media-amazon.com/images/M/MV5BZWIxNzM5YzQtY2FmMS00Yjc3LWI1ZjUtNGVjMjMzZTIxZTIxXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg', 'showing'),
        ('Quick Change', 'Three thieves successfully rob a New York City bank, but making the escape from the city proves to be almost impossible.', 89, '1990-07-13', 'Comedy, Crime', 'Howard Franklin, Bill Murray', 'Bill Murray, Geena Davis, Randy Quaid', 6.8, 'R', 'https://m.media-amazon.com/images/M/MV5BMmNiNzRiMDAtNjg0Yi00NGM3LWFiMjItOTQ0ZjNkYTE4MGM5XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg', 'showing');

/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;

# =======================================================
# screenings
# =======================================================
LOCK TABLES `screenings` WRITE;
/*!40000 ALTER TABLE `screenings` DISABLE KEYS */;
INSERT INTO screenings (`room_id`, `movie_id`, `format`, `start_at`, `end_at`)
VALUES (1, 1, 'subs', '2023-06-17 18:00:00', '2023-06-17 20:00:00');
