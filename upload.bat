@echo off
echo Starting upload to GitHub...
git add .
git commit -m "Final Polish: Mobile optimization, merged events, and countdown"
git push origin master
echo Upload complete!
pause
