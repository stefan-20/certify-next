-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('user', 'admin', 'guest');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "user_role" NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE "accreditations" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "valid_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),
    "valid_until" TIMESTAMP(3),
    "is_active" BOOLEAN DEFAULT true,
    "created_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),
    "modified_on" TIMESTAMP(6) DEFAULT (now() AT TIME ZONE 'utc'::text),

    CONSTRAINT "accreditations_pkey" PRIMARY KEY ("id")
);
