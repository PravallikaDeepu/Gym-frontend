import { string, z } from 'zod';

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, "First name must be at least 3 characters"),

    lastName: z
      .string()
      .min(1, "Last name is required"),

    mobileNumber: z
      .string()
      .trim()
      .regex(
        /^[6-9]\d{9}$/,
        "Enter Valid Mobile number"
      ),

    enteredEmail: z
      .string()
      .email("Invalid email"),

    enteredPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),

    city: z
      .string()
      .min(5, "City is required"),

    state: z
      .string()
      .min(3, "State is required"),
  })
  .refine(
    (data) => data.enteredPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );


export const basicGymSchema = z.object({
  gymName: z
    .string()
    .min(3, "Gym name must be at least 3 characters"),

  establishmentYear: z
    .coerce
    .number()
    .min(1900, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  gymType: z
    .string()
    .min(1, "Please select a gym type"),

  gymDescription: z
    .string()
    .min(20, "Gym description must be at least 20 characters"),
});


export const operatingDetailsSchema = z.object({
  openingTime: z
    .string()
    .min(1, "Opening time is required"),

  closingTime: z
    .string()
    .min(1, "Closing time is required"),

  gymFacilities: z
    .string()
    .min(1, "Please select a facility"),

  gymEquipments: z
    .string()
    .min(1, "Please select equipment"),

  otherFacilities: z
    .array(z.string())
    .optional(),

  otherEquipments: z
    .array(z.string())
    .optional(),
})
.superRefine((data, ctx) => {
  if (data.gymFacilities === "others") {
    const validFacilities = data.otherFacilities.filter(
      (item) => item.trim() !== ""
    );

    if (validFacilities.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherFacilities"],
        message: "Please enter at least one other facility",
      });
    }
  }

  if (data.gymEquipments === "others") {
    const validEquipments = data.otherEquipments.filter(
      (item) => item.trim() !== ""
    );

    if (validEquipments.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["otherEquipments"],
        message: "Please enter at least one other equipment",
      });
    }
  }
});

export const locationDetailsSchema = z.object({
  addressLine1: z
    .string()
    .min(5, "Address Line 1 must be at least 5 characters"),

  addressLine2: z
    .string()
    .optional(),

  landmark: z
    .string()
    .optional(),

  city: z
    .string()
    .min(2, "City is required"),

  state: z
    .string()
    .min(2, "State is required"),

  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),

  country: z
    .string()
    .min(2, "Country is required"),
});



export const mediaMembershipSchema = z.object({
  mediaData: z.object({
    gymLogo: z
      .any()
      .refine((file) => file !== null, {
        message: "Gym Logo is required",
      }),

    coverImage: z
      .any()
      .refine((file) => file !== null, {
        message: "Cover Image is required",
      }),

    gymPhotos: z
      .array(z.any())
      .min(1, "Upload at least one gym photo"),
  }),

  membershipPlans: z
    .array(
      z.object({
        planName: z
          .string()
          .min(3, "Plan Name must be at least 3 characters"),

        duration: z
          .string()
          .min(1, "Please select a duration"),

        price: z.coerce
          .number()
          .positive("Price must be greater than 0"),

        description: z
          .string()
          .min(5, "Description must be at least 5 characters"),

        status: z.enum(["active", "inactive"]),
      })
    )
    .min(1, "At least one membership plan is required"),
});