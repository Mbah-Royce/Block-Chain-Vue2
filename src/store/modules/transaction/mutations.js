export default {
    setPersonnleTransactionInfo(state, payload) {
        state.reciever = payload.reciever;
        state.sender = payload.sender;
        state.transactionType = payload.transactionType
    },
    setAreaTransactionInfo(state, payload) {
        state.area = payload.area;
        state.feature.id = payload.feature.id;
        state.feature.type = payload.feature.type;
        state.feature.properties = payload.feature.properties;
        state.feature.geometry.coordinates = payload.feature.geometry.coordinates;
        state.feature.geometry.type = payload.feature.geometry.type;
    },
    setFeature(state, payload) {
        console.log("in mutation")
        state.certificateFeature = payload.feature
    }
}