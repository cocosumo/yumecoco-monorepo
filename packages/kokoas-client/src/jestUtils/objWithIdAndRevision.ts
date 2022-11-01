export const objWithIdAndRevision = () => expect.objectContaining({
  id: expect.any(String),
  revision: expect.any(String),
});