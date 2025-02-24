# Myer E2E Automation

## Overview
This project is a Node.js-based test automation framework that utilizes Cucumber and Playwright with TypeScript. It allows running end-to-end tests efficiently with behavior-driven development (BDD) principles.

## Prerequisites
* Node.js (Latest LTS version recommended)
* npm (Comes with Node.js)
* Chrome/ Microsoft Edge/ Firefox browser

## Steps to Install
1. Clone the repository
   ```bash
    git clone <repository_url>
    cd <project_directory>
   ```

2. Install the dependencies
    ```bash
     npm install
    ```
## Running Tests
### Run all tests for specific environment with tags
1. Run in Windows with PowerShell
   
   ```bash
     $env:NODE_ENV="staging"; $env:BROWSER_NAME="chrome"; npx cucumber-js --tags "@staging"
   ```

 2. Run in Linux
 
     ```bash
       NODE_ENV="staging" BROWSER_NAME="chrome" npx cucumber-js --tags "@staging"
     ```
### Run all tests
 1. Run in Windows with PowerShell
   
     ```bash
       $env:NODE_ENV="staging"; $env:BROWSER_NAME="chrome"; npx cucumber-js"
     ```

 2. Run in Linux
 
     ```bash
       NODE_ENV="staging" BROWSER_NAME="chrome" npx cucumber-js"
     ```

 ## Reports
 Report is generated in html format & save in /reports folder.
