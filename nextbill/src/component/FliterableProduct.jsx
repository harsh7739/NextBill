import { useEffect, useState } from "react"

function FilterableProduct(){

    const [product,setProduct] = useState([])
    const [categoryList,setCategoryList]=useState([])
    


    async function FetchFunction(){
        try {
            let res = await fetch("https://fakestoreapi.com/products")
            res = await res.json()
            // console.log(res)
            setProduct(res)
        } catch (error) {
            console.log(error)
        }
    }



    function UpdateCategoryList(){    
    let data=[]
    product.forEach((item)=>{
       if(!data.includes(item.category)){
        data.push(item.category)
       }
    })
    setCategoryList(data) 
    console.log(categoryList)
    }



    useEffect(()=>{
         FetchFunction()
        
    },[])
    useEffect(()=>{
        if(product.length>0){
            UpdateCategoryList()
            // console.log(categoryList)
        }
    },[product])


    function handleFilter(e){
        const toFilterData = e.target.value
        const filteredData = product.filter((item)=>{
            if (toFilterData === "all") {
                FetchFunction()
            }else if(item.category==toFilterData){
                return item
            }
        })
        setProduct(filteredData)
    }


    return (
        <>
        <select value={categoryList} onChange={handleFilter}>
        <option value="all">All Categories</option>
            {
                categoryList.map((item)=>(
                    <option value={item}>{item}</option>
                ))
            }
        </select>
        {
            product?.map((product)=>(

                <div key={product.id}>
                    <img src={product.image} alt="" />
                    <h1>{product.category}</h1>
                    <h4>{product.title}</h4>
                    <p>{product.price}</p>
                </div>
                
            ))
        }
        </>
    )
}
export default FilterableProduct