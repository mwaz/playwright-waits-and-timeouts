# Playwright Test API

[![CircleCI](https://circleci.com/gh/mwaz/playwright-waits-and-timeouts.svg?style=svg)](https://circleci.com/gh/mwaz/playwright-waits-and-timeouts)

<p align="center"><img src="https://avatars3.githubusercontent.com/u/59034516"></p>

This project is a simple React application with playwright tests created from the `create react app` bootstrap project. It is designed to be a testing frontend and test repository for the "Mastering Waits and Timeouts in Playwright" tutorial for CircleCI.

It provides basic user behaviout for a simulated login, fetching products, adding items to carts and also basic navigation.

## Prerequisites

- Node.js (v16 or later)

- npm (usually comes with Node.js)

## Installation

Clone the repository for this project using the commands below

```bash
git clone git@github.com:mwaz/playwright-waits-and-timeouts.git
```

Navigate to the project directory in your terminal.

```bash
cd playwright-waits-and-timeouts;
```

Install the required dependencies for the application by running:

```bash
npm install
```

Install the required dependencies for the test repository by running:

```bash
cd playwright;
npm install
```

Running the Application
To start the application, run the following command from the project's root directory:

```bash
npm start
```

Running Playwright tests
To start the API server, run the following command from the project's root directory:

```bash
cd playwright;
npm test
```

> **Info:** The API server is also hosted on Vercel at [https://playwright-waits-and-timeouts.vercel.app/](https://playwright-waits-and-timeouts.vercel.app/), which makes it easier to run the tests on CircleCI.

## Details

This repo is built following a tutorial published on CircleCI blog under the CircleCI Guest Writer Program.

- Blog post: [Mastering Waits and Timeouts in Playwright][blog]
- Author's GitHub profile: [Waweru Mwaura][author]

### About CircleCI Guest Writer Program

Join a team of freelance writers and write about your favorite technology topics for the CircleCI blog. Read more about the program [here][gwp-program].

[blog]: https://circleci.com/blog/mastering-waits-and-timeouts-in-playwright
[author]: https://github.com/mwaz
[gwp-program]: https://circle.ci/3ahQxfu
