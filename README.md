
📝 Blog App

A modern Next.js blog application with dynamic content, authentication, and a rich text editor.

🚀 Features

📰 Dynamic Blog Posts – Create, update, and delete posts.

🔍 SEO Optimized – Server-side rendering for better performance.

🖊️ Rich Text Editor – Supports formatting, images, and links.

🔥 Authentication – Sign in with Google and Email (NextAuth.js).

📚 Categories & Tags – Organize posts effectively.

🌙 Dark Mode Support – Seamless UI experience.

🚀 Optimized Performance – Fast loading with Next.js 15.



---

📦 Tech Stack

Frontend: Next.js 15, React, Tailwind CSS

Authentication: NextAuth.js (Google, Email)

Database: MongoDB (via Mongoose) or Firebase

Editor: TipTap or ReactQuill

Deployment: Vercel



---

🛠️ Installation

1️⃣ Clone the repository

git clone https://github.com/your-username/blog-app.git
cd blog-app

2️⃣ Install dependencies

npm install
# or
yarn install

3️⃣ Set up environment variables

Create a .env.local file in the root directory and add:

NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
DATABASE_URL=your_mongodb_url

4️⃣ Run the development server

npm run dev
# or
yarn dev

Your app will be live at http://localhost:3000 🚀


---

📂 Folder Structure

/blog-app
│── /components       # Reusable UI components
│── /pages            # Next.js pages (routes)
│── /public           # Static assets
│── /styles          # Global styles (Tailwind CSS)
│── /utils           # Helper functions
│── /lib             # Database configurations (MongoDB/Firebase)
│── .env.local       # Environment variables
│── next.config.js   # Next.js configurations
│── package.json     # Dependencies and scripts


---

⚡ API Routes


---

🎨 UI Preview




---

🚀 Deployment

You can deploy the project on Vercel easily:

vercel deploy


---

📌 Future Improvements

🏷️ Advanced Filtering & Sorting

🏆 Likes & Comments System

📩 Newsletter Subscription

🛡️ Role-based Access Control (RBAC)



---

🛠️ Contributing

Feel free to contribute! Just fork the repo, create a new branch, and submit a pull request.


---

📜 License

This project is MIT Licensed.


---

Let me know if you need any modifications! 🚀

