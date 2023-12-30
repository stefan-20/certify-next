/*
  Warnings:

  - Added the required column `from_id` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to_id` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "created_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),
ADD COLUMN     "from_id" UUID NOT NULL,
ADD COLUMN     "to_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_from_id_fkey" FOREIGN KEY ("from_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_to_id_fkey" FOREIGN KEY ("to_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
