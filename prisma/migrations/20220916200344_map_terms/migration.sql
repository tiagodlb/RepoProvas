/*
  Warnings:

  - You are about to drop the `Terms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Terms";

-- CreateTable
CREATE TABLE "terms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "terms_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "terms_number_key" ON "terms"("number");
