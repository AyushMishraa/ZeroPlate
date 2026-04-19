# 🍽️ ZeroPlate Frontend - Angular 17+ Application

A modern, production-ready Angular 17+ frontend for the ZeroPlate food waste reduction platform.

## 🚀 Features

### ✅ **Authentication & Authorization**
- Email/Password login and registration
- Google OAuth 2.0 integration
- Multi-step registration with role selection
- Geolocation support for user location
- JWT-based authentication with HTTP interceptors
- Role-based route guards (Donor, Receiver, Admin)

### 🍲 **Donor Features**
- **Dashboard**: View statistics, active listings, and impact metrics
- **Add Food**: Create food listings with location and expiration dates
- **My Foods**: Manage all food listings with status filtering
- Real-time NGO matching recommendations
- Track total meals saved and CO₂ reduction

### 🏢 **Receiver (NGO) Features**
- **Dashboard**: Browse available food and track claims
- **Browse Food**: Search and filter available donations with urgency indicators
- **My Claims**: Track claim status (pending, approved, completed)
- One-click food claiming system
- View donor information and pickup locations

### 👨‍💼 **Admin Features**
- **Dashboard**: Comprehensive platform statistics and metrics
- **Analytics**: Platform-wide analytics, top donors leaderboard
- **Fraud Detection**: Monitor suspicious activity, duplicate claims, rapid claims
- Pending pickups management
- Food distribution by type visualization

### 🔔 **Real-time Features**
- Socket.IO integration for live notifications
- Real-time claim updates
- Food expiry alerts
- Pickup reminders

## 📋 Prerequisites

- **Node.js** v18 or higher
- **npm** v8 or higher
- **Angular CLI** v17 or higher

## 🛠️ Installation

1. **Navigate to the frontend directory**
```bash
cd frontend/zeroplate-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**

Update `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api',
  socketUrl: 'http://localhost:5000'
};
```

## 🚀 Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`

## 🏗️ Build

```bash
ng build --configuration production
```

## 📁 Project Structure

```
src/app/
├── core/              # Services, guards, interceptors, models
├── features/          # Feature modules (auth, donor, receiver, admin)
├── shared/            # Shared components
├── app.component.ts
├── app.config.ts
└── app.routes.ts
```

## 🔐 User Roles & Routes

**Donor Routes** (Protected by donorGuard):
- `/donor/dashboard` - View stats and recent listings
- `/donor/add-food` - Create new food donation
- `/donor/my-foods` - Manage all food listings

**Receiver Routes** (Protected by receiverGuard):
- `/receiver/dashboard` - View available food and claims
- `/receiver/browse-food` - Search and claim food
- `/receiver/my-claims` - Track claimed items

**Admin Routes** (Protected by adminGuard):
- `/admin/dashboard` - Platform statistics
- `/admin/analytics` - Detailed analytics & top donors
- `/admin/fraud` - Fraud detection system

## 🎨 Tech Stack

- **Angular 17** with standalone components
- **Angular Material 17** for UI components
- **Socket.IO Client** for real-time notifications
- **RxJS** for reactive programming
- **TypeScript 5.4**
- **SCSS** for styling

## 🔧 Key Services

- `AuthService` - Authentication & user management
- `FoodService` - Food item CRUD operations
- `ClaimService` - Claim management
- `AdminService` - Admin dashboard data
- `AnalyticsService` - Platform analytics
- `SocketService` - Real-time notifications

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 600px (mobile), 960px (tablet)
- Fully responsive components

## 🛡️ Security

- JWT token authentication
- HTTP interceptors for auto-token attachment
- Route guards for access control
- Angular's built-in XSS protection

## 🐛 Troubleshooting

**CORS Issues**:
Ensure backend CORS allows `http://localhost:4200`

**Socket.IO Connection**:
Verify `socketUrl` matches your backend

**Dependencies**:
Use `npm install --legacy-peer-deps` if needed

## 📄 License

ISC

---

**Built with ❤️ using Angular 17+**
