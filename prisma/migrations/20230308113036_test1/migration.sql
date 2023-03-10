/*
  Warnings:

  - You are about to drop the column `licensesId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_licensesId_fkey";

-- AlterTable
ALTER TABLE "licenses" ADD COLUMN     "transactionsId" INTEGER;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "licensesId";

-- AddForeignKey
ALTER TABLE "licenses" ADD CONSTRAINT "licenses_transactionsId_fkey" FOREIGN KEY ("transactionsId") REFERENCES "transactions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
