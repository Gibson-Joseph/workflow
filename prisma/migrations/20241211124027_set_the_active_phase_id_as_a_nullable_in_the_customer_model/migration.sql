-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "activePhaseId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Customer" ("activePhaseId", "createdAt", "id", "name", "phoneNo", "updatedAt") SELECT "activePhaseId", "createdAt", "id", "name", "phoneNo", "updatedAt" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_phoneNo_key" ON "Customer"("phoneNo");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
