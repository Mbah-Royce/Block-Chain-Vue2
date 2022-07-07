import axiosInstance from "../../../Services/AxiosInterceptor";
export default {
    async getFeature(context, payload) {
        await axiosInstance.get("transaction/land/" + payload.id)
            .then((response) => {
                console.log(response)
                context.commit('setFeature', { feature: response.data.data });
            }).catch((error) => {
                console.log(error.response)
                throw error
            })
    },
    async getPartition(context, payload) {
        await axiosInstance.get("transaction/partition/" + payload.id)
            .then((response) => {
                console.log(response)
                context.commit('setFeature', { feature: response.data.data });
            }).catch((error) => {
                console.log(error.response)
                throw error
            })
    }
}