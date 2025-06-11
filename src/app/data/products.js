


const products = async () => {
    const res = await fetch('https://fakestoreapi.com/products?limit=4')
    const data = await res.json()
  
}
// console.log(data)
// useEffect(() => {
//     products()
// }, [])
export default products
