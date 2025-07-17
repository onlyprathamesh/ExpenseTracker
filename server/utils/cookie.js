const setTokenCookie = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
};

module.exports = {setTokenCookie};