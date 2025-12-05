# Fitness Application Frontend - Complete Documentation

## Project Structure

```
fitness-frontend/
├── src/
│   ├── pages/
│   │   ├── Home.js          # Landing page with features overview
│   │   ├── Login.js         # User login page
│   │   ├── Signup.js        # User registration page
│   │   ├── Dashboard.js     # User dashboard with profile info
│   │   ├── Workout.js       # Personalized workout plan page
│   │   ├── Diet.js          # Personalized diet plan page
│   │   └── Shop.js          # Products shopping page
│   ├── components/
│   │   ├── Header.js        # Navigation header
│   │   ├── Footer.js        # Footer component
│   │   ├── LoginForm.js     # Login form component
│   │   ├── SignupForm.js    # Signup form with profile fields
│   │   ├── Chatbot.js       # AI chatbot interface
│   │   ├── Cart.js          # Shopping cart with checkout
│   │   ├── DietPlan.js      # Diet plan display component
│   │   ├── WorkoutPlan.js   # Workout plan display component
│   │   └── Products.js      # Product grid component
│   ├── api/
│   │   ├── axiosInstance.js # Axios configuration with JWT
│   │   ├── auth.js          # Authentication API calls
│   │   ├── plans.js         # Workout & diet plans API
│   │   ├── products.js      # Products API calls
│   │   ├── orders.js        # Orders & checkout API
│   │   └── chat.js          # Chatbot API calls
│   ├── App.js               # Main app component with routing
│   ├── App.css              # Complete styling
│   ├── index.js             # React entry point
│   └── index.css            # Global styles
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── package.json
└── README.md
```

## Features Implemented

### 1. Authentication System
- **Signup Page**: User registration with fitness profile fields
  - Name, Email, Password
  - Weight (kg), Height (cm), Fitness Goal
  - JWT token management

- **Login Page**: User authentication
  - Email and password validation
  - Automatic token storage
  - Redirect to dashboard on success

- **Protected Routes**: Dashboard, Workout, Diet pages require authentication

### 2. User Dashboard
- **Profile Information**: Display user's registered details
- **BMI Calculation**: Automatic BMI calculation from weight/height
- **Quick Stats**: Account status and fitness metrics
- **Quick Links**: Navigate to workout, diet, and shop pages

### 3. Personalized Plans

#### Workout Plan Page
- **Goal-based Plans**: Different routines for weight loss, muscle building, or general fitness
- **Weekly Schedule**: Structured workout recommendations
- **Fitness Level**: Beginner/Intermediate based on BMI
- **8-week duration** with progressive overload guidance

#### Diet Plan Page
- **Caloric Targets**: Based on BMI and fitness goal
- **Meal Breakdown**: Breakfast, lunch, snack, dinner suggestions
- **Nutritional Guidelines**: Protein intake, macro balance
- **Calorie Distribution**: Percentages for each meal

### 4. Shopping System
- **Product Listing**: Browse fitness products with details
- **Stock Management**: Real-time stock display
- **Add to Cart**: Dynamic cart management
- **Checkout**: Complete order with payment processing
- **Order Confirmation**: Order ID generation

### 5. AI Chatbot
- **Real-time Chat**: Talk to AI fitness coach
- **Context-aware Responses**: Health and fitness questions
- **Message History**: View conversation thread
- **Loading States**: User feedback during processing

### 6. Responsive Design
- **Mobile Optimized**: Works on all screen sizes
- **Tablet Support**: Grid layouts adapt responsively
- **Desktop Experience**: Full-width optimized layout
- **Touch-friendly**: Larger buttons for mobile

## API Integration

### Auth API (`/api/auth`)
```javascript
POST /auth/signup    // Register new user
POST /auth/login     // User login
```

### Plans API (`/api/plans`)
```javascript
GET /plans/workout/:userId    // Get workout plan
GET /plans/diet/:userId       // Get diet plan
```

### Products API (`/api/products`)
```javascript
GET /products           // List all products
GET /products/:id       // Get single product
```

### Orders API (`/api/orders`)
```javascript
POST /orders            // Create new order
```

### Chat API (`/api/chat`)
```javascript
POST /chat              // Send message to AI
```

## State Management

### Global Auth Context
```javascript
const { user, signIn, signUp, signOut } = useAuth();
```

### Protected Route Component
```javascript
<ProtectedRoute>
  <Component />
</ProtectedRoute>
```

## Components Overview

### Pages
1. **Home** - Landing page with features
2. **Login** - Authentication
3. **Signup** - User registration
4. **Dashboard** - User profile & overview
5. **Workout** - Workout plan display
6. **Diet** - Diet plan display
7. **Shop** - Product marketplace

### Components
1. **Header** - Navigation with logout
2. **Footer** - App information and links
3. **LoginForm** - Email/password form
4. **SignupForm** - Registration with fitness fields
5. **Chatbot** - AI chat interface
6. **Cart** - Shopping cart & checkout
7. **DietPlan** - Reusable diet plan display
8. **WorkoutPlan** - Reusable workout plan display
9. **Products** - Product grid display

## Styling

### Color Scheme
- **Primary**: #667eea (Purple)
- **Secondary**: #764ba2 (Dark Purple)
- **Accent**: #ffd700 (Gold)
- **Text**: #2c3e50 (Dark Gray)
- **Background**: #f5f5f5 (Light Gray)

### Component Styling
- Card-based layouts with shadows
- Hover effects for interactivity
- Gradient backgrounds
- Responsive grid layouts
- Mobile-first design

## Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm npm run build
```

## Environment Configuration

Create a `.env` file in the frontend root:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Error Handling
- API error messages displayed to users
- Form validation before submission
- Try-catch blocks in async operations
- User-friendly error messages

## Security Features
- JWT token storage in localStorage
- Axios interceptor for token attachment
- Protected routes for authenticated users
- Password encryption on backend

## Future Enhancements
- Progress tracking/history
- Photo upload for products
- Advanced search & filtering
- User reviews & ratings
- Payment gateway integration
- Push notifications
- Social sharing features
- Workout video tutorials

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
