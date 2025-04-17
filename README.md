Flag Explorer Fullstack App

Flag Explorer is a fullstack application that allows users to explore flags and country information.  
It features a **React/TypeScript frontend** and a **.NET 8 backend API**.

Clone the Repository

git clone https://github.com/precious28/flag-explorer-fullstack.git

cd flag-explorer-fullstack



Backend – .NET 8 API

Flag Explorer's backend provides a RESTful API built using .NET 8 and ASP.NET Core.

It serves data about countries, including flags, population, and capital cities.

Setup

cd backend

dotnet restore FlagExplorer.sln

dotnet build FlagExplorer.sln --configuration Release

Running the API

cd backend/src

dotnet run --project FlagExplorer.Api/FlagExplorer.Api.csproj

API will be available at:

Base URL: http://localhost:5202

Swagger UI: http://localhost:5202/swagger/index.html

Sample Endpoints

GET /api/countries – Get all countries

GET /api/countries/{name} – Get country by name

Backend Testing

To run backend tests:

cd backend/tests/FlagExplorer.Tests

dotnet test

This will run all unit tests in the solution.

CI/CD with GitHub Actions

This project includes a GitHub Actions workflow (.github/workflows/main.yml) that:

Builds and tests both frontend and backend

Publishes artifacts for deployment



Frontend – React + TypeScript
The frontend is a React-based application that interacts with the backend API.
It allows users to search for countries, view flags, and details like population and capital.

Frontend Installation

cd frontend

npm install

Running the Frontend

npm start

The app will be available at:

Frontend URL: http://localhost:3000

Frontend Testing

To run the frontend tests:

npm test

This will run the Jest test suite.

Contributing
Pull requests are welcome!
For major changes, please open an issue first to discuss what you'd like to change.
