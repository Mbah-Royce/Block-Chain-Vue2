import axiosInstance from '../../../Services/AxiosInterceptor';
export default {
    async issueCertificate(context, payload) {
        var EC = require("elliptic").ec;
        var ec = new EC("secp256k1");
        var keypair = ec.genKeyPair();
        var signature = keypair.sign(payload.message).toDER();
        let postData = {
            reciever: payload.reciever,
            sender: payload.sender,
            area: payload.area,
            featureId: payload.id,
            geometryCoordinates: payload.coordinates,
            geometryType: payload.type,
            signature: signature.toString("hex"),
        };
        console.log(postData);
        await axiosInstance.post("transaction/certificate", postData)
            .then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error.response)
                throw error
            })
    },

    async getFeatures(context) {
        await axiosInstance.get("certificates")
            .then((response) => {
                console.log(response)
                context.commit('setFeatures', { feature: response.data.data });
            }).catch((error) => {
                console.log(error.response)
                throw error
            })
    },

    async getUserLand(context) {
        await axiosInstance.get("user/certificate/land")
            .then((response) => {
                console.log(response)
                context.commit('setFeatures', { feature: response.data.data });
            }).catch((error) => {
                console.log(error.response)
                throw error
            })
    },
    async partitionTitleTrasaction(context, payload) {
        var EC = require("elliptic").ec;
        var ec = new EC("secp256k1");
        var keypair = ec.genKeyPair();
        payload.message;
        payload.senderPub;
        payload.receiverPub;
        var signature = keypair.sign(payload.message).toDER();
        let postData = {
            signature: signature.toString("hex"),

            serial_no: payload.serial_no,

            reciever_pub: payload.reciever,
            reciever_feature_area: payload.reciever_area,
            reciever_feature_id: payload.reciever_feature_id,
            reciever_feature_coordinates: payload.reciever_feature_coordinates,
            reciever_feature_type: payload.reciever_feature_type,

            sender_pub: payload.sender,
            sender_feature_area: payload.sender_area,
            sender_feature_coordinates: payload.sender_feature_coordinates,
            sender_feature_type: payload.sender_feature_type,
            sender_feature_coordinate_length: payload.sender_feature_coordinate_length
        };
        console.log(postData);
        // await axiosInstance
        //     .post("transaction/partition-title", postData)
        //     .then((response) => {
        //         if (response.status === 201) {
        //             console.log(response.data.data);
        //         }
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error.response);
        //         throw error;
        //     });
    },
}