/*
  Warnings:

  - You are about to drop the `ExecutionLog` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `nodeId` to the `ExecutionPhase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nodeType` to the `ExecutionPhase` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ExecutionLog";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecutionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "inputs" TEXT,
    "outputs" TEXT,
    "nodeId" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "creditsConsumed" INTEGER,
    "workflowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExecutionPhase" ("completedAt", "creditsConsumed", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workflowExecutionId") SELECT "completedAt", "creditsConsumed", "id", "inputs", "name", "node", "number", "outputs", "startedAt", "status", "userId", "workflowExecutionId" FROM "ExecutionPhase";
DROP TABLE "ExecutionPhase";
ALTER TABLE "new_ExecutionPhase" RENAME TO "ExecutionPhase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
