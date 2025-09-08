/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Header_logo` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Language` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Navbar` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Contact" DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "public"."Header_logo" DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "public"."Language" DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "public"."Navbar" DROP COLUMN "updateAt";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "updateAt";
