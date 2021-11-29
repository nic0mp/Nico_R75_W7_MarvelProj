let token = `2cb9d0b3271bc7f2f8307f5b8ab7bfb60925e59b364e43f8`

export const server_calls = {
    get: async () => {
        const response = await fetch(`https://drone-inventory-rangers75-tm.herokuapp.com/api/drones`,{
            method : 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
        if(!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },
    create: async (data: any = {} ) => {
        const response = await fetch(`https://drone-inventory-rangers75-tm.herokuapp.com/api/drones`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,',
                'x-access-token':` Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to create a new hero')
        }
        return await response.json() 
    },

    update: async (id:string, data: any = {} ) => {
        const response = await fetch(`https://drone-inventory-rangers75-tm.herokuapp.com/api/drones/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,',
                'x-access-token':` Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Failed to update a new hero')
        }
        return await response.json() 
    },

    delete: async (id:string ) => {
        const response = await fetch(`https://drone-inventory-rangers75-tm.herokuapp.com/api/drones/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json,',
                'x-access-token':` Bearer ${token}`
            },
           
        });
        if(!response.ok){
            throw new Error('Failed to delete a new hero')
        }
        return await response.json() 
    }
   
}