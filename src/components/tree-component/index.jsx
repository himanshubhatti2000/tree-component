import { useState } from "react";
import Collapse from "../collapse";
import "./style.css";

const TreeComponent = ({
  data,
  handleRootDelete,
  childDelete,
  itemDelete,
  addChild,
}) => {
  const [inputs, setInputs] = useState({});
  console.log(inputs);
  return (
    <section>
      {data?.map(({ title: rootTitle, children }) => (
        <div key={rootTitle}>
          <Collapse
            title={
              <div>
                <h1>{rootTitle}</h1>
                <button
                  className="delete-btn"
                  onClick={() => handleRootDelete(rootTitle)}
                >
                  delete
                </button>
                <div>
                  <input
                    value={inputs[rootTitle] ?? ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [rootTitle]: e.target.value })
                    }
                  />
                  <button
                    disabled={!inputs[rootTitle]}
                    onClick={() => addChild(rootTitle, inputs[rootTitle])}
                  >
                    Add
                  </button>
                </div>
              </div>
            }
          >
            <div className="child">
              {!children?.length && <p>No Children</p>}
              {children?.map(({ title: childTitle, children }) => {
                return (
                  <div key={childTitle}>
                    <Collapse
                      title={
                        <div>
                          <h2>{childTitle}</h2>
                          <button
                            className="delete-btn"
                            onClick={() => childDelete(rootTitle, childTitle)}
                          >
                            delete
                          </button>
                        </div>
                      }
                    >
                      <div className="sub-item">
                        {!children?.length && <p>No Children</p>}
                        {children?.map(({ title }) => {
                          return (
                            <div key={title}>
                              <p>{title}</p>
                              <button
                                className="delete-btn"
                                onClick={() =>
                                  itemDelete(rootTitle, childTitle, title)
                                }
                              >
                                delete
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </Collapse>
                  </div>
                );
              })}
            </div>
          </Collapse>
        </div>
      ))}
    </section>
  );
};

export default TreeComponent;
