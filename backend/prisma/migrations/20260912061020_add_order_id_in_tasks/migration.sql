ALTER TABLE "Task" ADD COLUMN "orderId" INTEGER;

WITH numbered AS (
    SELECT
        id,
        ROW_NUMBER() OVER (PARTITION BY "columnId" ORDER BY "createdAt", id) AS rn
    FROM "Task"
)
UPDATE "Task" t
SET "orderId" = n.rn
FROM numbered n
WHERE t.id = n.id;

ALTER TABLE "Task" ALTER COLUMN "orderId" SET NOT NULL;

CREATE UNIQUE INDEX "Task_orderId_columnId_key" ON "Task"("orderId", "columnId");