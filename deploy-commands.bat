@echo off
echo === Deploiement Formation DAF sur GitHub ===
echo.

echo [1] Initialisation Git...
git init

echo [2] Ajout des fichiers...
git add .

echo [3] Premier commit...
git commit -m "Initial commit - Formation DAF avec PWA"

echo [4] Ajout du remote GitHub...
echo IMPORTANT: Remplacez REPO_NAME par le nom de votre repository!
echo Exemple: git remote add origin https://github.com/yves34690/daf-formation.git
pause

echo [5] Push vers GitHub...
git branch -M main
git push -u origin main

echo.
echo === Deploiement termine! ===
echo.
echo Maintenant:
echo 1. Allez sur https://github.com/yves34690/VOTRE-REPO
echo 2. Settings > Pages
echo 3. Source: GitHub Actions
echo.
echo Votre app sera disponible dans quelques minutes sur:
echo https://yves34690.github.io/VOTRE-REPO/
pause