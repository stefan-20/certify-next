/*
  Warnings:

  - You are about to drop the `accreditations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "transaction_status" AS ENUM ('pending', 'completed');

-- CreateEnum
CREATE TYPE "accreditation_type" AS ENUM ('certificate', 'attest', 'testimonial', 'reference');

-- DropTable
DROP TABLE "accreditations";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "user_role" NOT NULL DEFAULT 'user',
    "is_active" BOOLEAN DEFAULT true,
    "created_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accreditation" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "valid_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),
    "valid_until" TIMESTAMP(3),
    "is_active" BOOLEAN DEFAULT true,
    "type" "accreditation_type" NOT NULL DEFAULT 'certificate',
    "created_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),
    "modified_on" TIMESTAMP(3),
    "creator_id" UUID NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "accreditation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "accreditation_id" UUID NOT NULL,
    "status" "transaction_status" NOT NULL DEFAULT 'pending',

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "upload" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "filename" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "accreditation_id" UUID NOT NULL,

    CONSTRAINT "upload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "accreditation" ADD CONSTRAINT "accreditation_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accreditation" ADD CONSTRAINT "accreditation_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_accreditation_id_fkey" FOREIGN KEY ("accreditation_id") REFERENCES "accreditation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_accreditation_id_fkey" FOREIGN KEY ("accreditation_id") REFERENCES "accreditation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
