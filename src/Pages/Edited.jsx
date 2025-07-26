
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';



function Edited() {
const navigate=useNavigate()
  return (
    <div className="homepage">
      <Header />
      <Sidebar />
      <div className="main-content">
        <section className="details-section">
          <h1><center>Record Updated Successfully!</center></h1>
          <button className="delete-section" onClick={() => navigate('/homepage')}>Home</button>
        </section>
      </div>
    </div>
  )
}

export default Edited
