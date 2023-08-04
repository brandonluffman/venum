-- CreateTable
CREATE TABLE `companies` (
    `cik_str` INTEGER NULL,
    `ticker` VARCHAR(10) NULL,
    `title` VARCHAR(255) NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
