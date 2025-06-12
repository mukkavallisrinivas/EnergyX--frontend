# Energy Management System - Frontend

A modern React-based frontend application for monitoring and analyzing energy consumption, power factors, and peak loads in real-time.

## Features

- Real-time energy consumption monitoring
- Interactive dashboards with data visualization
- Power factor analysis and tracking
- Historical data records and analytics
- Responsive design for all devices
- User-friendly interface with modern UI components

## Screenshots

### Main Dashboard
![Main Dashboard](https://drive.google.com/uc?export=view&id=1RzimoGXqQc2oL4O31s17KmQLzrFEejkR)
The main dashboard provides an overview of key energy metrics and real-time monitoring.

### Power Control Center
![Power Control Center](https://drive.google.com/uc?export=view&id=1Ja0NQ1dDTq_6MMSrD5YBIJCC-9ZUQWQx)
Detailed power control center data showing power factors and consumption patterns.

### Data Records
![Data Records](https://drive.google.com/uc?export=view&id=16OTPIgs3APtq_BLq7133UrG-QkUNhz8i)
Historical data records and analytics for energy consumption.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: 
  - Tailwind CSS
  - RSuite UI Components
- **Data Visualization**: 
  - Recharts
  - React Gauge Chart
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Date Handling**: Moment.js
- **UI Components**: 
  - React Slick (Carousel)
  - React Toastify (Notifications)

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── constants/     # Application constants
├── data/         # Static data and configurations
├── App.jsx       # Main application component
├── main.jsx      # Application entry point
└── index.css     # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/energy-management-system.git
   cd "Vems client --- Frontend"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_API_URL=your_backend_api_url
```

## Key Features Implementation

### Real-time Monitoring
- Uses WebSocket connections for live data updates
- Implements gauge charts for real-time metrics
- Provides instant notifications for critical events

### Data Visualization
- Interactive charts and graphs using Recharts
- Custom gauge components for power metrics
- Responsive design for all screen sizes

### User Interface
- Modern and clean design using RSuite components
- Responsive layout with Tailwind CSS
- Toast notifications for user feedback
- Carousel components for featured content

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue in the repository or contact the development team.
