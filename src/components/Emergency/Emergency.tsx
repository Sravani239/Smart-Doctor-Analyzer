import React from 'react';
import { 
  Phone, 
  Ambulance, 
  Heart, 
  Brain, 
  AlertTriangle,
  MapPin,
  Clock,
  Shield,
  Users,
  Stethoscope
} from 'lucide-react';

const Emergency: React.FC = () => {
  const emergencyNumbers = [
    {
      name: 'Emergency Services',
      number: '911',
      description: 'Fire, Police, Medical Emergency',
      icon: Ambulance,
      color: 'bg-red-600 hover:bg-red-700',
      urgent: true
    },
    {
      name: 'Poison Control',
      number: '1-800-222-1222',
      description: '24/7 Poison emergency hotline',
      icon: AlertTriangle,
      color: 'bg-orange-600 hover:bg-orange-700',
      urgent: true
    },
    {
      name: 'Crisis Hotline',
      number: '988',
      description: 'Suicide & Crisis Lifeline',
      icon: Heart,
      color: 'bg-purple-600 hover:bg-purple-700',
      urgent: true
    },
    {
      name: 'Non-Emergency Health',
      number: '1-800-HEALTH1',
      description: 'Health advice and guidance',
      icon: Stethoscope,
      color: 'bg-blue-600 hover:bg-blue-700',
      urgent: false
    }
  ];

  const nearbyHospitals = [
    {
      name: 'Central Emergency Hospital',
      address: '123 Emergency Blvd, Downtown',
      distance: '0.5 miles',
      phone: '(555) 123-4567',
      type: 'Level 1 Trauma Center',
      waitTime: '15 min'
    },
    {
      name: 'Mercy General Hospital',
      address: '456 Health Street, Midtown',
      distance: '1.2 miles',
      phone: '(555) 987-6543',
      type: 'Full Service Hospital',
      waitTime: '25 min'
    },
    {
      name: 'Regional Medical Center',
      address: '789 Care Avenue, Northside',
      distance: '2.1 miles',
      phone: '(555) 456-7890',
      type: 'Specialty Care Available',
      waitTime: '30 min'
    }
  ];

  const emergencyTips = [
    {
      title: 'Heart Attack',
      symptoms: ['Chest pain or pressure', 'Shortness of breath', 'Nausea', 'Sweating'],
      actions: ['Call 911 immediately', 'Chew aspirin if not allergic', 'Stay calm and rest', 'Do not drive yourself'],
      icon: Heart,
      color: 'border-red-200 bg-red-50'
    },
    {
      title: 'Stroke',
      symptoms: ['Face drooping', 'Arm weakness', 'Speech difficulty', 'Time to call 911'],
      actions: ['Use FAST test', 'Call 911 immediately', 'Note time symptoms started', 'Keep person calm'],
      icon: Brain,
      color: 'border-orange-200 bg-orange-50'
    },
    {
      title: 'Choking',
      symptoms: ['Cannot speak or breathe', 'Hands at throat', 'Blue face/lips', 'Panic'],
      actions: ['Perform Heimlich maneuver', 'Call 911 if unconscious', 'Back blows for infants', 'Check mouth for objects'],
      icon: AlertTriangle,
      color: 'border-yellow-200 bg-yellow-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <Ambulance className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick access to emergency services, nearby hospitals, and critical health information
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-red-100 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-red-900 mb-2">
                Life-Threatening Emergency?
              </h2>
              <p className="text-red-800 mb-4">
                If you or someone else is experiencing a life-threatening emergency, call 911 immediately. 
                Do not use this website as a substitute for emergency medical services.
              </p>
              <a
                href="tel:911"
                className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-lg"
              >
                <Phone className="h-5 w-5" />
                <span>Call 911 Now</span>
              </a>
            </div>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Hotlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyNumbers.map((emergency, index) => {
              const Icon = emergency.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className={`p-6 text-white ${emergency.color}`}>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="h-8 w-8" />
                      {emergency.urgent && (
                        <span className="bg-white bg-opacity-20 text-xs font-medium px-2 py-1 rounded-full">
                          URGENT
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{emergency.name}</h3>
                    <a
                      href={`tel:${emergency.number}`}
                      className="text-2xl font-bold hover:underline"
                    >
                      {emergency.number}
                    </a>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm">{emergency.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Emergency Hospitals</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {nearbyHospitals.map((hospital, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{hospital.name}</h3>
                    <p className="text-sm text-blue-600 font-medium">{hospital.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hospital.distance}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {hospital.waitTime}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{hospital.address}</p>
                
                <div className="flex space-x-3">
                  <a
                    href={`tel:${hospital.phone}`}
                    className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg text-center hover:bg-primary-600 transition-colors text-sm font-medium"
                  >
                    Call Hospital
                  </a>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(hospital.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-primary-500 text-primary-500 py-2 px-4 rounded-lg text-center hover:bg-primary-50 transition-colors text-sm font-medium"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Tips */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency First Aid Guide</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {emergencyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className={`rounded-xl border-2 p-6 ${tip.color}`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <Icon className="h-6 w-6 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Symptoms:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {tip.symptoms.map((symptom, symptomIndex) => (
                        <li key={symptomIndex} className="flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Actions:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {tip.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Emergency Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Safety Tips</h3>
              <p className="text-sm text-gray-600">Learn basic safety and prevention measures</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">CPR Training</h3>
              <p className="text-sm text-gray-600">Find local CPR and first aid classes</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-3">
                <Heart className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Mental Health</h3>
              <p className="text-sm text-gray-600">Crisis support and mental health resources</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <Ambulance className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Emergency Kit</h3>
              <p className="text-sm text-gray-600">Build your home emergency preparedness kit</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Important Disclaimer</p>
              <p>
                This information is for educational purposes only and should not replace professional emergency medical training. 
                In any emergency situation, always call 911 or your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;