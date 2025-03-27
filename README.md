# 🎬 MovieFlix

MovieFlix is a web application that allows users to browse and search for movies, providing details such as ratings, summaries, and more.

## 🚀 Features

- **Movie Search:** Quickly search for movies by title.
- **Detailed Information:** View comprehensive details about each movie, including ratings and summaries.
- **Filter by Category:** Browse movies based on genres such as Action, Drama, Comedy, and more.

## 🛠️ Tech Stack

- **Frontend:** React, JavaScript
- **Styling:** Bootstrap ,CSS
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📂 Project Structure

The project follows a modular folder structure for better maintainability and scalability:
movieflix/src -
```
├── 📂 api # Handles API calls, requests, and Axios configuration
│ └── 📂 queries # Defines specific API queries and endpoints
├── 📂 components # Contains reusable UI components
│ └── 📂 UI # UI-related components like Spinner, MovieCard, etc.
├── 📂 context # React Context providers for theme toggle
├── 📂 hooks # Custom React hooks for managing movie-related API calls
├── 📂 pages # Main application pages
│ ├── 📂 app # Core app pages with application router, app.jsx, and provider.jsx
│ ├── 📂 Favourites # Page for viewing and managing favorite movies
│ ├── 📂 Home # Homepage displaying movie listings
│ └── 📂 MovieDetails # Page for displaying detailed movie information
├── 📂 styles # Global and component-specific stylesheets
└── 📂 utils # Utility functions and helper methods
```

## 📦 Installation

### Prerequisites

- **Node.js** (version X.X.X)
- **npm** 

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/aniket-969/MovieFlix.git

2. Navigate to the project directory:

    ```bash
    cd movieflix

3. Install dependencies:

    ```bash
    npm install
 
## ▶ Running the Project

### Development

To start the development server, run:

```bash
npm run dev
```

## 📦 Production Build

To create a production build, run:

```bash
npm run build
```

## ⚙️ Environment Variables

The project may require certain environment variables to run effectively.  
Create a `.env` file in the root directory and include the following:

```ini
VITE_TMDB_API_KEY=your_api_key

Replace your_api_key with the actual tmdb api key which can be obtained from TMDB by login to their website
```

## 📤 Deployment

The project is deployed on **Vercel**. To deploy your own version:

1. **Install the Vercel CLI:**
   ```bash
   npm install -g vercel

1. **Run the deployment command:**
   ```bash
   vercel

## 📚 Contributing

Contributions are welcome! To contribute:

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature
3. **Commit your changes:**
   ```bash
   git commit -m "Add some feature"
4. **Push to the branch:**
   ```bash
   git push origin feature/your-feature
5. **Open a Pull Request.**
   
## 🐛 Troubleshooting

If you encounter issues:

- Ensure that all dependencies are installed.
- Verify that the required environment variables are set.
- Check the console for error messages and consult the documentation of the respective technologies used.

## 📜 License

This project is licensed under the **MIT License**.  
See the [`LICENSE`](./LICENSE) file for more details.

## 📞 Contact

For any inquiries or support, please contact [aniketbaranwal8090@email.com](mailto:aniketbaranwal8090@email.com).
