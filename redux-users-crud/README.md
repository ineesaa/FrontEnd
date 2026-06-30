# redux-toolkit-users-hw

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)

```sh
npx tiged reduxjs/redux-templates/packages/vite-template-redux my-app
```

## Goals

- Easy migration from Create React App or Vite
- As beginner friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner
- `server` - start the local JSON server (Users API) on port 4002

## Running this project

This project needs **two terminals running at the same time**:

```sh
npm install

# Terminal 1
npm run dev

# Terminal 2
npm run server
```

`npm run dev` starts the Vite app, and `npm run server` starts a `json-server`
instance on `http://localhost:4002` that serves the `Users` data from
`data.json`. The Users page won't load without the second terminal running.

## Users feature

The Users page (`src/features/users`) fetches a list of users from the local
JSON server, supports filtering by gender, and supports deleting a user via
the `X` button in each row. Deleting a user sends a `DELETE` request to
`http://localhost:4002/users/:id` and removes the user from the Redux store
on success.

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
