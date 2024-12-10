/*
  Warnings:

  - You are about to drop the `userBalance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `completedAt` on the `ExecutionPhase` table. All the data in the column will be lost.
  - You are about to drop the column `creditsConsumed` on the `ExecutionPhase` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `ExecutionPhase` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `ExecutionPhase` table. All the data in the column will be lost.
  - You are about to drop the column `creditsCost` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `cron` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `executionPlan` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `lastRunAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `lastRunId` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `lastRunStatus` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `nextRunAt` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `completedAt` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `creditsConsumed` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `WorkflowExecution` table. All the data in the column will be lost.
  - You are about to drop the column `trigger` on the `WorkflowExecution` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "userBalance";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExecutionPhase" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "node" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "inputs" TEXT,
    "outputs" TEXT,
    "nodeId" TEXT NOT NULL,
    "nodeType" TEXT NOT NULL,
    "workflowExecutionId" TEXT NOT NULL,
    CONSTRAINT "ExecutionPhase_workflowExecutionId_fkey" FOREIGN KEY ("workflowExecutionId") REFERENCES "WorkflowExecution" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExecutionPhase" ("id", "inputs", "name", "node", "nodeId", "nodeType", "number", "outputs", "userId", "workflowExecutionId") SELECT "id", "inputs", "name", "node", "nodeId", "nodeType", "number", "outputs", "userId", "workflowExecutionId" FROM "ExecutionPhase";
DROP TABLE "ExecutionPhase";
ALTER TABLE "new_ExecutionPhase" RENAME TO "ExecutionPhase";
CREATE TABLE "new_Workflow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "definition" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Workflow" ("createdAt", "definition", "description", "id", "name", "status", "updatedAt", "userId") SELECT "createdAt", "definition", "description", "id", "name", "status", "updatedAt", "userId" FROM "Workflow";
DROP TABLE "Workflow";
ALTER TABLE "new_Workflow" RENAME TO "Workflow";
CREATE UNIQUE INDEX "Workflow_name_userId_key" ON "Workflow"("name", "userId");
CREATE TABLE "new_WorkflowExecution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "definition" TEXT NOT NULL DEFAULT '{}',
    "workflowId" TEXT NOT NULL,
    CONSTRAINT "WorkflowExecution_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "Workflow" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_WorkflowExecution" ("createAt", "definition", "id", "status", "userId", "workflowId") SELECT "createAt", "definition", "id", "status", "userId", "workflowId" FROM "WorkflowExecution";
DROP TABLE "WorkflowExecution";
ALTER TABLE "new_WorkflowExecution" RENAME TO "WorkflowExecution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
