import axios from "axios";
import "./PopUp.css";
interface productDelete {
  productId: number;
  closePopup: () => void;
}
const PopUp = ({ productId, closePopup }: productDelete) => {
  async function deleteProduct() {
    await axios
      .delete(`https://dashboard-i552.onrender.com/api/items/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      })
      .then((res) => console.log(res));
    closePopup();
  }
  return (
    <div className="popupOverlay">
      <div className="popup">
        <p>Are you sure you want to delete the product?</p>
        <div className="buttonsPop">
          <button className="delete" onClick={deleteProduct}>
            Yes
          </button>
          <button className="cancel" onClick={closePopup}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
