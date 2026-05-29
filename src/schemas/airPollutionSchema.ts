import { z } from "zod";

export const airPollutionSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  generationtime_ms: z.number().optional(),
  utc_offset_seconds: z.number().optional(),

  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),

  current_units: z.object({
    time: z.string(),
    interval: z.string(),
    pm10: z.string().optional(),
    pm2_5: z.string().optional(),
    carbon_monoxide: z.string().optional(),
    nitrogen_dioxide: z.string().optional(),
    sulphur_dioxide: z.string().optional(),
    ozone: z.string().optional(),
    dust: z.string().optional(),
  }),

  current: z.object({
    time: z.string(),
    interval: z.number(),

    pm10: z.number().optional(),
    pm2_5: z.number().optional(),
    carbon_monoxide: z.number().optional(),
    nitrogen_dioxide: z.number().optional(),
    sulphur_dioxide: z.number().optional(),
    ozone: z.number().optional(),
    dust: z.number().optional(),
  }),
});
