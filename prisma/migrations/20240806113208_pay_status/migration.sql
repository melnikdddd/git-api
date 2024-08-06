/*
  Warnings:

  - You are about to drop the column `puctures_src` on the `Product` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PayStatus" AS ENUM ('paid', 'not_paid', 'only_delivery');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "pay_status" "PayStatus" DEFAULT 'not_paid';

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "puctures_src";

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
