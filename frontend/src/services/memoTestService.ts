import client from './graphqlService';
import { GET_MEMO_TESTS } from './graphql/graphql';
import MemoTest from '@/interfaces/memotest.interface';

const memoTestService = {
    findAll: () : Promise<MemoTest[]> =>  {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await client.query({ query: GET_MEMO_TESTS })
                resolve(res.data.memotests as MemoTest[]);
            }
            catch(e) {
                reject(e)
            }
        })
    }
}

export default memoTestService;