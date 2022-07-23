import React, { useState, useEffect } from "react";
import { AlertFunction } from "./AlertFunction";
import { ListItems } from "./ListItems";


const getLocalStorage = ()=>{
  let Items = localStorage.getItem("List");
  if(Items){
    return JSON.parse(localStorage.getItem("List"));
  }else{
    return [];
  }
}



const App = () => {
  const [Name, SetName] = useState("");
  const [List, SetList] = useState(getLocalStorage());
  const [isEdit, SetisEdit] = useState(false);
  const [ShowList, SetShowList] = useState(true);
  const [EditID, SetEditID] = useState(null);
  const [Alert, SetAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const RemoveClearButton = () => {
    SetShowList(false);
  };

  const SubmitButton = (e) => {
    e.preventDefault();

    if (!Name) {
      ShowAlert(true, "please input text", "danger");
    } else if (Name && isEdit) {
      SetList(
        List.map((items) => {
          if (items.id === EditID) {
            return { ...List, title: Name, id: EditID };
          }
          return items;
        })
      );
      ShowAlert(true, "item changed", "success");
      SetEditID(null);
      SetisEdit(false);
      SetName("");
    } else {
      ShowAlert(true, "item added to the list", "success");
      const NewItems = { id: new Date().getTime().toString(), title: Name };
      SetList([...List, NewItems]);
      SetShowList(true);
      SetName("");
    }
  };

  const ShowAlert = (show = false, msg = "", type = "") => {
    SetAlert({ show, msg, type });
  };

  const DeleteList = (id) => {
    SetList(List.filter((items) => items.id !== id));
    ShowAlert(true, "item removed", "danger");
  };

  const EditList = (id) => {
    SetisEdit(true);
    SetEditID(id);
    const SpecificItem = List.find((items) => items.id === id);
    console.log(SpecificItem);
    SetName(SpecificItem.title);
  };

  const RemoveAll = () => {
    SetList([]);
  };


  useEffect(()=>{
  localStorage.setItem("List",JSON.stringify(List))
  },[List])

  
  return (
    <article>
      <section>
        <div className='maindiv'>
          <div className="contentdiv">
            <div className="wrapper">
              {Alert.show && (
                <div className="alertdiv">
                  <AlertFunction
                    alert={Alert}
                    removeAlert={ShowAlert}
                    title={List}
                  />
                </div>
              )}
              <div className="titlediv">
                <h2>Grocery Bud</h2>
              </div>
              <div className="formdiv">
                <form>
                  <input
                    placeholder="e.g. eggs"
                    className="input"
                    type="text"
                    value={Name}
                    onChange={(e) => SetName(e.target.value)}
                  ></input>
                  <button
                    className={`button ${isEdit && `button2`} `}
                    type="button"
                    onClick={SubmitButton}
                  >
                    {isEdit ? `Edit` : `Submit`}
                  </button>
                </form>
              </div>
              {ShowList && (
                <div>
                  <div className="listdiv1">
                    {List.map((items) => {
                      return (
                        <div key={items.id}>
                          <ListItems
                            {...items}
                            DeleteList={DeleteList}
                            EditList={EditList}
                            RemoveClearButton={RemoveClearButton}
                            List={List}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <button
                      type="button"
                      className='clearallbutton'
                      onClick={() => {
                        SetList([]);
                        SetShowList(false);
                        ShowAlert(true, "empty list", "danger");
                      }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default App;
