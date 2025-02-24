# Next.js App

## Getting Started

To run this project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/tecknovice/nextjs-app.git
    cd nextjs-app
    ```

2. **Install dependencies:**
    ```bash
    pnpm install
    ```

3. **Add environment variables:**

    Create a `.env` file in the root of your project and add the necessary environment variables
    


4. **Run Prisma migrations:**

    To set up the database schema, run the following command:
    ```bash
    pnpm prisma migrate dev
    ```

5. **Run the development server:**
    ```bash
    pnpm dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



6. **Build for production:**
    ```bash
    pnpm build
    ```

7. **Start the production server:**
    ```bash
    pnpm start
    ```

## Technologies Used

This project uses the following technologies:

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Prisma**: A next-generation ORM for Node.js and TypeScript.
- **JWT**: JSON Web Tokens for secure authentication.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
