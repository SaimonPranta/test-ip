import axios from "axios"

const getMyIp = async () => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json')
        if (response?.data?.ip) {
            return response.data.ip
        }
        return ""
    } catch (error) {
        return ""
    }
}


export default getMyIp