# GitHub Actions CI/CD Configuration Guide

This document provides the necessary configuration steps for setting up the GitHub Actions CI/CD workflow.

## Required GitHub Secrets

In your GitHub repository, you need to set up the following secrets (Settings > Secrets and variables > Actions > New repository secret):

1. `VITE_API_URL` - URL of the API service
2. `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID
3. `DEPLOY_HOST` - Hostname of the deployment server
4. `DEPLOY_USERNAME` - Username for the deployment server
5. `DEPLOY_SSH_KEY` - Private SSH key for connecting to the deployment server

## GitHub Container Registry (GHCR) Configuration

The GitHub Actions workflow uses GitHub Container Registry to store and manage Docker images. To use GHCR, ensure that:

1. "Improved container support" is enabled in your repository settings (Settings > Features > Packages)
2. The repository has appropriate permissions to publish packages (by default, the workflow uses `GITHUB_TOKEN` for authentication)

## Workflow Description

The workflow consists of two main jobs:

1. **build-and-deploy**:
   - Checks out the code
   - Sets up Node.js and pnpm
   - Generates environment variable file
   - Builds and pushes the Docker image to GHCR

2. **deploy**:
   - Connects to the deployment server via SSH
   - Pulls the latest Docker image
   - Stops and removes the old container
   - Creates environment variable file
   - Starts a new container
   - Cleans up old images

## Manual Deployment Trigger

In addition to automatic triggering on pushes to the main branch, you can manually trigger the workflow through the GitHub interface:

1. Navigate to the "Actions" tab of your repository
2. Select the "Build and Deploy" workflow from the left sidebar
3. Click the "Run workflow" button
4. Select the branch you want to deploy
5. Click "Run workflow" to confirm

## Troubleshooting

If the deployment fails, check:

1. Error messages in the GitHub Actions logs
2. Ensure all necessary secrets are correctly set up
3. Make sure the deployment server can access GHCR and has sufficient permissions to pull images
4. Check Docker logs on the server: `docker logs jobtracker-container` 