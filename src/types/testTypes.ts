import { Tests } from "@prisma/client";

export type CreateTestData = Omit<Tests, "id">
