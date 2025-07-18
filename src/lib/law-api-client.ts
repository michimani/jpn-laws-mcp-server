import type {
  AttachmentParams,
  KeywordSearchParams,
  KeywordSearchResponse,
  LawApiError,
  LawContentParams,
  LawContentResponse,
  LawFileParams,
  LawRevisionParams,
  LawRevisionsResponse,
  LawSearchParams,
  LawsResponse,
} from "../types/law-api.js";

const BASE_URL = "https://laws.e-gov.go.jp/api/2/";

export class LawApiClient {
  private baseURL: string;

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL;
  }

  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, unknown> = {},
  ): Promise<T> {
    const url = new URL(endpoint, this.baseURL);

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          url.searchParams.append(key, value.join(","));
        } else {
          url.searchParams.append(key, value.toString());
        }
      }
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      let errorData: LawApiError;
      try {
        const errorResponse = await response.json();
        errorData = errorResponse as LawApiError;
      } catch {
        errorData = {
          error_code: response.status.toString(),
          error_message: response.statusText,
        };
      }
      throw new Error(
        `API Error: ${errorData.error_code} - ${errorData.error_message}`,
      );
    }

    const responseText = await response.text();
    try {
      const responseData = JSON.parse(responseText);
      return responseData as T;
    } catch (_error) {
      throw new Error(
        `Failed to parse response: raw response: ${response}, url: ${url.toString()}, response text: ${responseText.substring(0, 500)}`,
      );
    }
  }

  async searchLaws(params: LawSearchParams): Promise<LawsResponse> {
    return this.makeRequest<LawsResponse>(
      "laws",
      params as Record<string, unknown>,
    );
  }

  async getLawRevisions(
    params: LawRevisionParams,
  ): Promise<LawRevisionsResponse> {
    const { law_id_or_num, ...queryParams } = params;
    return this.makeRequest<LawRevisionsResponse>(
      `law_revisions/${encodeURIComponent(law_id_or_num)}`,
      queryParams,
    );
  }

  async getLawContent(params: LawContentParams): Promise<LawContentResponse> {
    const { law_id_or_num_or_revision_id, ...queryParams } = params;
    return this.makeRequest<LawContentResponse>(
      `law_data/${encodeURIComponent(law_id_or_num_or_revision_id)}`,
      queryParams,
    );
  }

  async searchByKeyword(
    params: KeywordSearchParams,
  ): Promise<KeywordSearchResponse> {
    return this.makeRequest<KeywordSearchResponse>(
      "keyword",
      params as unknown as Record<string, unknown>,
    );
  }

  async getAttachment(params: AttachmentParams): Promise<ArrayBuffer> {
    const { law_revision_id, src } = params;
    const url = new URL(
      `attachment/${encodeURIComponent(law_revision_id)}`,
      this.baseURL,
    );

    if (src) {
      url.searchParams.append("src", src);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Failed to fetch attachment: ${response.status} ${response.statusText}`,
      );
    }

    return await response.arrayBuffer();
  }

  async getLawFile(params: LawFileParams): Promise<ArrayBuffer> {
    const { file_type, law_id_or_num_or_revision_id, asof } = params;
    const url = new URL(
      `law_file/${encodeURIComponent(file_type)}/${encodeURIComponent(law_id_or_num_or_revision_id)}`,
      this.baseURL,
    );

    if (asof) {
      url.searchParams.append("asof", asof);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `Failed to fetch law file: ${response.status} ${response.statusText}`,
      );
    }

    return await response.arrayBuffer();
  }
}

export const lawApiClient = new LawApiClient();
