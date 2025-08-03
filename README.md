# Court Data Fetcher & Mini-Dashboard

A professional web application for fetching and displaying case information from Delhi High Court. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Court Target

**Delhi High Court** (https://delhihighcourt.nic.in/)

##Project Deployed URL

**URL**: https://court-data-fectcher-and-mini-dashboar.netlify.app/

## Project info

**URL**: https://lovable.dev/projects/416dc584-1140-466d-956b-ef83b6cd1411

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/416dc584-1140-466d-956b-ef83b6cd1411) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Features

- **Case Search**: Search by Case Type, Case Number, and Filing Year
- **Case Details**: Display parties, filing dates, hearing dates, and case status
- **Orders & Judgments**: Show chronological list of court orders with PDF download links
- **Search History**: Quick access to recent searches
- **Responsive Design**: Professional legal-themed UI optimized for all devices
- **Error Handling**: User-friendly error messages and validation

## Implementation Strategy

### Court Website Selection
**Target**: Delhi High Court (https://delhihighcourt.nic.in/)
- Chosen for its comprehensive case database and public accessibility
- Provides structured case information including parties, dates, and orders

### CAPTCHA & Security Strategy
Current implementation uses a mock service for demonstration. For production deployment:

1. **Supabase Edge Functions**: Server-side scraping to bypass browser restrictions
2. **CAPTCHA Handling**: 
   - Manual CAPTCHA solving interface for admin users
   - Integration with 2captcha or similar services for automated solving
   - Fallback to manual token entry field
3. **Rate Limiting**: Implemented to respect court website resources
4. **User-Agent Rotation**: Prevent blocking through request variation

### Data Storage
- **Supabase PostgreSQL**: All queries and responses logged for auditing
- **Schema**: Separate tables for search queries, case data, and court orders
- **Caching**: Reduce repeated requests to court website

### Error Handling
- Invalid case numbers: Clear validation messages
- Site downtime: Graceful fallback with cached data when available  
- Network issues: Retry logic with exponential backoff
- CAPTCHA failures: Alternative manual entry option

## What technologies are used for this project?

This project is built with:

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Framework**: shadcn/ui components with custom legal theme
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Build Tool**: Vite
- **Styling**: Custom design system with legal/government theme
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory with:

```env
# Supabase Configuration (automatically provided by Lovable)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
VITE_SUPABASE_PROJECT_ID=your_project_id

# Optional: For production court scraping
COURT_SCRAPER_API_KEY=your_scraper_api_key
CAPTCHA_SOLVER_API_KEY=your_2captcha_api_key
```

### 2. Database Schema
The application will automatically create the required tables in Supabase:
- `court_queries`: Stores all search requests
- `case_data`: Stores fetched case information  
- `court_orders`: Stores individual orders and judgments

### 3. Production Deployment
For full court scraping functionality:
1. Set up Supabase Edge Functions for server-side scraping
2. Configure CAPTCHA solving service
3. Implement rate limiting and caching strategies
4. Add proper error logging and monitoring

## Demo Usage

1. Select a **Case Type** from the dropdown (Civil Appeal, Writ Petition, etc.)
2. Choose the **Filing Year** (last 10 years available)
3. Enter the **Case Number** (e.g., 1234/2024)
4. Click **"Search Court Records"** to fetch case data
5. View case details, parties, and download order PDFs
6. Use search history for quick re-searches

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/416dc584-1140-466d-956b-ef83b6cd1411) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
