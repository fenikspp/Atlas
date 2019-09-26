const { authSecret } = require('../../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const FacebookStrategy = require('passport-facebook')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params, (payload, done) => {
        app.db('atlas.employees')
            .where({ idemployees: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    const faceParams = {
        clientID: '2436582983091608',
        clientSecret: '6389a144c871bb88e82e63ca66df8e4d',
        callbackURL: 'http://127.0.0.1:8088/auth/facebook/callback'
    }
    const FaceStrategy = new FacebookStrategy(faceParams, (accessToken, refreshToken, profile, cb) => {
        console.log(accessToken, refreshToken, profile)
    })

    passport.use(strategy)
    passport.use(FaceStrategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false }),
        authenticateFacebook: () => passport.authenticate('facebook')
    }
}
