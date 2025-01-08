# StatusPage

## Backend Setup

### Prerequisites

1. Python (3.8 or later)
2. Redis (for WebSocket support if using Django Channels)
3. PostgreSQL (or your preferred database)
4. Virtual Environment (optional but recommended)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/anand0906/StatusPage.git
   cd statuspagebackend
   ```

2. **Create a Virtual Environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. **Install Dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply Migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run Redis (if using WebSockets):**
   Start the Redis server:

   ```bash
   redis-server
   ```

6. **Run the Development Server:**

   ```bash
   python manage.py runserver
   ```

7. **Test Backend API:**
   Use a tool like Postman or cURL to test the API endpoints. Ensure the server is running at `http://127.0.0.1:8000/`.

---

## Frontend Setup

### Prerequisites

1. Node.js (16.x or later)
2. Angular CLI (latest version)

### Steps

1. **Navigate to Frontend Directory:**

   ```bash
   cd status-page-ui
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Open `src/environments/environment.ts` and add your Auth0 details:

   ```typescript
   export const environment = {
     production: false,
     AUTH0_DOMAIN: 'your-auth0-domain',
     AUTH0_CLIENT_ID: 'your-client-id',
     API_BASE_URL: 'http://127.0.0.1:8000/',
   };
   ```

4. **Run the Development Server:**

   ```bash
   ng serve
   ```

5. **Access the Application:**
   Open your browser and navigate to:

   ```
   http://localhost:4200/
   ```

---

## Testing WebSocket Connections

1. Ensure the backend WebSocket routing is set up in `routing.py`.
2. Use the browser console or a tool like websocat to test connections:
   ```bash
   websocat ws://127.0.0.1:8000/ws/status/
   ```
3. Verify real-time updates reflect on the frontend.

---

