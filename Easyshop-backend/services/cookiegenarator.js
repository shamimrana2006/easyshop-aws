const cookieGenerate = (
  res,
  {
    isSecure = true,
    cookieName = "token",
    cookieValue = "",
    maxAge = 60 * 60 * 1000,
  }
) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: isSecure, // Not accessible via JS
    secure: isSecure,
    sameSite: isSecure ? "None" : "lax",
    maxAge, // 1 m in milliseconds
    path: "/",
  });
};

module.exports = { cookieGenerate };
