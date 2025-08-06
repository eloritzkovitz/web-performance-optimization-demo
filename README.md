# Frontend Web Performance Optimization Demo

This project, built in React, demonstrates the performance impact of front-end optimization techniques such as code splitting, lazy loading, and caching.

## 📌 Purpose

The goal of this project is to showcase how modern web performance optimization techniques can significantly improve user experience. It provides a practical comparison between:

- An **unoptimized page**.
- An **optimized page** that leverages various optimization strategies, as detailed below.

## 🚀 Optimization Techniques

This demo implements the following optimization strategies:

- **Code Splitting**: Breaking down JavaScript bundles into smaller chunks to load only what is needed.
- **Lazy Loading**: Deferring the loading of non-critical resources until they are required.
- **Caching**: Storing frequently accessed resources to reduce network requests.
- **Minification**: Reducing the size of JavaScript and CSS files.
- **Image Compression**: Using modern formats like AVIF for smaller, high-quality images.
- **Text Compression**: Serving text-based resources with Brotli or Gzip compression.

## ⚙️ Technology Stack

- React.js + Vite and TypeScript (for developing the app)
- Node.js (for the backend server)
- Google Lighthouse and Web Vitals (for measuring performance)

## 📊 Key Metrics

- **Largest Contentful Paint (LCP):** Measures the time it takes for the largest visible content (e.g., an image or text block) to load and render. A good LCP score is under **2.5 seconds**.
- **Interaction to Next Paint (INP):** Evaluates the responsiveness of the page by measuring the delay between user interactions (e.g., clicks, taps) and the next visual update. A good INP score is under **200 milliseconds**.
- **Cumulative Layout Shift (CLS):** Measures the visual stability of the page by tracking unexpected layout shifts. A good CLS score is under **0.1**.
- **First Contentful Paint (FCP):** Measures the time it takes for the first piece of content (e.g., text, image) to appear on the screen. A good FCP score is under **1.8 seconds**.
- **Time to First Byte (TTFB):** Measures the time it takes for the server to respond to the initial request. A good TTFB score is under **200 milliseconds**.                     

## 🔍 How to Run

Follow these steps to set up and run the project:


### **1. Clone the Repository**
```bash
git clone https://https://github.com/eloritzkovitz/web-performance-optimization-demo.git
cd web-performance-optimization-demo
```


### **2. Install Dependencies**
Install the dependencies for both the frontend and backend:
```bash
# Navigate to the frontend directory
cd frontend
npm install

# Navigate to the backend directory
cd backend
npm install
```


### **3. Run the Backend**
Start the backend server:
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:3000` by default.

### **4. Run the Frontend**

#### **Development Mode**
To run the frontend in development mode:
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173` by default.

#### **Production Mode**
To build and serve the frontend in production mode:
1. Build the production files:
   ```bash
   cd frontend
   npm run build
   ```
2. Serve the production build: (use --single so that all the pages will serve index.html)
   ```bash
   serve -s dist --single
   ```
   The production build will be served on `http://localhost:3000` by default*.


### **5. Access the Application**
- **Frontend (Development Mode)**: `http://localhost:5173`
- **Frontend (Production Mode)**: `http://localhost:3001`*
- **Backend API**: `http://localhost:3000`

\* If following the steps as written above (in which the server is started first), it will run on port 3000 and the app will be served on port 3001. Serving the app first will reverse the ports.

### **6. Test the Application**
- Navigate to the following pages in your browser:
  - **Main Page**: `/`
  - **Unoptimized Page**: `/baseline`
  - **Optimized Page**: `/optimized`
- Use tools like **Google Lighthouse** to measure performance and see the difference.
