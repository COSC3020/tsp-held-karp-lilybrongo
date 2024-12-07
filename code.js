/* 
Initialization:
The distanceMatrix stores the distances between cities.
The memo object stores the results of subproblems to avoid recalculating them.
cost function:
This function calculates the minimum cost of a subproblem, defined by a set of visited cities (set) and the last city visited (end).
It uses memoization to improve efficiency.
Main loop:
The main loop iterates over all possible cities as the last city visited.
It calculates the cost of the tour starting from city 0, visiting all other cities in the set, and ending at the current city.
The minimum cost is stored in minTourCost.
*/

/*// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```
*/


function tsp_hk(distanceMatrix) {
//to start I need to check if the matrix is empty OR if the matrix contains only one element (itself)
    //empty case
    if (distanceMatrix.length === 0 || distanceMatrix[0].length === 0) {
        return 0;
    }
    //single-city case
    if (distanceMatrix.length === 1) {
        return distanceMatrix[0][0];
    }

    //we need to get the number of cities based offf of the size of the distance matrix
    const n = distanceMatrix.length;

    // Initialize the memoization table that will store the previously computed results
    const memo = {};
  
    // Helper function to calculate the cost of traveling a specific route
    //set is going to be the group of cities that still needs to be visited
    //end is the city that the current route ends
    
    function cost(set, end) {
    //the base case is fi there is only one city left in the set, then we need to return the distance from the starting city
      if (set.size === 1) { 
        return distanceMatrix[0][end];
      }  
      //in this create a key for the current set of cities and the end city
      const key = `${Array.from(set).sort().join(",")}-${end}`;
      //if this cost has already been caluclated return it
      if (key in memo) {
        return memo[key];
      }
      //we initialize the minimum cost to infinity 
      let minCost = Infinity;

      //this for loop will loop through all the ctities in order to find out which city to visit next
      //then we calculate the cost of visiting the city, and update the minimum route if it is less than the previously stored
      
      for (let i = 0; i < n; i++) {
        if (set.has(i) && i !== end) {
          const newSet = new Set(set);
          newSet.delete(i);

          const currentCost = cost(newSet, i) + distanceMatrix[i][end];
          
          //const currentCost = distanceMatrix[i][end] + cost(newSet, i);
          console.log(`Cost to ${i} from ${end}: ${currentCost}`);
          minCost = Math.min(minCost, currentCost);
          //minCost = Math.min(minCost, distanceMatrix[i][end] + cost(newSet, i));

          console.log(`Set: ${Array.from(newSet)}, End: ${end}, CurrentCost: ${currentCost}`);
        }
      }

      //we then save the minimum cost to the memoization table that we create earier
      memo[key] = minCost;
      console.log(`Memo[${key}] = ${minCost}`);
      return minCost;
    }
  
    // Create the initial set of cities (excluding the starting city)
    const cities = new Set();
    for (let i = 1; i < n; i++) {
      cities.add(i);
    }

    // Calculate the minimum cost for all possible tours starting and ending at city 0
    //start with a large number for comparisons(infinity seems like a big enough number lol)
    //lastly calculate the cost of goin g from city 0 to city i, and update the mintourcost 
    let minTourCost = Infinity;
    for (let i = 1; i < n; i++) {
        const currentTourCost = cost(cities, i); //+ distanceMatrix[i][0];
        //const currentTourCost = distanceMatrix[i][0] + cost(cities, i);
        console.log(`Tour ending at ${i} costs =  ${currentTourCost}`);
        minTourCost = Math.min(minTourCost, currentTourCost);
    }

    //return the overall minimum cost of the tour
    console.log(`Final minimum tour cost: ${minTourCost}`);
    return minTourCost;
  }
