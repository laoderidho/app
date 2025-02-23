/*
  Warnings:

  - You are about to drop the `profiledoctor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `inputUn` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profiledoctor` DROP FOREIGN KEY `ProfileDoctor_SpecialistId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `inputUn` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `profiledoctor`;

-- CreateTable
CREATE TABLE `lg_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `inputUn` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Profile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `marriedStatus` BOOLEAN NOT NULL,
    `handphone_number` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctorProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `age` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `hp` VARCHAR(191) NOT NULL,
    `sex` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `SpecialistId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL,
    `billPerHours` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `lg_user` ADD CONSTRAINT `lg_user_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Profile` ADD CONSTRAINT `Profile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctorProfile` ADD CONSTRAINT `doctorProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctorProfile` ADD CONSTRAINT `doctorProfile_SpecialistId_fkey` FOREIGN KEY (`SpecialistId`) REFERENCES `Specialist`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
