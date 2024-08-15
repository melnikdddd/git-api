/*
  Warnings:

  - You are about to drop the column `nova_post_departament` on the `UserAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "nova_post_departament",
ADD COLUMN     "nova_post_department" INTEGER;
