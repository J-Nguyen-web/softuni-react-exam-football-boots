export function arrayWords (text = '') {
    return text
    .toLowerCase()
    .split(/\s+/) //split by spaces W+ for , and .
    .filter(Boolean) // remove empty entrie
}