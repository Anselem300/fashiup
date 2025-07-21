export const url3 = './data/best-selling.json';

export async function getProduct3() {

    try{
        const response = await fetch(url3);
        if(!response.ok){
           console.log("Product 3 data fetching error" + response.status);
        }

        const data = await response.json();
        return data;
    }
    catch (error){
        console.error("Error fetching Best Selling products ", error);
        return [];
    }
}
