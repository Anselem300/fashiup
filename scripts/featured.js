export const url2 = './data/featured.json';

export async function getProduct2() {

    try{
        const response = await fetch(url2);
        if(!response.ok){
           console.log("Product 2 data fetching error" + response.status);
        }

        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Error fetching featured products ", error);
        return [];
    }
}
