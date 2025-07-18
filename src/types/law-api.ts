export interface LawSearchParams {
  law_id?: string;
  law_num?: string;
  law_num_era?: LawNumEra;
  law_num_year?: number;
  law_num_type?: LawNumType;
  law_num_num?: string;
  law_title?: string;
  law_title_kana?: string;
  law_type?: LawType[];
  amendment_law_id?: string;
  asof?: string;
  category_cd?: CategoryCode[];
  mission?: Mission[];
  promulgation_date_from?: string;
  promulgation_date_to?: string;
  repeal_status?: RepealStatus[];
  limit?: number;
  offset?: number;
  order?: string;
  response_format?: ResponseFormat;
  omit_current_revision_info?: boolean;
}

export interface LawRevisionParams {
  law_id_or_num: string;
  law_title?: string;
  law_title_kana?: string;
  amendment_date_from?: string;
  amendment_date_to?: string;
  amendment_law_id?: string;
  amendment_law_num?: string;
  amendment_law_title?: string;
  amendment_promulgate_date_from?: string;
  amendment_promulgate_date_to?: string;
  amendment_type?: AmendmentType[];
  category_cd?: CategoryCode[];
  current_revision_status?: CurrentRevisionStatus[];
  mission?: Mission[];
  repeal_status?: RepealStatus[];
  updated_from?: string;
  updated_to?: string;
  response_format?: ResponseFormat;
}

export interface LawContentParams {
  law_id_or_num_or_revision_id: string;
  law_full_text_format?: ResponseFormat;
  asof?: string;
  elm?: string;
  omit_amendment_suppl_provision?: boolean;
  include_attached_file_content?: boolean;
  response_format?: ResponseFormat;
}

export interface KeywordSearchParams {
  keyword: string;
  law_num?: string;
  law_num_era?: LawNumEra;
  law_num_year?: number;
  law_num_type?: LawNumType;
  law_num_num?: string;
  law_type?: LawType[];
  asof?: string;
  category_cd?: CategoryCode[];
  promulgation_date_from?: string;
  promulgation_date_to?: string;
  limit?: number;
  offset?: number;
  sentences_limit?: number;
  sentence_text_size?: number;
  highlight_tag?: string;
  response_format?: ResponseFormat;
}

export interface AttachmentParams {
  law_revision_id: string;
  src?: string;
}

export interface LawFileParams {
  file_type: FileType;
  law_id_or_num_or_revision_id: string;
  asof?: string;
}

export type ResponseFormat = "json" | "xml";
export type FileType = "xml" | "json";

export type LawNumEra = "Meiji" | "Taisho" | "Showa" | "Heisei" | "Reiwa";

export type LawNumType =
  | "Act"
  | "CabinetOrder"
  | "ImperialOrder"
  | "MinisterialOrdinance"
  | "Rule"
  | "Misc";

export type LawType =
  | "Act"
  | "CabinetOrder"
  | "ImperialOrder"
  | "MinisterialOrdinance"
  | "Rule"
  | "Misc";

export type CategoryCode =
  | "001"
  | "002"
  | "003"
  | "004"
  | "005"
  | "006"
  | "007"
  | "008"
  | "009"
  | "010"
  | "011"
  | "012"
  | "013"
  | "014"
  | "015"
  | "016"
  | "017"
  | "018"
  | "019"
  | "020"
  | "021"
  | "022"
  | "023"
  | "024"
  | "025"
  | "026"
  | "027"
  | "028"
  | "029"
  | "030"
  | "031"
  | "032"
  | "033"
  | "034"
  | "035"
  | "036"
  | "037"
  | "038"
  | "039"
  | "040"
  | "041"
  | "042"
  | "043"
  | "044"
  | "045"
  | "046"
  | "047"
  | "048"
  | "049"
  | "050";

export type Mission = "New" | "Partial";

export type RepealStatus = "Repeal" | "Expire" | "LossOfEffectiveness";

export type AmendmentType =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

export type CurrentRevisionStatus = "Latest" | "NotLatest";

export interface LawInfo {
  law_id: string;
  law_num: string;
  law_num_era: LawNumEra;
  law_num_year: number;
  law_num_type: LawNumType;
  law_num_num: string;
  promulgation_date: string;
  law_type: LawType;
  category_cd: CategoryCode;
}

export interface RevisionInfo {
  law_revision_id: string;
  law_title: string;
  law_title_kana: string;
  amendment_date: string;
  amendment_law_id: string;
  amendment_law_num: string;
  amendment_law_title: string;
  amendment_promulgate_date: string;
  amendment_type: AmendmentType;
  current_revision_status: CurrentRevisionStatus;
  mission: Mission;
  repeal_status: RepealStatus;
  repeal_date: string;
  updated: string;
}

export interface Law {
  law_info: LawInfo;
  revision_info: RevisionInfo;
  current_revision_info?: RevisionInfo;
}

export interface LawsResponse {
  laws: Law[];
  total_count: number;
  offset: number;
  limit: number;
}

export interface LawRevisionsResponse {
  law_revisions: RevisionInfo[];
  total_count: number;
  offset: number;
  limit: number;
}

export interface LawContentResponse {
  law_data: {
    law_info: LawInfo;
    revision_info: RevisionInfo;
    law_full_text: string;
  };
}

export interface KeywordSearchResponse {
  keyword_search_results: {
    law_info: LawInfo;
    revision_info: RevisionInfo;
    sentences: {
      sentence: string;
      sentence_num: number;
    }[];
  }[];
  total_count: number;
  offset: number;
  limit: number;
}

export interface LawApiError {
  error_code: string;
  error_message: string;
  detail?: string;
}
