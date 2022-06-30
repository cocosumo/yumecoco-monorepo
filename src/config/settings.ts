export const isProduction = process.env.NODE_ENV;

export const yumecocoDocusign = {
  baseUrl: isProduction ? process.env.DOCUSIGN_BASE_URL : 'http://localhost:3000',
};