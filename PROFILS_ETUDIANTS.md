# Système de Profils Étudiants - Documentation

## Vue d'ensemble

L'application Formation DAF - Business Game intègre désormais un système complet de gestion des profils étudiants, permettant le suivi personnalisé de la progression de chaque participant.

## Fonctionnalités Implémentées

### 1. Authentification par Profil

#### Écran de connexion ([LoginView.tsx](components/LoginView.tsx))
- Interface visuelle avec avatar pour chaque étudiant
- 23 profils étudiants pré-configurés depuis le trombinoscope
- Recherche par nom, prénom ou entreprise
- Pas de mot de passe requis (contexte éducatif)

### 2. Base de Données Étudiants

#### Fichier [data/students.ts](data/students.ts)
Contient les informations complètes de tous les étudiants :
- ID unique
- Nom et prénom
- Formation (ex: MO-M2-IAHIT-S61-APP-A2)
- Entreprise
- Date de naissance
- Téléphone

**Total : 23 étudiants**

### 3. Système de Stockage Local

#### Utilitaires [utils/storage.ts](utils/storage.ts)
- Sauvegarde dans localStorage du navigateur
- Données persistantes par utilisateur
- Fonctions pour gérer :
  - Progression des chapitres
  - Scores des ateliers
  - Votes émis
  - Participation aux Business Games

### 4. Suivi de la Progression

#### Types de données sauvegardées ([types.ts](types.ts))

**UserProgress** :
- `chapters` : Statut de chaque chapitre (non commencé, en cours, complété)
- `workshopScores` : Résultats des ateliers (quiz, générateur de cas)
- `votes` : Historique des votes avec horodatage
- `gameParticipation` : Scénarios joués et rôles

### 5. Système de Vote Tracé

#### Modifications [VotingView.tsx](components/VotingView.tsx)
- **Un vote par personne par livrable**
- Indicateur visuel "Vous avez voté" en vert
- Compteur global des votes de tous les étudiants
- Bouton de vote désactivé après avoir voté
- Données persistantes entre les sessions

### 6. Profil Utilisateur

#### Composant [UserProfile.tsx](components/UserProfile.tsx)
Affiche :
- Informations personnelles
- Progression globale en pourcentage
- Statistiques d'activité :
  - Chapitres complétés
  - Ateliers réalisés
  - Votes émis
  - Scénarios joués
- Détail de la progression par chapitre
- Historique des scores aux ateliers

### 7. Menu Utilisateur

Intégré dans l'en-tête de l'application :
- Avatar avec initiales
- Nom de l'utilisateur
- Menu déroulant :
  - **Mon profil** : Ouvre le profil détaillé
  - **Changer d'utilisateur** : Retour à l'écran de connexion

## Architecture Technique

### Contextes React

#### [UserContext.tsx](contexts/UserContext.tsx)
Gère l'état global de l'utilisateur :
```typescript
- currentUser: Student | null
- userProgress: UserProgress | null
- isAuthenticated: boolean
- login(userId: string): void
- logout(): void
- refreshProgress(): void
```

### Hooks Personnalisés

#### [useUserVotes.ts](hooks/useUserVotes.ts)
```typescript
- vote(scenarioId, type): boolean
- checkHasVoted(scenarioId, type): boolean
- getVoteCountsForScenario(scenarioId): VoteCounts
```

#### [useWorkshopProgress.ts](hooks/useWorkshopProgress.ts)
```typescript
- saveWorkshopScore(workshopId, score?, data?): void
- getAllScores(): WorkshopScore[]
- getLatestScore(workshopId): WorkshopScore | null
```

#### [useChapterProgress.ts](hooks/useChapterProgress.ts)
```typescript
- getProgress(chapterId): ChapterProgress | null
- markChapterStarted(chapterId): void
- markSectionCompleted(chapterId, sectionId): void
- markChapterCompleted(chapterId): void
```

## Utilisation

### Pour un Étudiant

1. **Connexion** : Sélectionner son profil sur l'écran d'accueil
2. **Formation** : La progression est automatiquement sauvegardée
3. **Ateliers** : Les scores sont enregistrés à chaque tentative
4. **Business Game** : Participation et livrables associés au profil
5. **Vote** : Un seul vote par livrable, tracé et permanent
6. **Profil** : Consulter sa progression via le menu utilisateur

### Pour l'Enseignant

#### Export des données
```javascript
import { exportAllUserData } from './utils/storage';

const allData = exportAllUserData();
console.log(allData); // Toutes les progressions étudiants
```

#### Réinitialisation (pour tests)
```javascript
import { clearAllUserData } from './utils/storage';

clearAllUserData(); // ⚠️ Supprime toutes les données
```

## Limitations Connues

1. **Stockage local** : Les données sont liées au navigateur utilisé
   - Un étudiant sur un autre appareil/navigateur recommence à zéro
   - Solution future : Backend avec base de données centralisée

2. **Pas de synchronisation** : Données uniquement en local
   - Pas de sauvegarde cloud
   - Pas de sync multi-appareils

3. **Sécurité minimale** : Pas de mots de passe
   - Acceptable en contexte éducatif supervisé
   - Ne convient pas pour des données sensibles

4. **Collecte manuelle** : L'enseignant doit demander aux étudiants d'exporter leurs données
   - Utiliser les outils de développement du navigateur
   - Ou partager l'écran du profil

## Évolutions Futures Possibles

### Court terme
- [ ] Ajout de photos réelles dans le trombinoscope
- [ ] Export CSV de son propre profil
- [ ] Badges et récompenses pour gamification

### Moyen terme
- [ ] Dashboard enseignant avec vue globale temps réel
- [ ] Notifications de progression
- [ ] Comparaison anonyme avec la classe

### Long terme
- [ ] Backend Node.js avec base de données
- [ ] Authentification sécurisée
- [ ] API REST pour sync multi-appareils
- [ ] Application mobile compagnon

## Fichiers Modifiés/Créés

### Nouveaux fichiers
- `data/students.ts` - Base de données étudiants
- `contexts/UserContext.tsx` - Contexte utilisateur
- `components/LoginView.tsx` - Écran de connexion
- `components/UserProfile.tsx` - Profil utilisateur
- `hooks/useUserVotes.ts` - Hook votes
- `hooks/useWorkshopProgress.ts` - Hook ateliers
- `hooks/useChapterProgress.ts` - Hook chapitres
- `utils/storage.ts` - Utilitaires localStorage

### Fichiers modifiés
- `types.ts` - Nouveaux types (Vote, UserProgress, etc.)
- `App.tsx` - Intégration UserProvider + menu utilisateur
- `components/VotingView.tsx` - Système de vote tracé

## Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier la console du navigateur pour les erreurs
3. Tester avec un autre profil étudiant
4. Réinitialiser les données en cas de corruption

## Lancement de l'Application

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build pour production
npm run build

# Prévisualisation du build
npm run preview
```

L'application sera accessible sur `http://localhost:5173`

---

**Version** : 2.0.0
**Date** : Janvier 2025
**Développé avec** : React 19, TypeScript, Vite, Tailwind CSS
