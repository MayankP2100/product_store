import {create} from 'zustand'

export const useProductStore = create((set) => ({
  products: [],

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return {success: false, message: 'Please fill in all fields'};
    }
    const res = await fetch('/api/products', {
      method: 'POST', headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    set((state) => ({products: [...state.products, data.data]}));
    return {success: true, message: 'Product created successfully.'};
  },

  fetchProducts: async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    set({products: data.data});
  },

  deleteProduct: async (productId) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!data.success) return {success: false, message: data.message};

    set((state) => ({products: state.products.filter(product => product._id !== productId)}));
    return {success: true, message: 'Product deleted successfully.'};
  },

  updateProduct: async (productId, updatedProduct) => {
    const res = await fetch(`/api/products/${productId}`, {
      method: 'PUT', headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify(updatedProduct)
    });
    const data = await res.json();
    if (!data.success) return {success: false, message: data.message};

    set((state) => ({
      products: state.products.map(product => product._id === productId ? data.data : product)
    }));
    return {success: true, message: 'Product updated successfully.'};
  }
}));
