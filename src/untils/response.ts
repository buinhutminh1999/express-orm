export const successCode = (status: number, data, message: string) => {
    const token = ''
    return message == 'Đăng nhập thành công'
        ? {
            status,
            token: data,
            message
        }
        : {
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
