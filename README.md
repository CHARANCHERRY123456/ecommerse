# 🛒 EcoShop - E-Commerce Application

A modern, full-stack e-commerce application built with React, Node.js, Express, and MongoDB. Features user authentication, product management, shopping cart functionality, and a beautiful professional UI.

![EcoShop Banner](https://via.placeholder.com/800x200/6366f1/ffffff?text=EcoShop+-+Modern+E-Commerce+Platform)

## ✨ Features

### 🔐 **Authentication & Security**
- User registration and login with JWT authentication
- Secure password hashing with bcryptjs
- Protected routes and middleware
- Session management with localStorage

### 🛍️ **Product Management**
- Browse products with advanced filtering
- Category-based product organization (11+ categories)
- Search functionality
- Product image support
- Add new products (authenticated users)

### 🛒 **Shopping Cart**
- Add/remove items from cart
- Persistent cart data
- Real-time cart updates
- Cart total calculation

### 🎨 **Professional UI/UX**
- Modern, responsive design with Tailwind CSS
- Gradient backgrounds and animations
- Professional navigation with user avatars
- Loading states and error handling
- Mobile-friendly interface

## 🚀 Tech Stack

### **Frontend**
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd ecomerse
```

### 2. Install Dependencies

**Install server dependencies:**
```bash
cd server
npm install
```

**Install client dependencies:**
```bash
cd ../client
npm install
```

### 3. Environment Configuration

**Create server/.env file:**
```bash
cd ../server
```

Create `.env` file with the following variables:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/ecomerse
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecomerse
JWT_SECRET=your-super-secret-jwt-key-change-in-production
FRONTEND_URL=http://localhost:5173
```

**Create client/.env file:**
```bash
cd ../client
```

Create `.env` file with:
```env
VITE_BASEURL=http://localhost:3000/api
```

### 4. Start the Application

**Start the backend server:**
```bash
cd server
npm run start
```
Server will run on `http://localhost:3000`

**Start the frontend (in a new terminal):**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## 📚 API Endpoints

### **Authentication**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login

### **Items**
- `GET /api/items` - Get all items (with optional filters)
- `POST /api/items` - Create new item (authenticated)
- `GET /api/items/:id` - Get single item
- `PUT /api/items/:id` - Update item (authenticated)
- `DELETE /api/items/:id` - Delete item (authenticated)

### **Cart**
- `GET /api/cart` - Get user's cart (authenticated)
- `POST /api/cart/add` - Add item to cart (authenticated)
- `POST /api/cart/remove` - Remove item from cart (authenticated)

## 🗂️ Project Structure

```
ecomerse/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── assets/        # Images and assets
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React context providers
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # App entry point
│   ├── package.json
│   ├── vercel.json        # Vercel deployment config
│   └── vite.config.js     # Vite configuration
├── server/                # Node.js backend
│   ├── controller/        # Route controllers
│   ├── middleware/        # Express middleware
│   ├── models/           # Mongoose models
│   ├── router/           # Route definitions
│   ├── service/          # Business logic
│   ├── index.js          # Server entry point
│   ├── db.js             # Database connection
│   ├── package.json
│   └── vercel.json       # Vercel deployment config
├── vercel.json           # Full-stack deployment config
└── README.md
```

## 🚀 Deployment

### **Vercel Deployment (Recommended)**

1. **Deploy full-stack application:**
```bash
# From root directory
vercel --prod
```

2. **Or deploy separately:**
```bash
# Deploy frontend
cd client && vercel --prod

# Deploy backend
cd server && vercel --prod
```

### **Environment Variables for Production**
In your Vercel dashboard, add these environment variables:

**For Backend:**
- `MONGO_URI` - Your MongoDB connection string
- `JWT_SECRET` - Strong secret key for JWT
- `FRONTEND_URL` - Your deployed frontend URL

**For Frontend:**
- `VITE_BASEURL` - Your deployed backend URL

## 📱 Usage

### **User Registration & Login**
1. Navigate to `/signup` to create a new account
2. Use `/login` to sign in with existing credentials
3. JWT token is stored in localStorage for session management

### **Browse Products**
1. Visit `/items` to see all products
2. Use category filters to narrow down products
3. Use price filters for budget-based shopping

### **Shopping Cart**
1. Click "Add to Cart" on any product
2. Visit `/cart` to view cart items
3. Remove items or proceed to checkout

### **Add Products**
1. Login as an authenticated user
2. Visit `/add-item` to create new products
3. Fill in product details and submit

## 🧪 Features Tested

- ✅ User authentication (signup/login)
- ✅ JWT token validation
- ✅ Product CRUD operations
- ✅ Cart functionality (add/remove)
- ✅ Category filtering
- ✅ Price range filtering
- ✅ Responsive design
- ✅ Error handling
- ✅ Input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues & Solutions

### **CORS Issues**
- Ensure `FRONTEND_URL` is correctly set in server/.env
- Check that client is running on the specified port

### **Database Connection**
- Verify MongoDB is running (if using local MongoDB)
- Check MongoDB Atlas connection string format
- Ensure network access is configured in MongoDB Atlas

### **Build Issues**
- Clear node_modules and reinstall dependencies
- Check Node.js version compatibility
- Verify all environment variables are set

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- MongoDB for the flexible database solution
- Tailwind CSS for the beautiful styling system
- Vercel for easy deployment platform

---

**⭐ If you found this project helpful, please give it a star!**

For questions or support, please open an issue or contact the maintainer.
