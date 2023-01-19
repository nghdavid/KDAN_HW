DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `number` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY (`number`)
);


DROP TABLE IF EXISTS `punch`;
CREATE TABLE `punch` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `employee_num` int unsigned NOT NULL,
  `punch_date` date DEFAULT NULL,
  `punch_in` time DEFAULT NULL,
  `punch_out` time DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `date_index` (`punch_date`),
  FOREIGN KEY (`employee_num`) REFERENCES `employee` (`number`) ON DELETE CASCADE
);
