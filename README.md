# Borna Café - Online Menu Application

A modern, responsive web application for managing and displaying café menu items built with Node.js, Express, and MongoDB.

## Features

### Customer Features
- **Clean Menu Display**: View menu items organized by categories
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Real-time Updates**: Menu reflects changes made by admin immediately

### Admin Features
- **Secure Login**: Simple authentication system
- **Menu Management**: Add, edit, and delete menu items
- **Category Organization**: Organize items into categories (Beverages, Coffee, Tea, Food, Snacks, Desserts)
- **Real-time Stats**: View total items and categories count
- **Intuitive Interface**: Easy-to-use admin panel

## Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Session Management**: Express-session
- **Styling**: Custom CSS with modern design principles

## Project Structure

```
borna-cafe-menu/
├── server.js                 # Main server file
├── package.json              # Dependencies and scripts
├── models/
│   └── MenuItem.js          # Menu item data model
├── routes/
│   ├── menu.js              # Menu API routes
│   └── admin.js             # Admin API routes
└── public/
    ├── index.html           # Home page
    ├── menu.html            # Customer menu page
    ├── admin.html           # Admin login page
    ├── admin-panel.html     # Admin management panel
    └── styles.css           # All CSS styles
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or remote connection)
- npm (comes with Node.js)

### Step 1: Clone or Download
Download all project files to your local directory.

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Start MongoDB
Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service
- **macOS**: `brew services start mongodb-community`
- **Linux**: `sudo systemctl start mongod`

### Step 4: Start the Application
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

### Step 5: Access the Application
Open your browser and navigate to:
- **Main Site**: http://localhost:3000
- **Menu**: http://localhost:3000/menu
- **Admin**: http://localhost:3000/admin

## Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

*Note: Change these credentials in production by modifying the `routes/admin.js` file.*

## API Endpoints

### Public Endpoints
- `GET /api/menu` - Fetch all menu items grouped by category

### Admin Endpoints (Authentication Required)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/status` - Check admin authentication status
- `GET /api/admin/items` - Get all menu items (admin view)
- `POST /api/admin/items` - Add new menu item
- `PUT /api/admin/items/:id` - Update existing menu item
- `DELETE /api/admin/items/:id` - Delete menu item

## Database Schema

### MenuItem Model
```javascript
{
  name: String,      // Item name (required)
  price: Number,     // Price in Toman (required, minimum 0)
  category: String,  // Category (required, from predefined list)
  timestamps: true   // createdAt, updatedAt (automatic)
}
```

### Available Categories
- Beverages
- Coffee
- Tea
- Food
- Snacks
- Desserts

## Usage Guide

### For Café Owners (Admin)
1. **Login**: Go to Admin Panel and login with credentials
2. **Add Items**: Use the "Add New Item" form to add menu items
3. **Manage Items**: View, edit, or delete existing items from the list
4. **Monitor**: Check stats for total items and categories
5. **Logout**: Always logout when finished for security

### For Customers
1. **View Menu**: Click "View Menu" on the home page
2. **Browse Categories**: Menu items are organized by category
3. **Check Prices**: Prices are displayed in Toman (e.g., 9,000t)

## Customization

### Changing Admin Credentials
Edit `routes/admin.js` and modify these lines:
```javascript
const ADMIN_USERNAME = 'your-username';
const ADMIN_PASSWORD = 'your-password';
```

### Adding New Categories
1. Update the enum in `models/MenuItem.js`
2. Add the new category to the dropdown in `admin-panel.html`

### Styling Changes
All styles are in `public/styles.css`. The design uses:
- Modern CSS Grid and Flexbox
- CSS Variables for easy color changes
- Mobile-first responsive design
- Smooth animations and transitions

### Database Configuration
To change database connection, modify the MongoDB URL in `server.js`:
```javascript
mongoose.connect('your-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

## Security Notes

- Admin authentication uses simple session-based auth
- For production, implement proper password hashing
- Consider adding HTTPS in production
- Add rate limiting for API endpoints
- Implement input validation and sanitization

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in server.js
   - Verify MongoDB port (default: 27017)

2. **Port Already in Use**
   - Change PORT in server.js or set environment variable
   - Kill process using the port: `lsof -ti:3000 | xargs kill`

3. **Admin Login Not Working**
   - Check credentials in routes/admin.js
   - Clear browser cookies/session storage
   - Restart the server

4. **Items Not Displaying**
   - Check browser console for JavaScript errors
   - Verify API endpoints are responding
   - Check database connection and data

## Development

### Adding Features
- API routes go in the `routes/` directory
- Database models in `models/` directory
- Frontend pages in `public/` directory
- Keep styles in the single CSS file for simplicity

### Testing
- Test all CRUD operations through the admin panel
- Verify menu displays correctly for customers
- Test responsive design on different screen sizes
- Check error handling (network failures, invalid input)

## Production Deployment

### Environment Variables
Set these for production:
```bash
PORT=3000
MONGODB_URI=your-production-mongodb-uri
SESSION_SECRET=your-secure-session-secret
NODE_ENV=production
```

### Security Enhancements for Production
- Use environment variables for sensitive data
- Implement proper password hashing (bcrypt)
- Add CORS configuration
- Use HTTPS
- Add request rate limiting
- Implement proper error logging
- Add input validation middleware

## Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all dependencies are installed
3. Ensure MongoDB is running and accessible
4. Check browser console for client-side errors
5. Review server logs for backend issues

---

**© 2025 Borna Café. Built with ❤️ using Node.js and MongoDB.**