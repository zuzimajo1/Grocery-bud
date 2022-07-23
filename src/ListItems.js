import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export const ListItems = ({
  title,
  id,
  DeleteList,
  EditList,
  RemoveClearButton,
  List,
}) => {
  return (
    <div key={id} className="listdiv2">
      <div className="contentlist">
        <div>
          <h4>{title}</h4>
        </div>
        <div>
          <div className="buttonsdiv">
            <button
              type="button"
              className="editbutton"
              onClick={() => EditList(id)}
            >
              <FaEdit />
            </button>
            <button
              type="button"
              className="deletebutton"
              onClick={() => {
                DeleteList(id);
                console.log(List.length);
                if (List.length === 1) {
                  RemoveClearButton();
                }
              }}
            >
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};