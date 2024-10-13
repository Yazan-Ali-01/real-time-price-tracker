E-Commerce App

# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Introduction ](#introduction-)
  - [Built With ](#built-with-)
  - [Features](#features)
    - [Note](#note)
  - [Installation ](#installation-)
  - [Feedback  ](#feedback--)
  - [Contact ](#contact-)

## Introduction <a name="introduction"></a>

<p align="center"> <img src="https://img.icons8.com/nolan/128/money.png"/> </p>
The Simplified Real-time Price Tracker is a multi-page web application designed to track and display real-time prices for cryptocurrencies. It allows users to view current prices for major cryptocurrencies like Ethereum (ETH) and Bitcoin (BTC), alongside detailed information about each asset.
<br><br>


## Built With <a name="built-with"></a>

<p align="center">
  <img src="https://img.shields.io/badge/vite-5.4.8-success"/>
  <img src="https://img.shields.io/badge/typescript-5.5.3-blue"/>
  <img src="https://img.shields.io/badge/Material UI-6.1.3-green"/>
  <img src="https://img.shields.io/badge/React-18.3.1-important"/>
  <img src="https://img.shields.io/badge/tanstack_query-5.59.12-brightgreen"/>
  <img src="https://img.shields.io/badge/recharts-2.13.0-purple"/>
</p>

- **React (Vite)**: 
  - The latest version of React is employed to take advantage of its component-based architecture, which promotes reusable code and efficient updates. Vite provides a fast development environment and enables optimized builds.

- **TypeScript**: 
  - TypeScript is used to enhance code quality and maintainability through static typing. This helps prevent potential runtime errors and improves developer experience with better autocompletion and type-checking.

- **TanStack Query**: 
  - TanStack Query (formerly React Query) is utilized for efficient data fetching and state management, especially with asynchronous API calls. It simplifies the management of server state and caching, allowing for more responsive applications.

- **Material-UI**: 
  - Material-UI is chosen for its ready-to-use components and consistent design system, allowing for faster development and prototyping. Although I have leaned more towards Tailwind CSS and Shadcn UI in the past year, MUI was selected for this assessment to maximize productivity and streamline the UI creation process. Its accessibility features and well-documented API further support rapid development.

- **Recharts**: 
  - Recharts is integrated to visualize historical price data in a simple, customizable manner. Its React components make it easy to create interactive charts with minimal setup.

- **Socket.IO-client**: 
  - The Socket.IO client is employed to establish real-time WebSocket connections, enabling live price updates for the selected cryptocurrencies.

- **Axios**: 
  - Axios is utilized for making HTTP requests to the API. It simplifies the process of handling requests and responses, including error handling and interceptors.

- **ESLint**: 
  - ESLint is included to enforce coding standards and best practices. It helps maintain a clean codebase by identifying potential issues and promoting consistent code formatting.



## Features
<p align="center"> <img src="https://img.icons8.com/nolan/128/code-file.png"/> </p>

- **Home Page**:
  - Displays a dummy navigation bar (unfunctional) and real-time data for two major cryptocurrencies: Ethereum (ETH) and Bitcoin (BTC).
  - Each cryptocurrency is represented as a card, showing its current price and a "Check Details" button.

- **Details Page**:
  - When a user clicks on a cryptocurrency card or the "Check Details" button, they are taken to the Details Page.
  - The Details Page displays additional information, including Trade Volume and a 24-hour price trend chart.

### Note
I apologize for the simplistic UI and the lack of extra features. I am currently balancing this assessment with a full-time job, which has limited the time available for additional enhancements. Additionally, while I am a pixel-perfect Figma developer, I do not consider myself the best designer when it comes to creating original designs. As such, I focused on functionality over aesthetics for this assessment.

## Installation <a name="installation"></a>

1 - Clone the repository:
```console 
git clone https://github.com/Yazan-Ali-01/real-time-price-tracker
cd simplified-real-time-price-tracker
```
3 - Install dependencies in root directory:
```console 
npm install
```
4 - **Configure Environment Variable**: Create a .env file in the root of the project and add the following environment variables:

```console 
VITE_FINNHUB_BASE_URL=<your_finnhub_base_url>
VITE_FINNHUB_API_KEY=<your_finnhub_api_key>
VITE_COINGECKO_BASE_URL=<your_coingecko_base_url>
```

5 - Start the server in the root directory:
```console 
npm run dev
```  
6 - Open http://localhost:5173 in your browser


## Feedback <a name="feedback"></a> <br>
<p align="center"> <img src="https://img.icons8.com/nolan/128/feedback.png"/> </p>

If you have any feedback or suggestions, please feel free to open an issue or contact me.

## Contact <a name="contact"></a>

Email: [yazan.ali.dev@gmail.com](yazan.ali.dev@gmail.com)<br>
LinkedIn: [https://www.linkedin.com/in/yazan-ali/](https://www.linkedin.com/in/yazan-ali/)