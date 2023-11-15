import { ArticuloManufacturado } from "../types/ArticuloManufacturado";


const BASE_URL = 'https://abm-articulomanufacturado.onrender.com';

export const ArticuloManufacturadoService = {

    
    getArticulosManu: async (): Promise<ArticuloManufacturado[]> => {
       
        const response = await fetch(`${BASE_URL}/api/v1/ArticulosManufacturados`);
        const data = await response.json();
        return data;
    },

    
    getArtManu: async (id:number): Promise<ArticuloManufacturado> => {

        const response = await fetch (`${BASE_URL}/api/v1/ArticulosManufacturados/${id}`);
        const data = await response.json();
        return data;
        
    },

    createArtManu:async (art:ArticuloManufacturado):Promise<ArticuloManufacturado> => {

        const response = await fetch(`${BASE_URL}/api/v1/ArticulosManufacturados`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(art)
        });

        const data = await response.json();
        return data;
        
    },

    updateArtManu: async (id: number, art: ArticuloManufacturado): Promise<ArticuloManufacturado> => {
        
        const response = await fetch(`${BASE_URL}/api/v1/ArticulosManufacturados/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(art)
        });

        const data = await response.json();
        return data;
    },

    

    deleteArtManu: async (id:number): Promise<void> => {
        await fetch(`${BASE_URL}/api/v1/ArticulosManufacturados/${id}`, {
            method: "DELETE"
        });
    }
    

  
}