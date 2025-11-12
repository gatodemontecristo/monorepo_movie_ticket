-- CreateTable
CREATE TABLE "tickets" (
    "idticket" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "movieName" TEXT NOT NULL,
    "idmovie" INTEGER NOT NULL,
    "iduser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("idticket")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "column" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "idticket" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_idticket_fkey" FOREIGN KEY ("idticket") REFERENCES "tickets"("idticket") ON DELETE CASCADE ON UPDATE CASCADE;
