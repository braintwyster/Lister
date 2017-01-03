-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 02, 2017 at 11:36 AM
-- Server version: 10.1.19-MariaDB
-- PHP Version: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lister`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `placeholder` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `name`, `description`, `placeholder`, `unit`, `created_at`, `updated_at`) VALUES
(1, 'Pages', 'Number of pages in a book, cover to cover', 'Number of pages', 'pages', NULL, NULL),
(2, 'Release-Date', 'The date the book was released for sale', 'Release date (mm-dd-year)', 'release date', NULL, NULL),
(3, 'Genre', 'The main genre of the book', 'Main genre of book', 'text', NULL, NULL),
(4, 'Sub-Genre', 'Most books have a secondary genre', 'Sub genre of book', 'text', NULL, NULL),
(5, 'Publisher', 'The name of the publisher', 'Name of Publisher', 'text', NULL, NULL),
(6, 'Author', 'The name of the Author / Writer', 'Name of Author', 'text', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `location`, `phone`, `user_id`, `created_at`, `updated_at`) VALUES
(1, 'PandaSonic Collective', 'Portland, OR', '5412959969', 1, '2016-12-24 10:26:18', '2016-12-24 10:26:18'),
(2, 'DragonTits', 'Portland, OR', '5156123618', 2, '2017-01-01 03:54:30', '2017-01-01 03:54:30'),
(3, 'Bob Company', 'Portland, OR', '5412959969', 3, '2017-01-01 15:41:45', '2017-01-01 15:41:45');

-- --------------------------------------------------------

--
-- Table structure for table `drinks`
--

CREATE TABLE `drinks` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `placeholder` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `drinks`
--

INSERT INTO `drinks` (`id`, `name`, `description`, `placeholder`, `unit`, `created_at`, `updated_at`) VALUES
(1, 'ABV', '(Alcohol By Volume)', 'ABV uses Percentage (%)', '%', NULL, NULL),
(2, 'IBU', '(International Bittering Units) This is a measure of the actual bitterness of a beer as contributed by the alpha acid from hops.', 'IBU uses Percentage (%)', '%', NULL, NULL),
(3, 'Brewery Name', 'Enter the name of the Brewery.(Ninkasi, Bud Light, etc)', 'Name of Brewery', 'text', NULL, NULL),
(4, 'Volume', 'Volume of liquid measured in Ounces', 'Volume in Liquid Ounces', 'oz', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `generals`
--

CREATE TABLE `generals` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `placeholder` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `generals`
--

INSERT INTO `generals` (`id`, `name`, `description`, `placeholder`, `unit`, `created_at`, `updated_at`) VALUES
(1, 'Image', 'Add a new image to the your item. If you add more then one image it will be displayed in an image carousel', 'http://image.url', 'img', NULL, NULL),
(2, 'Rating', 'This is a 5 star rating', '1-5', 'stars', NULL, NULL),
(3, 'Quantity', 'The quantity of this item left in stock.', 'Number of this item left', 'qty', NULL, NULL),
(4, 'Price', 'Display a price(USD)', 'Price amount (USD)', '$', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `item_attrs`
--

CREATE TABLE `item_attrs` (
  `id` int(10) UNSIGNED NOT NULL,
  `value` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `item_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item_attrs`
--

INSERT INTO `item_attrs` (`id`, `value`, `type`, `unit`, `item_id`, `created_at`, `updated_at`) VALUES
(8, 'http://4.bp.blogspot.com/-3Pm0aNxBmww/Ukbih2DgmvI/AAAAAAAAYhg/CNQOs9E_TvY/s1600/notas1.png', 'image', 'img', 21, '2016-12-29 14:21:13', '2016-12-29 14:21:13'),
(9, '5', 'rating', 'stars', 21, NULL, NULL),
(10, '10', 'quantity', 'qty', 21, NULL, NULL),
(23, 'http://www.tosbase.com/content/img/icons/items/icon_item_tpbox_100.png', 'image', 'img', 25, '2016-12-30 16:23:34', '2016-12-30 16:23:34'),
(24, '2086', 'pages', 'pages', 25, '2016-12-30 16:23:34', '2016-12-30 16:23:34'),
(25, 'horror', 'genre', 'null', 25, '2016-12-30 16:23:34', '2016-12-30 16:23:34'),
(26, 'some fuck heads', 'publisher', 'null', 25, '2016-12-30 16:23:34', '2016-12-30 16:23:34'),
(27, '5', 'rating', 'stars', 25, '2016-12-30 16:23:34', '2016-12-30 16:23:34'),
(28, 'http://www.thecannabist.co/wp-content/uploads/2015/11/3d-high-cbd-leafs-by-snoop-dogg-weed-strain.jpg', 'image', 'img', 26, '2016-12-30 16:29:40', '2016-12-30 16:29:40'),
(29, 'Indica', 'strain', 'null', 26, '2016-12-30 16:29:40', '2016-12-30 16:29:40'),
(30, '0.5', 'thc', '%', 26, '2016-12-30 16:29:40', '2016-12-30 16:29:40'),
(31, '15', 'cbd', '%', 26, '2016-12-30 16:29:40', '2016-12-30 16:29:40'),
(32, '10', 'weight', 'grams', 26, '2016-12-30 16:29:40', '2016-12-30 16:29:40'),
(33, '10.99', 'price', '$', 27, '2016-12-31 00:51:34', '2016-12-31 00:51:34'),
(34, 'http://vignette2.wikia.nocookie.net/megaman/images/8/8c/MM2Item1.jpg/revision/latest?cb=20110404074845', 'image', 'img', 29, '2017-01-01 16:09:30', '2017-01-01 16:09:30'),
(35, 'Hybrid', 'strain', 'text', 29, '2017-01-01 16:09:30', '2017-01-01 16:09:30'),
(36, '4', 'rating', 'stars', 29, '2017-01-01 16:09:30', '2017-01-01 16:09:30'),
(37, '1', 'quantity', 'qty', 30, '2017-01-01 16:14:18', '2017-01-01 16:14:18'),
(38, '4768', 'weight', 'grams', 30, '2017-01-01 16:14:18', '2017-01-01 16:14:18'),
(39, 'http://vvdfx.com/wp-content/uploads/2012/09/trevor4-copy-X2.jpg', 'image', 'img', 30, '2017-01-01 16:14:18', '2017-01-01 16:14:18'),
(40, '54', 'quantity', 'qty', 31, '2017-01-01 16:16:44', '2017-01-01 16:16:44'),
(41, 'http://st.depositphotos.com/1995655/1938/i/950/depositphotos_19387307-stock-photo-entrails-of-a-pig-during.jpg', 'image', 'img', 31, '2017-01-01 16:16:44', '2017-01-01 16:16:44'),
(42, '3', 'rating', 'stars', 31, '2017-01-01 16:16:44', '2017-01-01 16:16:44'),
(43, '5000046', 'weight', 'grams', 32, '2017-01-01 16:19:48', '2017-01-01 16:19:48'),
(44, 'http://www.mining.com/wp-content/uploads/2016/05/grundeinkommen-vault-coins-gold-900.jpg', 'image', 'img', 32, '2017-01-01 16:19:48', '2017-01-01 16:19:48'),
(45, '5', 'rating', 'stars', 32, '2017-01-01 16:19:48', '2017-01-01 16:19:48'),
(46, '6000000000', 'price', '$', 32, '2017-01-01 16:19:48', '2017-01-01 16:19:48'),
(47, 'https://culturedcode.com/frozen/2015/11/watch-hero.1x.png', 'image', 'img', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(48, 'https://pbs.twimg.com/profile_images/551891667423215617/g9pAwQhk.jpeg', 'image', 'img', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(49, 'https://pi.tedcdn.com/r/pf.tedcdn.com/images/playlists/design_of_useful_things.jpg?quality=89&w=500', 'image', 'img', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(50, '03-22-1984', 'releasedate', 'release date', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(51, '2345', 'pages', 'pages', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(52, 'This one Guy', 'author', 'text', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(53, '5', 'rating', 'stars', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30'),
(54, '123.99', 'price', '$', 33, '2017-01-02 01:37:30', '2017-01-02 01:37:30');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations`
--

CREATE TABLE `knex_migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `knex_migrations`
--

INSERT INTO `knex_migrations` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '20161214153015_lister.js', 1, '2016-12-24 05:42:50');

-- --------------------------------------------------------

--
-- Table structure for table `knex_migrations_lock`
--

CREATE TABLE `knex_migrations_lock` (
  `is_locked` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `knex_migrations_lock`
--

INSERT INTO `knex_migrations_lock` (`is_locked`) VALUES
(0);

-- --------------------------------------------------------

--
-- Table structure for table `listers`
--

CREATE TABLE `listers` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `company_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `listers`
--

INSERT INTO `listers` (`id`, `name`, `company_id`, `created_at`, `updated_at`) VALUES
(1, 'The Great Lister', 1, '2016-12-24 10:41:08', '2016-12-24 10:41:08'),
(2, 'Dragonvictims', 2, '2017-01-01 03:54:50', '2017-01-01 03:54:50'),
(3, 'New Lister thingy', 3, '2017-01-01 15:41:55', '2017-01-01 15:41:55');

-- --------------------------------------------------------

--
-- Table structure for table `lister_items`
--

CREATE TABLE `lister_items` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `lister_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `lister_items`
--

INSERT INTO `lister_items` (`id`, `name`, `description`, `lister_id`, `created_at`, `updated_at`) VALUES
(21, 'Moom', 'aslkjhf kjashd;kfjha ;sjkdfhl kjahdslk fjhlakjhsd fkljha sdkfjhas', 1, '2016-12-29 14:21:13', '2016-12-29 14:21:13'),
(25, 'YAY!', 'just another stupid test', 1, '2016-12-30 16:23:34', '2016-12-30 16:23:34'),
(26, 'THis is weed', 'AKJSd klajshd lkjhas lkdjb laskjb laksjbd kajsd kvjhbkjhbskjdhbf laksjdhf lkjabsdf', 1, '2016-12-30 16:29:40', '2016-12-30 16:29:40'),
(27, 'A beer', 'asfjaslkjfhlkj asdhf lkjhas lkdjfhal sdf', 1, '2016-12-31 00:51:34', '2016-12-31 00:51:34'),
(29, 'New item for Erica', 'This is a testing thingy to make sure I didn''t fuck things up again :/', 2, '2017-01-01 16:09:29', '2017-01-01 16:09:29'),
(30, 'Decapitated Head', 'A head, blonde, ripped from the shoulder of some dickwad', 2, '2017-01-01 16:14:18', '2017-01-01 16:14:18'),
(31, 'Entrails', 'Misc. entrails from many bodies. ', 2, '2017-01-01 16:16:44', '2017-01-01 16:16:44'),
(32, 'GOLD', 'GOLD', 2, '2017-01-01 16:19:48', '2017-01-01 16:19:48'),
(33, 'This is a Date CHeck', 'ajshd fajhds kfjha sjkd f;lkha ;sdf', 1, '2017-01-02 01:37:30', '2017-01-02 01:37:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `name`, `email`, `created_at`, `updated_at`) VALUES
(1, 'PandaSonic', '$2a$10$ky7YJYawIcoAjKoaKOu46uyCE9wd/tS1V9ycIT4bVexcL/sCxRy2C', 'Adam Yoder', 'pandasonicpdx@gmail.com', '2016-12-23 21:43:15', '2016-12-23 21:43:15'),
(2, 'arrdint', '$2a$10$dRpvvAlJcAd0EsZg1bmqjeo7cAGykuKL.MAgkl0hYQmCk/nibod8W', 'benni', 'talons@live.com', '2017-01-01 03:53:13', '2017-01-01 03:53:13'),
(3, 'braintwyster', '$2a$10$KOkCrR.Tka1t8O9wd0qvO.L/SOTw0ZC7I53DOXF3PJ2.HdlXPwDKm', 'Adam Yoder', 'braintwyster@gmail.com', '2017-01-01 14:45:31', '2017-01-01 14:45:31');

-- --------------------------------------------------------

--
-- Table structure for table `weeds`
--

CREATE TABLE `weeds` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `placeholder` varchar(255) NOT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `weeds`
--

INSERT INTO `weeds` (`id`, `name`, `description`, `placeholder`, `unit`, `created_at`, `updated_at`) VALUES
(1, 'THC', 'Percentage of THC in your product', 'THC uses Percentage (%)', '%', NULL, NULL),
(2, 'CBD', 'Percentage of CBD in your product', 'CBD uses Percentage (%)', '%', NULL, NULL),
(3, 'Strain', 'This is the basic of strain mixtures of Indica and Sativa blends. (Indica, Sativa, Hybrid)', 'Indica, Sativa, Hybrid', 'text', NULL, NULL),
(4, 'Consumption Type', 'Describes whether it''s a flower, concentrate, extract, or edibles. ', '(flower, concentrate, extract, or edibles)', 'text', NULL, NULL),
(5, 'Grower', 'Name of the Grower / Farm / Company that grows the product', 'Name of Grower, Farm, or Company', 'text', NULL, NULL),
(6, 'Weight', 'The weight of product being sold, weight in Grams.', 'Weight in Grams', 'grams', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`user_id`);

--
-- Indexes for table `drinks`
--
ALTER TABLE `drinks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `generals`
--
ALTER TABLE `generals`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_attrs`
--
ALTER TABLE `item_attrs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`item_id`);

--
-- Indexes for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `listers`
--
ALTER TABLE `listers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`company_id`);

--
-- Indexes for table `lister_items`
--
ALTER TABLE `lister_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `index` (`lister_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `weeds`
--
ALTER TABLE `weeds`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `drinks`
--
ALTER TABLE `drinks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `generals`
--
ALTER TABLE `generals`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `item_attrs`
--
ALTER TABLE `item_attrs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
--
-- AUTO_INCREMENT for table `knex_migrations`
--
ALTER TABLE `knex_migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `listers`
--
ALTER TABLE `listers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `lister_items`
--
ALTER TABLE `lister_items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `weeds`
--
ALTER TABLE `weeds`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `companies`
--
ALTER TABLE `companies`
  ADD CONSTRAINT `companies_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `item_attrs`
--
ALTER TABLE `item_attrs`
  ADD CONSTRAINT `item_attrs_lister_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `lister_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `listers`
--
ALTER TABLE `listers`
  ADD CONSTRAINT `listers_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lister_items`
--
ALTER TABLE `lister_items`
  ADD CONSTRAINT `lister_items_lister_id_foreign` FOREIGN KEY (`lister_id`) REFERENCES `listers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
