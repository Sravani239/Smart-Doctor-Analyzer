# Smart Doctor Recommender System

A comprehensive full-stack healthcare application that helps patients find appropriate doctors based on their symptoms, book appointments, and manage their health records.

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons
- **Vite** for development and building

### Backend
- **Spring Boot 3.2** with Java 17
- **Spring Security** with JWT authentication
- **Spring Data JPA** for database operations
- **MySQL** database
- **Maven** for dependency management

### Database
- **MySQL 8.0** with optimized schema
- Proper indexing for performance
- Foreign key relationships
- Sample data initialization

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure login/signup with JWT tokens
- **Patient Profiles**: Comprehensive user profile management
- **Symptom Analyzer**: AI-powered symptom analysis with disease prediction
- **Doctor Recommendations**: Smart doctor matching based on symptoms
- **Appointment Booking**: Complete appointment management system
- **Emergency Resources**: Quick access to emergency services

### Advanced Features
- **Role-based Access Control**: Patient, Doctor, and Admin roles
- **Search & Filtering**: Advanced doctor search with multiple filters
- **Medical History**: Track symptom analyses and appointments
- **Responsive Design**: Mobile-first responsive interface
- **Real-time Updates**: Dynamic content updates

## 📁 Project Structure

```
smart-doctor-recommender/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # React contexts
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Spring Boot application
│   ├── src/main/java/com/healthcare/
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   ├── dto/             # Data transfer objects
│   │   ├── security/        # Security configuration
│   │   └── config/          # Application configuration
│   ├── src/main/resources/
│   │   └── application.yml  # Application configuration
│   └── pom.xml
└── database/
    └── schema.sql           # Database schema and sample data
```

## 🛠️ Setup Instructions

### Prerequisites
- **Java 17** or higher
- **Node.js 18** or higher
- **MySQL 8.0** or higher
- **Maven 3.6** or higher

### Database Setup
1. Install MySQL and create a database:
```sql
CREATE DATABASE healthcare_db;
```

2. Update database credentials in `backend/src/main/resources/application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/healthcare_db
    username: your_username
    password: your_password
```

3. Run the schema file to create tables and sample data:
```bash
mysql -u your_username -p healthcare_db < database/schema.sql
```

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies and run:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### JWT Configuration
Update JWT secret in `application.yml`:
```yaml
spring:
  security:
    jwt:
      secret: your-secret-key-here
      expiration: 86400000
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Doctors
- `GET /api/doctors/public/all` - Get all doctors
- `GET /api/doctors/public/search` - Search doctors
- `GET /api/doctors/public/specialization/{spec}` - Get doctors by specialization

### Symptoms
- `POST /api/symptoms/analyze` - Analyze symptoms
- `GET /api/symptoms/history` - Get symptom history

### Appointments
- `POST /api/appointments/book` - Book appointment
- `GET /api/appointments/my-appointments` - Get user appointments

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt password hashing
- **Role-based Access**: Different access levels for users
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Comprehensive request validation

## 🧪 Testing

### Backend Testing
```bash
cd backend
mvn test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Mobile devices** (320px and up)
- **Tablets** (768px and up)
- **Desktop** (1024px and up)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0066CC) - Trust and medical professionalism
- **Secondary**: Green (#00A651) - Health and wellness
- **Accent**: Red (#ef4444) - Emergency and alerts
- **Neutral**: Gray shades for text and backgrounds

### Typography
- **Font Family**: Inter (system fallback)
- **Headings**: Bold weights for hierarchy
- **Body Text**: Regular weight for readability

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file:
```bash
mvn clean package
```

2. Deploy to your server:
```bash
java -jar target/smart-doctor-recommender-0.0.1-SNAPSHOT.jar
```

### Frontend Deployment
1. Build for production:
```bash
npm run build
```

2. Deploy the `dist` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Frontend Development**: React, TypeScript, Tailwind CSS
- **Backend Development**: Spring Boot, Spring Security, JPA
- **Database Design**: MySQL with optimized schema
- **UI/UX Design**: Modern healthcare-focused interface

## 📞 Support

For support and questions:
- Email: support@healthcare-connect.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

---

**Smart Doctor Recommender System** - Connecting patients with the right healthcare professionals through intelligent technology.