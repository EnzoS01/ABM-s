import { Spinner } from "react-bootstrap"

const Loader = () => {
  return (
    <div className="Loader">
        <Spinner animation="border" variant='info' className="loader-spiner">

        </Spinner>
    </div>
  )
}

export default Loader