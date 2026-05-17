-- AlterTable
ALTER TABLE `Post` ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT 'Desenvolvimento web',
    ADD COLUMN `summary` TEXT NULL,
    ADD COLUMN `tags` VARCHAR(191) NULL;
