import { ModRegistrar } from "cs2/modding";
import { load } from "./I18nCN";


const register: ModRegistrar = (moduleRegistry) => {

    moduleRegistry.append('Menu', load);
    moduleRegistry.append('Editor', load);
    moduleRegistry.append('Game', load);
}

export default register;