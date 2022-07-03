export const isProduction = process.env.NODE_ENV;

export const yumecocoDocusign = {

  baseUrl: isProduction?.includes('prod') ? process.env.DOCUSIGN_BASE_URL : process.env.DOCUSIGN_LOCAL_URL,
};