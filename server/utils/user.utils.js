import jwt from "jsonwebtoken"

export function createAccessToken({ userId }) {
    const accessToken = jwt.sign({
        userId
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d"})

    return accessToken
}

export function createRefreshToken({ userId }) {
    const refreshToken = jwt.sign({
        userId
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d"})

    return refreshToken
}

export function readRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
}

export function readAccessToken(accessToken) {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
}

export function createAdminToken({ email, password }) {
    const adminToken = jwt.sign({
        email, password
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d"})

    return adminToken
}

export function readAdminAccessToken(accessToken) {
    return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
}