# ApplyTrack

A modern web application built with React and TypeScript to help job seekers track their job applications, manage documents, and analyze their job search progress.

## 🚧 Development Status

This system is currently under active development with the following features being implemented:

### Automated Job Scraping
- Daily automated scraping of IT-related jobs from Seek
- Currently focused on Perth region (other regions coming soon)
- Intelligent job matching and categorization

### Smart Email Integration (Beta)
- Connect your email account for automated tracking
- AI-powered email analysis to:
  - Automatically detect job applications
  - Match emails with tracked jobs
  - Update application statuses automatically
- Privacy-focused email processing

### Real-time Job Market Analysis
- Track market trends in the IT sector
- Salary range analysis
- Required skills tracking
- Company hiring patterns

## 🌟 Features

### Dashboard
- Real-time overview of job application statistics
- Interactive charts and visualizations
- Recent activities tracking
- Market insights and trends

### Job Management
- Track applications across different stages:
  - New Jobs
  - Pending Applications
  - Applied Positions
  - Interview Process
  - Technical Assessments
  - Offers & Rejections
- Detailed job status tracking
- Application history

### Document Management
- Resume organization
- Cover letter management
- Document versioning

### Interview Tools
- Interview preparation checklists
- Q&A bank
- Interview outcome tracking

### Analytics
- Application success rate analysis
- Response rate tracking
- Skill demand trends
- Salary distribution insights

## 🛠 Tech Stack

### Frontend
- **Frontend Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **State Management**: Redux
- **UI Components**:
  - Shadcn/ui (based on Radix UI)
  - Tailwind CSS
- **Charts**: Recharts
- **Internationalization**: i18next
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form
- **API Client**: Axios

### Backend Services
- **Web Scraping**: Custom scraper for Seek job listings
- **AI Integration**:
  - Email analysis and classification
  - Job matching algorithms
- **Data Processing**:
  - Automated job categorization
  - Email pattern recognition
  - Status update automation

### Data Security
- Encrypted email processing
- Secure credential storage
- Privacy-first data handling

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/job-application-tracker.git
```

2. Install dependencies
```bash
cd job-application-tracker
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 🎨 Theming

The application supports multiple themes and color schemes:
- Light/Dark mode
- Custom color palettes
- Configurable UI components

## 🌐 Internationalization

Currently supported languages:
- English
- Chinese (简体中文)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🔒 Security

- Protected routes
- Authentication system
- Secure API communication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Recharts](https://recharts.org/) for the chart components
- [Radix UI](https://www.radix-ui.com/) for the accessible UI primitives
