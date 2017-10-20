const mainTabs = (
  state = { slideIndex: 0 },
  action
) => {
  switch (action.type) {
    case "MAIN_TAB_SET":
      return {slideIndex: action.slideIndex}
    default:
      return state;
  }
};

export default mainTabs;
