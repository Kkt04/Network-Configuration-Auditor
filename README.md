# 🛡️ Network Configuration Auditor

A professional web-based tool for automated security analysis of network device configurations. Built for identifying vulnerabilities in router and switch configurations.

## 👥 Authors
- **Kalash Kumari Thakur** (230136)
- **Manasa Chinnam** (230078)

## ✨ Features

- 🔍 **Automated Security Analysis** - Scans configuration files for vulnerabilities
- 🎯 **Vulnerability Detection** - Identifies weak passwords, insecure protocols, missing ACLs
- 📊 **Visual Analytics** - Interactive charts and security scoring
- 📝 **Detailed Reports** - Exportable JSON reports with recommendations
- 💾 **Database Storage** - SQLite for persistent audit history
- 🎨 **Modern UI** - Beautiful, responsive interface with Tailwind CSS

## 🚀 Tech Stack

**Backend:**
- Node.js + Express.js
- SQLite Database
- Multer (File Upload)
- RESTful API

**Frontend:**
- React.js
- Tailwind CSS
- Recharts (Data Visualization)
- Axios (API calls)

## 📦 Installation

### Prerequisites
- Node.js v14+
- npm

### Setup

1. **Clone the repository:**
```bash
git clone https://github.com/YOUR_USERNAME/network-configuration-auditor.git
cd network-configuration-auditor
```

2. **Install Backend:**
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
```

3. **Install Frontend:**
```bash
cd ../frontend
npm install
cp .env.example .env  # Configure environment variables
npm start
```

4. **Access Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Usage

1. Open the application in your browser
2. Upload a router/switch configuration file (.txt, .cfg, .conf)
3. Wait for automated analysis
4. Review security issues categorized by severity
5. Export detailed reports

## 📁 Project Structure
```
network-auditor/
├── backend/              # Express.js API
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Express middleware
│   │   └── utils/       # Helper functions
│   └── package.json
│
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service
│   │   └── App.jsx
│   └── package.json
│
└── sample-configs/      # Sample configuration files
```

## 🔒 Security Analysis

The tool detects:
- Weak or plaintext passwords
- Default SNMP community strings
- Insecure services (HTTP, Telnet)
- Missing access control lists
- Overly permissive firewall rules
- Missing logging and NTP configuration
- And more...

## 📊 Output

- Security score (0-100)
- Issues categorized by severity (Critical, High, Medium, Low)
- Detailed recommendations for each issue
- Visual charts and analytics
- Exportable JSON reports

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🎓 Academic Project

Developed as part of academic coursework at [Your University Name].

## 📞 Contact

For questions or feedback, please contact:
- Kalash Kumari Thakur
- Manasa Chinnam
