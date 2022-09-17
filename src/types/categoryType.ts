import { Categories } from "@prisma/client";

export type GetCategoryData = Omit<Categories, "id">
