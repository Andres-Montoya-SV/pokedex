async function Ok(message, data, status){
    return {
        success: true,
        message,
        status,
        data
    }
}

async function Error(message, data, status, error){
    return {
        success: false,
        message,
        status,
        data,
        error
    }
}

module.exports = {
    Ok,
    Error
}