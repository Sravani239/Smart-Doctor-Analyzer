import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Phone,
  Calendar,
  Award,
  Users,
  Stethoscope,
  Heart,
  Brain,
  Eye,
  Bone
} from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  experience: number;
  hospital: string;
  location: string;
  availableToday: boolean;
  nextAvailable: string;
  consultationFee: number;
  image: string;
  education: string;
  languages: string[];
  about: string;
}

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(true);

  const specializations = [
    'General Practice',
    'Cardiology',
    'Dermatology',
    'Neurology',
    'Pediatrics',
    'Orthopedics',
    'Gynecology',
    'Psychiatry',
    'Ophthalmology',
    'ENT'
  ];

  const locations = [
    'Downtown Medical Center',
    'Central Hospital',
    'Northside Clinic',
    'Westside Medical',
    'Eastside Health Center'
  ];

  useEffect(() => {
    // Mock API call - in real app, this would call your Java backend
    const fetchDoctors = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockDoctors: Doctor[] = [
        {
          id: '1',
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiology',
          rating: 4.9,
          reviewCount: 127,
          experience: 15,
          hospital: 'Central Hospital',
          location: 'Downtown Medical Center',
          availableToday: true,
          nextAvailable: 'Today 3:00 PM',
          consultationFee: 150,
          image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          education: 'MD, Harvard Medical School',
          languages: ['English', 'Spanish'],
          about: 'Specialized in preventive cardiology and heart disease management with over 15 years of experience.'
        },
        {
          id: '2',
          name: 'Dr. Michael Chen',
          specialization: 'Neurology',
          rating: 4.8,
          reviewCount: 89,
          experience: 12,
          hospital: 'Northside Clinic',
          location: 'Northside Clinic',
          availableToday: false,
          nextAvailable: 'Tomorrow 10:00 AM',
          consultationFee: 180,
          image: 'https://images.pexels.com/photos/612608/pexels-photo-612608.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          education: 'MD, Johns Hopkins University',
          languages: ['English', 'Mandarin'],
          about: 'Expert in neurological disorders, stroke prevention, and migraine management.'
        },
        {
          id: '3',
          name: 'Dr. Emily Rodriguez',
          specialization: 'General Practice',
          rating: 4.7,
          reviewCount: 203,
          experience: 8,
          hospital: 'Westside Medical',
          location: 'Westside Medical',
          availableToday: true,
          nextAvailable: 'Today 5:30 PM',
          consultationFee: 120,
          image: 'https://images.pexels.com/photos/5327584/pexels-photo-5327584.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          education: 'MD, Stanford University',
          languages: ['English', 'Spanish', 'Portuguese'],
          about: 'Family medicine specialist focusing on comprehensive primary care and preventive medicine.'
        },
        {
          id: '4',
          name: 'Dr. David Kim',
          specialization: 'Dermatology',
          rating: 4.9,
          reviewCount: 156,
          experience: 10,
          hospital: 'Central Hospital',
          location: 'Downtown Medical Center',
          availableToday: true,
          nextAvailable: 'Today 2:15 PM',
          consultationFee: 160,
          image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          education: 'MD, UCLA Medical School',
          languages: ['English', 'Korean'],
          about: 'Board-certified dermatologist specializing in skin cancer prevention and cosmetic dermatology.'
        },
        {
          id: '5',
          name: 'Dr. Lisa Thompson',
          specialization: 'Pediatrics',
          rating: 4.8,
          reviewCount: 174,
          experience: 14,
          hospital: 'Eastside Health Center',
          location: 'Eastside Health Center',
          availableToday: false,
          nextAvailable: 'Monday 9:00 AM',
          consultationFee: 140,
          image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          education: 'MD, Children\'s Hospital Boston',
          languages: ['English', 'French'],
          about: 'Pediatric specialist with expertise in child development and adolescent medicine.'
        },
        {
          id: '6',
          name: 'Dr. Robert Martinez',
          specialization: 'Orthopedics',
          rating: 4.6,
          reviewCount: 98,
          experience: 18,
          hospital: 'Central Hospital',
          location: 'Downtown Medical Center',
          availableToday: true,
          nextAvailable: 'Today 4:45 PM',
          consultationFee: 200,
          image: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
          education: 'MD, Mayo Clinic',
          languages: ['English', 'Spanish'],
          about: 'Orthopedic surgeon specializing in sports medicine and joint replacement surgery.'
        }
      ];

      setDoctors(mockDoctors);
      setFilteredDoctors(mockDoctors);
      setIsLoading(false);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Specialization filter
    if (selectedSpecialization) {
      filtered = filtered.filter(doctor => doctor.specialization === selectedSpecialization);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(doctor => doctor.location === selectedLocation);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return b.experience - a.experience;
        case 'fee':
          return a.consultationFee - b.consultationFee;
        case 'availability':
          return (b.availableToday ? 1 : 0) - (a.availableToday ? 1 : 0);
        default:
          return 0;
      }
    });

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, selectedSpecialization, selectedLocation, sortBy]);

  const getSpecializationIcon = (specialization: string) => {
    switch (specialization.toLowerCase()) {
      case 'cardiology':
        return <Heart className="h-5 w-5" />;
      case 'neurology':
        return <Brain className="h-5 w-5" />;
      case 'ophthalmology':
        return <Eye className="h-5 w-5" />;
      case 'orthopedics':
        return <Bone className="h-5 w-5" />;
      default:
        return <Stethoscope className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h1>
          <p className="text-lg text-gray-600">
            Connect with verified healthcare professionals near you
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, specializations, hospitals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Specialization */}
            <div>
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="experience">Sort by Experience</option>
                <option value="fee">Sort by Fee</option>
                <option value="availability">Sort by Availability</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
            {searchTerm && ` for "${searchTerm}"`}
            {selectedSpecialization && ` in ${selectedSpecialization}`}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Doctor Image */}
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary-100"
                  />

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          {getSpecializationIcon(doctor.specialization)}
                          <span className="text-primary-600 font-medium">{doctor.specialization}</span>
                        </div>
                      </div>
                      {doctor.availableToday && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                          Available Today
                        </span>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 font-medium text-gray-900">{doctor.rating}</span>
                      </div>
                      <span className="text-gray-500">({doctor.reviewCount} reviews)</span>
                    </div>

                    {/* Experience & Education */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <Award className="h-4 w-4 mr-2" />
                        {doctor.experience} years experience
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {doctor.hospital}
                      </div>
                    </div>

                    {/* About */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {doctor.about}
                    </p>

                    {/* Availability & Fee */}
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {doctor.nextAvailable}
                        </div>
                        <div className="font-semibold text-gray-900 mt-1">
                          ${doctor.consultationFee} consultation
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          to={`/doctors/${doctor.id}`}
                          className="px-4 py-2 text-sm border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
                        >
                          View Profile
                        </Link>
                        <Link
                          to={`/appointments/book/${doctor.id}`}
                          className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorList;