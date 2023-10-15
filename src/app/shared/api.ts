export const api = {
  login: `v1_api/login`,
  refreshCaptcha: `v1_api/login/captcha/{0}`,
  logoff: `v1_api/logoff`,
  changePassword: `user/changepassword/{0}`,
  changeStore: `changeStore/{0}/{1}`,
  userRoles: `user/roles/{0}`,

  odata: `api_odata/`,

  report: `report/{0}/{1}`,
  reportsInfo: `reportsInfo/listByCategory/{0}`,

  data: `data/{0}`,
  post_data: `data`,
  entity: `entity/{0}`,
  page: `data/page/{0}`,
  secure: `secure/{0}`,
  cmd: `entity/{0}/cmd/{1}`,
  sms: `sms/{0}`,
};
