export default {
    setFeature(state, payload) {
        console.log("in mutation")
        state.feature = payload.feature
            // state.feature.id = payload.feature.id
            // state.feature.type = "Feature"
            // state.feature.properties = {}
            // state.geometry.coordinates = payload.feature.geometry.coordinates
            // state.geometry.type = payload.feature.geometry.type
    }
}