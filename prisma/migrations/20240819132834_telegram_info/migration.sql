/*
  Warnings:

  - You are about to drop the column `is_activate_account` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "is_activate_account";

-- CreateTable
CREATE TABLE "TelegramUserInfo" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "auth_code" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TelegramUserInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUserInfo_chat_id_key" ON "TelegramUserInfo"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUserInfo_userId_key" ON "TelegramUserInfo"("userId");

-- AddForeignKey
ALTER TABLE "TelegramUserInfo" ADD CONSTRAINT "TelegramUserInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
