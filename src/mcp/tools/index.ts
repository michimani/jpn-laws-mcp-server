import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { lawApiClient } from "../../lib/law-api-client.js";
import type {
  KeywordSearchParams,
  LawRevisionParams,
  LawSearchParams,
} from "../../types/law-api.js";

const LawSearchSchema = z.object({
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

const KeywordSearchSchema = z.object({
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

const LawContentSchema = z.object({
  law_id_or_num_or_revision_id: z.string(),
  asof: z.string().optional(),
  elm: z.string().optional(),
  omit_amendment_suppl_provision: z.boolean().optional(),
  include_attached_file_content: z.boolean().optional(),
});

const LawRevisionsSchema = z.object({
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

export function registerTools(server: McpServer) {
  server.tool(
    "search_laws",
    "Search Japanese laws by various criteria such as law ID, title, type, category, etc.",
    LawSearchSchema.shape,
    async (args) => {
      try {
        const params = LawSearchSchema.parse(args);
        const response = await lawApiClient.searchLaws(
          params as LawSearchParams,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error searching laws: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );

  server.tool(
    "search_laws_by_keyword",
    "Search Japanese laws by keyword in full text with advanced search capabilities",
    KeywordSearchSchema.shape,
    async (args) => {
      try {
        const params = KeywordSearchSchema.parse(args);
        const response = await lawApiClient.searchByKeyword(
          params as KeywordSearchParams,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error searching laws by keyword: ${error instanceof Error ? error.message : String(error)}, args: ${JSON.stringify(args)}`,
            },
          ],
        };
      }
    },
  );

  server.tool(
    "get_law_content",
    "Get the full text content of a specific Japanese law",
    LawContentSchema.shape,
    async (args) => {
      try {
        const params = LawContentSchema.parse(args);
        const response = await lawApiClient.getLawContent(params);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting law content: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );

  server.tool(
    "get_law_revisions",
    "Get revision history for a specific Japanese law",
    LawRevisionsSchema.shape,
    async (args) => {
      try {
        const params = LawRevisionsSchema.parse(args);
        const response = await lawApiClient.getLawRevisions(
          params as LawRevisionParams,
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text",
              text: `Error getting law revisions: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
        };
      }
    },
  );
}
