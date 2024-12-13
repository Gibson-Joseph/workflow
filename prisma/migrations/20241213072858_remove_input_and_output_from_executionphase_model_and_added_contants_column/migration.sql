/*
  Warnings:

  - You are about to drop the column `inputs` on the `ExecutionPhase` table. All the data in the column will be lost.
  - You are about to drop the column `outputs` on the `ExecutionPhase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecutionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "contants" TEXT,
    "nodeId" TEXT NOT NULL,
    "sourceNode" TEXT,
    "nodeType" TEXT NOT NULL,
    "workflowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExecutionPhase" ("id", "name", "nodeId", "nodeType", "number", "sourceNode", "userId", "workflowExecutionId") SELECT "id", "name", "nodeId", "nodeType", "number", "sourceNode", "userId", "workflowExecutionId" FROM "ExecutionPhase";
DROP TABLE "ExecutionPhase";
ALTER TABLE "new_ExecutionPhase" RENAME TO "ExecutionPhase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
