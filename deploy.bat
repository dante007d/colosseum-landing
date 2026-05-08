@echo off
echo ========================================
echo   COLOSSEUM 2026 - GITHUB DEPLOYER
echo ========================================
echo.
echo 1. Go to https://github.com/new
echo 2. Create a repo named 'colosseum-landing'
echo 3. Copy the HTTPS link (e.g., https://github.com/username/colosseum-landing.git)
echo.
set /p REPO_URL="PASTE THE LINK HERE: "
echo.
echo Setting up remote...
git remote set-url origin %REPO_URL%
echo.
echo Staging and committing changes...
git add .
git commit -m "Finalize Colosseum 2026 Landing Page"
echo.
echo Pushing to GitHub...
git push -u origin main
echo.
echo ========================================
echo   DONE! Your site is now on GitHub.
echo ========================================
pause
