@echo off
echo Starting upload to GitHub...
git add .
git commit -m "Final Polish: Mobile optimization, merged events, and countdown"
git push origin main || git push origin master || git push
echo Upload complete!
pause
