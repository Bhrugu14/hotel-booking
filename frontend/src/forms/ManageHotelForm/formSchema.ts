import { z } from "zod";

export const schema = z
  .object({
    name: z.string().min(3, { message: "at least 3 characters required" }),
    city: z.string().min(3, { message: "at least 3 characters required" }),
    country: z.string().min(3, { message: "at least 3 characters required" }),
    description: z
      .string()
      .min(3, { message: "at least 3 characters required" }),
    type: z.any().refine(
      (v) => {
        if (v) {
          return v.length > 0;
        } else {
          return false;
        }
      },
      { message: "select at least one" }
    ),
    pricePerNight: z
      .string()
      .min(1, { message: "at least 1 characters required" })
      .refine(
        (v) => {
          const n = Number(v);
          if (isNaN(n)) {
            return false;
          } else {
            return n > 0;
          }
        },
        { message: "must be greater then zero" }
      )
      .or(
        z
          .number()
          .min(1, { message: "at least 1 characters required" })
          .refine(
            (v) => {
              const n = Number(v);
              if (isNaN(n)) {
                return false;
              } else {
                return n > 0;
              }
            },
            { message: "must be greater then zero" }
          )
      ),
    starRating: z.number().min(1, { message: "Rating is required" }),
    facilities: z.array(z.string()).superRefine((val, ctx) => {
      if (val.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "array",
          inclusive: true,
          message: "Select At least one",
        });
      }
    }),
    imageFiles: z.any(),
    imageUrls: z.any(),
    adultCount: z
      .string()
      .min(1, { message: "at least 1 characters required" })
      .refine(
        (v) => {
          const n = Number(v);
          if (isNaN(n)) {
            return false;
          } else {
            return n > 0;
          }
        },
        { message: "must be greater then zero" }
      )
      .or(
        z
          .number()
          .min(1, { message: "at least 1 characters required" })
          .refine(
            (v) => {
              const n = Number(v);
              if (isNaN(n)) {
                return false;
              } else {
                return n > 0;
              }
            },
            { message: "must be greater then zero" }
          )
      ),
    childCount: z
      .string()
      .min(1, { message: "at least 1 characters required" })
      .refine(
        (v) => {
          const n = Number(v);
          if (isNaN(n)) {
            return false;
          } else {
            return n >= 0;
          }
        },
        { message: "must be greater then zero" }
      )
      .or(
        z
          .number()
          .min(1, { message: "at least 1 characters required" })
          .refine(
            (v) => {
              const n = Number(v);
              if (isNaN(n)) {
                return false;
              } else {
                return n >= 0;
              }
            },
            { message: "must be greater then zero" }
          )
      ),
  })
  .superRefine((val, ctx) => {
    if (
      val.imageUrls &&
      Array.isArray(val.imageUrls) &&
      val.imageUrls.length > 0
    ) {
      return true;
    } else if (
      val.imageFiles &&
      Array.isArray(val.imageFiles) &&
      val.imageFiles.length > 0 &&
      val.imageFiles.length <= 6
    ) {
      if (val.imageFiles.length < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          type: "array",
          inclusive: true,
          message: "Select At least one",
        });
      }
      if (val.imageFiles.length > 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          maximum: 6,
          type: "array",
          inclusive: true,
          message: "Select At least one",
        });
      }
      return false;
    } else {
      return false;
    }
  });
