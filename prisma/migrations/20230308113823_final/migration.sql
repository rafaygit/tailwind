/*
  Warnings:

  - You are about to drop the column `transactionsId` on the `licenses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "licenses" DROP CONSTRAINT "licenses_transactionsId_fkey";

-- AlterTable
ALTER TABLE "licenses" DROP COLUMN "transactionsId";

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "licensesId" INTEGER;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_licensesId_fkey" FOREIGN KEY ("licensesId") REFERENCES "licenses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
