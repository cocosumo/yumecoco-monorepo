declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV_FORCED: string;
      NX_CLOUD_AUTH_TOKEN: string;
      KT_BASE_URL: string;
      KT_PORTAL: string;
      KT_CUSTOMER: string;
      KT_STORE: string;
      KT_EMPLOYEE: string;
      KT_CUST_GROUP: string;
      KT_CUST_MEMOS: string;
      KT_PROJECT_TYPE: string;
      KT_PROJECT: string;
      KT_ESTIMATE_MAJORITEMS: string;
      KT_ESTIMATE_MIDDLEITEMS: string;
      KT_ESTIMATE_ELEMENTS: string;
      KT_ESTIMATE: string;
      KT_INVOICE: string;
      KT_LOGIN_AUTH: string;
      KT_CLIENT_ID: string;
      KT_CLIENT_SECRET: string;
      KT_REDIRECT_URI: string;
      KT_AUTH_CODE: string;
      KT_REFRESH_TOKEN: string;
      DS_INTEGRATOR_KEY: string;
      DS_USER_ID: string;
      DS_ACCOUNT_ID: string;
      DS_USER_ID_PROD: string;
      DS_ACCOUNT_ID_PROD: string;
      DS_SECRET_KEY: string;
      NX_CLOUD_AUTH_TOKEN: string;
      CW_TOKEN_RAS: string;
      CW_TOKEN_REPORTER: string;
      CW_CHATWORK_TICKET: string;
      CW_TOKEN_COCOSYSTEM: string;
      ANDPAD_CLIENT_ID: string;
      ANDPAD_CLIENT_SECRET: string;
      ANDPAD_USER_ID: string;
      ANDPAD_USER_PASS: string;
      ANDPAD_CODE: string;
      KT_BASE_URL: string;
      LOCAL_URL: string;
      COCO_BASE_URL: string;
      GOOGLE_MAPS_KEY: string;
      OPENAI_API_KEY: string;
      AWS_API_KEY: string;
      AWS_S3_ACCESS_KEY: string;
      AWS_S3_SECRET_ACCESS_KEY: string;
      SENDGRID_API_KEY: string;
      SERVER_API_KEY: string;
      KOKOAS_API_KEY: string;
    }
  }
}

export {}
