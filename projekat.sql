-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 10, 2016 at 10:30 PM
-- Server version: 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rentacar`
--

-- --------------------------------------------------------

--
-- Table structure for table `model`
--

CREATE TABLE `model` (
  `MODEL_ID` int(11) NOT NULL,
  `PROIZVODJAC_ID` int(11) DEFAULT NULL,
  `NAZIV` varchar(255) DEFAULT NULL,
  `VRSTA` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `model`
--

INSERT INTO `model` (`MODEL_ID`, `PROIZVODJAC_ID`, `NAZIV`, `VRSTA`) VALUES
(1, 2, 'Bravo', '1.6 TSI'),
(2, 1, 'M5', 'V6');

-- --------------------------------------------------------

--
-- Table structure for table `proizvodjac`
--

CREATE TABLE `proizvodjac` (
  `PROIZVODJAC_ID` int(11) NOT NULL,
  `NAZIV` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `proizvodjac`
--

INSERT INTO `proizvodjac` (`PROIZVODJAC_ID`, `NAZIV`) VALUES
(1, 'BMW'),
(2, 'Fiat');

-- --------------------------------------------------------

--
-- Table structure for table `servis`
--

CREATE TABLE `servis` (
  `SERVIS_ID` int(11) NOT NULL,
  `SERVISER_ID` int(11) DEFAULT NULL,
  `VOZILO_ID` int(11) DEFAULT NULL,
  `DATUM` date DEFAULT NULL,
  `PREDJENIH_KILOMETARA` varchar(255) DEFAULT NULL,
  `OPIS` varchar(4096) DEFAULT NULL,
  `CENA` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servis`
--

INSERT INTO `servis` (`SERVIS_ID`, `SERVISER_ID`, `VOZILO_ID`, `DATUM`, `PREDJENIH_KILOMETARA`, `OPIS`, `CENA`) VALUES
(2, 1, 2, '2015-12-31', '49999', 'Zamenjen motor i sve sto moze da se zameni...', '10000.00'),
(3, 2, 1, '2016-05-06', '50000', 'Zamenjeno ulje i svi filteri', '50.00');

-- --------------------------------------------------------

--
-- Table structure for table `serviser`
--

CREATE TABLE `serviser` (
  `SERVISER_ID` int(11) NOT NULL,
  `IME_SERVISA` varchar(255) DEFAULT NULL,
  `BROJ_TELEFONA` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `serviser`
--

INSERT INTO `serviser` (`SERVISER_ID`, `IME_SERVISA`, `BROJ_TELEFONA`) VALUES
(1, 'Bobi', '065-34302-432'),
(2, 'Miki', '035105301');

-- --------------------------------------------------------

--
-- Table structure for table `slika`
--

CREATE TABLE `slika` (
  `SLIKA_ID` int(11) NOT NULL,
  `VOZILO_ID` int(11) DEFAULT NULL,
  `PUTANJA` varchar(4096) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `slika`
--

INSERT INTO `slika` (`SLIKA_ID`, `VOZILO_ID`, `PUTANJA`) VALUES
(3, 3, 'images/bmw.jpg'),
(4, 4, 'images/fiat.jpg'),
(5, 1, 'images/fiat.jpg'),
(6, 2, 'http://s3.caradvice.com.au/thumb/1000/562/wp-content/uploads/2015/08/2015-bmw-m5-pure-3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `lastname` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `token` varchar(128) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `password`, `token`) VALUES
(1, 'Luka', 'Kotur', 'lukaa', '242726cc77b0042853fe99be904bb566', 'b7ffa598f52e0c9ba610a1e4defe4d2d9dc594af');

-- --------------------------------------------------------

--
-- Table structure for table `vozilo`
--

CREATE TABLE `vozilo` (
  `VOZILO_ID` int(11) NOT NULL,
  `PROIZVODJAC_ID` int(11) DEFAULT NULL,
  `MODEL_ID` int(11) DEFAULT NULL,
  `BROJ_SASIJE` bigint(20) DEFAULT NULL,
  `REGISTRACIJA` varchar(255) DEFAULT NULL,
  `KUBIKAZA` int(11) DEFAULT NULL,
  `KILOMETRAZA` varchar(255) DEFAULT NULL,
  `KATEGORIJA` varchar(255) DEFAULT NULL,
  `CENA` decimal(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `vozilo`
--

INSERT INTO `vozilo` (`VOZILO_ID`, `PROIZVODJAC_ID`, `MODEL_ID`, `BROJ_SASIJE`, `REGISTRACIJA`, `KUBIKAZA`, `KILOMETRAZA`, `KATEGORIJA`, `CENA`) VALUES
(1, 2, 1, 432432532, 'BG-300-BC', 2000, '3000', 'Limuzina', '203.00'),
(2, 1, 2, 31412531, 'BG-342-CS', 6000, '3023', 'Limuzina', '500.00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`MODEL_ID`),
  ADD KEY `FK_PROIZVODJAC_MODEL` (`PROIZVODJAC_ID`);

--
-- Indexes for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  ADD PRIMARY KEY (`PROIZVODJAC_ID`);

--
-- Indexes for table `servis`
--
ALTER TABLE `servis`
  ADD PRIMARY KEY (`SERVIS_ID`),
  ADD KEY `FK_SERVISER_SERVIS` (`SERVISER_ID`),
  ADD KEY `FK_VOZILO_SERVIS` (`VOZILO_ID`);

--
-- Indexes for table `serviser`
--
ALTER TABLE `serviser`
  ADD PRIMARY KEY (`SERVISER_ID`);

--
-- Indexes for table `slika`
--
ALTER TABLE `slika`
  ADD PRIMARY KEY (`SLIKA_ID`),
  ADD KEY `FK_RELATIONSHIP_8` (`VOZILO_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vozilo`
--
ALTER TABLE `vozilo`
  ADD PRIMARY KEY (`VOZILO_ID`),
  ADD KEY `FK_RELATIONSHIP_5` (`PROIZVODJAC_ID`),
  ADD KEY `FK_RELATIONSHIP_6` (`MODEL_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `model`
--
ALTER TABLE `model`
  MODIFY `MODEL_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `proizvodjac`
--
ALTER TABLE `proizvodjac`
  MODIFY `PROIZVODJAC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `servis`
--
ALTER TABLE `servis`
  MODIFY `SERVIS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `serviser`
--
ALTER TABLE `serviser`
  MODIFY `SERVISER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `slika`
--
ALTER TABLE `slika`
  MODIFY `SLIKA_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `vozilo`
--
ALTER TABLE `vozilo`
  MODIFY `VOZILO_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `FK_PROIZVODJAC_MODEL` FOREIGN KEY (`PROIZVODJAC_ID`) REFERENCES `proizvodjac` (`PROIZVODJAC_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `servis`
--
ALTER TABLE `servis`
  ADD CONSTRAINT `FK_SERVISER_SERVIS` FOREIGN KEY (`SERVISER_ID`) REFERENCES `serviser` (`SERVISER_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_VOZILO_SERVIS` FOREIGN KEY (`VOZILO_ID`) REFERENCES `vozilo` (`VOZILO_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `slika`
--
ALTER TABLE `slika`
  ADD CONSTRAINT `FK_RELATIONSHIP_8` FOREIGN KEY (`VOZILO_ID`) REFERENCES `vozilo` (`VOZILO_ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vozilo`
--
ALTER TABLE `vozilo`
  ADD CONSTRAINT `FK_RELATIONSHIP_5` FOREIGN KEY (`PROIZVODJAC_ID`) REFERENCES `proizvodjac` (`PROIZVODJAC_ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_RELATIONSHIP_6` FOREIGN KEY (`MODEL_ID`) REFERENCES `model` (`MODEL_ID`) ON DELETE SET NULL ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
