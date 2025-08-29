/*
  Warnings:

  - You are about to drop the `PlayerHighlight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."PlayerHighlight" DROP CONSTRAINT "PlayerHighlight_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlayerHighlight" DROP CONSTRAINT "PlayerHighlight_teamId_fkey";

-- DropTable
DROP TABLE "public"."PlayerHighlight";
