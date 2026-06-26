import { string, z } from 'zod';


export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(3, "First name must be at least 3 characters")
      .max(30, "First name cannot exceed 30 characters"),

    lastName: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .max(30, "Last name cannot exceed 30 characters"),

       mobileNumber: z
      .string()
      .trim()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^[1-9]\d*$/, "Mobile number cannot start with 0"),

    enteredEmail: z
      .string()
      .trim()
      .email("Invalid email address")
      .max(100, "Email cannot exceed 100 characters"),

    enteredPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password cannot exceed 20 characters"),

    confirmPassword: z
      .string()
      .min(6, "Confirm password is required")
      .max(20, "Confirm password cannot exceed 20 characters"),

    city: z
      .string()
      .trim()
      .min(2, "City is required")
      .max(50, "City cannot exceed 50 characters"),

    state: z
      .string()
      .trim()
      .min(2, "State is required")
      .max(50, "State cannot exceed 50 characters"),
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
    .min(3, "Gym name must be at least 3 characters")
    .max(50, "Gym name cannot exceed 50 characters"),

  establishmentYear: z
    .coerce
    .number()
    .min(1900, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  gymType: z
    .string()
    .min(1, "Please select a gym type")
    .max(30, "Gym type is too long"),

  gymDescription: z
    .string()
    .min(20, "Gym description must be at least 20 characters")
    .max(500, "Gym description cannot exceed 500 characters"),
});


export const operatingDetailsSchema = z.object({
  openingTime: z.string().min(1, "Opening time is required"),

  closingTime: z.string().min(1, "Closing time is required"),

  gymFacilities: z
    .array(z.string())
    .min(1, "Please select at least one facility"),

  gymEquipments: z
    .array(z.string())
    .min(1, "Please select at least one equipment"),

  otherFacilities: z.array(z.string()).optional(),

  otherEquipments: z.array(z.string()).optional(),
})
.superRefine((data, ctx) => {
  if (data.gymFacilities.includes("others")) {
    const validFacilities = (data.otherFacilities || []).filter(
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

  if (data.gymEquipments.includes("others")) {
    const validEquipments = (data.otherEquipments || []).filter(
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
    .min(5, "Address Line 1 must be at least 5 characters")
    .max(100, "Address Line 1 cannot exceed 100 characters"),

  addressLine2: z
    .string()
    .max(100, "Address Line 2 cannot exceed 100 characters")
    .optional(),

  landmark: z
    .string()
    .max(60, "Landmark cannot exceed 60 characters")
    .optional(),

  city: z
    .string()
    .min(2, "City is required")
    .max(50, "City cannot exceed 50 characters"),

  state: z
    .string()
    .min(2, "State is required")
    .max(15, "State cannot exceed 50 characters"),

  pincode: z
    .string()
    .regex(/^[0-9]{6}$/, "Pincode must be 6 digits"),

  country: z
    .string()
    .min(2, "Country is required")
    .max(15, "Country cannot exceed 50 characters"),
});


export const mediaMembershipSchema = z.object({
  mediaData: z.object({
   gymLogo: z
  .any()
  .refine((file) => file instanceof File, {
    message: "Gym Logo is required",
  })
  .refine((file) => !file || file.size <= 2 * 1024 * 1024, {
    message: "Gym Logo must be less than 2 MB",
  })
  .refine(
    (file) =>
      !file ||
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type),
    {
      message: "Only JPG, JPEG, PNG or WEBP images are allowed",
    }
  ),

    coverImage: z
  .any()
  .refine((file) => file instanceof File, {
    message: "Cover Image is required",
  })
  .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
    message: "Cover Image must be less than 5 MB",
  })
  .refine(
    (file) =>
      !file ||
      ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type),
    {
      message: "Only JPG, JPEG, PNG or WEBP images are allowed",
    }
  ),
    gymPhotos: z
      .array(z.any())
      .min(1, "Upload at least one gym photo")
      .max(10, "Maximum 10 gym photos are allowed")
      .refine((files) => files.every((f) => f instanceof File), {
        message: "Invalid gym photos",
      })
      .refine(
        (files) => files.every((f) => f.size <= 5 * 1024 * 1024),
        {
          message: "Each gym photo must be less than 5 MB",
        }
      )
      .refine(
        (files) =>
          files.every((f) =>
            ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
              f.type
            )
          ),
        {
          message: "Only JPG, JPEG, PNG or WEBP images are allowed",
        }
      ),
  }),

  membershipPlans: z
    .array(
      z.object({
        planName: z
          .string()
          .min(3, "Plan Name must be at least 3 characters")
          .max(50, "Plan Name cannot exceed 50 characters"),

        duration: z
          .string()
          .min(1, "Please select a duration"),

        price: z.coerce
          .number()
          .positive("Price must be greater than 0")
          .max(100000, "Price cannot exceed ₹100000"),

        description: z
          .string()
          .min(5, "Description must be at least 5 characters")
          .max(200, "Description cannot exceed 200 characters"),

        status: z.enum(["active", "inactive"]),
      })
    )
    .min(1, "At least one membership plan is required")
    .max(10, "You can add a maximum of 10 membership plans"),
});