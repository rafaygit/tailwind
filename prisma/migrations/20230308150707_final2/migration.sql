/*
  Warnings:

  - You are about to drop the column `usersId` on the `templates` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "templates" DROP CONSTRAINT "templates_usersId_fkey";

-- AlterTable
ALTER TABLE "templates" DROP COLUMN "usersId";

-- CreateTable
CREATE TABLE "_templatesTousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_templatesTousers_AB_unique" ON "_templatesTousers"("A", "B");

-- CreateIndex
CREATE INDEX "_templatesTousers_B_index" ON "_templatesTousers"("B");

-- AddForeignKey
ALTER TABLE "_templatesTousers" ADD CONSTRAINT "_templatesTousers_A_fkey" FOREIGN KEY ("A") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_templatesTousers" ADD CONSTRAINT "_templatesTousers_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
