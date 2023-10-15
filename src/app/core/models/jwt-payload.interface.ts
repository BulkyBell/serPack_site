export interface IJWTPayload {
  jti: string;
  sub: string;
  nbf: number;
  exp: number;
  iss: string;
  admin: string;
  aud: string;
}
