import "./PopUp.css";

interface productDelete {
  productId: number;
  closePopup: () => void;
  onDelete: (id: number) => void;
}

const PopUp = ({ productId, closePopup, onDelete }: productDelete) => {
  async function deleteProduct() {
    onDelete(productId);
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
