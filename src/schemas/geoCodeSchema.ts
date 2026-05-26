import { z } from "zod"

export const citySchema = z.object({
  id: z.number(),
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  country: z.string(),
})

export const geocodeSchema = z.object({
  results: z.array(citySchema),
})
