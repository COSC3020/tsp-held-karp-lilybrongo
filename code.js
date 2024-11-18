function tsp_hk(distanceMatrix) {

    //Each city is treated as a starting point. The initial memoization state for each city is set to 0 (cost to visit only that city).
    //For each subset of visited cities (visitedCities), and for each possible current city (currentCity), calculate the cost of extending the tour to an unvisited city (nextCity).
    //After processing all subsets, the result is found by calculating the cost of completing the tour by returning to the starting city.
    const n = distanceMatrix.length;

    console.log(`\n+ cities: ${n}`); 

    // Base case: If there are 0 or 1 cities, no tour is needed
    // The idea of if myself or an already visited city the bug can't jump to these spots
    if (n <= 1) {
        return 0;
    }

    const memo = Array(n+1)
        .fill(null)
        .map(() => Array(1 << (n+1)).fill(0);


    // Initialize: Starting at each city with only that city visited
    for (let i = 0; i < n; i++) {
        memo[1 << i][i] = 0; // Cost to visit only city `i` is 0
    }


    // Iterate over all subsets of visited cities (bitmask)
    for (let visitedCities = 0; visitedCities < (1 << n); visitedCities++) {
        for (let currentCity = 0; currentCity < n; currentCity++) {
            // Skip invalid states where 'currentCity' is not in the subset
            if (!(visitedCities & (1 << currentCity))) continue;

            // Try extending the tour to each unvisited city
            for (let nextCity = 0; nextCity < n; nextCity++) {
                if (visitedCities & (1 << nextCity)) continue; // Skip if already visited!

                const nextVisitedCities = visitedCities | (1 << nextCity); // Add 'nextCity' to the set
                const newCost =
                    memo[visitedCities][currentCity] + distanceMatrix[currentCity][nextCity];
                memo[nextVisitedCities][nextCity] = Math.min(
                    memo[nextVisitedCities][nextCity],
                    newCost
                );
            }
        }
    }

    // Find the minimum cost to visit all cities and return to the starting city
    let minCost = Infinity;
    const allCitiesVisited = (1 << n) - 1; // All bits set (all cities visited)
    for (let lastCity = 0; lastCity < n; lastCity++) {
        const tourCost = memo[allCitiesVisited][lastCity] + distanceMatrix[lastCity][0]; // Return to starting city
        minCost = Math.min(minCost, tourCost);
    }

    return minCost;
}
