# Postgres Next.js Next-Auth Credentials Provider Login and Registration
# Project Setup Guide

Follow these steps to set up and run the project locally.

## Prerequisites

- Docker
- Node.js and npm
- git 

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/project-name.git
cd phoshare
```

## Step 2: Start the Docker Services

Start the PostgreSQL database and other services using Docker Compose:

```bash
docker-compose up -d
```

Make sure to check the `docker-compose.yml` file for the database username, password, and database name. Adjust these values as needed.

## Step 3: Create Environment Variables

Create a `.env` file in the root directory and set the following environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/databasename"
NEXTAUTH_SECRET='your-secret-key-generated-with-openssl-or-other-method'
NEXTAUTH_URL=http://localhost:3000
```

Replace `user`, `password`, `databasename`, and `your-secret-key-generated-with-openssl-or-other-method` with your actual values.

## Step 4: Install Dependencies

Install project dependencies:

```bash
npm install
```

## Step 5: Run Prisma Migrations

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate dev
```

## Step 6: Generate Prisma Client

Generate Prisma client code:

```bash
npx prisma generate
```

## Step 7: Open Prisma Studio

Open Prisma Studio to manage your database:

```bash
npx prisma studio
```

## Step 8: Start the Development Server

Start the development server:

```bash
npm run dev
```

## Usage

Certainly, you can create a single text file named `setup-guide.txt` and include all the setup instructions along with the commands in it. Here's the content for your `setup-guide.txt` file:

```
# Project Setup Guide

Follow these steps to set up and run the project locally.

## Prerequisites

- Docker
- Node.js and npm

## Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```

## Step 2: Start the Docker Services

Start the PostgreSQL database and other services using Docker Compose:

```bash
docker-compose up -d
```

Make sure to check the `docker-compose.yml` file for the database username, password, and database name. Adjust these values as needed.

## Step 3: Create Environment Variables

Create a `.env` file in the root directory and set the following environment variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/databasename"
NEXTAUTH_SECRET='your-secret-key-generated-with-openssl-or-other-method'
NEXTAUTH_URL=http://localhost:3000
```

Replace `user`, `password`, `databasename`, and `your-secret-key-generated-with-openssl-or-other-method` with your actual values.

## Step 4: Install Dependencies

Install project dependencies:

```bash
npm install
```

## Step 5: Run Prisma Migrations

Run Prisma migrations to create the database schema:

```bash
npx prisma migrate
```

## Step 6: Generate Prisma Client

Generate Prisma client code:

```bash
npx prisma generate
```

## Step 7: Open Prisma Studio

Open Prisma Studio to manage your database:

```bash
npx prisma studio
```

## Step 8: Start the Development Server

Start the development server:

```bash
npm run dev
```

## Usage

Certainly, here's an explanation of how to use the project once it's running:

### 1. Registration

1. Access the registration page by navigating to `http://localhost:3000/register` in your web browser.

2. Fill out the registration form with the following details:
   - **Username**: Choose a unique username.
   - **Email**: Enter a valid email address.
   - **Password**: Set a secure password.

3. Click the "Register" button to submit the registration form.

4. If the registration is successful, you will see a checkmark indicating success, and you will be automatically logged in. After a brief delay, you will be redirected to the timeline page.

5. If there are any errors during registration (e.g., email or username already taken), an error message will be displayed. Please resolve the errors and try again.

### 2. Login

1. Access the login page by navigating to `http://localhost:3000` (the root URL) in your web browser.

2. Fill out the login form with your registered email and password.

3. Click the "Login" button to submit the login form.

4. If the login is successful, you will be redirected to the timeline page.

5. If there are any errors during login (e.g., incorrect email or password), an error message will be displayed.

### 3. Timeline Page

Once logged in, you will have access to the timeline page:

- The timeline page may contain content specific to your application.
- You can navigate to this page by simply logging in or by manually entering `http://localhost:3000/timeline` in your web browser.

### 4. Logout

To log out of your account:

1. Click the "Logout" button, which is typically located in the top-right corner of the page.

2. You will be logged out and redirected to the login page (`http://localhost:3000`).

That's it! You can now use the registration and login functionality provided by the Next.js application with NextAuth.js (credentials provider) and PostgreSQL as your database. You can also customize the styling as needed to fit your project's requirements.

## Contributing

If you'd like to contribute to this project, please follow the standard GitHub flow: Fork the repository, make your changes, and submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Warning

I do not take responsibility for the code in case errors occur.
