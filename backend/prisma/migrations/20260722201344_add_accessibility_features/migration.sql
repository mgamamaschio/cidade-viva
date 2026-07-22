-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "accessibilityFeatures" TEXT[] DEFAULT ARRAY[]::TEXT[];
