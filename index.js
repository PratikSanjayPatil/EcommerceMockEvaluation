let product = document.querySelector("#container>#innerContainer>#product");

let getData = async() =>{

        let res = await fetch("https://fakestoreapi.com/products");
        let data = await res.json();

        function displayData(data){
            product.innerHTML="";
            data.forEach(function(ele){
                let div = document.createElement("div");
                let img = document.createElement("img");
                let h2 = document.createElement("h2");
                let p = document.createElement("p");
    
                img.src = ele.image;
                h2.innerText = ele.title;
                p.innerText = `Price : $${ele.price}`;
                div.append(img,h2,p);
                product.append(div);
            })
    
        }
        

        let category = document.querySelector("#category");
        category.addEventListener("change",function(){

            let Val = category.value;
            let catProduct = data.filter(function(ele){
                if(ele.category == Val){
                    // console.log(ele);
                    return ele
                }
            })

            console.log(Val)

            if(Val!==""){
                displayData(catProduct)
            }
            else{
                displayData(data)
            }
        })


        let searchBar = document.querySelector("#searchBar")

        searchBar.addEventListener("change",function(){
            let Val2 = searchBar.value
            let srchProduct = data.filter(function(ele){
                
                if(Val2===ele.title){
                    return ele;
                }

            })
            if(Val2==""){
                displayData(data)
            }
            else if(srchProduct.length==0){
                alert("Product Not Found")
            }
            else{
                displayData(srchProduct)
            }
        })


        let filterTag = document.querySelector("#filter");

        filterTag.addEventListener("change",function(){
                let data01 = data
                let Val3 = filterTag.value;
                let filtProduct 
                if(Val3=="Low to High"){
                    filtProduct = data.sort(function(a, b) {
                        return a.price - b.price;
                      });
                      displayData(filtProduct)
                }
                else if(Val3=="High to Low"){
                    filtProduct = data.sort(function(a, b) {
                        return b.price - a.price;
                      });
                      displayData(filtProduct)
                }
                else if(Val3=="No"){
                    filtProduct = data
                    displayData(filtProduct)
                }
        })
        
        
        displayData(data)
}

getData()