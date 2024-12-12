/*
  Warnings:

  - Added the required column `nodeId` to the `ExecutionOutput` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecutionOutput" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ExecutionOutput" TEXT NOT NULL,
    "nodeId" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ExecutionOutput_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExecutionOutput" ("ExecutionOutput", "createdAt", "customerId", "id", "updatedAt") SELECT "ExecutionOutput", "createdAt", "customerId", "id", "updatedAt" FROM "ExecutionOutput";
DROP TABLE "ExecutionOutput";
ALTER TABLE "new_ExecutionOutput" RENAME TO "ExecutionOutput";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
