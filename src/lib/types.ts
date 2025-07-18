import { z } from "zod";

export const LawSearchSchema = z.object({
  law_id: z.string().optional(),
  law_num: z.string().optional(),
  law_num_era: z
    .enum(["Meiji", "Taisho", "Showa", "Heisei", "Reiwa"])
    .optional(),
  law_num_year: z.number().int().optional(),
  law_num_type: z
    .enum([
      "Act",
      "CabinetOrder",
      "ImperialOrder",
      "MinisterialOrdinance",
      "Rule",
      "Misc",
    ])
    .optional(),
  law_num_num: z.string().optional(),
  law_title: z.string().optional(),
  law_title_kana: z.string().optional(),
  law_type: z
    .array(
      z.enum([
        "Act",
        "CabinetOrder",
        "ImperialOrder",
        "MinisterialOrdinance",
        "Rule",
        "Misc",
      ]),
    )
    .optional(),
  asof: z.string().optional(),
  category_cd: z.array(z.string()).optional(),
  mission: z.array(z.enum(["New", "Partial"])).optional(),
  promulgation_date_from: z.string().optional(),
  promulgation_date_to: z.string().optional(),
  repeal_status: z
    .array(z.enum(["Repeal", "Expire", "LossOfEffectiveness"]))
    .optional(),
  limit: z.number().int().min(1).max(1000).optional(),
  offset: z.number().int().min(0).optional(),
});

export const KeywordSearchSchema = z.object({
  keyword: z.string(),
  law_num: z.string().optional(),
  law_num_era: z
    .enum(["Meiji", "Taisho", "Showa", "Heisei", "Reiwa"])
    .optional(),
  law_num_year: z.number().int().optional(),
  law_num_type: z
    .enum([
      "Act",
      "CabinetOrder",
      "ImperialOrder",
      "MinisterialOrdinance",
      "Rule",
      "Misc",
    ])
    .optional(),
  law_num_num: z.string().optional(),
  law_type: z
    .array(
      z.enum([
        "Act",
        "CabinetOrder",
        "ImperialOrder",
        "MinisterialOrdinance",
        "Rule",
        "Misc",
      ]),
    )
    .optional(),
  asof: z.string().optional(),
  category_cd: z.array(z.string()).optional(),
  promulgation_date_from: z.string().optional(),
  promulgation_date_to: z.string().optional(),
  limit: z.number().int().min(1).max(1000).optional(),
  offset: z.number().int().min(0).optional(),
  sentences_limit: z.number().int().min(1).max(100).optional(),
  sentence_text_size: z.number().int().min(1).max(1000).optional(),
  highlight_tag: z.string().optional(),
});

export const LawContentSchema = z.object({
  law_id_or_num_or_revision_id: z.string(),
  asof: z.string().optional(),
  elm: z.string().optional(),
  omit_amendment_suppl_provision: z.boolean().optional(),
  include_attached_file_content: z.boolean().optional(),
});

export const LawRevisionsSchema = z.object({
  law_id_or_num: z.string(),
  law_title: z.string().optional(),
  law_title_kana: z.string().optional(),
  amendment_date_from: z.string().optional(),
  amendment_date_to: z.string().optional(),
  amendment_law_id: z.string().optional(),
  amendment_law_num: z.string().optional(),
  amendment_law_title: z.string().optional(),
  amendment_promulgate_date_from: z.string().optional(),
  amendment_promulgate_date_to: z.string().optional(),
  amendment_type: z.array(z.string()).optional(),
  category_cd: z.array(z.string()).optional(),
  current_revision_status: z.array(z.enum(["Latest", "NotLatest"])).optional(),
  mission: z.array(z.enum(["New", "Partial"])).optional(),
  repeal_status: z
    .array(z.enum(["Repeal", "Expire", "LossOfEffectiveness"]))
    .optional(),
  updated_from: z.string().optional(),
  updated_to: z.string().optional(),
});
