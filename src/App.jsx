import { useState } from "react";
import "./App.css";
import TreeComponent from "./components/tree-component";

const arr = [
  {
    title: "Item 1",
    children: [
      { title: "child1", children: [{ title: "sub item1" }] },
      { title: "child2", children: [{ title: "sub item2" }] },
      { title: "child3", children: [{ title: "sub item3" }] },
    ],
  },
  {
    title: "Item 2",
    children: [
      { title: "child1", children: [{ title: "sub item1" }] },
      { title: "child2", children: [{ title: "sub item2" }] },
      { title: "child3", children: [{ title: "sub item3" }] },
    ],
  },
  {
    title: "Item 3",
    children: [
      { title: "child1", children: [{ title: "sub item1" }] },
      { title: "child2", children: [{ title: "sub item2" }] },
      { title: "child3", children: [{ title: "sub item3" }] },
    ],
  },
];

function App() {
  const [state, setState] = useState(arr);
  const [newRootTitle, setNewRootTitle] = useState("");

  const handleRootDelete = (titleToRemove) => {
    const newState = state.filter(({ title }) => title !== titleToRemove);
    setState(newState);
  };

  const childDelete = (rootTitle, childTitleToRemove) => {
    const newState = [];
    state.forEach((root) => {
      if (rootTitle === root.title) {
        const updatedChildren = root.children.filter(
          ({ title }) => title !== childTitleToRemove
        );

        newState.push({
          title: root.title,
          children: updatedChildren,
        });
      } else {
        newState.push(root);
      }
    });
    setState(newState);
  };

  const itemDelete = (rootTitle, childTitle, itemTitleToRemove) => {
    const newState = [];
    const updatedRoot = { title: "", children: [] };
    let indexWhereUpdatedRootNeedsToAdd = null;

    state.forEach((root, index) => {
      if (rootTitle === root.title) {
        indexWhereUpdatedRootNeedsToAdd = index;
        updatedRoot.title = rootTitle;
        root.children.forEach((childOfRoot) => {
          if (childOfRoot.title === childTitle) {
            const updatedItems = childOfRoot.children?.filter(
              ({ title }) => title !== itemTitleToRemove
            );
            const newChild = {
              title: childOfRoot.title,
              children: updatedItems,
            };

            updatedRoot.children.push(newChild);
          } else {
            updatedRoot.children.push(childOfRoot);
          }
        });
      } else {
        newState.push(root);
      }
    });

    newState.splice(indexWhereUpdatedRootNeedsToAdd, 0, updatedRoot);
    setState(newState);
  };

  const addRoot = (title) => {
    setState([...state, { title, children: [] }]);
  };

  const addChild = (rootTitle, title) => {
    console.log({ rootTitle, title });
    const newState = [];
    const updatedRoot = { title: "", children: [] };

    state.forEach((root) => {
      if (root.title === rootTitle) {
        const updatedChildren = [...root.children];
        updatedChildren.push({ title, children: [] });
        updatedRoot.title = root.title;
        updatedRoot.children = updatedChildren;
        newState.push(updatedRoot);
      } else {
        newState.push(root);
      }
    });

    setState(newState);
  };

  const addItem = (rootTitle, childTitle, itemTitleToAdd) => {
    const newState = [];
    const updatedRoot = { title: "", children: [] };
    let indexWhereUpdatedRootNeedsToAdd = null;

    state.forEach((root, index) => {
      if (rootTitle === root.title) {
        indexWhereUpdatedRootNeedsToAdd = index;
        updatedRoot.title = rootTitle;
        root.children.forEach((childOfRoot) => {
          if (childOfRoot.title === childTitle) {
            const updatedItems = childOfRoot.children;
            updatedItems.push({ title: itemTitleToAdd });

            const newChild = {
              title: childOfRoot.title,
              children: updatedItems,
            };

            updatedRoot.children.push(newChild);
          } else {
            updatedRoot.children.push(childOfRoot);
          }
        });
      } else {
        newState.push(root);
      }
    });

    newState.splice(indexWhereUpdatedRootNeedsToAdd, 0, updatedRoot);
    setState(newState);
  };

  return (
    <>
      <input
        value={newRootTitle}
        onChange={(e) => setNewRootTitle(e.target.value)}
      />
      <button
        onClick={() => {
          addRoot(newRootTitle);
          setNewRootTitle("");
        }}
      >
        Add
      </button>
      <TreeComponent
        data={state}
        handleRootDelete={handleRootDelete}
        childDelete={childDelete}
        itemDelete={itemDelete}
        addRoot={addRoot}
        addChild={addChild}
        addItem={addItem}
      />
    </>
  );
}

export default App;
