import tokenValid from './tokenValid';


describe('tokenValid', () => {
  const expiresIn = 7889238; // ３ヶ月

  it('should return false if token is expired', () => {
    const createdAt = new Date(2021, 1, 1).getTime() / 1000; // 2021-01-01 (秒)

    const expiresOnDate = new Date((createdAt + expiresIn) * 1000).toDateString();

    console.log(`Token expires on : ${expiresOnDate}`);

    expect(tokenValid({
      created_at: createdAt,
      expires_in: expiresIn,
    })).toBe(false);

  });

  it('should return true if token is not expired', () => {
    const createdAt = new Date().getTime() / 1000; // 今の日時 (秒)

    const expiresOnDate = new Date((createdAt + expiresIn) * 1000).toDateString();

    console.log(`Token expires on : ${expiresOnDate}`);

    expect(tokenValid({
      created_at: createdAt,
      expires_in: expiresIn,
    })).toBe(true);

  });
});