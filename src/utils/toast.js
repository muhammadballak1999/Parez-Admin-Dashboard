import Vue from "vue"
export const toast = (message, type) => {
    Vue.$toast.open({
        message: message,
        type: type,
        duration: 1500,
        dismissible: true
    })
}