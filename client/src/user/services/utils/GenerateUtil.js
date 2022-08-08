import uniqid from "uniqid"
export const StatusOrder = {
    0: "Đang nhận đơn hàng",
    1: "Đang kiểm tra thông tin",
    2: "Đang vận chuyển",
    3: "Đã chuyển hàng",
    4: "Chờ đổi trả",
    5: "Đã hoàn thành",
    6: "Đã hủy",
}
export const colorTextStatus = {
    0: "danger",
    1: "info",
    2: "info",
    3: "success",
    4: "warning",
    5: "success",
    6: "danger",
}

export const paymentMethod = {
    1: "Trực tiếp",
    2: "Momo",
}
export const toTimeString = (timestamp) => {
    const date = new Date(timestamp)
    if (!date) return ""
    var strDatetime = ""

    if (date.getDate() * 1 < 10) {
        strDatetime += `0${date.getDate()}`
    } else {
        strDatetime += date.getDate()
    }

    if (date.getMonth() + 1 < 10) {
        strDatetime += ` / 0${date.getMonth() + 1}`
    } else {
        strDatetime += " / " + (date.getMonth() + 1)
    }

    strDatetime += " / " + date.getFullYear()

    return strDatetime
}

export const formatDateForInput = (timestamp) => {
    const date = new Date(timestamp)
    var strDatetime = ""
    strDatetime += date.getFullYear()
    strDatetime +=
        "-" + (date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`)
    strDatetime += "-" + (date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`)
    return strDatetime
}

export const generateCartSessionID = () => {
    let session = uniqid()
    localStorage.setItem("SessionID", session)
    return session
}
export const truncateWords = (sentence, amount, tail) => {
    const words = sentence.split(" ")

    if (amount >= words.length) {
        return sentence
    }

    const truncated = words.slice(0, amount)
    return `${truncated.join(" ")}${tail}`
}
