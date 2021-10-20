function numberWithCommas(x) {
    try {
        if (!x) return x
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    } catch (error) {
        console.log(error)
        return ''
    }
}

export default numberWithCommas
