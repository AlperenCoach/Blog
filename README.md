# AlpiDev Blog Platform

A full-stack blog platform built with React 19 and .NET 9, featuring secure authentication, blog management, and contact form functionality.

## 🚀 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **Google OAuth** - Social authentication

### Backend
- **.NET 9** - Web API framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication tokens
- **BCrypt** - Password hashing
- **MailKit** - Email sending
- **Swagger/Scalar** - API documentation

## 📋 Prerequisites

- **.NET 9 SDK** - [Download](https://dotnet.microsoft.com/download)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** - [Download](https://git-scm.com/)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/AlperenCoach/Blog.git
cd Blog
```

### 2. Backend Setup

```bash
cd API
dotnet restore
dotnet build
```

### 3. Frontend Setup

```bash
cd myproject
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create environment variables or update `appsettings.json`:

**Required for Production:**
```bash
# MongoDB Connection
MONGODB_CONNECTION_STRING=mongodb://localhost:27017
# Or for MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/

# JWT Configuration (MUST be at least 32 characters)
JWT_SECRET_KEY=YourStrongSecretKeyHereMinimum32CharactersLongForHS256!
JWT_ISSUER=AlpiDevAPI
JWT_AUDIENCE=AlpiDevClient

# CORS Configuration (comma-separated)
CORS_ALLOWED_ORIGINS=https://alpidev.com,https://www.alpidev.com

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
EMAIL_FROM=your-email@gmail.com
EMAIL_FROM_NAME=AlpiDev Contact Form
EMAIL_TO=info@alpidev.com
```

**Generate JWT Secret Key:**
```bash
# Linux/Mac
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

### Frontend Environment Variables

Create `.env` file in `myproject/` directory:

```bash
# API Base URL
VITE_API_BASE_URL=http://localhost:5065/api
# For production: https://api.yourdomain.com/api

# Google OAuth Client ID (optional, if using Google Sign-In)
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

## 🏃 Running the Application

### Development Mode

**Backend:**
```bash
cd API
dotnet run
```
API will be available at `http://localhost:5065`

**Frontend:**
```bash
cd myproject
npm run dev
```
Frontend will be available at `http://localhost:5173`

### Production Build

**Backend:**
```bash
cd API
dotnet publish -c Release -o ./publish
```

**Frontend:**
```bash
cd myproject
npm run build
```
Built files will be in `myproject/dist/`

## 🔒 Security Features

✅ **BCrypt Password Hashing** - Secure password storage  
✅ **JWT Authentication** - Token-based auth with configurable expiration  
✅ **Rate Limiting** - Protection against brute force attacks  
✅ **Input Sanitization** - XSS and injection prevention  
✅ **Email Validation** - Format validation with data annotations  
✅ **Password Policy** - Minimum 8 chars, complexity requirements  
✅ **CORS Configuration** - Environment-based origin whitelisting  
✅ **Global Exception Handler** - Centralized error handling  
✅ **Role-Based Authorization** - Admin and User roles  

## 📚 API Documentation

When running in development mode, API documentation is available at:
- **Swagger UI**: `http://localhost:5065/swagger`
- **Scalar UI**: `http://localhost:5065/scalar/v1`

## 🗄️ Database

The application uses MongoDB with the following collections:
- `users` - User accounts with email/username unique indexes
- `blogs` - Blog posts with author and date indexes
- `contactMessages` - Contact form submissions

### Database Indexes

The application automatically creates indexes for:
- User email (unique)
- User username (unique)
- Blog author ID
- Blog creation date
- Contact message creation date
- Contact message read status

## 📧 Email Configuration

The contact form sends emails using SMTP. For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Use the app password in `SMTP_PASSWORD`

## 🚢 Production Deployment

### Critical Checklist Before Deployment

- [ ] Set strong `JWT_SECRET_KEY` (minimum 32 characters)
- [ ] Configure `CORS_ALLOWED_ORIGINS` with production domain(s)
- [ ] Set MongoDB connection string (use MongoDB Atlas for cloud)
- [ ] Configure SMTP credentials for email functionality
- [ ] Set `ASPNETCORE_ENVIRONMENT=Production`
- [ ] Update frontend `VITE_API_BASE_URL` to production API URL
- [ ] Enable HTTPS in production
- [ ] Review and adjust rate limiting rules
- [ ] Set up monitoring and logging
- [ ] Configure backup strategy for MongoDB

### Environment Variables Priority

The backend reads configuration in this order:
1. Environment Variables (highest priority)
2. `appsettings.Production.json`
3. `appsettings.json`
4. Default values (development only)

### Deployment Options

**Option 1: Traditional Hosting**
- Deploy .NET API to IIS, Linux server, or cloud service
- Deploy React build to static hosting (Netlify, Vercel, etc.)

**Option 2: Docker (Recommended)**
```bash
# Build and run with Docker Compose
docker-compose up -d
```

**Option 3: Cloud Platforms**
- **Azure**: Azure App Service + Azure Cosmos DB (MongoDB API)
- **AWS**: EC2/ECS + DocumentDB or MongoDB Atlas
- **Google Cloud**: Cloud Run + MongoDB Atlas

## 🧪 Testing

```bash
# Backend tests (when implemented)
cd API
dotnet test

# Frontend tests (when implemented)
cd myproject
npm test
```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/google` - Google OAuth authentication

### Users
- `GET /api/user/{id}` - Get user by ID
- `PUT /api/user/{id}` - Update user profile (requires auth)
- `DELETE /api/user/{id}` - Delete user (admin only)
- `PATCH /api/user/{id}/activate` - Activate user (admin only)

### Blogs
- `GET /api/blog` - Get paginated blogs
- `GET /api/blog/{id}` - Get blog by ID
- `POST /api/blog` - Create blog (requires auth)
- `PUT /api/blog/{id}` - Update blog (author or admin only)
- `DELETE /api/blog/{id}` - Delete blog (author or admin only)

### Contact
- `POST /api/contact` - Submit contact message
- `GET /api/contact` - Get all messages (admin only)
- `GET /api/contact/{id}` - Get message by ID (admin only)
- `PATCH /api/contact/{id}/read` - Mark message as read (admin only)

### Health Check
- `GET /health` - Application health status

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Failed**
- Ensure MongoDB is running
- Check connection string format
- Verify network/firewall settings

**2. JWT Secret Key Error**
- Ensure `JWT_SECRET_KEY` is at least 32 characters
- Check environment variable is set correctly

**3. CORS Errors**
- Verify `CORS_ALLOWED_ORIGINS` includes your frontend URL
- Check for trailing slashes in URLs

**4. Email Not Sending**
- Verify SMTP credentials
- Check firewall/network settings
- For Gmail, ensure App Password is used (not regular password)

## 📄 License

This project is private and proprietary.

## 👤 Author

**Alperen Coach**
- Website: [alpidev.com](https://alpidev.com)
- Email: info@alpidev.com

## 🙏 Acknowledgments

- React Team
- .NET Team
- MongoDB Team
- All open-source contributors

---

**⚠️ Important:** Never commit sensitive information like API keys, passwords, or connection strings to version control. Always use environment variables or secure configuration management.

