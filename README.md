# MidgarPixiTech: TypeScript Toolkit for Modern Web Development

## Table of Contents

1. [Overview](#overview)
2. [Installation Guide](#installation-guide)
3. [Project Management Commands](#project-management-commands)
4. [Usage Examples](#usage-examples)
5. [Contributing to the Project](#contributing-to-the-project)

---

## Overview

MidgarPixiTech is a comprehensive TypeScript toolkit designed to enhance and streamline modern web development. Leveraging the power of both Mako and Pixi, this toolkit provides developers with a robust and efficient solution for building scalable and performant web applications.

---

## Installation Guide

### Step 1: Install Node.js

Ensure that Node.js v16 or higher is installed on your system. If not, download the latest LTS version from the [Node.js official website](https://nodejs.org/).

### Step 2: Install pnpm

To manage project dependencies more effectively, install pnpm globally using the following command:

`npm install -g pnpm`

### Step 3: Install Project Dependencies

Navigate to your project directory and execute:

`pnpm install`

---

## Project Management Commands

### Building and Publishing to NPM

To build and publish your project to NPM, follow these steps:

#### Step 1: Update the Project

Run the following command to update your project's `package.json` version number according to semantic versioning and generate a changelog:

`pnpm run update`

#### Step 2: Create a Release Pull Request

Initiate a pull request against the main branch of your repository for review.

#### Step 3: Automated Deployment

Once the pull request is approved, GitHub Actions will automatically handle the creation of a new release and deployment to NPM.

### Key Commands

- `pnpm build`: Compiles a production-ready build in the `dist` directory.
- `pnpm run update`: Automates versioning and changelog generation.
- `pnpm docs`: Generates project documentation in `dist/docs`.
- `pnpm lint`: Executes ESLint to ensure code quality.
- `pnpm ci`: Automates the publishing process to NPM (used by GitHub Actions).

---

## Usage Examples

### Example: Creating a Basic Component

```typescript
import { createButton } from 'midgar-pixi-tech';
```

## Contributing to the Project

We welcome contributions from the developer community. To contribute, you can submit pull requests, report issues, or suggest new features. Your input is valuable in driving the continuous improvement of MidgarPixiTech.
