import React, { useState, useEffect } from 'react';
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Save,
  Eye,
  Trash2,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Target,
  Settings,
  BarChart3,
  Users,
  FileText,
  Download,
  Share2
} from 'lucide-react';
import {
  CASE_TEMPLATES,
  CASE_BUILDING_STEPS,
  CaseTemplate,
  StudentCase,
  CaseCategory,
  generateCaseId,
  validateCase,
  saveCaseToLocalStorage,
  getCasesFromLocalStorage,
  deleteCaseFromLocalStorage
} from '../../data/caseBuilderData';
import GlossaryTerm from '../Glossary/GlossaryTerm';

interface CaseBuilderWorkshopProps {
  onComplete?: () => void;
  onClose?: () => void;
}

type WorkshopView = 'gallery' | 'templates' | 'builder' | 'preview';

const CaseBuilderWorkshop: React.FC<CaseBuilderWorkshopProps> = ({ onComplete, onClose }) => {
  const [view, setView] = useState<WorkshopView>('gallery');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<CaseTemplate | null>(null);
  const [formData, setFormData] = useState<Partial<StudentCase>>({});
  const [savedCases, setSavedCases] = useState<StudentCase[]>([]);
  const [previewCase, setPreviewCase] = useState<StudentCase | null>(null);
  const [validation, setValidation] = useState<{ isValid: boolean; errors: string[] }>({ isValid: true, errors: [] });

  useEffect(() => {
    // Charger les cas sauvegardés
    setSavedCases(getCasesFromLocalStorage());
  }, []);

  const startNewCase = () => {
    setView('templates');
    setFormData({});
    setCurrentStep(1);
    setSelectedTemplate(null);
  };

  const selectTemplate = (template: CaseTemplate) => {
    setSelectedTemplate(template);
    setFormData({
      category: template.id,
      challenge: { context: '', problem: '', impact: '' },
      solution: { approach: '', tools: [], implementation: '' },
      results: { measurableROI: '', timeGains: '', otherBenefits: [] },
      dafPerspective: { concerns: [], questions: '' }
    });
    setView('builder');
    setCurrentStep(1);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => {
      const keys = field.split('.');
      if (keys.length === 1) {
        return { ...prev, [field]: value };
      } else {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0] as keyof StudentCase],
            [keys[1]]: value
          }
        };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < CASE_BUILDING_STEPS.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Dernière étape, prévisualisation
      previewCurrentCase();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const previewCurrentCase = () => {
    const caseData: StudentCase = {
      id: generateCaseId(),
      createdAt: new Date(),
      title: formData.title || 'Cas sans titre',
      category: formData.category || 'automation',
      challenge: formData.challenge || { context: '', problem: '', impact: '' },
      solution: formData.solution || { approach: '', tools: [], implementation: '' },
      results: formData.results || { measurableROI: '', timeGains: '', otherBenefits: [] },
      dafPerspective: formData.dafPerspective || { concerns: [], questions: '' }
    };

    setPreviewCase(caseData);
    setView('preview');
  };

  const saveCase = () => {
    if (!previewCase) return;

    const validationResult = validateCase(previewCase);
    setValidation(validationResult);

    if (validationResult.isValid) {
      saveCaseToLocalStorage(previewCase);
      setSavedCases(getCasesFromLocalStorage());
      setView('gallery');
      setFormData({});
      setCurrentStep(1);
      setSelectedTemplate(null);
      setPreviewCase(null);
    }
  };

  const deleteCase = (caseId: string) => {
    deleteCaseFromLocalStorage(caseId);
    setSavedCases(getCasesFromLocalStorage());
  };

  const exportCase = (studentCase: StudentCase) => {
    const content = `
# ${studentCase.title}

## 📋 Contexte & Défi

**Contexte de l'entreprise :**
${studentCase.challenge.context}

**Problème principal :**
${studentCase.challenge.problem}

**Impact du problème :**
${studentCase.challenge.impact}

## 🛠️ Solution proposée

**Approche générale :**
${studentCase.solution.approach}

**Outils/Technologies :**
${studentCase.solution.tools.join(', ')}

**Plan de mise en œuvre :**
${studentCase.solution.implementation}

## 📈 Résultats attendus

**ROI mesurable :**
${studentCase.results.measurableROI}

**Gains de temps :**
${studentCase.results.timeGains}

**Autres bénéfices :**
${studentCase.results.otherBenefits.join(', ')}

## 💼 Perspective DAF

**Préoccupations du DAF :**
${studentCase.dafPerspective.concerns.join(', ')}

**Questions types du DAF :**
${studentCase.dafPerspective.questions}

---
*Cas créé le ${studentCase.createdAt.toLocaleDateString()} avec l'atelier DAF Business Game*
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${studentCase.title.replace(/[^a-z0-9]/gi, '_')}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (view === 'gallery') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              🛠️ Atelier : Générateur de cas <GlossaryTerm term="DAF">DAF</GlossaryTerm>
            </h2>
            <p className="text-slate-600 text-lg">
              Créez vos propres scénarios de défis pour un <GlossaryTerm term="DAF">Directeur Administratif et Financier</GlossaryTerm>
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={startNewCase}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Créer un nouveau cas
            </button>
          </div>

          {/* Galerie des cas sauvegardés */}
          {savedCases.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Vos cas créés ({savedCases.length})</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedCases.map((studentCase) => {
                  const template = CASE_TEMPLATES.find(t => t.id === studentCase.category);
                  return (
                    <div key={studentCase.id} className="bg-gradient-to-br from-white to-slate-50 rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3 mb-3">
                        {template && (
                          <span className="text-2xl">{template.icon}</span>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-900 truncate">{studentCase.title}</h4>
                          <p className="text-sm text-slate-600">{template?.name}</p>
                          <p className="text-xs text-slate-500">
                            Créé le {new Date(studentCase.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {studentCase.challenge.problem}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setPreviewCase(studentCase);
                              setView('preview');
                            }}
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                          >
                            <Eye className="w-3 h-3" />
                            Voir
                          </button>
                          <button
                            onClick={() => exportCase(studentCase)}
                            className="flex items-center gap-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            Export
                          </button>
                        </div>
                        <button
                          onClick={() => deleteCase(studentCase.id)}
                          className="flex items-center gap-1 px-3 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                          Suppr.
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Instructions si aucun cas */}
          {savedCases.length === 0 && (
            <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
              <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">Aucun cas créé</h3>
              <p className="text-slate-500 mb-4">
                Commencez par créer votre premier cas de défi pour un <GlossaryTerm term="DAF">DAF</GlossaryTerm> !
              </p>
            </div>
          )}

          {/* Actions de fermeture */}
          <div className="flex justify-center gap-4 mt-8 pt-8 border-t">
            {onComplete && (
              <button
                onClick={onComplete}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <CheckCircle className="w-4 h-4" />
                Continuer la formation
              </button>
            )}
            {onClose && (
              <button
                onClick={onClose}
                className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
              >
                Fermer l'atelier
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (view === 'templates') {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">🎯 Choisissez un type de défi</h2>
            <p className="text-slate-600">
              Sélectionnez la catégorie qui correspond au défi que vous voulez créer
            </p>
          </div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {CASE_TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={() => selectTemplate(template)}
                className={`bg-gradient-to-br from-white to-${template.color}-50 rounded-xl p-6 border-2 border-${template.color}-200 hover:border-${template.color}-400 cursor-pointer transition-all hover:shadow-lg`}
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900">{template.name}</h3>
                  <p className="text-sm text-slate-600">{template.description}</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">Exemples de défis :</h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {template.examples.challenge.slice(0, 2).map((challenge, idx) => (
                        <li key={idx}>• {challenge}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 mb-1">ROI typique :</h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {template.typicalROI.slice(0, 1).map((roi, idx) => (
                        <li key={idx}>• {roi}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-${template.color}-100 text-${template.color}-800`}>
                    Choisir ce type
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setView('gallery')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'builder') {
    const step = CASE_BUILDING_STEPS.find(s => s.id === currentStep);
    if (!step || !selectedTemplate) return null;

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-600">
                Étape {currentStep} sur {CASE_BUILDING_STEPS.length}
              </span>
              <span className="text-sm text-slate-500">
                {Math.round((currentStep / CASE_BUILDING_STEPS.length) * 100)}% complété
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / CASE_BUILDING_STEPS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-${selectedTemplate.color}-100 text-${selectedTemplate.color}-800 border border-${selectedTemplate.color}-200`}>
              <span>{selectedTemplate.icon}</span>
              {selectedTemplate.name}
            </span>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">{step.title}</h2>
            <p className="text-slate-600 mb-6">{step.description}</p>

            <div className="space-y-6">
              {step.fields.map((field) => (
                <div key={field.id}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>

                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={formData[field.id as keyof StudentCase] as string || ''}
                      onChange={(e) => updateFormData(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                    />
                  )}

                  {field.type === 'textarea' && (
                    <textarea
                      value={
                        field.id.includes('.')
                          ? formData[field.id.split('.')[0] as keyof StudentCase]?.[field.id.split('.')[1] as any] || ''
                          : formData[field.id as keyof StudentCase] as string || ''
                      }
                      onChange={(e) => updateFormData(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                    />
                  )}

                  {field.type === 'select' && (
                    <select
                      value={formData[field.id as keyof StudentCase] as string || ''}
                      onChange={(e) => updateFormData(field.id, e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-shadow"
                    >
                      <option value="">Choisissez...</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  )}

                  {field.type === 'multiselect' && (
                    <div className="space-y-2">
                      {field.options?.map((option) => {
                        const currentValues = field.id.includes('.')
                          ? formData[field.id.split('.')[0] as keyof StudentCase]?.[field.id.split('.')[1] as any] || []
                          : formData[field.id as keyof StudentCase] as string[] || [];

                        return (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={currentValues.includes(option)}
                              onChange={(e) => {
                                const newValues = e.target.checked
                                  ? [...currentValues, option]
                                  : currentValues.filter((v: string) => v !== option);
                                updateFormData(field.id, newValues);
                              }}
                              className="rounded border-slate-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-slate-700">{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {field.helpText && (
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" />
                      {field.helpText}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Template Hints */}
            {selectedTemplate && currentStep === 1 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Inspirations pour {selectedTemplate.name}
                </h4>
                <div className="text-sm text-blue-800 space-y-2">
                  <p><strong>Exemples de défis :</strong> {selectedTemplate.examples.challenge.join(', ')}</p>
                </div>
              </div>
            )}

            {selectedTemplate && currentStep === 4 && (
              <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Préoccupations typiques du <GlossaryTerm term="DAF">DAF</GlossaryTerm>
                </h4>
                <div className="text-sm text-orange-800 space-y-1">
                  {selectedTemplate.dafConcerns.map((concern, idx) => (
                    <p key={idx}>• {concern}</p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={currentStep === 1 ? () => setView('templates') : prevStep}
              className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentStep === 1 ? 'Changer de catégorie' : 'Étape précédente'}
            </button>

            <button
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              {currentStep === CASE_BUILDING_STEPS.length ? 'Prévisualiser' : 'Étape suivante'}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'preview' && previewCase) {
    const template = CASE_TEMPLATES.find(t => t.id === previewCase.category);

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">👀 Prévisualisation de votre cas</h2>
            <p className="text-slate-600">Vérifiez votre cas avant de le sauvegarder</p>
          </div>

          {/* Validation Errors */}
          {!validation.isValid && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-red-900">Erreurs à corriger :</h3>
              </div>
              <ul className="text-sm text-red-800 space-y-1">
                {validation.errors.map((error, idx) => (
                  <li key={idx}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Case Preview */}
          <div className="space-y-8">
            {/* Title & Category */}
            <div className="text-center">
              {template && (
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-${template.color}-100 text-${template.color}-800 border border-${template.color}-200 mb-4`}>
                  <span>{template.icon}</span>
                  {template.name}
                </span>
              )}
              <h1 className="text-3xl font-bold text-slate-900">{previewCase.title}</h1>
            </div>

            {/* Challenge */}
            <div className="bg-red-50 rounded-lg p-6 border border-red-200">
              <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Contexte & Défi
              </h2>
              <div className="space-y-4 text-red-800">
                <div>
                  <h3 className="font-semibold mb-2">Contexte de l'entreprise :</h3>
                  <p>{previewCase.challenge.context}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Problème principal :</h3>
                  <p>{previewCase.challenge.problem}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Impact du problème :</h3>
                  <p>{previewCase.challenge.impact}</p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Solution proposée
              </h2>
              <div className="space-y-4 text-blue-800">
                <div>
                  <h3 className="font-semibold mb-2">Approche générale :</h3>
                  <p>{previewCase.solution.approach}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Outils/Technologies :</h3>
                  <div className="flex flex-wrap gap-2">
                    {previewCase.solution.tools.map((tool, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Plan de mise en œuvre :</h3>
                  <p>{previewCase.solution.implementation}</p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
              <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Résultats attendus
              </h2>
              <div className="space-y-4 text-green-800">
                <div>
                  <h3 className="font-semibold mb-2"><GlossaryTerm term="ROI">ROI</GlossaryTerm> mesurable :</h3>
                  <p>{previewCase.results.measurableROI}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Gains de temps :</h3>
                  <p>{previewCase.results.timeGains}</p>
                </div>
                {previewCase.results.otherBenefits.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Autres bénéfices :</h3>
                    <div className="flex flex-wrap gap-2">
                      {previewCase.results.otherBenefits.map((benefit, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DAF Perspective */}
            <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
              <h2 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Perspective <GlossaryTerm term="DAF">DAF</GlossaryTerm>
              </h2>
              <div className="space-y-4 text-orange-800">
                {previewCase.dafPerspective.concerns.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Préoccupations du <GlossaryTerm term="DAF">DAF</GlossaryTerm> :</h3>
                    <div className="flex flex-wrap gap-2">
                      {previewCase.dafPerspective.concerns.map((concern, idx) => (
                        <span key={idx} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-sm">
                          {concern}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold mb-2">Questions types du <GlossaryTerm term="DAF">DAF</GlossaryTerm> :</h3>
                  <p>{previewCase.dafPerspective.questions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-8 pt-8 border-t">
            <button
              onClick={() => setView('builder')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
            >
              <ChevronLeft className="w-4 h-4" />
              Modifier
            </button>

            <div className="flex gap-4">
              <button
                onClick={() => exportCase(previewCase)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                <Download className="w-4 h-4" />
                Exporter
              </button>
              <button
                onClick={saveCase}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Save className="w-4 h-4" />
                Sauvegarder
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CaseBuilderWorkshop;