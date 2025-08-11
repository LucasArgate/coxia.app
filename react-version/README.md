# Coxia - Rehearsal Assistant

Coxia is a web application designed to help actors rehearse their lines. It allows users to create plays, add actors, record lines, and practice their scenes. This new version of Coxia has been completely rebuilt from the ground up using modern web technologies to provide a better user experience and a more maintainable codebase.

## Features

*   **Create and manage plays:** Users can create new plays and see a list of their existing plays.
*   **Add and manage actors:** For each play, users can add multiple actors, assign them a name, and a color.
*   **Record lines:** Users can record the lines for each actor.
*   **Draggable list of lines:** The lines for a play are displayed in a list that can be reordered using drag-and-drop.
*   **Play all:** Users can play all the lines in a scene in sequence.
*   **Train mode:** A special mode that plays back the lines of all other actors, skipping the lines of the actor who is currently training.

## Tech Stack

*   **[React](https://reactjs.org/):** A JavaScript library for building user interfaces.
*   **[Vite](https://vitejs.dev/):** A fast build tool and development server for modern web projects.
*   **[Material-UI](https://mui.com/):** A popular React UI framework.
*   **[React Router](https://reactrouter.com/):** A library for routing in React applications.
*   **[React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd):** A library for creating beautiful and accessible drag-and-drop lists.

## Installation

To get started with Coxia, you'll need to have [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) installed on your machine.

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the `react-version` directory:
    ```bash
    cd react-version
    ```
3.  Install the dependencies:
    ```bash
    yarn install
    ```

## Usage

To run the development server, use the following command:

```bash
yarn dev
```

This will start the development server and open the application in your default browser at `http://localhost:5173`.

## Project Structure

The project is structured using the **Atomic Design** methodology. This helps to create a more organized, scalable, and maintainable codebase.

The components are organized into the following directories:

*   **`src/components/atoms`**: These are the basic building blocks of the UI, such as buttons, inputs, and icons. (Note: For this project, we have used Material-UI components directly, so this directory is currently empty).
*   **`src/components/molecules`**: These are groups of atoms that form simple, reusable components. For example, the `AtorSelector` and the modals for adding actors and plays.
*   **`src/components/organisms`**: These are more complex components that are composed of molecules and/or atoms. For example, the `Navbar`, `PlayerControls`, and the `FalasList`.
*   **`src/components/pages`**: These are the top-level components that represent a whole page or view in the application, such as the `Home` and `Peca` pages.

This structure makes it easy to find and reuse components, and it promotes a clear separation of concerns.
