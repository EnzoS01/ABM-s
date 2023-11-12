import { useEffect, useState } from "react"
import { Product } from "../../types/Product";
import { ProductServices } from "../../services/ProductServices";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import ProductModal from "../ProductModal/ProductModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";


const ProductTable = () => {
    //Variable que va a contener los datos recibidos por la API
    const [products,setProducts]= useState<Product[]>([]);
    
    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading]= useState(true);
    //Variable que va a actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData]= useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente
    //o refreshData cambie deestado
   useEffect(()=>{
    //Llamamos a la funcion para obtener todos los productos declarados en el ProductService
    const fecthProducts= async()=>{
        const products= await ProductServices.getProducts();
        setProducts(products);
        setIsLoading(false);
    };
    fecthProducts();

   }, [refreshData] );

   //Test,este log está modificado para que muestre los datos de una manera más legible
   console.log(JSON.stringify(products,null,2));


    //const para inicializar un producto por defecto y evitar el "undefined"

    const initializableNewProduct= (): Product =>{
        return{
            id:0,
            title:"",
            price: 0,
            description:"",
            category:"",
            image:"",

        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [product,setProduct]= useState<Product>(initializableNewProduct);
    //const para manejar el estado del modal
    const [showModal, setShowModal]= useState(false);
    const [modalType, setModalType]= useState<ModalType>(ModalType.NONE)
    const [title, setTitle]=useState("");

    //Logica del Modal
    const handleClick =(newTitle:string, product: Product, modal:ModalType) =>{
        setTitle(newTitle);
        setModalType(modal);
        setProduct(product);
        setShowModal(true);
    };


    return (
    <>  <Button onClick={()=>handleClick("Nuevo Producto", initializableNewProduct(), ModalType.CREATE)}> Nuevo Producto</Button>

        {isLoading ?<Loader/>:(
            <Table hover>
                <thead>
                    <tr>
                        <th>TITULO</th>
                        <th>PRECIO</th>
                        <th>DESCRIPCION</th>
                        <th>Categoria</th>
                        <th>IMAGEN</th>
                        <th>EDITAR</th>
                        <th>BORRAR</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product=>(
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.category}</td>
                            <td><img src={product.image} alt={product.title} 
                            style={{width:'50px'}}/></td>
                            <td> <EditButton onClick={()=> handleClick("Editar Producto",product , ModalType.UPDATE)}/> </td>
                            <td> <DeleteButton onClick={()=> handleClick("Borrar Producto",product , ModalType.DELETE)}/> </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        )}

        {showModal && (
            <ProductModal
            show={showModal}
            onHide={()=>setShowModal(false)}
            title={title}
            modalType={modalType}
            prod={product}
            refreshData={setRefreshData}
            />
        )}
    </>
  )
}

export default ProductTable