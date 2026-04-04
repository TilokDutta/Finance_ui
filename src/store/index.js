import {create} from 'zustand'

import {persist} from 'zustand/middleware'

export const useAppStore = create(
    persist(
        (set) =>({
            isLoggedIn : false,
            user: null,
            theme:'light',

            login:(userData) => set({isLoggedIn:true, user:userData}),
            logout: () => set({isLoggedIn:false, user:null}),
        }),
        {name: 'financify-app'}
    )
)