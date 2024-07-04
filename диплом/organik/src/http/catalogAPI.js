import { guestInstance, authInstance } from './index.js';

export const fetchSearchResults = async (query) => {
    const { data } = await guestInstance.get('product/search', { params: { query } });
    return data;
};

export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category)
    return data
}

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`)
    return data
}

export const fetchCategories = async () => {
    const { data } = await guestInstance.get('category/getall')
    return data
}

export const fetchCategory = async (id) => {
    const { data } = await guestInstance.get(`category/getone/${id}`)
    return data
}


/*
 * Создание, обновление и удаление товара, получение списка всех товаров
 */
export const createProduct = async (product) => {
    const { data } = await authInstance.post('product/create', product)
    return data
}

export const updateProduct = async (id, product) => {
    const { data } = await authInstance.put(`product/update/${id}`, product)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await authInstance.delete(`product/delete/${id}`)
    return data
}

export const fetchAllProducts = async (categoryId = null, page = 1, limit = 20) => {
    let url = 'product/getall'
    // фильтрация товаров по категории и/или бренду
    if (categoryId) url = url + '/categoryId/' + categoryId
    const { data } = await guestInstance.get(
        url,
        {params: { // GET-параметры для постраничной навигации
            page, limit
        }
    })
    return data
}

export const fetchOneProduct = async (id) => {
    const { data } = await guestInstance.get(`product/getone/${id}`)
    return data
}

export const fetchProdRating = async (id) => {
    const { data } = await guestInstance.get(`rating/product/${id}`);
    return data;
}

export const rateProduct = async (productId, rate) => {
    const { data } = await authInstance.post(`/rating/product/${productId}/rate/${rate}`);
    return data;
};