import { useNavigate, useSearchParams } from "react-router-dom";
import { useSubscribePetitionMutation } from "../store/api/api";
import { useEffect } from "react";
import { toastError, toastSuccess, toastWarn } from "../utils/toastFunction";

const PetitionPage = () => {

  const [subscribePetition] = useSubscribePetitionMutation();
  const navigate = useNavigate();

  const [serchParams, setSearchParams] = useSearchParams()

  useEffect(()=>{
      const hashedToken= serchParams.get('hashedToken');
      if(hashedToken && localStorage.getItem('petition_eID_ID')){  

          subscribePetition({id: localStorage.getItem('petition_eID_ID'), formData: {token: hashedToken}}).unwrap()
          .then((data) =>{
              if (!data.success && !data.isConfirmed) {
                  toastWarn(
                  'Для підписання петиції треба підтвердити акаунт eID за допомогою ДІЯ'
                  );
                  localStorage.removeItem('petition_eID_ID')
                  setSearchParams({});

              }
              if (data.success && data.isConfirmed) {
                  toastSuccess('Петиція підписана');
                  localStorage.removeItem('petition_eID_ID')
              }
              
              setSearchParams({});
          })
          .catch((err)=>{
            console.log(err)
              toastError(err.data.message)
              localStorage.removeItem('petition_eID_ID')
              setSearchParams({})
          })
      }else{
        localStorage.removeItem('petition_eID_ID')
        return navigate('/');
      }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serchParams])

  return (
    <div>Loader</div>
  )
}

export default PetitionPage