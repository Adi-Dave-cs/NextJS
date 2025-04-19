This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Live Demo : [NextTodoApp](https://next-js-omega-brown-38.vercel.app/) visit and try it yourself.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## About the Project

This project encapsulates the idea of a full-stack todo application. The application encompasses the functionality of manipulating todos. The app also allows the users to login,signup and also change passwords to ensure that each user can view only their todos.

## Tech-Stack

- Frontend : NextJs , ReactJs, Framer-Motion for animation, tailwind-css , DaisyUi
- State-management : zustand
- session management : upstash/redis
- Backend : Typescript, Nodejs, nodemailer (for emails), crypto (for passwords)
- DB : MongoDB (using ORM : Mongoose)

## Environment Variables

- MONGODB_URI= your-mongodb-url
- MONGODB_NAME= name-of-database
- UPSTASH_REDIS_REST_URL= upstash-redis-rest-url
- UPSTASH_REDIS_REST_TOKEN= upstash-redis-token
- SESSION_EXPIRATION = 60 \* 40 Can be changed
- HOST_URL = http://localhost:3000
- LOGGER_ENABLED=true
- SENDER_EMAIL= your-email-id
- GOOGLE_MAIL_PASSWORD = google-password-for-sending-mails

## Future enhancements

As a future enhancement over this we can add two functionalities:

1. Statistics of the completed todos based on the month/year . For the same we need to add routes for the stats and also make changes in the current schema where in we stamp the date of creation and completion.
2. We can write a cron-job/scheduler to send mails periodically containing a log of incomplete todos.
3. Optional, for speed we can add connection pooling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
