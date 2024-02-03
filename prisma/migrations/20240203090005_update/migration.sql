/*
  Warnings:

  - You are about to drop the column `stripe_price_id` on the `UserPayment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserPayment" DROP COLUMN "stripe_price_id",
ADD COLUMN     "stripe_payment_intent" TEXT;
