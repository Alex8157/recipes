import { Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import CategoryPage from "./pages/CategoryPage";
import AddEditRecipe from "./pages/AddEditRecipe";
import ProfilePage from './pages/ProfilePage';
import RecipePage from './pages/RecipePage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} caseSensitive>
          <Route index element={<StartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/categories/:category" element={<CategoryPage />} />
          <Route path="/recipes" element={<CategoryPage key="recipes" />} />
          <Route path="/edit-recipes/:recipe" element={<AddEditRecipe />} />
          <Route path="/add-recipes" element={<AddEditRecipe key="add-recipe" />} />
          <Route path="/recipes/:recipe" element={<RecipePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
