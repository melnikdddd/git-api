/*
  Warnings:

  - You are about to drop the column `code` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Moderator` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('user', 'admin', 'moderator');

-- DropIndex
DROP INDEX "Order_code_key";

-- DropIndex
DROP INDEX "Product_code_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles" NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE "Admin";

-- DropTable
DROP TABLE "Moderator";
