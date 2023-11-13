import { useEffect, useState } from "react"
import { ArticuloInsumo } from "../../types/ArticuloInsumo"
import { ArticuloInsumoService } from "../../services/ArticuloInsumoService";
import { Button, Table } from "react-bootstrap";
import Loader from "../Loader/Loader";
import { ModalType } from "../../types/ModalType";
import ArticuloInsumoModal from "../ArticuloInsumoModal/ArticuloInsumoModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";

const ArticuloInsumoTable = () => {
  
    const [articulosInsumo, setArticulosInsumos] = useState<ArticuloInsumo[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchArticulosInsumo =async () => {
            const articulosInsumo = await ArticuloInsumoService.getArticulosInsumo();
            setArticulosInsumos(articulosInsumo);
            setIsLoading(false);
        };
        fetchArticulosInsumo();
    },[refreshData]);

    console.log(JSON.stringify(articulosInsumo, null, 2));

    const intializeNewInsumo = (): ArticuloInsumo => {
        return {
            id: 0,
            denominacion: "",
            precioCompra: 0,
            stockActual: 0,
            stockMinimo: 0,
            urlImagen: "",
        };
    };

    const [articuloInsumo, setArticuloInsumos] = useState<ArticuloInsumo>(intializeNewInsumo);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [denominacion, setDenominacion] = useState("");

    const handleClick = (newDenominacion: string, artInsumo: ArticuloInsumo, modal: ModalType) => {
        setDenominacion(newDenominacion);
        setModalType(modal);
        setArticuloInsumos(artInsumo);
        setShowModal(true);
    };

    

    return (
        <>
        <Button onClick={() => handleClick("Nuevo Insumo", intializeNewInsumo(), ModalType.CREATE)}>
            Nuevo Insumo
        </Button>
        {isLoading ? ( <Loader/> ) : (
            <Table hover>
                <thead>
                    <tr>
                        <th>Denominacion</th>
                        <th>PrecioCompra</th>
                        <th>StockActual</th>
                        <th>StockMinimo</th>
                        <th>Imagen</th>
                        <th>Editar</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {articulosInsumo.map(articuloInsumo => (
                        <tr key={articuloInsumo.id}>
                            <td>{articuloInsumo.denominacion}</td>
                            <td>{articuloInsumo.precioCompra}</td>
                            <td>{articuloInsumo.stockActual}</td>
                            <td>{articuloInsumo.stockMinimo}</td>
                            <td><img src={articuloInsumo.urlImagen} alt={articuloInsumo.denominacion} style={{width: '50px'}}/></td>
                            <td><EditButton onClick={() => handleClick("Editar Insumo", articuloInsumo, ModalType.UPDATE)}/></td>
                            <td><DeleteButton onClick={() => handleClick("Borrar Insumo", articuloInsumo, ModalType.DELETE)}/></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}

        {showModal && (
            <ArticuloInsumoModal
            show={showModal}
            onHide={() => setShowModal(false)}
            denominacion={denominacion}
            modalType={modalType}
            artInsumo={articuloInsumo}
            refreshData={setRefreshData}
            />
        )}

        </>
  );
};

export default ArticuloInsumoTable;