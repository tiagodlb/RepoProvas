/*
  Warnings:

  - You are about to drop the `disciplines` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "disciplines";

-- CreateTable
CREATE TABLE "Disciplines" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Disciplines_pkey" PRIMARY KEY ("id")
);
