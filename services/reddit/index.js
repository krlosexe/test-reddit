import axios from 'axios';
import { ToastAndroid } from "react-native";

import {base_url, Api} from '../../Env'
const App = () => ({
    GetData : async (option, limit, search) => {
        
        try {

            console.log(base_url(Api, `chile/${option}?limit=${limit}${search}`))
            const response = await axios.get(base_url(Api, `chile/new/.json?limit=${limit}${search}`))

            return response
         
        } catch (error) {
            ToastAndroid.showWithGravity(
                error.message,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false
          }

    }
}); 

export default App



