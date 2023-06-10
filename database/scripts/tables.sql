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
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `company` varchar(255),
  `role` ENUM('owner', 'client') NOT NULL DEFAULT 'client',
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
  `neighborhood` VARCHAR(255),
  `latitude` DECIMAL(11, 8),
  `longitude` DECIMAL(11, 8),
  `price` DECIMAL(10,2),
  `enabled` BOOLEAN DEFAULT true,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
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
  FOREIGN KEY (cinema_id) REFERENCES cinemas(id)
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
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
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
