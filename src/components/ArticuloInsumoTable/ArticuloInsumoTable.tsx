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
  
    const [articulosInsu, setArticulosInsu] = useState<ArticuloInsumo[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        const fetchArticulosInsu =async () => {
            const articulosInsu = await ArticuloInsumoService.getArticulosInsumo();
            setArticulosInsu(articulosInsu);
            setIsLoading(false);
        };
        fetchArticulosInsu();
    },[refreshData]);

    console.log(JSON.stringify(articulosInsu, null, 2));

    const initializableNewInsumo = (): ArticuloInsumo => {
        return {
            id: 0,
            denominacion: "",
            precioCompra: 0,
            stockActual: 0,
            stockMinimo: 0,
            urlImagen: "",
        };
    };

    const [art, setArt] = useState<ArticuloInsumo>(initializableNewInsumo);

    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [denominacion, setDenominacion] = useState("");

    const handleClick = (newDenominacion: string, art: ArticuloInsumo, modal: ModalType) => {
        setDenominacion(newDenominacion);
        setModalType(modal);
        setArt(art);
        setShowModal(true);
    };

    

    return (
        <>
        <Button onClick={() => handleClick("Nuevo Insumo", initializableNewInsumo(), ModalType.CREATE)}>
            Nuevo Insumo
        </Button>
        {isLoading ?  <Loader/>  : (
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
                    {articulosInsu.map(art => (
                        <tr key={art.id}>
                            <td>{art.denominacion}</td>
                            <td>{art.precioCompra}</td>
                            <td>{art.stockActual}</td>
                            <td>{art.stockMinimo}</td>
                            <td><img src={art.urlImagen} alt={art.denominacion} style={{width: '50px'}}/></td>
                            <td><EditButton onClick={() => handleClick("Editar Insumo", art, ModalType.UPDATE)}/></td>
                            <td><DeleteButton onClick={() => handleClick("Borrar Insumo", art, ModalType.DELETE)}/></td>
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
            art={art}
            refreshData={setRefreshData}
            />
        )}

        </>
  );
};

export default ArticuloInsumoTable;