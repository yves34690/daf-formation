# 🧹 Nettoyage du localStorage pour tests

## Pourquoi nettoyer ?

Les corrections apportées ont changé la structure des clés localStorage pour inclure le `userId`. Les anciennes données de test utilisent les anciennes clés et ne sont donc pas visibles dans le nouveau système.

## Comment nettoyer ?

### Option 1 : Nettoyage complet (recommandé pour nouveaux tests)

1. Ouvrez l'application sur **http://localhost:5174/**
2. Appuyez sur **F12** pour ouvrir la console développeur
3. Dans l'onglet **Console**, tapez :
   ```javascript
   localStorage.clear()
   ```
4. Appuyez sur **Entrée**
5. Rechargez la page (**F5** ou **Ctrl+R**)

### Option 2 : Nettoyage sélectif (garder certaines données)

Pour nettoyer uniquement les données de l'utilisateur Test :

```javascript
// Supprimer toutes les clés contenant 'test-user'
Object.keys(localStorage).forEach(key => {
  if (key.includes('test-user')) {
    localStorage.removeItem(key);
  }
});
```

## Après le nettoyage

Refaites un test complet avec l'utilisateur **Test UTILISATEUR** :

### ✅ Checklist de test

1. **Connexion**
   - [ ] Se connecter avec "Test UTILISATEUR"

2. **Formation (Chapitres)**
   - [ ] Ouvrir le chapitre 1
   - [ ] Lire jusqu'à la fin
   - [ ] Marquer comme complété
   - [ ] Vérifier dans le dashboard : Chapitres 1/5

3. **Quiz**
   - [ ] Faire le quiz complet
   - [ ] Vérifier le score affiché à la fin
   - [ ] Vérifier dans le dashboard : Score, temps, catégories

4. **CaseBuilder**
   - [ ] Créer un cas complet avec tous les champs remplis
   - [ ] Sauvegarder
   - [ ] Vérifier la prévisualisation
   - [ ] Vérifier dans le dashboard : 1 cas créé

5. **Guide SPIN**
   - [ ] Rédiger des questions pour "Commerciaux IT"
   - [ ] Cliquer sur "Enregistrer"
   - [ ] Rédiger des questions pour "DAF"
   - [ ] Cliquer sur "Enregistrer"
   - [ ] Vérifier dans le dashboard : Questions visibles

6. **Business Game - Livrables**
   - [ ] Ouvrir un scénario (ex: Scénario 1)
   - [ ] Aller dans l'onglet "Livrables"
   - [ ] Rédiger une proposition commerciale
   - [ ] Cliquer sur "Enregistrer"
   - [ ] Rédiger un cahier des charges
   - [ ] Cliquer sur "Enregistrer"
   - [ ] Vérifier dans le dashboard : 2 livrables rédigés

7. **Votes**
   - [ ] Aller dans "Votes"
   - [ ] Voter pour une proposition
   - [ ] Vérifier dans le dashboard : 1 vote émis

8. **Dashboard Formateur**
   - [ ] Se connecter en tant que formateur (Yves CLOAREC)
   - [ ] Ouvrir le dashboard
   - [ ] Cliquer sur "Test UTILISATEUR"
   - [ ] Cliquer sur "Voir tous les travaux de cet étudiant"
   - [ ] Vérifier que TOUT est visible :
     * Quiz avec score détaillé
     * Cas CaseBuilder complet
     * Questions SPIN
     * Livrables (proposition + cahier des charges)

## Structure des nouvelles clés localStorage

Les données sont maintenant stockées avec les clés suivantes :

- **Progression générale** : `daf-formation-user-progress-{userId}`
- **Cas CaseBuilder** : `daf_student_cases-{userId}`
- **Livrables** : `daf-deliverable-{userId}-{scenarioId}-{type}`
- **Questions SPIN** : `daf-spin-{userId}-{titre}`

## Problèmes connus

Si après nettoyage vous voyez encore :
- **Quiz Score 0/0** → Le quiz n'a pas été complété, refaites-le
- **Cas incomplets** → Tous les champs n'ont pas été remplis lors de la création
- **Livrables non visibles** → Vous n'avez pas cliqué sur "Enregistrer" après rédaction
- **Questions SPIN vides** → Vous n'avez pas cliqué sur "Enregistrer" après rédaction

## Support

Si les problèmes persistent après un `localStorage.clear()` complet et un nouveau test :
1. Vérifiez la console (F12) pour des erreurs
2. Vérifiez que vous êtes sur le bon port (5174)
3. Videz le cache du navigateur (Ctrl+Shift+Del)

Bon appétit ! 🍽️
