# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

The worst-case asymptotic complexity for my implementation would be $\Theta(n^2 * 2^n)$. This is because for the problem we have n cities, but there are $2^(n-1)$ subsets of the cities, this is also not including the starting city. One we have the subset, for each we have to calculate the cost of the subset ending at each city (evaluate the trip cost). This will take $\Theta(n)$ for iterations. Next we have to look at the recursivecall. For each subset and end city, we have to calculate the cost and this will iterate over all posible transitions. The worst case memory complexity is $\Theta(n * 2^n)$. This is because the memoization table needs to store the results for each subset and end city. So as we found out in the previous complexitythe total entries is $2^(n-1) * n$. Each entry also stores a single cost value which would have a time complexity of $\Theta(1)$. Once we have this, we can then look at the one recursive call per city, this would be $\Theta(1)$. SO for the memory complexity we have $\Theta(n * 2^n)$. 

References and Resources:
I watched a lot of extra videos to get an idea of how to do this problem. I checked others repositories but all the ones I looked at referenced bit masking so I have a basic understanding of it ut not enough to implement it myself so I stuck with a set path. 
https://www.youtube.com/watch?v=-JjA4BLQyqE
https://medium.com/basecs/speeding-up-the-traveling-salesman-using-dynamic-programming-b76d7552e8dd
https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/

I certify that I have listed all sources used to complete this exercise, including the use
of any Large Language Models. All of the work is my own, except where stated
otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is
suspected, charges may be filed against me without prior notice.

