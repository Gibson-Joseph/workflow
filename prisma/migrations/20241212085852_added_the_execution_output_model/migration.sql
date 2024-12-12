-- CreateTable
CREATE TABLE "ExecutionOutput" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ExecutionOutput" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExecutionOutput_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "ExecutionPhase" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExecutionOutput_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
