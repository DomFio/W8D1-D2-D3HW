let token = '54bebeea3783cd1effc7f8a8246228e50fed7c4c4ea55dc7'

export const serverCalls = {
    get:async () =>{
        const response = await fetch(`http://127.0.0.1:5000/api/marvel`,{
            method: 'GET',
            headers: {
                'Content-Type': 'applicaion/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async (data: any = {}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvel`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok){
            throw new Error('Failed to create new Data on Server!')
        }

        return await response.json()
    },

    update: async ( id:string, data:any = {} ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvel/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },

    delete: async ( id:string ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvel/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });
    }
}