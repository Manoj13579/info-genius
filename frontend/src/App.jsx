import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// pages
import Layout from "./Component/Layout";
import GeminiTranslator from "./Pages/GeminiTranslator";




const App = () => {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
    <Route path="/" element={<Layout />}>
    </Route>
    <Route path="gemini-translator" element={<GeminiTranslator />} />
    </>
  ))

  return (
    <div>
     <RouterProvider router={router} />
    </div>
  )
}

export default App;