import * as XLSX  from 'xlsx'
export const readXlsxFile = (file) => {
    const response = new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)

        reader.onload = (e) => {
            const bufferArray = e.target.result
            const wb = XLSX.read(bufferArray, {type: 'buffer'})
            const wsName = wb.SheetNames[0]
            const ws = wb.Sheets[wsName]
            const data = XLSX.utils.sheet_to_json(ws)
            resolve(data)
        }
        reader.onerror = (error) => {
            reject(error)
        }
    })
    return response
}