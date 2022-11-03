declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      KT_BASE_URL: string;
      API_CUSTOMERS: string;
      API_STORES: string;
      API_EMPLOYEES: string;
      API_CUST_GROUP: string;
      API_CUST_MEMO: string;
      API_CONSTRUCTION_TYPE: string;
      API_CONSTRUCTION_DETAILS: string;
      API_ESTIMATE_MAJORITEMS: string;
      API_ESTIMATE_MIDDLEITEMS: string;
      API_ESTIMATE_ELEMENTS: string;
      API_ESTIMATE: string;
      LOGIN_AUTH: string;
      DOCUSIGN_BASE_URL: string;
      DOCUSIGN_LOCAL_URL: string;
      KT_CLIENT_ID: string;
      KT_CLIENT_SECRET: string;
      KT_REDIRECT_URI: string;
      KT_AUTH_CODE: string;
      KT_REFRESH_TOKEN: string;
    }
  }
}

export {}
