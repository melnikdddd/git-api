/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropEnum
DROP TYPE "Roles";

-- CreateTable
CREATE TABLE "Moderator" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Moderator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Moderator_phone_number_key" ON "Moderator"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_phone_number_key" ON "Admin"("phone_number");
