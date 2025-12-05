# ⚡ QUICK START GUIDE - Fitness Application

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js (v14+) and npm installed
- Backend running on `http://localhost:5000`

---

## Step 1: Install Frontend Dependencies
```bash
cd fitness-frontend
npm install
```

---

## Step 2: Configure Environment
Create `.env` file in `fitness-frontend/`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Step 3: Ensure Backend is Running
```bash
cd backend
npm start
# Should show: "Server running on 5000"
```

---

## Step 4: Start Frontend
```bash
cd fitness-frontend
npm start
# Opens http://localhost:3000 automatically
```

---

## 🧪 Test These Features

### 1. Create Account
- Click "Sign Up"
- Fill: Name, Email, Password
- Add: Weight (kg), Height (cm)
- Select: Fitness Goal
- Submit

### 2. Login
- Click "Login"
- Enter email and password
- You're now authenticated!

### 3. View Dashboard
- See profile info
- Check BMI calculation
- View available features

### 4. Get Workout Plan
- Click "Workout" in header
- Get personalized workout based on goal
- See weekly schedule

### 5. Get Diet Plan
- Click "Diet" in header
- Get personalized meals
- View calorie targets

### 6. Shop Products
- Click "Shop"
- Browse products
- Add items to cart
- Click "Checkout"
- Order created!

### 7. Chat with AI
- Click "Chatbot" (if enabled)
- Ask fitness questions
- Get AI responses

---

## 📁 Key File Locations

```
fitness-frontend/
├── src/
│   ├── api/              ← API calls
│   ├── pages/            ← Page components
│   ├── components/       ← Reusable components
│   ├── App.js            ← Main app
│   └── App.css           ← All styling
└── .env                  ← Your config
```

---

## 🔧 Configuration

### API Base URL
Located in: `/src/api/axiosInstance.js`
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Backend Endpoints Used
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login
- `GET /api/plans/workout/:userId` - Workout
- `GET /api/plans/diet/:userId` - Diet
- `GET /api/products` - Products
- `POST /api/orders` - Checkout
- `POST /api/chat` - Chatbot

---

## 🎨 Available Routes

| Route | Public | Purpose |
|-------|--------|---------|
| `/` | ✓ | Home page |
| `/login` | ✓ | Login page |
| `/signup` | ✓ | Sign up page |
| `/shop` | ✓ | Product shop |
| `/dashboard` | ✗ | User dashboard |
| `/workout` | ✗ | Workout plan |
| `/diet` | ✗ | Diet plan |

(✓ = Public, ✗ = Requires Login)

---

## 🐛 Troubleshooting

### "Cannot GET /" Error
**Solution:** Backend not running
```bash
cd backend
npm start
```

### "API Connection Failed"
**Solution:** Check .env file
```
REACT_APP_API_URL=http://localhost:5000/api
```

### "Login Failed"
**Solution:** 
1. Verify account was created
2. Check credentials are correct
3. Clear browser cache/localStorage

### Port 3000 Already in Use
**Solution:** Kill process or use different port
```bash
npm start -- --port 3001
```

---

## 📱 Test on Mobile

### Using Localhost
```bash
# Get your IP
ipconfig getifaddr en0  # Mac
ipconfig               # Windows

# Visit: http://YOUR_IP:3000
```

---

## 🎯 Features Overview

✅ **Authentication** - Secure login/signup
✅ **Dashboard** - User profile & stats
✅ **Personalization** - AI-generated plans
✅ **Shopping** - Full e-commerce
✅ **Chatbot** - AI fitness coach
✅ **Responsive** - Mobile/tablet/desktop
✅ **Professional UI** - Modern design

---

## 💾 Build for Production

```bash
npm run build
# Creates optimized build in /build folder

# To test production build:
npm install -g serve
serve -s build
```

---

## 📚 Full Documentation

See these files for complete documentation:
- `FRONTEND_COMPLETE_GUIDE.md` - Comprehensive guide
- `INTEGRATION_GUIDE.md` - Frontend-Backend integration
- `FRONTEND_DOCUMENTATION.md` - Feature details
- `FRONTEND_FILE_TREE.md` - File structure details

---

## ✨ Next Steps

1. **Run the app** - `npm start`
2. **Test features** - Try signup, login, shop
3. **Explore code** - Check `/src` folder
4. **Customize** - Modify colors, text, layouts
5. **Deploy** - Use `npm run build` for production

---

## 🆘 Still Need Help?

1. Check console errors: Press F12 in browser
2. Check backend logs: Terminal running backend
3. Verify environment variables: Check .env file
4. Review documentation: Read INTEGRATION_GUIDE.md

---

## 🎉 You're All Set!

Your fitness application is ready to use!

```bash
# Start everything:
npm start  # Frontend on http://localhost:3000
# In another terminal:
cd backend && npm start  # Backend on http://localhost:5000
```

Happy coding! 💪
