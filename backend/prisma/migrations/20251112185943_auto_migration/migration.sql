/*
  Warnings:

  - Added the required column `day` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hour` to the `tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "hour" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
