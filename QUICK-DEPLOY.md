# 🚀 Déploiement rapide pour yves34690

## 1️⃣ Créer le nouveau repository sur GitHub

1. Allez sur : https://github.com/new
2. Repository name : **`daf-formation`** (ou autre nom)
3. Description : "Formation DAF - Business Game interactif"
4. **Public** (important pour GitHub Pages gratuit)
5. **NE PAS** cocher "Initialize this repository with a README"
6. Cliquez sur **Create repository**

## 2️⃣ Ajuster le nom dans vite.config.ts

Ouvrez `vite.config.ts` ligne 20 et remplacez avec votre nom de repo :
```js
base: mode === 'production' ? '/daf-formation/' : '/',
```

## 3️⃣ Déployer votre code

```bash
# Dans le dossier du projet
git init
git add .
git commit -m "Initial commit - Formation DAF avec PWA"

# Remplacez daf-formation par votre nom de repo
git remote add origin https://github.com/yves34690/daf-formation.git

git branch -M main
git push -u origin main
```

## 4️⃣ Activer GitHub Pages

1. Allez sur : https://github.com/yves34690/daf-formation/settings/pages
2. Source : **GitHub Actions**
3. Attendez 2-3 minutes

## 5️⃣ Votre app est en ligne ! 🎉

URL finale : **https://yves34690.github.io/daf-formation/**

### 📱 Pour les étudiants :
- Partagez simplement l'URL
- Sur mobile : "Ajouter à l'écran d'accueil"
- Fonctionne offline après première visite

### 🔄 Mises à jour futures :
Chaque `git push` mettra à jour automatiquement le site !

---
**C'est tout ! Votre formation est maintenant accessible partout, gratuitement ! 🚀**