export function findBestResponse(userInput) {
    const text = userInput.toLowerCase();
    
    let bestMatch = null;
    let maxMatches = 0;

    for (const entry of bharatKnowledgeBase) {
        let matchCount = 0;
        for (const keyword of entry.keywords) {
            if (text.includes(keyword)) {
                matchCount++;
            }
        }
        if (matchCount > maxMatches) {
            maxMatches = matchCount;
            bestMatch = entry.response;
        }
    }

    if (bestMatch) {
        return bestMatch;
    }

    // Return a random fallback
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
}
