const BASE_URL = 'https://recipes-server-ojlz.onrender.com';

export class PostService {
    // Работа с id сессии
    static requestFetch = async ({URL, method, body = null} = {}) => {
        const header = body ? {'Content-Type': 'application/json'} : {};

        const userId = localStorage.getItem('recipesSessionId');
        if (userId) {
            header['Authorization'] = `${userId}`;
        }

        const response = await fetch(`${BASE_URL}${URL}`, {
            method,
            headers: { 
                ...header
            },
            body: body && JSON.stringify(body)
        });

        const data = await response.json();
        const newUserId = data?.sessionId;
        if (newUserId) {
            localStorage.setItem('recipesSessionId', newUserId);
        }

        return data;
    };
    
    // Проверка авторизации пользователя
    static async checkAuth() {
        const data = await this.requestFetch({URL: '/check-auth', method: 'GET'});
        const result = data?.isAuthenticated;
        return result;
    }
    
    // Создание регистрация и вход
    static async registration({ email, password }) {
        const data = await this.requestFetch({URL: '/users', method: 'POST', body: { email, password }});
        if (data?.userId && data?.sessionId) {
            return true;
        } else return false;
    }
    
    // Вход
    static async login({ email, password }) {
        const data = await this.requestFetch({URL: '/login', method: 'POST', body: { email, password }});
        if (data?.sessionId) {
            return true;
        } else return false;
    }
    
    // Выход
    static async logout() {
        const data = await this.requestFetch({URL: '/logout', method: 'POST'});
        if (data.message === 'Logged out successfully') {
            localStorage.removeItem('recipesSessionId');
            return true;
        } else return false;
    }
    
    // Получение почты пользователя
    static async getEmail() {
        const data = await this.requestFetch({URL: '/users', method: 'GET'});
        if (data?.email) {
            return data.email;
        } else return false;
    }

    // Изменить данные пользователя
    static async updateUser({ email, password }) {
        const data = await this.requestFetch({URL: '/users', method: 'PATCH', body: { email, password }});
        if (data.message === 'User updated successfully') {
            return true;
        } else return false;
    }

    // Получения всех категорий
    static async getCategories() {
        const data = await this.requestFetch({URL: '/categories', method: 'GET'});
        return data;
    }

    // Получения всех рецептов категории
    static async getCategory(id) {
        const data = await this.requestFetch({URL: `/categories/${id}`, method: 'GET'});
        return data;
    }

    // Получения всех рецептов пользователя
    static async getAllRecipes() {
        const data = await this.requestFetch({URL: `/recipes`, method: 'GET'});
        return data;
    }
    
    // Добавления рецепта
    static async addRecipe({ name, description, image, category, ingredients, cookingSteps }) {
        const data = await this.requestFetch({URL: '/recipes', method: 'POST', body: { name, description, image, category, ingredients, cookingSteps }});
        if (data.message === 'Рецепт добавлен успешно') {
            return true;
        } else return false;
    }
    
    // Получения рецепта
    static async getRecipe(id) {
        const data = await this.requestFetch({URL: `/recipes/${id}`, method: 'GET'});
        return data;
    }
    
    // Редактирования рецепта
    static async editRecipe({ id, name, description, image, category, ingredients, cookingSteps }) {
        const data = await this.requestFetch({URL: `/recipes/${id}`, method: 'PATCH', body: { name, description, image, category, ingredients, cookingSteps }});
        if (data.message === 'Рецепт обновлен успешно') {
            return true;
        } else return false;
    }
    
    // Удаление рецепта
    static async deleteRecipe(id) {
        const data = await this.requestFetch({URL: `/recipes/${id}`, method: 'DELETE'});
        if (data.message === 'Рецепт удален успешно') {
            return true;
        } else return false;
    }
    
    // Проверка владельца рецепта
    static async checkOwner(id) {
        const data = await this.requestFetch({URL: `/recipes/${id}/check-owner`, method: 'GET'});
        return data.isOwner;
    }
}
