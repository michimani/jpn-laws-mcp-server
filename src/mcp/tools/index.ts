import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { lawApiClient } from "../../lib/law-api-client.js";
import {
  KeywordSearchSchema,
  LawContentSchema,
  LawRevisionsSchema,
  LawSearchSchema,
} from "../../lib/types.js";
import type {
  KeywordSearchParams,
  LawRevisionParams,
  LawSearchParams,
} from "../../types/law-api.js";

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
