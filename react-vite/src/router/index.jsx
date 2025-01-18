import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/Homepage/homepage';
import Profile from '../components/Profile/profile';
import AddExerciseForm from '../components/Exercise/exercise';
import ExerciseList from '../components/Exercise/allExercises';
import EventList from '../components/Event/allEvents';
import Layout from './Layout';
import UpdateExerciseForm from '../components/Exercise/UpdateExcercise';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/user/profile",
        element: <Profile />,
      },
      {
        path: "/exercise/new",
        element: <AddExerciseForm />,
      },
      {
        path: "/exercise/update/:execiseid",
        element: <UpdateExerciseForm />,
      },
      {
        path: "/exercise/",
        element: <ExerciseList />,
      },
      {
        path: "/event/",
        element: <EventList />,
      },
    ],
  },
]);