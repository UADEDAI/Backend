# ====================================================
# Database Cinemapp
# ====================================================

USE `Cinemapp`;

# ====================================================
# Create all necessary tables
# ====================================================

# ====================================================
# Table: users
# ====================================================

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(255),
  `role` ENUM('owner', 'client') NOT NULL DEFAULT 'client',
  `verified` BOOLEAN DEFAULT false,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `email` (`email`)
);

# ====================================================
# Table: cinemas
# ====================================================
DROP TABLE IF EXISTS `cinemas`;

CREATE TABLE cinemas (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `name` VARCHAR(255) NOT NULL,
  `street` VARCHAR(255),
  `street_num` VARCHAR(10),
  `state` VARCHAR(255),
  `country` VARCHAR(255),
  `city` VARCHAR(255),
  `neighbourhood` VARCHAR(255),
  `latitude` DECIMAL(11, 8),
  `longitude` DECIMAL(11, 8),
  `price` DECIMAL(10,2),
  `enabled` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

# ====================================================
# Table: rooms
# ====================================================
DROP TABLE IF EXISTS `rooms`;

CREATE TABLE rooms (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `cinema_id` INT,
  `name` VARCHAR(255) NOT NULL,
  `num_rows` INT,
  `seats` INT,
  `enabled` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (cinema_id) REFERENCES cinemas(id) ON DELETE CASCADE
);

# ====================================================
# Table: movies
# ====================================================
DROP TABLE IF EXISTS `movies`;

CREATE TABLE movies (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `duration` INT,
  `release_date` DATE,
  `genre` VARCHAR(255),
  `director` VARCHAR(255),
  `cast` VARCHAR(255),
  `score` INT,
  `certificate` VARCHAR(10),
  `image_url` VARCHAR(255),
  `status` ENUM('showing', 'coming_soon') NOT NULL DEFAULT 'coming_soon',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

# ====================================================
# Table: movie_rooms
# ====================================================
DROP TABLE IF EXISTS `movie_rooms`;

CREATE TABLE movie_rooms (
  `movie_id` INT,
  `room_id` INT,
  PRIMARY KEY (`movie_id`, `room_id`),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

# ====================================================
# Table: comments
# ====================================================
DROP TABLE IF EXISTS `comments`;

CREATE TABLE comments (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `movie_id` INT,
  `title` VARCHAR(255) NOT NULL,
  `body` TEXT NOT NULL,
  `rating` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE INDEX user_movie_unique (user_id, movie_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

# ====================================================
# Table: screenings
# ====================================================
DROP TABLE IF EXISTS `screenings`;

CREATE TABLE screenings (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `room_id` INT,
  `movie_id` INT,
  `format` VARCHAR(255) NOT NULL,
  `start_at` DATETIME NOT NULL,
  `end_at` DATETIME NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

# ====================================================
# Table: reservations
# ====================================================
DROP TABLE IF EXISTS `reservations`;

CREATE TABLE reservations (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT,
  `screening_id` INT,
  `year` INT NOT NULL,
  `month` INT NOT NULL,
  `day` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (screening_id) REFERENCES screenings(id) ON DELETE CASCADE
);

# ====================================================
# Table: seats
# ====================================================
DROP TABLE IF EXISTS `seats`;

CREATE TABLE seats (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `room_id` INT,
  `row` INT,
  `number` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);

# ====================================================
# Table: reservation_seats
# ====================================================
DROP TABLE IF EXISTS `reservation_seats`;

CREATE TABLE reservation_seats (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `screening_id` INT,
  `reservation_id` INT,
  `seat_id` INT,
  UNIQUE KEY `screening_reservation_seat_unique` (`screening_id`, `reservation_id`, `seat_id`),
  FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE CASCADE,
  FOREIGN KEY (screening_id) REFERENCES screenings(id) ON DELETE CASCADE,
  FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
);
