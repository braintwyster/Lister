
INSERT INTO `generals` (`id`, `name`, `description`, `unit`, `created_at`, `updated_at`) VALUES
('', 'New Image', 'Add a new image to the your item. If you add more then one image it will be displayed in an image carousel', 'img', NULL, NULL),
('', 'rating', 'This is a 5 star rating', 'stars', NULL, NULL),
('', 'Quantity', 'The quantity of this item left in stock.', 'qty', NULL, NULL);

INSERT INTO `drinks` (`id`, `name`, `description`, `unit`, `created_at`, `updated_at`) VALUES
('', 'ABV', '(Alcohol By Value)', 'ABV', NULL, NULL),
('', 'IBU', '(International Bittering Units) This is a measure of the actual bitterness of a beer as contributed by the alpha acid from hops.', 'IBU', NULL, NULL),
('', 'Brewery Name', 'Enter the name of the Brewery.(Ninkasi, Bud Light, etc)', NULL, NULL, NULL),
('', 'Volume', 'Volume of liquid measured in Ounces', 'oz', NULL, NULL);

INSERT INTO `weeds` (`id`, `name`, `description`, `unit`, `created_at`, `updated_at`) VALUES
('', 'THC', 'Percentage of THC in your product', '%', NULL, NULL),
('', 'CBD', 'Percentage of CBD in your product', '%', NULL, NULL),
('', 'Strain', 'This is the basic of strain mixtures of Indica and Sativa blends. (Indica, Sativa, Hybrid)', NULL, NULL, NULL),
('', 'Consumption Type', 'Describes whether it''s a flower, concentrate, extract, or edibles. ', NULL, NULL, NULL),
('', 'Grower', 'Name of the Grower / Farm / Company that grows the product', NULL, NULL, NULL),
('', 'Weight', 'The weight of product being sold, weight in Grams.', 'grams', NULL, NULL);

INSERT INTO `books` (`id`, `name`, `description`, `unit`, `created_at`, `updated_at`) VALUES
('', 'Pages', 'Number of pages in a book, cover to cover', 'pages', NULL, NULL),
('', 'Release Date', 'The date the book was released for sale', 'date', NULL, NULL),
('', 'Genre', 'The main genre of the book', NULL, NULL, NULL),
('', 'Sub-Genre', 'Most books have a secondary genre', NULL, NULL, NULL),
('', 'Publisher', 'The name of the publisher', NULL, NULL, NULL),
('', 'Author', 'The name of the Author / Writer', NULL, NULL, NULL);
