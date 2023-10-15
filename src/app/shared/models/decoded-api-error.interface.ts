export interface IDecodedApiError {
  isDecoded: boolean;
  isErrorCode: boolean;
  errorCode?: string;
  errorCodeI18n?: string;
  error?: string;
}
