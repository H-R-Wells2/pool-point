# PoolPoint
PoolPoint is a web application built with Next.js 14, TypeScript, and MongoDB. It serves as a tool for counting points in snooker games and calculates the amount to be paid by players.

## Features
* Snooker Point Counter: Track points scored by players during snooker games.
* Amount Calculation: Automatically calculate the amount to be paid by each player based on their scores.
* Result History: View the history of past game results.
* Date Filtering: Filter results by date to view specific game sessions.
* Responsive Design: Ensures usability across various devices and screen sizes.

## Usage
1. Visit the [PoolPoint web application](https://pool-point.vercel.app/).
2. Start a new game session by entering the player names and keeping track of their scores.
3. Once the game is finished, submit the results to calculate the amount to be paid by each player.
4. View the result history to see past game sessions and amounts paid.

## Installation
1. Clone the repository:

```bash
git clone https://github.com/H-R-Wells2/pool-point
```
2. Install dependencies:

```bash
cd poolpoint
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory.
Add your MongoDB connection string as `MONGODB_URI`.
Add any other necessary environment variables.

4. Run the development server:

```bash
npm run dev
```

5. Access the application at http://localhost:3000.

## Contributing
Contributions are welcome! If you have any suggestions, bug fixes, or feature requests, feel free to open an issue or submit a pull request.

## Author
* [HRWells](https://github.com/H-R-Wells2)