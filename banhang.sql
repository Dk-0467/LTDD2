-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2024 at 07:50 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `banhang`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT 1,
  `size` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `size`, `created_at`, `updated_at`) VALUES
(38, 25, 15, 1, 'M', '2024-10-19 22:55:10', '2024-10-19 22:55:10');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `image`, `created_at`, `updated_at`) VALUES
(1, 'Espresso', 'https://images.unsplash.com/photo-1511920170033-f8396924c348', '2024-10-10 06:26:14', '2024-10-16 12:08:35'),
(2, 'Cappuccino', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', '2024-10-10 06:26:14', '2024-10-16 12:19:47'),
(3, 'Latte', 'https://images.unsplash.com/photo-1511920170033-f8396924c348', '2024-10-10 06:26:14', '2024-10-16 12:09:02'),
(4, 'Mocha', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', '2024-10-10 06:26:14', '2024-10-16 12:20:26'),
(5, 'Americano', 'https://images.unsplash.com/photo-1511920170033-f8396924c348', '2024-10-10 06:26:14', '2024-10-16 12:09:08'),
(6, 'Macchiato', 'https://images.unsplash.com/photo-1511920170033-f8396924c348', '2024-10-10 06:26:14', '2024-10-16 12:09:11'),
(7, 'Cold Brew', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', '2024-10-10 06:26:14', '2024-10-16 12:20:33'),
(8, 'Flat White', 'https://images.unsplash.com/photo-1511920170033-f8396924c348', '2024-10-10 06:26:14', '2024-10-16 12:09:16');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2024_10_17_063019_create_cart_items_table', 1),
(2, '2024_10_18_163210_personal_access_tokens', 2),
(3, '2024_10_18_163853_create_personal_access_tokens_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `status` enum('pending','completed','canceled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `size` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` text NOT NULL,
  `abilities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`abilities`)),
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 28, 'YourAppName', '38ec79ead8fcc6a17045d503bf6f736537789eefdb81d55cfda31c0af8a2ca06', '[\"*\"]', NULL, NULL, '2024-10-18 09:39:50', '2024-10-18 09:39:50'),
(2, 'App\\Models\\User', 28, 'YourAppName', '3713c39a8d9b227554997388ca31bb82ff7093109f3463599aba9e70d33a0f52', '[\"*\"]', '2024-10-18 09:53:29', NULL, '2024-10-18 09:52:09', '2024-10-18 09:53:29'),
(3, 'App\\Models\\User', 14, 'YourAppName', 'e684fbf14cfdf165b731f191041c0cdf452f9651afa7927b546a7899c095f53d', '[\"*\"]', '2024-10-18 09:54:40', NULL, '2024-10-18 09:54:14', '2024-10-18 09:54:40'),
(4, 'App\\Models\\User', 14, 'YourAppName', 'e56fa373837ffbadd990bc862dfcb55582e31dce0da6e1d0aa89f9ee377e05f2', '[\"*\"]', NULL, NULL, '2024-10-18 09:58:09', '2024-10-18 09:58:09'),
(5, 'App\\Models\\User', 14, 'YourAppName', 'ad3a40683f09027dc0b54063b7e7152b246bab05a2173860fc482e78e0402738', '[\"*\"]', '2024-10-18 10:35:11', NULL, '2024-10-18 10:00:20', '2024-10-18 10:35:11'),
(6, 'App\\Models\\User', 14, 'YourAppName', '18ce63722faff864e88a83e0be40c49dc154112a049748886445fb0d20afc222', '[\"*\"]', NULL, NULL, '2024-10-18 10:03:22', '2024-10-18 10:03:22'),
(7, 'App\\Models\\User', 14, 'YourAppName', 'fe0379945b9f7f0f67187b483ec60487a5de4247f09bbc359a968cc8f5b6a13d', '[\"*\"]', NULL, NULL, '2024-10-18 10:07:35', '2024-10-18 10:07:35'),
(8, 'App\\Models\\User', 14, 'YourAppName', '79fe46066d4be1ee24a825cd5bc5df37b1e45033684b30c55fe79c0bd8b7898f', '[\"*\"]', NULL, NULL, '2024-10-18 10:11:08', '2024-10-18 10:11:08'),
(9, 'App\\Models\\User', 14, 'YourAppName', 'f496ab6b9d6efb2550b268a283fc82e658435e214a2fdcaa83a1cbb02cb7fd0c', '[\"*\"]', NULL, NULL, '2024-10-18 10:11:45', '2024-10-18 10:11:45'),
(10, 'App\\Models\\User', 14, 'YourAppName', '793b1c10c137cfb9b54ee921eccd255e3ff29ab9205bda63b501977139783b91', '[\"*\"]', NULL, NULL, '2024-10-18 10:22:21', '2024-10-18 10:22:21'),
(11, 'App\\Models\\User', 14, 'YourAppName', '22245888f39b932fac00c1a049bb2fd54113e90d8a960229890e32cc0355131d', '[\"*\"]', NULL, NULL, '2024-10-18 10:27:07', '2024-10-18 10:27:07'),
(12, 'App\\Models\\User', 14, 'YourAppName', 'a4675ee2e8a29a5c8cadf2709ebf6fa13fd51b8c66ed2b6acb02240bdf66abc9', '[\"*\"]', '2024-10-18 10:54:59', NULL, '2024-10-18 10:35:41', '2024-10-18 10:54:59'),
(13, 'App\\Models\\User', 14, 'YourAppName', '07ef8dcecaf54064560cde1aad86d043083207a637f23038f4d1dead70fe6e41', '[\"*\"]', NULL, NULL, '2024-10-18 10:37:34', '2024-10-18 10:37:34'),
(14, 'App\\Models\\User', 14, 'YourAppName', '4e1cfabe3fef6c9a6f89adb725e38758445c91160fd0dd9a37d79fd0a025720b', '[\"*\"]', NULL, NULL, '2024-10-18 10:38:34', '2024-10-18 10:38:34'),
(15, 'App\\Models\\User', 14, 'YourAppName', '5b70c3953e18d6e40a690b6cf8ac4df42239cba8cac9626bd6fe6eb5a278ca28', '[\"*\"]', '2024-10-18 10:46:46', NULL, '2024-10-18 10:46:25', '2024-10-18 10:46:46'),
(16, 'App\\Models\\User', 14, 'YourAppName', '46b5e6c6cf075c6749b310dfb9517e9f40f892f6b71413c458f7731ea33465d7', '[\"*\"]', '2024-10-18 10:52:42', NULL, '2024-10-18 10:52:01', '2024-10-18 10:52:42'),
(17, 'App\\Models\\User', 25, 'YourAppName', 'da32beb9826df203c91d467a6f4a23577680ce7b953604d70f018f7352352aaa', '[\"*\"]', '2024-10-18 10:53:06', NULL, '2024-10-18 10:53:02', '2024-10-18 10:53:06'),
(18, 'App\\Models\\User', 14, 'YourAppName', '11c623ab455712fed4262fc527d86e3920d425100229ce67564f78a37648c576', '[\"*\"]', NULL, NULL, '2024-10-18 10:56:28', '2024-10-18 10:56:28'),
(19, 'App\\Models\\User', 14, 'YourAppName', '54779399177dfa378fe33d903dd8d2bb81018972667b0cce469edf6037403f3f', '[\"*\"]', '2024-10-18 10:59:31', NULL, '2024-10-18 10:58:46', '2024-10-18 10:59:31'),
(20, 'App\\Models\\User', 25, 'YourAppName', '10ca1dc1aa050f1b82a80641bb9fea544e9a7d4917367ae38ddce241a8fe9edc', '[\"*\"]', '2024-10-18 11:03:14', NULL, '2024-10-18 11:01:18', '2024-10-18 11:03:14'),
(21, 'App\\Models\\User', 25, 'YourAppName', 'a60da654e84370784469267ecdeb0cb6fbfee8c04fc508395b50d0bd048b10e7', '[\"*\"]', '2024-10-18 11:07:10', NULL, '2024-10-18 11:07:03', '2024-10-18 11:07:10'),
(22, 'App\\Models\\User', 25, 'YourAppName', 'cdf5670915739d011b28669b3bbfbbddaac6653b64d46661cf4f593dc264f45a', '[\"*\"]', '2024-10-18 11:07:22', NULL, '2024-10-18 11:07:17', '2024-10-18 11:07:22'),
(23, 'App\\Models\\User', 14, 'YourAppName', '8b0556a1a7135c9177111ea7f61e990b1c31f13da554f0d38d57d19da0777bf5', '[\"*\"]', '2024-10-18 11:07:46', NULL, '2024-10-18 11:07:37', '2024-10-18 11:07:46'),
(25, 'App\\Models\\User', 14, 'YourAppName', '14bd6473b9cd9b9857a75d230bb91d34a94567b09b62c5a17be57c4feae6e7cf', '[\"*\"]', NULL, NULL, '2024-10-19 18:54:17', '2024-10-19 18:54:17'),
(26, 'App\\Models\\User', 14, 'YourAppName', 'cf6e8fdb912fed5b63202ea95a261604c0a7b3156c9f83c9eca5f1973f150119', '[\"*\"]', '2024-10-19 18:55:36', NULL, '2024-10-19 18:55:18', '2024-10-19 18:55:36'),
(27, 'App\\Models\\User', 14, 'YourAppName', '8df314961c80e3d159122b912e373334aa4104c226db2e6592fea29912d50d90', '[\"*\"]', '2024-10-19 18:59:34', NULL, '2024-10-19 18:59:20', '2024-10-19 18:59:34'),
(28, 'App\\Models\\User', 14, 'YourAppName', '3c10b598415795ee0c7013e906b2b526e2e0d465e439cf4243f8e9bb41331119', '[\"*\"]', '2024-10-19 19:08:17', NULL, '2024-10-19 19:06:28', '2024-10-19 19:08:17'),
(29, 'App\\Models\\User', 14, 'YourAppName', 'b0206d5f0b6f0fab62b0fb32932cffdb2d51a85df79c194944d1a541f023657a', '[\"*\"]', '2024-10-19 19:15:19', NULL, '2024-10-19 19:13:01', '2024-10-19 19:15:19'),
(30, 'App\\Models\\User', 14, 'YourAppName', '7803b105d1c8df65a9b1bfb727f0189f5abf94a1c2c7ded0ea47f95f32fa2539', '[\"*\"]', NULL, NULL, '2024-10-19 21:13:34', '2024-10-19 21:13:34'),
(31, 'App\\Models\\User', 28, 'YourAppName', '1e6347453d4f059cb8f29b7bf7a3f24e88dcae26ce3e1aac20590e84b492e9e0', '[\"*\"]', '2024-10-19 21:14:30', NULL, '2024-10-19 21:14:16', '2024-10-19 21:14:30'),
(32, 'App\\Models\\User', 28, 'YourAppName', 'c1828a3530fa7da95db936c1d572c5391464a67643ad3eaffabcd882f6cad772', '[\"*\"]', '2024-10-19 21:39:35', NULL, '2024-10-19 21:26:20', '2024-10-19 21:39:35'),
(33, 'App\\Models\\User', 14, 'YourAppName', 'ad9c6a481d4de5e6259a1ae9c918cbb3d706095bf4f96a7c6efb13f36aed0559', '[\"*\"]', '2024-10-19 21:40:54', NULL, '2024-10-19 21:40:52', '2024-10-19 21:40:54'),
(34, 'App\\Models\\User', 28, 'YourAppName', 'cbe98d4d11d6011f811c89e81a683472b379f54064933337a9d8891cb525db1d', '[\"*\"]', '2024-10-19 22:06:46', NULL, '2024-10-19 21:41:17', '2024-10-19 22:06:46'),
(35, 'App\\Models\\User', 14, 'YourAppName', '03737e12b98ac01521593c4788eb9aa6eb76745886b46d07f5c2dc8baaa1b2c5', '[\"*\"]', '2024-10-19 22:30:27', NULL, '2024-10-19 22:30:20', '2024-10-19 22:30:27'),
(36, 'App\\Models\\User', 14, 'YourAppName', '35b64fa4193c6ebdf846f3312e1f03d4f711ccdd65bded6c36a1aea06200bf4e', '[\"*\"]', '2024-10-19 22:46:17', NULL, '2024-10-19 22:45:08', '2024-10-19 22:46:17'),
(37, 'App\\Models\\User', 14, 'YourAppName', 'b62460b0779bbb726cccc2430cff1289ad3a72f0a0a078d25ac5dfd41f889887', '[\"*\"]', '2024-10-19 22:47:29', NULL, '2024-10-19 22:47:11', '2024-10-19 22:47:29'),
(38, 'App\\Models\\User', 25, 'YourAppName', 'f9b09104684e4eb796aa18885b49d7ec5e64508eddd45f20495ea8d92caf4f98', '[\"*\"]', '2024-10-19 22:55:10', NULL, '2024-10-19 22:53:26', '2024-10-19 22:55:10'),
(39, 'App\\Models\\User', 14, 'YourAppName', '6ca37d831062f95521af47525710fe78be9c5662f55cb034f58134a10c2cc7a3', '[\"*\"]', NULL, NULL, '2024-10-19 23:02:42', '2024-10-19 23:02:42'),
(40, 'App\\Models\\User', 14, 'YourAppName', '020ef58d8a96f2ba5ac656d5a97aa9483606653a57652a28fdb58d9ea3ea2141', '[\"*\"]', NULL, NULL, '2024-10-19 23:09:28', '2024-10-19 23:09:28'),
(41, 'App\\Models\\User', 14, 'YourAppName', '3accbb1d6d717a1bfd8b2a0861ada2c3f2d43dbe9854d28f25425138ddd5dcf5', '[\"*\"]', NULL, NULL, '2024-10-20 03:50:05', '2024-10-20 03:50:05'),
(42, 'App\\Models\\User', 14, 'YourAppName', 'ee8aeff68331fe7365acdd36ed979642bc2a3a15cf5d54988c05b438c0b974ad', '[\"*\"]', NULL, NULL, '2024-10-20 03:50:05', '2024-10-20 03:50:05'),
(43, 'App\\Models\\User', 14, 'YourAppName', 'e91a674809c94b263cec84c1d8ac760066f670e3e8b9855d29a86e9f2e5f0217', '[\"*\"]', '2024-10-20 04:10:17', NULL, '2024-10-20 04:07:54', '2024-10-20 04:10:17'),
(44, 'App\\Models\\User', 28, 'YourAppName', 'c97000f4501d42399c45ec4294a1424829c85c0fb5cf404da466e8d6c77d2cb3', '[\"*\"]', NULL, NULL, '2024-10-20 06:09:24', '2024-10-20 06:09:24'),
(45, 'App\\Models\\User', 25, 'YourAppName', '0db363cae2c7a79c2a4873183357262fbc09e9b3221711a873b19241cc0147b3', '[\"*\"]', NULL, NULL, '2024-10-20 06:09:50', '2024-10-20 06:09:50'),
(46, 'App\\Models\\User', 14, 'YourAppName', 'c525aa44861c9605b502951d8a18ca3d043078222d32dfd93265f85be71e608b', '[\"*\"]', '2024-10-20 06:16:39', NULL, '2024-10-20 06:10:42', '2024-10-20 06:16:39'),
(47, 'App\\Models\\User', 14, 'YourAppName', '3cc8dc422b5244f6d23351e69e27d7b9914e0048723dab7e464e420e4f656e90', '[\"*\"]', '2024-10-20 06:17:19', NULL, '2024-10-20 06:17:17', '2024-10-20 06:17:19'),
(48, 'App\\Models\\User', 14, 'YourAppName', 'ced5a05baef69363aad94670bbdf0a97d1f062827190c5719109add36d2b9a2d', '[\"*\"]', '2024-10-20 06:20:12', NULL, '2024-10-20 06:17:26', '2024-10-20 06:20:12'),
(49, 'App\\Models\\User', 14, 'YourAppName', '539d221e048a3ac5d5e5787df51de9fae33d496ad7e3fab388b13891f5a15363', '[\"*\"]', '2024-10-20 06:29:57', NULL, '2024-10-20 06:24:53', '2024-10-20 06:29:57'),
(50, 'App\\Models\\User', 14, 'YourAppName', '9c047ce089f7dad4e71b5277e340686f818d4a050056a33c81875a64e82c8e5c', '[\"*\"]', NULL, NULL, '2024-10-20 06:37:56', '2024-10-20 06:37:56'),
(51, 'App\\Models\\User', 14, 'YourAppName', '55a4e14f40f4a8f43ffe3298e76e3c278c80d5741b2e4824412d2eceed7ef69f', '[\"*\"]', NULL, NULL, '2024-10-20 06:39:45', '2024-10-20 06:39:45'),
(52, 'App\\Models\\User', 14, 'YourAppName', 'ff469bface7a41e6f652e051d8f6606afd5aca154a7faba47fdde7a54a49bcea', '[\"*\"]', NULL, NULL, '2024-10-20 06:44:48', '2024-10-20 06:44:48'),
(53, 'App\\Models\\User', 14, 'YourAppName', '2f059a8d05be1629f714db7f19357e5575321e19fcce59f2ec4e9a32c71f78f2', '[\"*\"]', '2024-10-20 06:57:38', NULL, '2024-10-20 06:57:15', '2024-10-20 06:57:38'),
(54, 'App\\Models\\User', 14, 'YourAppName', '5183823f56222f30b2e4c838d4d916523d555d03bb70670016939fdbd4f06467', '[\"*\"]', NULL, NULL, '2024-10-20 07:25:29', '2024-10-20 07:25:29'),
(55, 'App\\Models\\User', 14, 'YourAppName', '057e58bb38f98ed1d55e6144054dd577ba64061fd381dbc25428b0886fc26a1c', '[\"*\"]', '2024-10-20 07:36:38', NULL, '2024-10-20 07:29:51', '2024-10-20 07:36:38'),
(56, 'App\\Models\\User', 14, 'YourAppName', 'ea3801359cc08e610911fd145a0ce89ed4efe249bb89b0847d613e314b9a0e6e', '[\"*\"]', '2024-10-20 07:41:04', NULL, '2024-10-20 07:40:11', '2024-10-20 07:41:04'),
(57, 'App\\Models\\User', 14, 'YourAppName', '1e42daeb4cb121f0b101d6d1bf4861a2df709faf0343f7500a659e48f3727ef9', '[\"*\"]', '2024-10-20 07:43:06', NULL, '2024-10-20 07:41:08', '2024-10-20 07:43:06'),
(58, 'App\\Models\\User', 14, 'YourAppName', 'b89908072b86db78cac263663c176d7c848aeeb33960b6529df223e302bf4bb9', '[\"*\"]', NULL, NULL, '2024-10-20 07:54:13', '2024-10-20 07:54:13'),
(59, 'App\\Models\\User', 14, 'YourAppName', '5e7f2744a996f68f5735370ec4100ac3f155d56d41a8b5b5af9605ba40541423', '[\"*\"]', NULL, NULL, '2024-10-20 08:01:19', '2024-10-20 08:01:19'),
(60, 'App\\Models\\User', 14, 'YourAppName', 'c9ac840051a4b25e0f957708b9adca02ecb8ce8c74092e5539fc44832ab4d904', '[\"*\"]', NULL, NULL, '2024-10-20 08:03:46', '2024-10-20 08:03:46'),
(61, 'App\\Models\\User', 14, 'YourAppName', 'e9e874bbb6a6ee29ec2860e5bb2b71f33a18936064b693e7eee797d77ac54fd2', '[\"*\"]', NULL, NULL, '2024-10-20 08:06:57', '2024-10-20 08:06:57'),
(62, 'App\\Models\\User', 14, 'YourAppName', 'f2328735704d5c7d143c25e1358d5c8734d9fa24dd39b3b2d3338b3f771a644c', '[\"*\"]', '2024-10-20 08:17:05', NULL, '2024-10-20 08:08:41', '2024-10-20 08:17:05'),
(63, 'App\\Models\\User', 14, 'YourAppName', '44cbf2f74faf33e7301f13167725dcd643ddcc6d8ffae55deb367e1ccd776386', '[\"*\"]', NULL, NULL, '2024-10-20 08:24:57', '2024-10-20 08:24:57'),
(64, 'App\\Models\\User', 14, 'YourAppName', '895b60021cf788ad2f8388598a30728f2da435b7d8b1f19ca3db40f146299896', '[\"*\"]', NULL, NULL, '2024-10-20 08:26:47', '2024-10-20 08:26:47'),
(65, 'App\\Models\\User', 14, 'YourAppName', 'e877d00fa101e4f56b93955dc8d5088aa69cf1d282558ddc9a24dd1e2bb68767', '[\"*\"]', '2024-10-20 09:13:16', NULL, '2024-10-20 08:27:19', '2024-10-20 09:13:16');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `quantity` int(11) NOT NULL DEFAULT 0,
  `size` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `category_id`, `created_at`, `updated_at`, `quantity`, `size`) VALUES
(13, 'Espresso', 'Rich and bold espresso coffee.', 25.00, 'https://images.unsplash.com/photo-1511920170033-f8396924c348', 1, '2024-10-10 06:31:20', '2024-10-17 07:51:53', 0, NULL),
(14, 'Cappuccino', 'Creamy cappuccino with steamed milk foam.', 30.00, 'https://images.unsplash.com/photo-1546069901-eacef0df6022', 2, '2024-10-10 06:31:20', '2024-10-10 06:31:20', 0, NULL),
(15, 'Latte', 'Smooth and mild coffee with milk.', 35.00, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 1, '2024-10-10 06:31:20', '2024-10-10 06:31:20', 0, NULL),
(16, 'Mocha', 'Chocolate-flavored coffee with whipped cream.', 40.00, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 3, '2024-10-10 06:31:20', '2024-10-10 06:31:20', 0, NULL),
(20, 'Latte', 'Smooth and mild coffee with milk.', 35.00, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93', 1, '2024-10-10 06:31:20', '2024-10-10 06:31:20', 0, NULL),
(21, 'Cappuccino', 'Creamy cappuccino with steamed milk foam.', 30.00, 'https://images.unsplash.com/photo-1546069901-eacef0df6022', 2, '2024-10-10 06:31:20', '2024-10-10 06:31:20', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `phone` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`, `updated_at`, `phone`) VALUES
(14, 'Kiem', 'Kiem@gmail.com', '$2y$12$DuJbsdcZz0gxXpQI1AAm7O1ihEvvG.rwRsJ.uTps20SmPTBGXNNDy', '2024-10-16 09:09:20', '2024-10-16 09:09:20', '0325380993'),
(19, 'Kiem1', 'Kiem1@gmail.com', '$2y$12$qH9IBct1.lf8ypv7MlUAn.TkkAMcxfFOOHr5ehEhd3r7DoDrpWlyK', '2024-10-16 09:17:37', '2024-10-16 09:17:37', '02111111154'),
(25, 'Hoa', 'Hoa@gmail.com', '$2y$12$ts/UmUeMgNKxfSUMT7K7PO7Hp4oJz2TcG7C/WSHSbLLkX/XTgj1lW', '2024-10-16 09:25:04', '2024-10-16 09:25:04', '009999999'),
(28, 'Man', 'Man@gmail.com', '$2y$12$mNh4rA3bsYUJrpggu6qkbefKrgxxqbD6hnUkesUQ//74PMPBxuXF.', '2024-10-18 08:08:11', '2024-10-18 08:08:11', '000666663333');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`) USING HASH;

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
