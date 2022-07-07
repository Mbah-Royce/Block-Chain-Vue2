import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
export default {
    namespaced: true,
    state() {
        return {
            reciever: "",
            sender: "",
            transactionType: "",
            area: "",
            feature: {
                id: "f1c0628d4b7761c01837aa467d9a7128",
                type: "Feature",
                properties: {},
                geometry: {
                    coordinates: [
                        [
                            [-91.83949412201396, 42.77526051172205],
                            [-91.85356358244168, 42.76392462203674],
                            [-91.82971413122911, 42.764554448112676],
                            [-91.82508150401478, 42.77437890581834],
                            [-91.83949412201396, 42.77526051172205],
                        ],
                    ],
                    type: "Polygon",
                },
            },
            certificateFeature: null
        };
    },
    mutations,
    getters,
    actions,
};