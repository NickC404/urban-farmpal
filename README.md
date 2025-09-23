# 🌱 Urban FarmPal

**Urban FarmPal** is a comprehensive web application designed to help urban farmers and gardening enthusiasts manage their plants, track growth progress, and optimize their growing operations. Whether you're growing in soil, hydroponics, or any other method, Urban FarmPal provides the tools you need to succeed.

## ✨ Features

### 🏡 **Dashboard & Overview**
- Real-time dashboard with key metrics and statistics
- Quick access to important plant information
- Personalized recommendations based on your growing setup

### 🌿 **Plant Management**
- Comprehensive plant database with detailed growing information
- Track individual plants from seed to harvest
- Support for multiple growing methods (soil, hydroponic, aeroponic, aquaponic)
- Custom plant varieties and notes

### 📊 **Growth Tracking**
- Monitor plant status through different growth phases
- Log activities like watering, fertilizing, pruning, and harvesting
- Track expected vs. actual harvest dates
- Record yields and success ratings

### ⏰ **Smart Reminders**
- Set custom reminders for plant care tasks
- Automated notifications for optimal care timing
- Track overdue tasks and maintenance schedules

### ⚙️ **Personalized Setup**
- Configure your growing environment (indoor/outdoor/mixed)
- Set up space dimensions and growing methods
- Enable features based on your equipment (lighting, pH monitoring, irrigation systems)

### 🎨 **Modern Design**
- Beautiful, nature-inspired color palette
- Responsive design that works on all devices
- Dark and light mode support
- Intuitive user interface built with Vue 3 and Tailwind CSS

## 🛠️ Technology Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: Vue 3 with TypeScript
- **Styling**: Tailwind CSS 4 with custom design system
- **UI Components**: Reka UI (Headless components)
- **Database**: SQLite (development) / MySQL/PostgreSQL (production)
- **Authentication**: Laravel Fortify with 2FA support
- **Build Tool**: Vite
- **Testing**: Pest PHP

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **PHP 8.2 or higher**
- **Composer** (PHP package manager)
- **Node.js 18+ and npm** (for frontend assets)
- **SQLite** (for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd urban-farmpal
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   # Copy the environment file
   cp .env.example .env
   
   # Generate application key
   php artisan key:generate
   ```

5. **Database setup**
   ```bash
   # Create SQLite database file
   touch database/database.sqlite
   
   # Run migrations
   php artisan migrate
   
   # Seed the database with sample data (optional)
   php artisan db:seed
   ```

6. **Build frontend assets**
   ```bash
   # For development
   npm run dev
   
   # For production
   npm run build
   ```

7. **Start the development server**
   ```bash
   # Option 1: Simple Laravel server
   php artisan serve
   
   # Option 2: Full development environment (recommended)
   composer dev
   ```

   The application will be available at `http://localhost:8000`

### Development Workflow

For the best development experience, use the integrated development command:

```bash
composer dev
```

This command starts:
- Laravel development server
- Queue worker for background jobs
- Log monitoring with Pail
- Vite development server with hot reload

## 📁 Project Structure

```
urban-farmpal/
├── app/                    # Laravel application code
│   ├── Http/Controllers/   # API and web controllers
│   ├── Models/            # Eloquent models
│   └── Providers/         # Service providers
├── database/              # Database migrations and seeders
├── resources/             # Frontend resources
│   ├── css/              # Stylesheets
│   ├── js/               # Vue.js application
│   │   ├── components/   # Vue components
│   │   ├── pages/        # Page components
│   │   ├── layouts/      # Layout components
│   │   └── types/        # TypeScript definitions
│   └── views/            # Blade templates
├── routes/               # Route definitions
├── storage/              # File storage and logs
└── tests/                # Test files
```

## 🌱 Key Features Deep Dive

### Plant Database
- Pre-seeded with common urban farming plants
- Detailed growing information and care instructions
- Extensible for custom plant varieties

### Activity Logging
- Track all plant care activities
- Historical data for analysis and optimization
- Photo uploads for visual progress tracking

### Growing Setup Configuration
- Personalized dashboard based on your equipment
- Feature toggles for advanced functionality
- Adaptive UI based on growing methods

### Reminder System
- Smart notifications for plant care
- Customizable reminder intervals
- Integration with plant growth phases

## 🧪 Testing

Run the test suite using Pest:

```bash
# Run all tests
composer test

# Run with coverage
php artisan test --coverage
```

## 🎨 Design System

Urban FarmPal uses a custom design system built on Tailwind CSS with a nature-inspired color palette:

- **Primary**: Turquoise Green (#74d3ae) - For actions and highlights
- **Secondary**: Light Sage (#a6c48a) - For secondary elements  
- **Accent**: Dark Sage (#678d58) - For text and accents
- **Background**: Light Cream (#f6e7cb) - For backgrounds
- **Destructive**: Terracotta (#dd9787) - For warnings and errors

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

If you encounter any issues or have questions:

1. Check the existing [Issues](../../issues)
2. Create a new issue with detailed information
3. Provide steps to reproduce any bugs

## 🙏 Acknowledgments

- Built with [Laravel](https://laravel.com/) and [Vue.js](https://vuejs.org/)
- UI components powered by [Reka UI](https://reka-ui.com/)
- Icons by [Lucide](https://lucide.dev/)
- Color palette inspired by nature and urban farming

---

**Happy Growing!** 🌿🚜

