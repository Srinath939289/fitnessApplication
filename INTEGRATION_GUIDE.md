# Frontend - Backend Integration Guide

## Frontend Structure Aligned with Backend APIs

### 1. Authentication Flow

**Backend** (`/src/controllers/authController.js`):
```javascript
// Signup endpoint
POST /api/auth/signup
Request: { name, email, password, weight, height, goal }
Response: { id, name, email, token }

// Login endpoint
POST /api/auth/login
Request: { email, password }
Response: { id, name, email, token }
```

**Frontend** (`/src/api/auth.js`):
```javascript
// Signup function
export const signup = async (data) => { }

// Login function
export const login = async (email, password) => { }

// Logout function
export const logout = () => { }

// Get current user
export const getCurrentUser = () => { }
```

**Frontend Usage** (`/src/pages/Signup.js`, `/src/pages/Login.js`):
- SignupForm component collects user data
- Signup page calls `signUp()` from AuthContext
- Redirects to dashboard on success
- JWT token stored in localStorage

---

### 2. Plans System (Workout & Diet)

**Backend** (`/src/controllers/planController.js`):
```javascript
// Workout plan endpoint
GET /api/plans/workout/:userId
Response: { 
  name, 
  goal, 
  level, 
  duration_weeks, 
  details: { weekly: [], notes: '' }
}

// Diet plan endpoint
GET /api/plans/diet/:userId
Response: {
  name,
  goal,
  calories_per_day,
  details: { breakfast, lunch, snack, dinner }
}
```

**Backend Logic**:
- Calculates BMI from user's weight and height
- Generates plans based on fitness goal
- Different routines for: weight loss, fat loss, muscle building
- Caloric targets using Mifflin-St Jeor formula

**Frontend** (`/src/api/plans.js`):
```javascript
export const getWorkoutPlan = async (userId) => { }
export const getDietPlan = async (userId) => { }
export const generatePlan = async (planType, userData) => { }
```

**Frontend Display**:
- `/src/pages/Workout.js` - Fetches and displays workout plan
- `/src/pages/Diet.js` - Fetches and displays diet plan
- `/src/components/WorkoutPlan.js` - Reusable workout display
- `/src/components/DietPlan.js` - Reusable diet display

---

### 3. Products & Shopping

**Backend** (`/src/controllers/productController.js`):
```javascript
// Get all products
GET /api/products
Response: [{ id, name, price, description, stock }, ...]

// Get single product
GET /api/products/:id
Response: { id, name, price, description, stock }
```

**Backend Database Schema**:
```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  stock INT
);
```

**Frontend** (`/src/api/products.js`):
```javascript
export const getProducts = async () => { }
export const getProduct = async (id) => { }
```

**Frontend Components**:
- `/src/pages/Shop.js` - Main shopping page
  - Fetches products list
  - Manages cart state
  - Handles add/remove from cart
- `/src/components/Products.js` - Product grid display
- `/src/components/Cart.js` - Shopping cart display

---

### 4. Orders & Checkout

**Backend** (`/src/controllers/orderController.js`):
```javascript
// Create order
POST /api/orders
Request: { 
  userId, 
  items: [{ productId, quantity }, ...]
}
Response: { orderId, total }

// Process:
1. Validate items and check stock
2. Calculate total price
3. Create order with status 'pending'
4. Create order_items records
5. Decrement product stock
6. Create payment record
7. Mark payment as 'success'
8. Update order status to 'paid'
```

**Backend Database Schema**:
```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  total_amount DECIMAL(10, 2),
  status VARCHAR(50), -- pending, paid, cancelled
  created_at TIMESTAMP
);

CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL(10, 2)
);

CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT,
  provider VARCHAR(50),
  amount DECIMAL(10, 2),
  status VARCHAR(50) -- initiated, success, failed
);
```

**Frontend** (`/src/api/orders.js`):
```javascript
export const createOrder = async (userId, items) => { }
export const buildOrderItems = (cartItems) => { }
```

**Frontend Components**:
- `/src/components/Cart.js`
  - Displays cart items
  - Calculates total
  - Calls createOrder on checkout
  - Handles success/error states

---

### 5. Chatbot AI

**Backend** (`/src/controllers/chatController.js`):
```javascript
// Send message to AI
POST /api/chat
Request: { message, context }
Response: { reply: "AI response text" }

// Integration:
- Uses OpenAI API (text-davinci-003)
- Sends user message as prompt
- Returns AI-generated response
- Requires OPENAI_API_KEY environment variable
```

**Frontend** (`/src/api/chat.js`):
```javascript
export const sendMessage = async (message, context = '') => { }
```

**Frontend Components**:
- `/src/components/Chatbot.js`
  - Chat interface
  - Message history
  - Real-time responses
  - Loading states

---

### 6. User Authentication Flow (Protected Routes)

**Frontend** (`/src/App.js`):
```javascript
// Auth Context with global state
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// AuthProvider wrapper
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthApi.getCurrentUser());
  
  const signIn = async (email, password) => { }
  const signUp = async (data) => { }
  const signOut = () => { }
  
  return <AuthContext.Provider value={...}>{children}</AuthContext.Provider>;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
```

**Protected Pages**:
- `/dashboard` - Requires authentication
- `/workout` - Requires authentication
- `/diet` - Requires authentication

**Public Pages**:
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/shop` - Shop (works for both auth & non-auth users)

---

### 7. API Configuration

**Frontend** (`/src/api/axiosInstance.js`):
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Attach JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

**Backend** (`/src/middleware/auth.js`):
```javascript
// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

---

## Data Flow Examples

### Example 1: User Signup

```
Frontend (SignupForm)
    ↓
Input: {name, email, password, weight, height, goal}
    ↓
Frontend (signup API)
    → POST /api/auth/signup
    ↓
Backend (authController.signup)
    → Hash password with bcrypt
    → Insert into users table
    → Generate JWT token
    ← Return {id, name, email, token}
    ↓
Frontend (Auth Context)
    → Save token to localStorage
    → Save user to localStorage
    → Redirect to /dashboard
    ↓
UI Update: User now authenticated
```

### Example 2: Get Personalized Workout

```
Frontend (Workout.js page)
    → useEffect(() => getWorkoutPlan(user.id))
    ↓
Frontend (plans API)
    → GET /api/plans/workout/:userId
    → Attach JWT token in header
    ↓
Backend (planController.getWorkoutPlan)
    → Query user details from database
    → Calculate BMI
    → Generate workout based on goal
    ← Return {name, goal, level, duration_weeks, details}
    ↓
Frontend (WorkoutPlan.js component)
    → Display plan details
    → Show weekly schedule
    → Show notes and guidelines
```

### Example 3: Checkout Process

```
Frontend (Cart.js)
    → User clicks "Checkout"
    ↓
Frontend (orders API)
    → POST /api/orders
    → Body: {userId, items: [{productId, quantity}, ...]}
    ↓
Backend (orderController.createOrder)
    → Begin database transaction
    → Validate all items exist
    → Check stock availability
    → Calculate total
    → Insert order
    → Insert order_items
    → Decrement product stock
    → Create payment record
    → Mark payment success
    → Commit transaction
    ← Return {orderId, total}
    ↓
Frontend (Cart.js)
    → Clear cart
    → Show success message
    → Display order ID
```

---

## Environment Variables

**Backend** (`.env`):
```
PORT=5000
JWT_SECRET=your_secret_key_here
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=password
DATABASE_NAME=fitness_app
OPENAI_API_KEY=your_openai_key_here
```

**Frontend** (`.env`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Error Handling

**Backend → Frontend Flow**:
```
Backend Error:
  res.status(400).json({ error: "Invalid request" })

Frontend Catch:
  catch (error) {
    throw error.response?.data?.error || 'Default error'
  }

User Display:
  alert(error message)
```

---

## Testing the Integration

1. **Signup**: Create new account with weight/height/goal
2. **Login**: Authenticate with email/password
3. **Dashboard**: View profile and BMI
4. **Workout**: See personalized workout plan
5. **Diet**: See personalized diet plan
6. **Shop**: Browse and add products to cart
7. **Checkout**: Complete order with all items
8. **Chatbot**: Ask fitness questions

---

## Key Integration Points

| Frontend | Backend | Purpose |
|----------|---------|---------|
| `/auth.js` | `/authController.js` | User registration & login |
| `/plans.js` | `/planController.js` | Generate personalized plans |
| `/products.js` | `/productController.js` | Product listing |
| `/orders.js` | `/orderController.js` | Order creation & checkout |
| `/chat.js` | `/chatController.js` | AI chatbot communication |
| `axiosInstance.js` | `auth.js` middleware | JWT token management |

This comprehensive integration ensures a seamless user experience from registration through personalized fitness recommendations and shopping.
