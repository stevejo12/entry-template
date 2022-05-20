import jwt from 'jsonwebtoken';

export const GenerateTokenAndRefreshToken = (id) => {
  var token = jwt.sign(
    {
      id: id
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_TIME }
  );

  var refreshToken = jwt.sign(
    {
      id: id
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_TIME }
  );

  return { token, refreshToken };
}