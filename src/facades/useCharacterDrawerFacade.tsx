import useCharacterDrawerStore from "../store/useCharacterDrawerStore";

import { shallow } from "zustand/shallow";

const useCharacterDrawerFacade = () => {
  const { characterId, closeCharacterDrawer, openCharacterDrawer } =
    useCharacterDrawerStore(
      (state: any) => ({
        characterId: state.characterId,
        closeCharacterDrawer: state.closeCharacterDrawer,
        openCharacterDrawer: state.openCharacterDrawer,
      }),
      shallow
    );

  return { characterId, closeCharacterDrawer, openCharacterDrawer };
};

export default useCharacterDrawerFacade;
