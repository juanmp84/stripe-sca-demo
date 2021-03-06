import { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import useUser from "src/hooks/useUser";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "src/components/Checkout";
import getStripe from "src/utils/get-stripe";

const UserCard = () => {
  const { token, userLogged, user, logout } = useUser();
  const history = useHistory();
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    setStripePromise(getStripe({ token }));
  }, [token]);

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div
          className="card shadow-sm bg-white rounded p-3"
          style={{ maxWidth: "500px", width: "500px" }}
        >
          <div className="card-body">
            {userLogged && (
              <div className="d-flex justify-content-center">
                <h3 className="text-center mb-3">{`${user.fullName}  `}</h3>
                <Link to="#" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
            <div className="mt-3">
              <Elements stripe={stripePromise}>
                <Checkout />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
