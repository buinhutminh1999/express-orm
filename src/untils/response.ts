export const successCode = (status: number, data, message: string) => {
    return {
        status,
        data,
        message
    }
}

export const failCode = (status: number, message: string) => {
    return {
        status,
        message
    }
}
//  const successCode = (res,message, data) => {
//     res.status(200).json({
//         statusCode: 200,
//         message,
//         data
//     })
// }