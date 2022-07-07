export default {
    getAreaInfo(state) {
        return state.feature
    },
    getPerTransInfo(state) {
        let perTranding = {
            reciever: state.reciever,
            sender: state.sender,
            transactionType: state.transactionType
        }
        return perTranding
    },
    getFeatures(state) {
        return state.certificateFeature
    }
}