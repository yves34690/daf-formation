# 🚀 Guide de déploiement - Formation DAF

## 📱 Votre application est maintenant une PWA !

### ✅ Fonctionnalités activées :
- **Installation mobile** : Bouton "Ajouter à l'écran d'accueil"
- **Fonctionnement offline** : Cache automatique après première visite
- **Interface native** : Se comporte comme une vraie app mobile
- **Partage facile** : URL directe + QR Code

## 🔧 Déploiement sur GitHub Pages

### 1. Préparer le repository
```bash
# Initialiser git (si pas encore fait)
git init
git add .
git commit -m "Initial commit with PWA features"

# Pousser sur GitHub
git remote add origin https://github.com/VOTRE-USERNAME/daf-business-game.git
git push -u origin main
```

### 2. Activer GitHub Pages
1. Aller sur votre repository GitHub
2. Settings > Pages
3. Source : **GitHub Actions** (important !)
4. Le déploiement se fera automatiquement

### 3. Ajuster l'URL (si nécessaire)
Dans `vite.config.ts`, ligne 19 :
```ts
base: mode === 'production' ? '/NOM-DE-VOTRE-REPO/' : '/',
```

## 📱 Test en local

```bash
# Construire l'application
npm run build

# Prévisualiser (avec PWA)
npm run preview
```

## 🌐 URL finale
Votre app sera accessible à :
`https://VOTRE-USERNAME.github.io/daf-business-game/`

## 📲 Partage avec les élèves

### Pour les étudiants :
1. **Sur ordinateur** : Ouvrir l'URL directement
2. **Sur mobile** :
   - Ouvrir l'URL dans le navigateur
   - Appuyer sur le bouton "Installer" ou "Ajouter à l'écran d'accueil"
   - L'app apparaîtra comme une vraie app mobile

### QR Code
Utilisez un générateur de QR Code avec votre URL pour faciliter l'accès mobile.

## 🔄 Mises à jour
Chaque push sur la branche `main` déclenchera automatiquement une nouvelle version.

## 💡 Fonctionnalités bonus

### Mode offline
- L'app fonctionne sans internet après la première visite
- Idéal pour des environnements avec connexion limitée

### Installation mobile
- Icône sur l'écran d'accueil
- Écran de démarrage personnalisé
- Pas de barre d'adresse (mode standalone)

## 🆘 Support technique
- Tous les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Compatible iOS et Android
- Responsive design automatique

**Votre formation DAF est maintenant prête à être partagée avec le monde ! 🎓📱**