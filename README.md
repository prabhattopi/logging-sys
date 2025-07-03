# Log Ingestion and Querying System

This is a full-stack application built to ingest, store, and query structured log data. It features a Node.js backend API for handling data and a React frontend for user interaction. This project is designed to simulate a real-world developer tool for monitoring and debugging applications.

## Features

* **Log Ingestor**: A backend service to accept and store log data via a `POST` request.
* **Log Query Interface**: A frontend UI to view and filter logs.
* **Comprehensive Filtering**: Filter logs by level, message content, resource ID, and timestamp range.
* **Dynamic Search Highlighting**: The UI highlights matching search terms within log messages for easy visibility.
* **UI-Based Ingestion**: A simple form in the UI to send new log entries to the backend.

---

## Tech Stack

* **Backend**: Node.js, Express.js
* **Frontend**: React, Vite
* **Styling**: Plain CSS

---

## Project Structure

The project is organized into two main folders in a monorepo structure:

* **/backend**: Contains the Node.js Express server, API endpoints, and data persistence logic (`log_data.json`).
* **/frontend**: Contains the React application, components, and services for the user interface.

---

## Setup and Running

Follow these steps to run both the backend and frontend servers. You will need two separate terminal windows.

### 1. Backend Setup

First, set up and run the backend server.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env` in the `backend` directory and add the URL of your running frontend.
    ```
    # backend/.env
    FRONTEND_URL=http://localhost:5173
    ```

4.  **Start the server:**
    This command will start the backend API on `http://localhost:3000`.
    ```bash
    npm start
    ```

### 2. Frontend Setup

In a new terminal, set up and run the React frontend.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a file named `.env.local` in the `frontend` directory and add the URL of your running backend.
    ```
    # frontend/.env.local
    VITE_API_BASE_URL=http://localhost:3000
    ```

4.  **Start the development server:**
    This command will open the user interface in your browser, usually at `http://localhost:5173`.
    ```bash
    npm run dev
    ```

You should now have both the backend and frontend running and communicating with each other.