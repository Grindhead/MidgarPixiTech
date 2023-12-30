# MidgarPixiTech

Unlock the Power of Mako and Pixi in Your TypeScript Projects

## Installation Instructions

### Step 1: Install Node.js

Ensure Node.js v16 or higher is installed. If not, download the latest LTS version from the [Node.js website](https://nodejs.org/).

### Step 2: Install pnpm

To manage dependencies efficiently, globally install pnpm by running the following command in your terminal:

```
npm install -g pnpm
```

### Step 3: Install Dependencies

```
pnpm install
```

## Project Commands

### Build & Publish to NPM

Follow these steps to create a build and publish it to NPM:

#### Step 1: Update the Project

Run:

```
pnpm run update
```

This updates the project package.json version number using semantic versioning and generates a file documenting changes.

#### Step 2: Create a Release Pull Request

Create a pull request against the main branch.

#### Step 3: Automated Deployment

Once the PR is approved, GitHub Actions will create a new release PR. Once the release PR is approved, GitHub Actions will automatically deploy to NPM.

### Available Commands

- `pnpm build`: Generates a production build in the dist directory.

- `pnpm run update`: Updates the project using semver and generates a change documentation file. Do this before pushing changes to git. It automatically updates the version number.

- `pnpm docs`: Generates documentation in dist/docs.

- `pnpm lint`: Runs ESLint over the codebase.

- `pnpm ci`: Publishes the package to NPM. This task is called by GitHub Actions and should not be invoked directly.
