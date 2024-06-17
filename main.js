const T = () => new Promise((resolve, reject) => { 
    throw Error("Third Async Error!")
    return resolve("success")
})

const V = () => new Promise((resolve, reject) => { 
    reject("Fourth Async Error - By Rejection")
    return resolve("success")
})

const X = async () => {
    try {
        await T()

    } catch (exc) {
        console.error(`Line 16 - Exception encountered: ${exc.message}`)

        try {
            T()
                .then(success => { console.log(success) })
                .catch(ex => console.error(`Line 21 - asynch catch(): ${ex.message}`))

            V()
                .then(success => { console.log(success) })
                .catch(ex => console.error(`Line 25 - asynch catch(): ${ex}`))

        } catch (exd) {
            console.error(`Line 28 - Exception encountered: ${exd.message}`)

        }
    }
}

try {
    process.on('uncaughtException', exception => { console.error(`Line 35 - UncaughtException encountered: ${exception}`) })

    throw Error("Error!")

} catch (exa) {
    console.error(`Line 40 - Exception encountered: ${exa.message}`)

    try {
        setTimeout(() => {
            try {
                throw Error("Async Error!")
            } catch (ex) {
                console.error(`Line 47 - Exception encountered: ${ex.message}`)
            } finally {
                throw Error("Second Async Error!")
            }
        }, 200)

    } catch (exb) {
        console.error(`Line 54 - Exception encountered: ${exb.message}`)

    } finally {
        X()

    }
}