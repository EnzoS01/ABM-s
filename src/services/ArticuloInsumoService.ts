import { ArticuloInsumo } from "../types/ArticuloInsumo";

const BASE_URL = 'http://localhost:8080/h2-console'

export const ArticuloInsumoService = {

    getArticulosInsumo:async (): Promise<ArticuloInsumo[]> => {
        const response = await fetch(`${BASE_URL}/api/v1/ArticulosInsumo`);
        const data = await response.json();
        return data;
    },

    getArticuloInsumo: async (id: number): Promise<ArticuloInsumo> => {
        const response = await fetch(`${BASE_URL}/api/v1/ArticulosInsumo/${id}`);
                const data = await response.json();
                return data;
    },

    createArticuloInsumo: async (art : ArticuloInsumo): Promise<ArticuloInsumo> => {
        const response = await fetch(`${BASE_URL}/api/v1/ArticulosInsumo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(art)
        });
        const data = await response.json();
        return data;
    },

    updateArticuloInsumo: async (id: number, art: ArticuloInsumo): Promise<ArticuloInsumo> => {
        const response = await fetch(`${BASE_URL}/api/v1/ArticulosInsumo/${id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(art)
                });
                const data = await response.json();
                return data;
    },

    deleteArticuloInsumo: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/ArticulosInsumo/${id}`, {
            method: "DELETE"
        });
    }
}