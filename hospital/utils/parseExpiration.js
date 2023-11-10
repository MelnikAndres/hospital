function parseExpiration(expiration) {
    const match = /(?<value>^[0-9]+)(?<duration>s|m|h)$/.exec(expiration)
    if (!match) return 0
    const { value, duration } = match.groups
    switch (duration) {
    case 's':
        return value * 1000
    case 'm':
        return value * 1000 * 60
    case 'h':
        return value * 1000 * 60 * 60
    default:
        return 0
    }
}

module.exports = parseExpiration