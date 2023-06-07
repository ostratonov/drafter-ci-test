"use strict";

const getTicketAliases = patchNotes => {
    const ticketRegex = /BLS-\d+/gi

    const matches = patchNotes.match(ticketRegex) || []

    return matches.map(match => match.toUpperCase())
}

module.exports = (patchNotes, patchVersion, options) => {
    const aliases = getTicketAliases(patchNotes)
    console.log('aliases', aliases)
    console.log('notes', patchNotes)

    return Promise.resolve()
}