import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../../components/shared/loader/Loader";


const UserDetails = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({})
  const { id } = useParams();


  useEffect(() => {

    axios.get('/api/users/' + id + '/edit').then(res => {
      console.log(res.data.name)
      setUser({
        name: res.data.name,
        email: res.data.email,
      });
      setLoading(true);

    })
  }, []);
  return (
    <>  
     <div>
     <h2 className="text-center">User Profile</h2>
      {
        loading ? 
        <div className="row justify-content-center">
          <div className="col-sm-6">
            <div className="card p-4">
              <h4>Name</h4>
              <p>{user.name}</p>
              <h4>Email</h4>
              <p>{user.email}</p>
  
            </div>
          </div>
          
        </div>
        : <Loader />
      }
    
    </div>
    </>

  )
}

export default UserDetails