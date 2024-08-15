/*
  Warnings:

  - Added the required column `fistname` to the `UserAddress` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `UserAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAddress" ADD COLUMN     "fistname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;
