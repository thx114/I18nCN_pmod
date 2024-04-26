import { ModRegistrar } from "cs2/modding";
import { load } from "./I18nCN";


const register: ModRegistrar = (moduleRegistry) => {

    moduleRegistry.append('Menu', load);
    moduleRegistry.append('Editor', load);
}

export default register;