import { useEffect, useState } from "react";
import { ArticuloManufacturado } from "../../types/ArticuloManufacturado";
import { ModalType } from "../../types/ModalType";
import { ArticuloManufacturadoService } from "../../services/ArticuloManufacturadoService";
import ArticuloManufacturadoModal from "../ArticuloManufacturadoModal/ArticuloManufacturadoModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";

const ArticuloManufacturadoTable = () => {
    //Variable que va a contener los datos recibidos por la API
    const [articulosManu,setArticulosManu]= useState<ArticuloManufacturado[]>([]);
    
    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading]= useState(true);
    //Variable que va a actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData]= useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente
    //o refreshData cambie deestado
   useEffect(()=>{
    //Llamamos a la funcion para obtener todos los productos declarados en el ProductService
    const fecthArticulosManu= async()=>{
        const articulosManu= await ArticuloManufacturadoService.getArticulosManu();
        setArticulosManu(articulosManu);
        setIsLoading(false);
    };
    fecthArticulosManu();

   }, [refreshData] );

   //Test,este log está modificado para que muestre los datos de una manera más legible
   console.log(JSON.stringify(articulosManu,null,2));


    //const para inicializar un producto por defecto y evitar el "undefined"

    const initializableNewArticuloManufacturado= (): ArticuloManufacturado =>{
        return{
            id:0,
            denominacion:"",
            descripcion:"",
            tiempoEstimadoCocina: 0,
            precioVenta: 0,
            costo: 0,
            image:"",
        };
    };

    //Producto seleccionado que se va a pasar como prop al Modal
    const [art,setArt]= useState<ArticuloManufacturado>(initializableNewArticuloManufacturado);
    //const para manejar el estado del modal
    const [showModal, setShowModal]= useState(false);
    const [modalType, setModalType]= useState<ModalType>(ModalType.NONE)
    const [denominacion, setDenominacion]=useState("");

    //Logica del Modal
    const handleClick =(newDenominacion:string, art: ArticuloManufacturado, modal:ModalType) =>{
        setDenominacion(newDenominacion);
        setModalType(modal);
        setArt(art);
        setShowModal(true);
    };
  
  
  
  
    return (
        <>  <Button onClick={()=>handleClick("Nuevo Articulo Manufacturado", initializableNewArticuloManufacturado(), ModalType.CREATE)}> Nuevo Articulo Manufacturado</Button>

        {isLoading ?<Loader/>:(
            <Table hover>
                <thead>
                    <tr>
                        <th>DENOMINACION</th>
                        <th>DESCRIPCION</th>
                        <th>TIEMPOESTIMADOCOCINA</th>
                        <th>PRECIOVENTA</th>
                        <th>COSTO</th>
                        <th>IMAGEN</th>
                        <th>EDITAR</th>
                        <th>BORRAR</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosManu.map(art=>(
                        <tr key={art.id}>
                            <td>{art.denominacion}</td>
                            <td>{art.descripcion}</td>
                            <td>{art.tiempoEstimadoCocina}</td>
                            <td>{art.precioVenta}</td>
                            <td>{art.costo}</td>
                            <td><img src={art.image} alt={art.denominacion} 
                            style={{width:'50px'}}/></td>
                            <td> <EditButton onClick={()=> handleClick("Editar Producto",art , ModalType.UPDATE)}/> </td>
                            <td> <DeleteButton onClick={()=> handleClick("Borrar Producto",art , ModalType.DELETE)}/> </td>
                        </tr>
                        ))}
                </tbody>
            </Table>
        )}

        {showModal && (
            <ArticuloManufacturadoModal
            show={showModal}
            onHide={()=>setShowModal(false)}
            denominacion={denominacion}
            modalType={modalType}
            art={art}
            refreshData={setRefreshData}
            />
        )}
    </>
  )

  
}

export default ArticuloManufacturadoTable