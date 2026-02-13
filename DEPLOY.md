# Deployment Guide

This guide will help you deploy your Pixel Valentine app to the web for free using Render.

## Prerequisites

-   A [GitHub](https://github.com/) account.
-   A [Render](https://render.com/) account.

## Steps

### 1. Push Code to GitHub

If you haven't already, push your code to a new GitHub repository.

1.  Create a new repository on GitHub.
2.  Run these commands in your terminal:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
    git push -u origin main
    ```

### 2. Deploy on Render

1.  Log in to your [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** and select **Web Service**.
3.  Connect your GitHub account and select your repository.
4.  Configure the service:
    -   **Name**: `pixel-valentine` (or whatever you like)
    -   **Region**: Closest to you
    -   **Branch**: `main`
    -   **Root Directory**: Leave empty
    -   **Runtime**: `Node`
    -   **Build Command**: `npm install && npm run build`
    -   **Start Command**: `npm start`
    -   **Plan**: Free

5.  Click **Create Web Service**.

### 3. Done!

Render will build and deploy your app. Once finished, it will give you a URL (e.g., `https://pixel-valentine.onrender.com`). Share this link with your valentine! ❤️
