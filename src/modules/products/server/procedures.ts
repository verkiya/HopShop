import z from "zod";
import type { Where } from "payload";

import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z
        .object({
          category: z.string().nullable().optional(),
          minPrice: z.string().nullable().optional(),
          maxPrice: z.string().nullable().optional(),
        })
        .transform((data) => {
          const parsedMin = data.minPrice ? Number(data.minPrice) : null;
          const parsedMax = data.maxPrice ? Number(data.maxPrice) : null;

          const safeMin =
            parsedMin !== null && !isNaN(parsedMin)
              ? Math.max(0, Math.min(parsedMin, 10000))
              : null;

          const safeMax =
            parsedMax !== null && !isNaN(parsedMax)
              ? Math.max(0, Math.min(parsedMax, 10000))
              : null;

          return {
            ...data,
            minPrice: safeMin,
            maxPrice: safeMax,
          };
        })
        .refine(
          (data) => {
            if (data.minPrice !== null && data.maxPrice !== null) {
              return data.minPrice <= data.maxPrice;
            }
            return true;
          },
          {
            message: "Minimum price cannot exceed maximum price",
          },
        ),
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {};

      if (input.minPrice !== null || input.maxPrice !== null) {
        where.price = {};
      }

      if (input.minPrice !== null) {
        where.price = {
          ...where.price,
          greater_than_equal: input.minPrice,
        };
      }

      if (input.maxPrice !== null) {
        where.price = {
          ...where.price,
          less_than_equal: input.maxPrice,
        };
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs: string[] = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug,
            ),
          );

          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 1,
        where,
      });

      return data;
    }),
});
