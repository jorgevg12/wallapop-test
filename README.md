# Wallapop Test Project

This project is a test application for Wallapop, built with Next.js and React. It includes features such as searching for items, adding/removing favorites, and infinite scrolling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Notes](#notes)

## Installation

Node v20.18.3 used for developing this project. For maximum compatibility, please check your version.

To get started with the project, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/jorgevg12/wallapop-test.git
cd wallapop-test
```

2. Install dependencies using pnpm:

```sh
pnpm install
```

3. Start the development server:

```sh
pnpm run dev
```

## Usage

- Open your browser and navigate to `http://localhost:3000` to view the application.
- Use the search bar to search for items.
- Click the "Favorites" button to view your favorite items.
- Scroll down to load more items with infinite scrolling.

## Testing

To run the tests, use the following command:

```sh
pnpm run test
```

## Notes

- Chose Next.js with app routing for practice and challenge purposes, as Angular has been my main framework for the past four years.

- SPA approach using CSR: The 'use client' directive is included in all components to ensure client-side rendering and avoid full-page reloads.

- Tailwind for styling and responsive design, with some icons/images added for a nice UI/UX approach.

- Creation of various UI React component following react design patterns good practices.

- useContext hook to handle favorites state and avoid prop drilling.

- Creation of custom hook for a cleaner code and separate fetch logic from the component (useFetchData).

- Loading, no results and error screen (MessageIconScreen).

- Performance optimization / good practices by applying some techniques:

  1.  useCallback -> in order to avoid functions being re-created on re-renders if not needed.

  2.  memo (React HOC) -> applied to some components to avoid unnecessary re-renders.

  3.  Debounce in infinite scroll -> to avoid multiple requestes.

  4.  Pagination and search -> Logic implemented in the backend.

  5.  NextJs Image component -> Lazy-loading, size optimization and layout shifting prevention.

  6.  NextJs Font optimization -> Uses Google fonts, which are included in the deployment and served from our domain, avoiding request to Google from browser.

- Unit test for key components and hooks.

- Search and pagination logic are built into the backend, as it is a cleaner and pro approach. A better solution would be applying search and pagination in the query params of the URL, which could then be read by a server component, but since we were building client components, just including it in the fetch request is OK.

- Included some error response simulation and network delay in the request (see handlers.ts).

- Worth mentioning: MSW was quite difficult to configure with NextJS as there is no native compatibility. Took some hours to find a solution that finally works by borrowing some code from internet (msw-provider). If there had been a better solution for fetching images outside the public folder in an MSW-friendly way, I would have explored it, but I decided not to spend more time on this.

Greetings! :)

Developed by: Jorge Guios (jorgeguios@gmail.com)
