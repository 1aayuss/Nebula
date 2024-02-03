-- CreateTable
CREATE TABLE "UserApiLimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserApiLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPayment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_payment_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_amount" INTEGER,
    "stripe_credits" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserApiLimit_userId_key" ON "UserApiLimit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPayment_userId_key" ON "UserPayment"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserPayment_stripe_customer_id_key" ON "UserPayment"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserPayment_stripe_payment_id_key" ON "UserPayment"("stripe_payment_id");
