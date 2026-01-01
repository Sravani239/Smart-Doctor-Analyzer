import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Plus, 
  X, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Thermometer,
  Stethoscope,
  Brain,
  Heart,
  Eye
} from 'lucide-react';

interface Symptom {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  duration: string;
}

interface Analysis {
  possibleConditions: Array<{
    name: string;
    probability: number;
    severity: 'low' | 'medium' | 'high';
    description: string;
    recommendedActions: string[];
  }>;
  recommendedDoctors: Array<{
    specialization: string;
    urgency: 'low' | 'medium' | 'high';
  }>;
  urgencyLevel: 'low' | 'medium' | 'high';
}

const SymptomAnalyzer: React.FC = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [currentSeverity, setCurrentSeverity] = useState<'mild' | 'moderate' | 'severe'>('mild');
  const [currentDuration, setCurrentDuration] = useState('');
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms = [
    'Headache', 'Fever', 'Cough', 'Sore throat', 'Nausea', 'Fatigue',
    'Dizziness', 'Chest pain', 'Shortness of breath', 'Abdominal pain',
    'Back pain', 'Joint pain', 'Skin rash', 'Vomiting', 'Diarrhea'
  ];

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      const newSymptom: Symptom = {
        id: Date.now().toString(),
        name: currentSymptom.trim(),
        severity: currentSeverity,
        duration: currentDuration
      };
      setSymptoms([...symptoms, newSymptom]);
      setCurrentSymptom('');
      setCurrentDuration('');
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms(symptoms.filter(s => s.id !== id));
  };

  const analyzeSymptoms = async () => {
    if (symptoms.length === 0) return;

    setIsAnalyzing(true);
    
    // Simulate API call to backend Java service
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis based on symptoms
    const mockAnalysis: Analysis = {
      possibleConditions: [
        {
          name: 'Common Cold',
          probability: 85,
          severity: 'low',
          description: 'A viral infection of the upper respiratory tract causing congestion, runny nose, and mild symptoms.',
          recommendedActions: [
            'Get plenty of rest',
            'Stay hydrated',
            'Use over-the-counter medications for symptom relief',
            'Monitor symptoms for 7-10 days'
          ]
        },
        {
          name: 'Seasonal Allergies',
          probability: 65,
          severity: 'low',
          description: 'Allergic reaction to environmental triggers like pollen, causing respiratory and eye symptoms.',
          recommendedActions: [
            'Avoid known allergens',
            'Use antihistamines',
            'Consider allergy testing',
            'Keep windows closed during high pollen days'
          ]
        },
        {
          name: 'Viral Infection',
          probability: 45,
          severity: 'medium',
          description: 'A systemic viral infection that may require medical attention if symptoms worsen.',
          recommendedActions: [
            'Monitor fever closely',
            'Seek medical attention if symptoms persist > 5 days',
            'Stay isolated to prevent spread',
            'Maintain good hydration'
          ]
        }
      ],
      recommendedDoctors: [
        { specialization: 'General Practitioner', urgency: 'medium' },
        { specialization: 'Internal Medicine', urgency: 'low' },
        { specialization: 'Allergist', urgency: 'low' }
      ],
      urgencyLevel: symptoms.some(s => s.severity === 'severe') ? 'high' : 'medium'
    };

    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'severe':
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'low':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default:
        return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Activity className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Symptom Analyzer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your symptoms and get personalized health insights and doctor recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Symptom Input */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Your Symptoms
            </h2>

            {/* Common Symptoms */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Common Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {commonSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => setCurrentSymptom(symptom)}
                    className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors border border-primary-200"
                  >
                    {symptom}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptom Input Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Symptom Description
                </label>
                <input
                  type="text"
                  value={currentSymptom}
                  onChange={(e) => setCurrentSymptom(e.target.value)}
                  placeholder="Describe your symptom..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Severity
                  </label>
                  <select
                    value={currentSeverity}
                    onChange={(e) => setCurrentSeverity(e.target.value as 'mild' | 'moderate' | 'severe')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="mild">Mild</option>
                    <option value="moderate">Moderate</option>
                    <option value="severe">Severe</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={currentDuration}
                    onChange={(e) => setCurrentDuration(e.target.value)}
                    placeholder="e.g., 2 days"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <button
                onClick={addSymptom}
                className="w-full bg-primary-500 text-white py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Symptom
              </button>
            </div>

            {/* Added Symptoms */}
            {symptoms.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Your Symptoms</h3>
                <div className="space-y-2 mb-6">
                  {symptoms.map((symptom) => (
                    <div
                      key={symptom.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{symptom.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(symptom.severity)}`}>
                            {symptom.severity}
                          </span>
                        </div>
                        {symptom.duration && (
                          <p className="text-sm text-gray-600 mt-1">Duration: {symptom.duration}</p>
                        )}
                      </div>
                      <button
                        onClick={() => removeSymptom(symptom.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={analyzeSymptoms}
                  disabled={isAnalyzing}
                  className="w-full bg-secondary-500 text-white py-3 rounded-lg hover:bg-secondary-600 transition-colors flex items-center justify-center font-semibold disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Analysis Results
            </h2>

            {!analysis ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Stethoscope className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-500">Add symptoms and click analyze to get your health insights</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Urgency Level */}
                <div className={`p-4 rounded-lg border ${getSeverityColor(analysis.urgencyLevel)}`}>
                  <div className="flex items-center space-x-2">
                    {getUrgencyIcon(analysis.urgencyLevel)}
                    <span className="font-semibold">
                      {analysis.urgencyLevel === 'high' ? 'High Priority' : 
                       analysis.urgencyLevel === 'medium' ? 'Medium Priority' : 'Low Priority'}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {analysis.urgencyLevel === 'high' 
                      ? 'We recommend seeking medical attention soon'
                      : analysis.urgencyLevel === 'medium'
                      ? 'Consider scheduling an appointment within a few days'
                      : 'Your symptoms appear manageable with self-care'
                    }
                  </p>
                </div>

                {/* Possible Conditions */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Possible Conditions</h3>
                  <div className="space-y-3">
                    {analysis.possibleConditions.map((condition, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{condition.name}</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-600">{condition.probability}%</span>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(condition.severity)}`}>
                              {condition.severity}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Recommended Actions:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {condition.recommendedActions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-start">
                                <span className="text-primary-500 mr-2">•</span>
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommended Doctors */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Recommended Specialists</h3>
                  <div className="space-y-2">
                    {analysis.recommendedDoctors.map((doctor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium text-gray-900">{doctor.specialization}</span>
                        <div className="flex items-center space-x-2">
                          {getUrgencyIcon(doctor.urgency)}
                          <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(doctor.urgency)}`}>
                            {doctor.urgency} priority
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => navigate('/doctors')}
                    className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Find Doctors
                  </button>
                  <button
                    onClick={() => navigate('/appointments')}
                    className="flex-1 bg-secondary-500 text-white py-2 px-4 rounded-lg hover:bg-secondary-600 transition-colors flex items-center justify-center"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Book Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Medical Disclaimer</p>
              <p>
                This symptom analyzer is for informational purposes only and does not replace professional medical advice. 
                Always consult with a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomAnalyzer;