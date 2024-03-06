import { getDelete } from "@/app/lib/data";
import "./_deleteModal.scss";

export const DeleteModal = ({post, deleteOpen, setDeleteOpen}) => {
  const handleDelete = async () => {
    if (post && post.id) {
      await getDelete(post.id);
      setDeleteOpen(false);
    }
  };
  return (
    <div
      className={`delete-modal data-modal ${deleteOpen ? "show-modal" : ""}`}
    >
      <div className="modal">
        <div className="modal-inner">
          <h2 className="modal-title">Xəbəri silmək istəyirsiniz?</h2>
          <div className="buttons">
            <button className="yes-btn" onClick={handleDelete}>
              Bəli
            </button>
            <button className="no-btn" onClick={() => setDeleteOpen(false)}>
              Xeyr
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
