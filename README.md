# EAGLER

This is a full-stack social media app built with Next.js and Terraform, hosted on AWS. This is a student project and the following features will be added soon. The project, called "Eagler", is available through this link.

https://justanothersocialmedia.net

![Alt text](https://d3nohlcdf7fia8.cloudfront.net/AWS+cloud+diagram+(Community)+(2).png)



## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Implemented Features

- Picture uploading (S3 Bucket AWS)
- Custom JWT Authentication with PostgreSQL
- Post liking and commenting


## Upcoming Features

- User notifications
- Chatting
- Sharing
- User profiles with follow functionality

## Installation

1. Clone the repository.
2. Install the dependencies using `npm install`.

## Usage
Make sure to set the entries in .env
This Project need a bit more. At the bottom you can find the repos for the backend.
You need an AWS Account to recreate this project.
```
DATABASE_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

AWS_ACCESS_KEY=
AWS_SECRET_ACCESS_KEY=


AWS_BUCKET_NAME=
AWS_BUCKET_REGION=

AWS_STORAGE_BUCKET_NAME=


IMAGE_UPLOAD_URL=
IMAGE_STORAGE_URL=

EMAIL=
EMAIL_PASSWORD=
```
1. If you don't want to create the whole infrastructure by yourself, follow the links at the bottom to the Terraform configurations.
2. The only thing needed is the python-lambda-s3 config. For the rest, you can choose whatever PostgreSQL provider you want and also host this page on Vercel if you want to.
3. Once everything is created for the backend, run `npx prisma generate`.4. Then start the dev server with `npm run dev`.
2. Access the app in your browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! If you have any ideas for new features or improvements, please submit a pull request.

## Terraform Repos
Backend needed!
https://github.com/dyprodg/eagler-backend

Infrastructure if you want to host it on ec2:
https://github.com/dyprodg/eagler-terraform

Verification endpoint: 
https://github.com/dyprodg/eagler-verify-api



## License

This project is licensed under the [MIT License](LICENSE).