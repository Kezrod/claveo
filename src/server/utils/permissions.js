export function canSearch(user) {
    if (user.plan === "free" && user.searchesUsed >= 10) {
        return false;
    }
    return true;
}

export function canUploadCSV(user) {
    return user.plan === "tier1" || user.plan === "tier2";
}

export function canExport(user) {
    return user.plan === "tier2";
}
