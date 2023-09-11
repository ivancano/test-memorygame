# Backend

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- [Composer](https://getcomposer.org/): Dependency manager for PHP.
- [Docker](https://www.docker.com/): Used for running Laravel Sail, the development environment.

## Installation

Install PHP dependencies using Composer:
```bash
   composer install
   ```

## Running the Application

1) Start the Laravel Sail development environment in detached mode:
```bash
   ./vendor/bin/sail up -d
   ```

2) Migrate the database and seed it with sample data:
```bash
   ./vendor/bin/sail artisan migrate --seed
   ```

## Testing

You can run tests for this Laravel app using the following command:
```bash
   ./vendor/bin/sail artisan test --testsuite=Feature
   ```


# Frontend

## Prerequisites

Before you begin, make sure you have the following prerequisites installed on your system:

- [Docker](https://www.docker.com/): Used for running Laravel Sail, the development environment.


## Running the Application

1) Start the Next.js app using Docker Compose:
```bash
   docker-compose up
   ```

This command will build and start the Docker containers defined in the docker-compose.yml file. Your Next.js app will be available at http://localhost:3000.