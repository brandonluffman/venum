/*
  Warnings:

  - You are about to drop the `companies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `companies`;

-- CreateTable
CREATE TABLE `CompanyInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `CIK` INTEGER NOT NULL,
    `Ticker` VARCHAR(191) NOT NULL,
    `Title` VARCHAR(191) NOT NULL,
    `Short Name` VARCHAR(191) NOT NULL,
    `Long Name` VARCHAR(191) NOT NULL,
    `Industry` VARCHAR(191) NOT NULL,
    `Sector` VARCHAR(191) NOT NULL,
    `Country` VARCHAR(191) NOT NULL,
    `Market Cap` BIGINT NOT NULL,
    `Exchange` VARCHAR(191) NOT NULL,
    `Summary` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
